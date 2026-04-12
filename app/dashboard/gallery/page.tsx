'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { V1n3Loader } from '@/components/ui/v1n3-loader'
import type { GalleryImage, Profile, CommunityType } from '@/types/database'
import {
  Search,
  Plus,
  Upload,
  ImageIcon,
  Trash2,
  Eye,
  Star,
  StarOff,
  XCircle,
  MapPin,
  Heart,
  Crop,
  Zap,
  Users,
  Sparkles,
} from 'lucide-react'

const categoryOptions = [
  { id: 'crop-farming', label: 'Crop Farming', icon: Crop, color: 'text-green-500' },
  { id: 'animal-farming', label: 'Animal Farming', icon: Users, color: 'text-amber-500' },
  { id: 'agro-marketing', label: 'Agro Marketing', icon: Zap, color: 'text-orange-500' },
  { id: 'events', label: 'Community Events', icon: Sparkles, color: 'text-purple-500' },
  { id: 'training', label: 'Training Sessions', icon: Users, color: 'text-blue-500' },
  { id: 'general', label: 'General', icon: ImageIcon, color: 'text-gray-500' },
]

const communities: CommunityType[] = [
  'Crop Farming',
  'Animal Farming',
  'Agro Marketing',
  'Agro Processing',
  'Management & Legislation',
  'Agro Tourism',
  'Agro Technology',
  'Agro Health Care',
  'Agro Media & Branding',
  'Agro Security',
  'Agro Literature',
  'Motivation & Training',
  'Agro Real Estate',
  'Agro Logistics',
]

interface GalleryImageWithUploader extends GalleryImage {
  uploader?: Profile
}

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImageWithUploader[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('general')
  const [searchQuery, setSearchQuery] = useState('')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadPreview, setUploadPreview] = useState<string | null>(null)
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    location: '',
    category: 'general',
    community: '' as CommunityType | '',
  })

  const supabase = createClient()

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
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
        .order('created_at', { ascending: false })

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory)
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
      }

      const { data, error } = await query

      if (error) throw error
      setImages(data || [])
    } catch (error) {
      console.error('Error fetching gallery:', error)
    } finally {
      setLoading(false)
    }
  }, [supabase, selectedCategory, searchQuery])

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

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

  const handleUpload = async () => {
    if (!uploadFile || !uploadForm.title) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', uploadFile)
      formData.append('title', uploadForm.title)
      formData.append('description', uploadForm.description)
      formData.append('location', uploadForm.location)
      formData.append('category', uploadForm.category)
      if (uploadForm.community) {
        formData.append('community', uploadForm.community)
      }

      const response = await fetch('/api/gallery/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Upload failed')
      }

      setShowUploadModal(false)
      setUploadFile(null)
      setUploadPreview(null)
      setUploadForm({ title: '', description: '', location: '', category: 'general', community: '' })
      fetchImages()
    } catch (error) {
      console.error('Upload error:', error)
      alert(error instanceof Error ? error.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const toggleFeatured = async (imageId: string, currentlyFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .update({ is_featured: !currentlyFeatured })
        .eq('id', imageId)

      if (error) throw error
      fetchImages()
    } catch (error) {
      console.error('Error toggling featured:', error)
    }
  }

  const deleteImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      const { error } = await supabase.from('gallery_images').delete().eq('id', imageId)

      if (error) throw error
      fetchImages()
    } catch (error) {
      console.error('Error deleting image:', error)
    }
  }

  const canManage =
    currentUser && ['admin', 'agro_executive', 'gcm', 'lgpa', 'scc', 'agro_media'].includes(currentUser.role)

  if (!canManage) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-destructive mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-3">Access Denied</h2>
          <p className="text-muted-foreground">You don&apos;t have permission to manage the gallery.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-3">Gallery Management</h1>
          <p className="text-lg text-muted-foreground">Curate and manage platform images</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-primary-foreground rounded-[4px] hover:bg-primary/90 transition-all font-medium shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Upload Image
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: 'Total Images',
            value: images.length,
            icon: ImageIcon,
            color: 'from-primary/10 to-primary/5',
            iconColor: 'text-primary',
          },
          {
            label: 'Featured',
            value: images.filter((i) => i.is_featured).length,
            icon: Star,
            color: 'from-orange-500/10 to-orange-500/5',
            iconColor: 'text-orange-500',
          },
          {
            label: 'Total Likes',
            value: images.reduce((sum, i) => sum + i.likes_count, 0),
            icon: Heart,
            color: 'from-red-500/10 to-red-500/5',
            iconColor: 'text-red-500',
          },
          {
            label: 'Total Views',
            value: images.reduce((sum, i) => sum + i.views_count, 0),
            icon: Eye,
            color: 'from-blue-500/10 to-blue-500/5',
            iconColor: 'text-blue-500',
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br ${stat.color} border border-border rounded-[8px] p-6 hover:border-primary/30 transition-colors`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-medium">{stat.label}</p>
                <p className="text-4xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.iconColor} opacity-60`} />
            </div>
          </div>
        ))}
      </div>

      {/* Filters Section */}
      <div className="bg-card/50 backdrop-blur border border-border rounded-[8px] p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-4 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-[4px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          {/* Category Filter - Styled */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-[4px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer font-medium"
            >
              {categoryOptions.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Spacer for grid alignment */}
          <div />
        </div>
      </div>

      {/* Images Grid */}
      {loading ? (
        <div className="flex justify-center py-32">
          <V1n3Loader />
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-32 bg-card/50 backdrop-blur border border-border border-dashed rounded-[8px]">
          <ImageIcon className="w-20 h-20 text-muted-foreground/40 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-3">No images yet</h3>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
            Start building your gallery by uploading your first image
          </p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-[4px] font-medium"
          >
            <Upload className="w-4 h-4" />
            Upload Image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="group bg-card border border-border rounded-[8px] overflow-hidden hover:border-primary/50 transition-all hover:shadow-xl"
            >
              <div className="relative aspect-square bg-background overflow-hidden">
                <Image
                  src={image.image_url}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => toggleFeatured(image.id, image.is_featured)}
                    className={`p-3 rounded-[4px] transition-all ${
                      image.is_featured
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur'
                    }`}
                    title={image.is_featured ? 'Remove from featured' : 'Mark as featured'}
                  >
                    {image.is_featured ? <StarOff className="w-5 h-5" /> : <Star className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => deleteImage(image.id)}
                    className="p-3 bg-red-500/90 text-white rounded-[4px] hover:bg-red-600 transition-all backdrop-blur"
                    title="Delete image"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                {image.is_featured && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-lg">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    Featured
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-bold text-foreground mb-2 line-clamp-2 text-sm">{image.title}</h3>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{image.description}</p>

                <div className="flex items-center justify-between gap-3 pt-4 border-t border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Heart className="w-3.5 h-3.5" />
                      {image.likes_count}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Eye className="w-3.5 h-3.5" />
                      {image.views_count}
                    </div>
                  </div>
                  {image.location && <span className="text-xs text-muted-foreground">{image.location}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-lg">
          <div className="bg-card border border-border rounded-[12px] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-card border-b border-border px-8 py-6 flex items-center justify-between bg-gradient-to-r from-card to-card/50">
              <h2 className="text-2xl font-bold">Upload Image</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-secondary rounded-[4px] transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* File Upload Area */}
              {!uploadPreview ? (
                <label className="flex flex-col items-center justify-center h-56 border-2 border-dashed border-primary/30 rounded-[8px] cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                  <Upload className="w-14 h-14 text-primary mb-4" />
                  <span className="text-lg font-semibold text-foreground">Click to upload or drag and drop</span>
                  <span className="text-sm text-muted-foreground mt-2">PNG, JPG, GIF up to 10MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative aspect-video rounded-[8px] overflow-hidden ring-2 ring-primary">
                  <Image
                    src={uploadPreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => {
                      setUploadFile(null)
                      setUploadPreview(null)
                    }}
                    className="absolute top-3 right-3 p-2 bg-black/50 text-white rounded-[4px] hover:bg-black/70 transition-colors backdrop-blur"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2.5">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Give your image a descriptive title"
                    className="w-full px-4 py-3 bg-background border border-border rounded-[4px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2.5">Description</label>
                  <textarea
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Tell us more about this image..."
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-border rounded-[4px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2.5">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={uploadForm.category}
                      onChange={(e) => setUploadForm((prev) => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 bg-background border border-border rounded-[4px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all font-medium"
                    >
                      {categoryOptions.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2.5">Location</label>
                    <input
                      type="text"
                      value={uploadForm.location}
                      onChange={(e) => setUploadForm((prev) => ({ ...prev, location: e.target.value }))}
                      placeholder="Where was this taken?"
                      className="w-full px-4 py-3 bg-background border border-border rounded-[4px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2.5">Community</label>
                  <select
                    value={uploadForm.community}
                    onChange={(e) => setUploadForm((prev) => ({ ...prev, community: e.target.value as CommunityType | '' }))}
                    className="w-full px-4 py-3 bg-background border border-border rounded-[4px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all font-medium"
                  >
                    <option value="">General (All Communities)</option>
                    {communities.map((com) => (
                      <option key={com} value={com}>
                        {com}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 p-8 border-t border-border bg-card/50">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-6 py-3 text-foreground hover:bg-secondary rounded-[4px] transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!uploadFile || !uploadForm.title || uploading}
                className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-[4px] font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Upload Image
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
