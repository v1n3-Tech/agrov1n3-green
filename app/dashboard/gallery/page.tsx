"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { V1n3Loader } from "@/components/ui/v1n3-loader"
import type { GalleryImage, Profile, CommunityType } from "@/types/database"
import { 
  Search, 
  Plus,
  Upload,
  ImageIcon,
  Trash2,
  Edit3,
  Eye,
  Star,
  StarOff,
  CheckCircle,
  XCircle,
  Filter,
  MoreVertical,
  Calendar,
  MapPin,
  Heart
} from "lucide-react"

const categories = [
  { id: "all", label: "All Photos" },
  { id: "harvest", label: "Harvest Season" },
  { id: "events", label: "Community Events" },
  { id: "farm-tours", label: "Farm Tours" },
  { id: "training", label: "Training Sessions" },
  { id: "market", label: "Market Days" },
  { id: "awards", label: "Awards" },
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

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImageWithUploader[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  
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
        .order("created_at", { ascending: false })

      if (selectedCategory !== "all") {
        query = query.eq("category", selectedCategory)
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
      }

      const { data, error } = await query

      if (error) throw error
      setImages(data || [])
    } catch (error) {
      console.error("Error fetching gallery:", error)
    } finally {
      setLoading(false)
    }
  }, [supabase, selectedCategory, searchQuery])

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

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

  // Toggle featured
  const toggleFeatured = async (imageId: string, currentlyFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from("gallery_images")
        .update({ is_featured: !currentlyFeatured })
        .eq("id", imageId)
      
      if (error) throw error
      fetchImages()
    } catch (error) {
      console.error("Error toggling featured:", error)
    }
  }

  // Delete image
  const deleteImage = async (imageId: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return
    
    try {
      const { error } = await supabase
        .from("gallery_images")
        .delete()
        .eq("id", imageId)
      
      if (error) throw error
      fetchImages()
    } catch (error) {
      console.error("Error deleting image:", error)
    }
  }

  const canManage = currentUser && ["admin", "agro_executive", "gcm", "lgpa", "scc"].includes(currentUser.role)

  if (!canManage) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">You don&apos;t have permission to manage the gallery.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-aldrich)]">Gallery Management</h1>
          <p className="text-muted-foreground text-sm">Upload and manage gallery images for the platform</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-[4px] hover:bg-primary/90 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Upload Photo
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border border-border rounded-[4px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2.5 bg-secondary/50 border border-border rounded-[4px] text-sm focus:outline-none"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.label}</option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-[4px] p-4">
          <ImageIcon className="w-5 h-5 text-primary mb-2" />
          <div className="text-2xl font-bold">{images.length}</div>
          <div className="text-xs text-muted-foreground">Total Images</div>
        </div>
        <div className="bg-card border border-border rounded-[4px] p-4">
          <Star className="w-5 h-5 text-orange-500 mb-2" />
          <div className="text-2xl font-bold">{images.filter(i => i.is_featured).length}</div>
          <div className="text-xs text-muted-foreground">Featured</div>
        </div>
        <div className="bg-card border border-border rounded-[4px] p-4">
          <Heart className="w-5 h-5 text-red-500 mb-2" />
          <div className="text-2xl font-bold">{images.reduce((sum, i) => sum + i.likes_count, 0)}</div>
          <div className="text-xs text-muted-foreground">Total Likes</div>
        </div>
        <div className="bg-card border border-border rounded-[4px] p-4">
          <Eye className="w-5 h-5 text-blue-500 mb-2" />
          <div className="text-2xl font-bold">{images.reduce((sum, i) => sum + i.views_count, 0)}</div>
          <div className="text-xs text-muted-foreground">Total Views</div>
        </div>
      </div>

      {/* Images Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <V1n3Loader />
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-20 bg-card border border-border rounded-[4px]">
          <ImageIcon className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No images yet</h3>
          <p className="text-muted-foreground mb-4">Upload your first image to get started</p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-[4px] font-medium"
          >
            <Upload className="w-4 h-4" />
            Upload Photo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="group bg-card border border-border rounded-[4px] overflow-hidden"
            >
              <div className="relative aspect-square">
                <Image
                  src={image.image_url}
                  alt={image.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => toggleFeatured(image.id, image.is_featured)}
                    className={`p-2 rounded-[4px] transition-colors ${
                      image.is_featured 
                        ? "bg-orange-500 text-white" 
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                    title={image.is_featured ? "Remove from featured" : "Mark as featured"}
                  >
                    {image.is_featured ? <StarOff className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => deleteImage(image.id)}
                    className="p-2 bg-red-500/80 text-white rounded-[4px] hover:bg-red-500 transition-colors"
                    title="Delete image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {image.is_featured && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-orange-500 text-white text-xs rounded-[3px] flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm line-clamp-1">{image.title}</h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {image.likes_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {image.views_count}
                  </span>
                </div>
                {image.location && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {image.location}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-[4px] w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold">Upload Photo</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 hover:bg-secondary rounded-[4px] transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* File Upload */}
              {!uploadPreview ? (
                <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-border rounded-[4px] cursor-pointer hover:border-primary/50 transition-colors">
                  <Upload className="w-10 h-10 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Click to upload or drag and drop</span>
                  <span className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative aspect-video rounded-[4px] overflow-hidden">
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
                    className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-[4px] hover:bg-black/70 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Title *</label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Give your photo a title"
                  className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-[4px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Description</label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Tell us about this photo..."
                  rows={3}
                  className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-[4px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Location</label>
                <input
                  type="text"
                  value={uploadForm.location}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Where was this taken?"
                  className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-[4px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Category</label>
                <select
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-[4px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {categories.filter(c => c.id !== "all").map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>

              {/* Community */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Community (Optional)</label>
                <select
                  value={uploadForm.community}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, community: e.target.value as CommunityType | "" }))}
                  className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-[4px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">General</option>
                  {communities.map((com) => (
                    <option key={com} value={com}>{com}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 p-4 border-t border-border">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!uploadFile || !uploadForm.title || uploading}
                className="flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-[4px] text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload Photo
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
