"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { createClient } from "@/utils/supabase/client"
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
  Plus,
  Upload,
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

const communities: CommunityType[] = [
  "Crop Farming", "Animal Farming", "Agro Marketing", "Agro Processing",
  "Management & Legislation", "Agro Tourism", "Agro Technology", "Agro Health Care",
  "Agro Media & Branding", "Agro Security", "Agro Literature", "Motivation & Training",
  "Agro Real Estate", "Agro Logistics"
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
  
  // Upload modal state
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadPreview, setUploadPreview] = useState<string | null>(null)
  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    location: "",
    category: "harvest",
    community: "" as CommunityType | ""
  })

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

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle upload
  const handleUpload = async () => {
    if (!uploadFile || !uploadForm.title) return
    
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", uploadFile)
      formData.append("title", uploadForm.title)
      formData.append("description", uploadForm.description)
      formData.append("location", uploadForm.location)
      formData.append("category", uploadForm.category)
      if (uploadForm.community) {
        formData.append("community", uploadForm.community)
      }
      
      const response = await fetch("/api/gallery/upload", {
        method: "POST",
        body: formData,
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Upload failed")
      }
      
      setShowUploadModal(false)
      setUploadFile(null)
      setUploadPreview(null)
      setUploadForm({ title: "", description: "", location: "", category: "harvest", community: "" })
      fetchImages()
    } catch (error) {
      console.error("Upload error:", error)
      alert(error instanceof Error ? error.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const canUpload = currentUser && ["admin", "agro_executive", "gcm", "lgpa", "scc"].includes(currentUser.role)

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
      <Header />
      
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
            
            {canUpload && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="hidden md:flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-[4px] hover:bg-primary/90 transition-colors font-medium"
              >
                <Plus className="w-5 h-5" />
                Upload Photo
              </button>
            )}
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
              
              {canUpload && (
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="md:hidden flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-[4px] text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Upload
                </button>
              )}
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
                  : "Be the first to share a moment from your community!"
                }
              </p>
              {canUpload && (
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-[4px] font-medium"
                >
                  <Upload className="w-5 h-5" />
                  Upload First Photo
                </button>
              )}
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
                            {image.uploader?.first_name || "Unknown"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-white/80 text-xs">
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {image.likes_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {image.views_count}
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

      {/* CTA Section */}
      {canUpload && (
        <section className="py-16 border-t border-border/50">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-orange-500/10 rounded-[4px] p-8 md:p-12 text-center border border-primary/20">
              <Camera className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-aldrich)] mb-4">
                Share Your Community Moments
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                As a team leader, you can upload photos showcasing your community&apos;s activities, 
                achievements, and the amazing work being done across GreenV1n3.
              </p>
              <button
                onClick={() => setShowUploadModal(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-[4px] font-medium hover:bg-primary/90 transition-colors"
              >
                <Upload className="w-5 h-5" />
                Upload Photos
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-card rounded-[4px] w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold">Upload Photo</h2>
              <button onClick={() => setShowUploadModal(false)} className="p-2 hover:bg-secondary rounded-[4px] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Photo</label>
                {uploadPreview ? (
                  <div className="relative aspect-video rounded-[4px] overflow-hidden bg-secondary">
                    <Image src={uploadPreview} alt="Preview" fill className="object-contain" />
                    <button
                      onClick={() => { setUploadFile(null); setUploadPreview(null) }}
                      className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-border rounded-[4px] cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors">
                    <Upload className="w-10 h-10 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Click to upload or drag and drop</span>
                    <span className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP up to 10MB</span>
                    <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                  </label>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Give your photo a title"
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-[4px] focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Tell us about this photo..."
                  rows={3}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-[4px] focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={uploadForm.location}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Where was this taken?"
                    className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-[4px] focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-[4px] focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {categories.filter(c => c.id !== "all").map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Community</label>
                  <select
                    value={uploadForm.community}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, community: e.target.value as CommunityType | "" }))}
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-[4px] focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">General</option>
                    {communities.map((c) => (<option key={c} value={c}>{c}</option>))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
              <button onClick={() => setShowUploadModal(false)} className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
              <button
                onClick={handleUpload}
                disabled={!uploadFile || !uploadForm.title || uploading}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-[4px] font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Uploading...</>) : (<><Upload className="w-4 h-4" />Upload Photo</>)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-10">
            <X className="w-6 h-6 text-white" />
          </button>
          <button onClick={() => navigateImage("prev")} className="absolute left-4 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button onClick={() => navigateImage("next")} className="absolute right-4 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="relative max-w-5xl max-h-[80vh] mx-16">
            <Image src={selectedImage.image_url} alt={selectedImage.title} width={1200} height={800} className="max-h-[80vh] w-auto object-contain rounded-[4px]" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
            <div className="container mx-auto flex items-end justify-between">
              <div>
                <h3 className="text-white text-2xl font-bold mb-2">{selectedImage.title}</h3>
                {selectedImage.description && <p className="text-white/80 mb-3 max-w-2xl">{selectedImage.description}</p>}
                <div className="flex items-center gap-4 text-white/70 text-sm">
                  {selectedImage.uploader && (
                    <div className="flex items-center gap-2">
                      {selectedImage.uploader.avatar_url ? (
                        <Image src={selectedImage.uploader.avatar_url} alt="" width={24} height={24} className="rounded-full" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center"><User className="w-4 h-4 text-primary" /></div>
                      )}
                      <span>{selectedImage.uploader.first_name} {selectedImage.uploader.last_name}</span>
                    </div>
                  )}
                  {selectedImage.location && (<div className="flex items-center gap-1"><MapPin className="w-4 h-4" />{selectedImage.location}</div>)}
                  <div className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(selectedImage.created_at).toLocaleDateString()}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => handleLike(selectedImage.id, e)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-[4px] transition-colors ${userLikes.has(selectedImage.id) ? "bg-red-500 text-white" : "bg-white/10 text-white hover:bg-white/20"}`}
                >
                  <Heart className={`w-5 h-5 ${userLikes.has(selectedImage.id) ? "fill-current" : ""}`} />
                  {selectedImage.likes_count}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-[4px] hover:bg-white/20 transition-colors">
                  <Share2 className="w-5 h-5" />Share
                </button>
                <a href={selectedImage.image_url} download className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-[4px] hover:bg-white/20 transition-colors">
                  <Download className="w-5 h-5" />Download
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
