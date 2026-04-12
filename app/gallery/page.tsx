'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Header } from '@/components/landing/header'
import { V1n3Loader } from '@/components/ui/v1n3-loader'
import type { GalleryImage, Profile, CommunityType } from '@/types/database'
import {
  Search,
  Heart,
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
  Camera,
  Leaf,
  Zap,
  Users,
  Award,
} from 'lucide-react'

const categories = [
  { id: 'all', label: 'All Photos', icon: ImageIcon, color: 'from-blue-500/20 to-blue-600/20' },
  { id: 'crop-farming', label: 'Crop Farming', icon: Leaf, color: 'from-green-500/20 to-green-600/20' },
  { id: 'animal-farming', label: 'Animal Farming', icon: Users, color: 'from-amber-500/20 to-amber-600/20' },
  { id: 'events', label: 'Events', icon: Calendar, color: 'from-purple-500/20 to-purple-600/20' },
  { id: 'training', label: 'Training', icon: Zap, color: 'from-orange-500/20 to-orange-600/20' },
  { id: 'awards', label: 'Awards', icon: Award, color: 'from-yellow-500/20 to-yellow-600/20' },
]

interface GalleryImageWithUploader extends GalleryImage {
  uploader?: Profile
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImageWithUploader[]>([])
  const [featuredImages, setFeaturedImages] = useState<GalleryImageWithUploader[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedImage, setSelectedImage] = useState<GalleryImageWithUploader | null>(null)
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const [userLikes, setUserLikes] = useState<Set<string>>(new Set())

  const supabase = createClient()

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        if (profile) {
          setCurrentUser(profile)
        }
      }
    }
    fetchUser()
  }, [supabase])

  const fetchImages = useCallback(async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('gallery_images')
        .select(
          `
          *,
          uploader:profiles!uploaded_by(id, first_name, last_name, avatar_url, role, community)
        `
        )
        .eq('is_approved', true)
        .order('created_at', { ascending: false })

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory)
      }

      if (searchQuery) {
        query = query.or(
          `title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`
        )
      }

      const { data, error } = await query

      if (error) throw error

      setImages(data || [])
      setFeaturedImages(
        (data || [])
          .filter((img) => img.is_featured)
          .slice(0, 3)
      )
    } catch (error) {
      console.error('Error fetching gallery:', error)
    } finally {
      setLoading(false)
    }
  }, [supabase, selectedCategory, searchQuery])

  const fetchUserLikes = useCallback(async () => {
    if (!currentUser) return

    const { data } = await supabase.from('gallery_likes').select('image_id').eq('user_id', currentUser.id)

    if (data) {
      setUserLikes(new Set(data.map((like) => like.image_id)))
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

  const handleLike = async (imageId: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (!currentUser) return

    const isLiked = userLikes.has(imageId)

    try {
      const response = await fetch(`/api/gallery/${imageId}/like`, {
        method: isLiked ? 'DELETE' : 'POST',
      })

      if (response.ok) {
        setUserLikes((prev) => {
          const newSet = new Set(prev)
          if (isLiked) {
            newSet.delete(imageId)
          } else {
            newSet.add(imageId)
          }
          return newSet
        })

        setImages((prev) =>
          prev.map((img) =>
            img.id === imageId ? { ...img, likes_count: img.likes_count + (isLiked ? -1 : 1) } : img
          )
        )
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id)
    const newIndex =
      direction === 'prev' ? (currentIndex - 1 + images.length) % images.length : (currentIndex + 1) % images.length
    setSelectedImage(images[newIndex])
  }

  const totalLikes = images.reduce((sum, img) => sum + img.likes_count, 0)
  const totalViews = images.reduce((sum, img) => sum + img.views_count, 0)

  return (
    <div className="min-h-screen bg-background">
      <Header profile={currentUser} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-transparent" />
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/15 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Camera className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Community Gallery</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Capturing the <span className="text-primary">Power</span> of Agriculture
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Explore inspiring moments from agricultural communities across Nigeria. From harvest celebrations to success
              stories, witness the transformation happening every day through GreenV1n3.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {[
              { label: 'Photos', value: images.length, icon: ImageIcon, color: 'from-blue-500/20 to-blue-600/20' },
              {
                label: 'Communities',
                value: '14',
                icon: Users,
                color: 'from-green-500/20 to-green-600/20',
              },
              { label: 'Total Views', value: totalViews.toLocaleString(), icon: Eye, color: 'from-purple-500/20 to-purple-600/20' },
              { label: 'Likes', value: totalLikes.toLocaleString(), icon: Heart, color: 'from-red-500/20 to-red-600/20' },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`bg-gradient-to-br ${stat.color} backdrop-blur border border-border/50 rounded-[6px] p-6 hover:border-primary/30 transition-all`}
              >
                <stat.icon className="w-6 h-6 text-primary mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Images Carousel */}
      {featuredImages.length > 0 && (
        <section className="py-16 border-y border-border/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-3">Featured Moments</h2>
            <p className="text-muted-foreground mb-8">Highlighted images from our community</p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {featuredImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`group relative rounded-[6px] overflow-hidden cursor-pointer ${
                    index === 0 ? 'md:col-span-7 aspect-[16/10]' : 'md:col-span-5 aspect-[4/3]'
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image.image_url}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-orange-500/90 backdrop-blur text-white text-xs font-bold rounded-full flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 fill-current" />
                      Featured
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 className="text-white font-bold text-xl mb-2">{image.title}</h3>
                    {image.location && (
                      <div className="flex items-center gap-2 text-white/90 text-sm">
                        <MapPin className="w-4 h-4" />
                        {image.location}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters Section */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur-lg border-b border-border/30 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search photos, locations, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-secondary/50 border border-border/50 rounded-[4px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            {/* Category Filters */}
            <div className="flex gap-3 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-secondary/40 text-muted-foreground border border-border/50 hover:bg-secondary/60 hover:text-foreground'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-32">
              <V1n3Loader />
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-32">
              <ImageIcon className="w-20 h-20 text-muted-foreground/30 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-2">No photos found</h3>
              <p className="text-muted-foreground text-lg">
                {selectedCategory !== 'all' ? 'Try another category' : 'Check back soon for community photos'}
              </p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="group relative bg-card rounded-[6px] overflow-hidden cursor-pointer border border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-xl break-inside-avoid"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative overflow-hidden bg-background">
                    <Image
                      src={image.image_url}
                      alt={image.title}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category Badge */}
                    {image.category && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-black/50 backdrop-blur text-white text-xs font-medium rounded-[3px] capitalize">
                          {image.category.replace('-', ' ')}
                        </span>
                      </div>
                    )}

                    {/* Like Button on Hover */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleLike(image.id, e)
                      }}
                      className="absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                    >
                      <div
                        className={`p-1.5 rounded-full ${
                          userLikes.has(image.id) ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${userLikes.has(image.id) ? 'fill-current' : ''}`} />
                      </div>
                    </button>

                    {/* Hover Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white font-bold text-sm line-clamp-2 mb-3">{image.title}</h3>

                      <div className="space-y-3 text-white/80 text-xs">
                        {image.description && <p className="line-clamp-2">{image.description}</p>}

                        <div className="flex items-center justify-between pt-3 border-t border-white/20">
                          <div className="flex items-center gap-2">
                            {image.uploader?.avatar_url ? (
                              <Image
                                src={image.uploader.avatar_url}
                                alt=""
                                width={24}
                                height={24}
                                className="rounded-full"
                              />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center">
                                <User className="w-3.5 h-3.5 text-primary" />
                              </div>
                            )}
                            <span className="text-white/70 text-xs">
                              {image.uploader?.first_name} {image.uploader?.last_name}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <span className="flex items-center gap-1">
                              <Heart className="w-3.5 h-3.5" />
                              {image.likes_count}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5" />
                              {image.views_count}
                            </span>
                          </div>
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
        <div className="fixed inset-0 z-50 bg-black/98 backdrop-blur flex items-center justify-center p-4 overflow-y-auto">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors z-50"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              navigateImage('prev')
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              navigateImage('next')
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors hidden md:flex"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative mb-6">
              <Image
                src={selectedImage.image_url}
                alt={selectedImage.title}
                width={1200}
                height={800}
                className="max-h-[70vh] w-full object-contain rounded-[6px]"
              />
            </div>

            <div className="space-y-4 text-white">
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
                {selectedImage.description && <p className="text-white/70 text-lg leading-relaxed">{selectedImage.description}</p>}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                {selectedImage.location && (
                  <div>
                    <p className="text-white/50 text-sm mb-1">Location</p>
                    <p className="text-white font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {selectedImage.location}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-white/50 text-sm mb-1">Likes</p>
                  <p className="text-white font-medium flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    {selectedImage.likes_count}
                  </p>
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1">Views</p>
                  <p className="text-white font-medium flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {selectedImage.views_count}
                  </p>
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1">Category</p>
                  <p className="text-white font-medium capitalize">{selectedImage.category}</p>
                </div>
              </div>

              <button
                onClick={(e) => handleLike(selectedImage.id, e)}
                className={`w-full mt-6 px-6 py-3 rounded-[4px] font-medium transition-all flex items-center justify-center gap-2 ${
                  userLikes.has(selectedImage.id)
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                <Heart className={`w-5 h-5 ${userLikes.has(selectedImage.id) ? 'fill-current' : ''}`} />
                {userLikes.has(selectedImage.id) ? 'Liked' : 'Like this photo'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
