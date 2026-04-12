"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/landing/header"
import { V1n3Loader } from "@/components/ui/v1n3-loader"
import type { GalleryImage, Profile, CommunityType } from "@/types/database"
import { 
  Search, 
  Grid3X3, 
  LayoutGrid,
  Heart,
  MessageCircle,
  Share2,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  User,
  ImageIcon,
  Sparkles,
  Eye,
  Camera
} from "lucide-react"

const categories = [
  { id: "all", label: "All Photos", icon: ImageIcon },
  { id: "harvest", label: "Harvest Season", icon: Sparkles },
  { id: "events", label: "Community Events", icon: Calendar },
  { id: "farm-tours", label: "Farm Tours", icon: MapPin },
  { id: "training", label: "Training Sessions", icon: User },
  { id: "market", label: "Market Days", icon: Grid3X3 },
  { id: "awards", label: "Awards", icon: Sparkles },
]

interface GalleryImageWithUploader extends GalleryImage {
  uploader?: Profile
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImageWithUploader[]>([])
  const [featuredImages, setFeaturedImages] = useState<GalleryImageWithUploader[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"masonry" | "grid">("masonry")
  const [selectedImage, setSelectedImage] = useState<GalleryImageWithUploader | null>(null)
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const [userLikes, setUserLikes] = useState<Set<string>>(new Set())

  const supabase = createClient()

  // Fetch current user
  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()
        if (profile) {
          setCurrentUser(profile)
        }
      }
    }
    fetchUser()
  }, [supabase])

  // Fetch gallery images
  const fetchImages = useCallback(async () => {
    setLoading(true)
    try {
      let query = supabase
        .from("gallery_images")
        .select(`
          *,
          uploader:profiles!uploaded_by(id, first_name, last_name, avatar_url, role, community)
        `)
        .eq("is_approved", true)
        .order("created_at", { ascending: false })

      if (selectedCategory !== "all") {
        query = query.eq("category", selectedCategory)
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`)
      }

      const { data, error } = await query

      if (error) throw error
      
      setImages(data || [])
      setFeaturedImages((data || []).filter(img => img.is_featured).slice(0, 3))
    } catch (error) {
      console.error("Error fetching gallery:", error)
    } finally {
      setLoading(false)
    }
  }, [supabase, selectedCategory, searchQuery])

  // Fetch user likes
  const fetchUserLikes = useCallback(async () => {
    if (!currentUser) return
    
    const { data } = await supabase
      .from("gallery_likes")
      .select("image_id")
      .eq("user_id", currentUser.id)
    
    if (data) {
      setUserLikes(new Set(data.map(like => like.image_id)))
    }
  }, [supabase, currentUser])

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

  useEffect(() => {
    if (currentUser) {
      fetchUserLikes()
    }
  }, [currentUser, fetchUserLikes])

  // Handle like
  const handleLike = async (imageId: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (!currentUser) return

    const isLiked = userLikes.has(imageId)
    
    try {
      const response = await fetch(`/api/gallery/${imageId}/like`, {
        method: isLiked ? "DELETE" : "POST",
      })
      
      if (response.ok) {
        setUserLikes(prev => {
          const newSet = new Set(prev)
          if (isLiked) {
            newSet.delete(imageId)
          } else {
            newSet.add(imageId)
          }
          return newSet
        })
        
        setImages(prev => prev.map(img => 
          img.id === imageId 
            ? { ...img, likes_count: img.likes_count + (isLiked ? -1 : 1) }
            : img
        ))
      }
    } catch (error) {
      console.error("Error toggling like:", error)
    }
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedImage) return
    const currentIndex = images.findIndex(img => img.id === selectedImage.id)
    const newIndex = direction === "prev" 
      ? (currentIndex - 1 + images.length) % images.length
      : (currentIndex + 1) % images.length
    setSelectedImage(images[newIndex])
  }

  const totalLikes = images.reduce((sum, img) => sum + img.likes_count, 0)
  const uniqueUploaders = new Set(images.map(img => img.uploaded_by)).size

  return (
    <div className="min-h-screen bg-background">
      <Header profile={currentUser} />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Camera className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">Community Gallery</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-aldrich)] mb-4">
                Capturing <span className="text-primary">Growth</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Explore moments from our vibrant agricultural communities across Nigeria. 
                From harvest celebrations to training sessions, see the faces behind GreenV1n3.
              </p>
            </div>
          </div>

          {/* Featured Images */}
          {featuredImages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {featuredImages.map((image, index) => (
                <div 
                  key={image.id}
                  className={`relative rounded-[4px] overflow-hidden cursor-pointer group ${
                    index === 0 ? "md:col-span-2 md:row-span-2 aspect-[16/10]" : "aspect-[4/3]"
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image.image_url}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-orange-500/90 text-white text-xs rounded-[3px] font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                    {image.location && (
                      <div className="flex items-center gap-1 text-white/80 text-sm">
                        <MapPin className="w-3 h-3" />
                        {image.location}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Photos", value: images.length, icon: ImageIcon },
              { label: "Communities", value: "14", icon: Grid3X3 },
              { label: "Contributors", value: uniqueUploaders || "0", icon: User },
              { label: "Total Likes", value: totalLikes.toLocaleString(), icon: Heart },
            ].map((stat) => (
              <div key={stat.label} className="bg-card/50 border border-border/50 rounded-[4px] p-4 text-center">
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground font-[family-name:var(--font-aldrich)]">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search photos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-secondary/50 border border-border/50 rounded-[4px] text-sm w-48 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              
              <div className="flex items-center bg-secondary/50 rounded-[4px] p-1">
                <button
                  onClick={() => setViewMode("masonry")}
                  className={`p-2 rounded-[3px] transition-colors ${
                    viewMode === "masonry" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-[3px] transition-colors ${
                    viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <V1n3Loader />
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20">
              <ImageIcon className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No photos yet</h3>
              <p className="text-muted-foreground mb-6">
                {selectedCategory !== "all" 
                  ? "No photos in this category. Try another filter."
                  : "Check back soon for photos from our community!"
                }
              </p>
            </div>
          ) : (
            <div className={`${
              viewMode === "masonry" 
                ? "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            }`}>
              {images.map((image) => (
                <div
                  key={image.id}
                  className={`group relative bg-card rounded-[4px] overflow-hidden cursor-pointer border border-border/50 hover:border-primary/30 transition-all ${
                    viewMode === "masonry" ? "break-inside-avoid" : ""
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <div className={viewMode === "grid" ? "aspect-square" : "relative"}>
                    <Image
                      src={image.image_url}
                      alt={image.title}
                      width={400}
                      height={viewMode === "grid" ? 400 : 300}
                      className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                        viewMode === "grid" ? "h-full" : "h-auto"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Hover Actions */}
                    <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handleLike(image.id, e)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                          userLikes.has(image.id) 
                            ? "bg-red-500 text-white" 
                            : "bg-black/40 text-white hover:bg-black/60"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${userLikes.has(image.id) ? "fill-current" : ""}`} />
                      </button>
                    </div>

                    {image.category && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-[3px] capitalize">
                          {image.category}
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <h3 className="text-white font-medium text-sm line-clamp-1">{image.title}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          {image.uploader?.avatar_url ? (
                            <Image
                              src={image.uploader.avatar_url}
                              alt=""
                              width={20}
                              height={20}
                              className="rounded-full"
                            />
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                              <User className="w-3 h-3 text-primary" />
                            </div>
                          )}
                          <span className="text-white/80 text-xs">
                            {image.uploader?.first_name} {image.uploader?.last_name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-white/80 text-xs">
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {image.likes_count}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-50"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateImage("prev") }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateImage("next") }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            className="max-w-5xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.image_url}
              alt={selectedImage.title}
              width={1200}
              height={800}
              className="max-h-[80vh] w-auto object-contain"
            />
            <div className="mt-4 text-white">
              <h2 className="text-xl font-semibold">{selectedImage.title}</h2>
              {selectedImage.description && (
                <p className="text-white/70 mt-2">{selectedImage.description}</p>
              )}
              <div className="flex items-center gap-4 mt-4 text-white/60 text-sm">
                {selectedImage.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedImage.location}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {selectedImage.likes_count} likes
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {selectedImage.views_count} views
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
