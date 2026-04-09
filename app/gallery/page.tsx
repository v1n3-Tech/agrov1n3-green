"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  Camera, 
  Filter, 
  Grid3X3, 
  LayoutGrid, 
  Search, 
  Heart, 
  MessageCircle, 
  Share2, 
  Download, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  MapPin,
  User,
  Sparkles,
  ImageIcon,
  Play,
  Maximize2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/landing/header"

// Mock gallery data
const categories = [
  { id: "all", name: "All Photos", count: 156 },
  { id: "harvest", name: "Harvest Season", count: 42 },
  { id: "events", name: "Community Events", count: 38 },
  { id: "farms", name: "Farm Tours", count: 28 },
  { id: "training", name: "Training Sessions", count: 24 },
  { id: "market", name: "Market Days", count: 14 },
  { id: "awards", name: "Awards & Recognition", count: 10 },
]

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
    title: "Golden Harvest Festival 2026",
    category: "harvest",
    likes: 234,
    comments: 18,
    author: "Admin Team",
    authorAvatar: "AT",
    date: "Apr 5, 2026",
    location: "Langtang North",
    featured: true,
    aspectRatio: "landscape",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
    title: "Crop Farming Community Meetup",
    category: "events",
    likes: 189,
    comments: 24,
    author: "GCM Plateau",
    authorAvatar: "GP",
    date: "Apr 3, 2026",
    location: "Jos South",
    featured: false,
    aspectRatio: "portrait",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80",
    title: "Sunrise Over the Rice Fields",
    category: "farms",
    likes: 456,
    comments: 32,
    author: "LGPA Barkin Ladi",
    authorAvatar: "LB",
    date: "Apr 1, 2026",
    location: "Barkin Ladi",
    featured: true,
    aspectRatio: "landscape",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?w=800&q=80",
    title: "Youth Agro Training Workshop",
    category: "training",
    likes: 167,
    comments: 45,
    author: "SCC Agro Tech",
    authorAvatar: "SA",
    date: "Mar 28, 2026",
    location: "Pankshin",
    featured: false,
    aspectRatio: "square",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1595855759920-86582396756a?w=800&q=80",
    title: "Fresh Produce at Sunday Market",
    category: "market",
    likes: 298,
    comments: 21,
    author: "Admin Team",
    authorAvatar: "AT",
    date: "Mar 25, 2026",
    location: "Mangu",
    featured: false,
    aspectRatio: "landscape",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
    title: "Award Ceremony - Best Young Farmer",
    category: "awards",
    likes: 512,
    comments: 67,
    author: "Agro Executive",
    authorAvatar: "AE",
    date: "Mar 20, 2026",
    location: "Jos North",
    featured: true,
    aspectRatio: "portrait",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80",
    title: "Poultry Farm Expansion Project",
    category: "farms",
    likes: 178,
    comments: 14,
    author: "SCC Animal Farming",
    authorAvatar: "SA",
    date: "Mar 18, 2026",
    location: "Riyom",
    featured: false,
    aspectRatio: "landscape",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&q=80",
    title: "Cassava Processing Workshop",
    category: "training",
    likes: 145,
    comments: 19,
    author: "GCM Processing",
    authorAvatar: "GP",
    date: "Mar 15, 2026",
    location: "Shendam",
    featured: false,
    aspectRatio: "square",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80",
    title: "Community Irrigation Project Launch",
    category: "events",
    likes: 289,
    comments: 38,
    author: "LGPA Kanke",
    authorAvatar: "LK",
    date: "Mar 12, 2026",
    location: "Kanke",
    featured: true,
    aspectRatio: "landscape",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80",
    title: "Tomato Harvest - Record Yield",
    category: "harvest",
    likes: 367,
    comments: 28,
    author: "Admin Team",
    authorAvatar: "AT",
    date: "Mar 10, 2026",
    location: "Bassa",
    featured: false,
    aspectRatio: "portrait",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?w=800&q=80",
    title: "Organic Vegetable Garden Tour",
    category: "farms",
    likes: 234,
    comments: 16,
    author: "SCC Crop Farming",
    authorAvatar: "SC",
    date: "Mar 8, 2026",
    location: "Bokkos",
    featured: false,
    aspectRatio: "landscape",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=80",
    title: "Women in Agriculture Summit",
    category: "events",
    likes: 423,
    comments: 52,
    author: "Agro Executive",
    authorAvatar: "AE",
    date: "Mar 5, 2026",
    location: "Jos South",
    featured: true,
    aspectRatio: "landscape",
  },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("masonry")
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [likedImages, setLikedImages] = useState<number[]>([])

  const filteredImages = galleryImages.filter(img => {
    const matchesCategory = selectedCategory === "all" || img.category === selectedCategory
    const matchesSearch = img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         img.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredImages = galleryImages.filter(img => img.featured).slice(0, 3)

  const handleLike = (imageId: number) => {
    setLikedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    )
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedImage) return
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
    const newIndex = direction === "prev" 
      ? (currentIndex - 1 + filteredImages.length) % filteredImages.length
      : (currentIndex + 1) % filteredImages.length
    setSelectedImage(filteredImages[newIndex])
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <Camera className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Community Gallery</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-aldrich)] mb-4">
              Capturing Our <span className="text-primary">Agricultural</span> Journey
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A visual celebration of our farming communities, events, achievements, and the dedicated 
              people transforming agriculture across Plateau State.
            </p>
          </div>

          {/* Featured Images Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {featuredImages.map((image, index) => (
              <div 
                key={image.id}
                className={`relative group cursor-pointer overflow-hidden rounded-[4px] ${
                  index === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <div className={`relative ${index === 0 ? "h-[400px]" : "h-[195px]"}`}>
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  {/* Featured Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-orange-500/90 rounded-full">
                    <Sparkles className="w-3 h-3 text-white" />
                    <span className="text-xs font-medium text-white">Featured</span>
                  </div>

                  {/* Expand Icon */}
                  <div className="absolute top-3 right-3 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className={`font-semibold text-white mb-1 ${index === 0 ? "text-xl" : "text-sm"}`}>
                      {image.title}
                    </h3>
                    <div className="flex items-center gap-3 text-white/70 text-xs">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {image.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {image.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter & Search Section */}
      <section className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border/50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {cat.name}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    selectedCategory === cat.id
                      ? "bg-white/20"
                      : "bg-muted"
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search & View Toggle */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search gallery..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary/50 border-border/50"
                />
              </div>
              <div className="flex items-center gap-1 p-1 bg-secondary/50 rounded-[4px]">
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
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredImages.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-4 bg-secondary/50 rounded-full flex items-center justify-center">
                <ImageIcon className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No images found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className={viewMode === "masonry" 
              ? "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
              : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            }>
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className={`group relative overflow-hidden rounded-[4px] bg-secondary/30 cursor-pointer ${
                    viewMode === "masonry" ? "break-inside-avoid" : ""
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <div className={`relative ${
                    viewMode === "grid" 
                      ? "aspect-square" 
                      : image.aspectRatio === "portrait" 
                        ? "aspect-[3/4]" 
                        : image.aspectRatio === "square" 
                          ? "aspect-square" 
                          : "aspect-[4/3]"
                  }`}>
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          handleLike(image.id)
                        }}
                        className={`p-2 rounded-full transition-colors ${
                          likedImages.includes(image.id)
                            ? "bg-red-500 text-white"
                            : "bg-black/50 text-white hover:bg-black/70"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${likedImages.includes(image.id) ? "fill-current" : ""}`} />
                      </button>
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="font-medium text-white text-sm mb-2 line-clamp-2">{image.title}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/80 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white">{image.authorAvatar}</span>
                          </div>
                          <span className="text-xs text-white/80">{image.author}</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/70 text-xs">
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {likedImages.includes(image.id) ? image.likes + 1 : image.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            {image.comments}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More */}
          {filteredImages.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="gap-2">
                <ImageIcon className="w-4 h-4" />
                Load More Photos
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-secondary/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary font-[family-name:var(--font-aldrich)]">156+</div>
              <p className="text-muted-foreground text-sm mt-1">Photos Shared</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary font-[family-name:var(--font-aldrich)]">14</div>
              <p className="text-muted-foreground text-sm mt-1">Communities</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary font-[family-name:var(--font-aldrich)]">48</div>
              <p className="text-muted-foreground text-sm mt-1">Contributors</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary font-[family-name:var(--font-aldrich)]">5.2K</div>
              <p className="text-muted-foreground text-sm mt-1">Total Likes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[4px] bg-gradient-to-r from-primary/20 via-primary/10 to-orange-500/20 border border-primary/20 p-8 md:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-aldrich)] mb-2">
                  Want to Share Your Story?
                </h3>
                <p className="text-muted-foreground max-w-xl">
                  Team leaders and admins can upload photos to showcase community achievements, 
                  events, and the amazing work happening across our agricultural network.
                </p>
              </div>
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 whitespace-nowrap">
                <Camera className="w-4 h-4" />
                Upload Photos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          <button
            onClick={() => navigateImage("prev")}
            className="absolute left-4 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => navigateImage("next")}
            className="absolute right-4 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="relative max-w-5xl max-h-[80vh] w-full mx-4">
            <Image
              src={selectedImage.src}
              alt={selectedImage.title}
              width={1200}
              height={800}
              className="object-contain w-full h-full rounded-[4px]"
            />
          </div>

          {/* Image Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
            <div className="max-w-5xl mx-auto">
              <h3 className="text-xl font-semibold text-white mb-2">{selectedImage.title}</h3>
              <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {selectedImage.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {selectedImage.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {selectedImage.location}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <button 
                  onClick={() => handleLike(selectedImage.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                    likedImages.includes(selectedImage.id)
                      ? "bg-red-500 text-white"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${likedImages.includes(selectedImage.id) ? "fill-current" : ""}`} />
                  {likedImages.includes(selectedImage.id) ? selectedImage.likes + 1 : selectedImage.likes}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  {selectedImage.comments}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
