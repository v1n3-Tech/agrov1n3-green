"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/landing/header"
import type { Profile } from "@/types/database"
import { 
  Search, 
  Filter, 
  Grid3X3, 
  LayoutGrid,
  Heart,
  MapPin,
  Star,
  ShoppingCart,
  Plus,
  ChevronDown,
  ChevronRight,
  X,
  SlidersHorizontal,
  TrendingUp,
  Package,
  Truck,
  Shield,
  ArrowRight,
  Store,
  Leaf,
  Clock,
  User,
  MessageCircle,
  Phone,
  Eye,
  Tag,
  Wheat,
  Beef,
  Factory,
  Tractor,
  TreePine
} from "lucide-react"

// Product categories for agro marketplace
const categories = [
  { id: "all", label: "All Products", icon: Package, count: 2420 },
  { id: "crops", label: "Crops & Grains", icon: Wheat, count: 856 },
  { id: "livestock", label: "Livestock", icon: Beef, count: 324 },
  { id: "processed", label: "Processed Foods", icon: Factory, count: 512 },
  { id: "equipment", label: "Farm Equipment", icon: Tractor, count: 289 },
  { id: "seedlings", label: "Seeds & Seedlings", icon: TreePine, count: 198 },
  { id: "fertilizers", label: "Fertilizers & Inputs", icon: Leaf, count: 241 },
]

// Filter options
const priceRanges = [
  { id: "any", label: "Any Price" },
  { id: "0-5000", label: "Under ₦5,000" },
  { id: "5000-20000", label: "₦5,000 - ₦20,000" },
  { id: "20000-100000", label: "₦20,000 - ₦100,000" },
  { id: "100000+", label: "Above ₦100,000" },
]

const sortOptions = [
  { id: "latest", label: "Latest" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "popular", label: "Most Popular" },
  { id: "rating", label: "Highest Rated" },
]

const locations = [
  "All Locations",
  "Jos North", "Jos South", "Barkin Ladi", "Bassa", "Bokkos",
  "Kanke", "Kanam", "Langtang North", "Langtang South", "Mangu",
  "Mikang", "Pankshin", "Qua'an Pan", "Riyom", "Shendam", "Wase"
]

// Mock products data
const mockProducts = [
  {
    id: "1",
    title: "Fresh Organic Tomatoes",
    description: "Locally grown organic tomatoes, perfect for cooking and salads. Farm-fresh quality guaranteed.",
    price: 15000,
    unit: "basket",
    quantity: 50,
    category: "crops",
    images: ["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80"],
    location: "Jos South",
    seller: { name: "Mama Grace Farm", avatar: null, rating: 4.8, verified: true },
    views: 234,
    likes: 45,
    featured: true,
    isNew: true,
    createdAt: "2026-04-08",
  },
  {
    id: "2",
    title: "Day-Old Broiler Chicks",
    description: "Healthy day-old broiler chicks from certified hatchery. Vaccinated and ready for your farm.",
    price: 800,
    unit: "per chick",
    quantity: 500,
    category: "livestock",
    images: ["https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80"],
    location: "Mangu",
    seller: { name: "Plateau Poultry", avatar: null, rating: 4.9, verified: true },
    views: 567,
    likes: 89,
    featured: true,
    isNew: false,
    createdAt: "2026-04-05",
  },
  {
    id: "3",
    title: "Premium Cassava Flour (Garri)",
    description: "High-quality processed garri made from fresh cassava. Perfect for households and retailers.",
    price: 8500,
    unit: "50kg bag",
    quantity: 100,
    category: "processed",
    images: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80"],
    location: "Shendam",
    seller: { name: "Agro Processing Hub", avatar: null, rating: 4.7, verified: true },
    views: 345,
    likes: 67,
    featured: false,
    isNew: true,
    createdAt: "2026-04-07",
  },
  {
    id: "4",
    title: "Irrigation Drip System Kit",
    description: "Complete drip irrigation system for 1 acre. Includes pipes, emitters, and connectors.",
    price: 185000,
    unit: "complete kit",
    quantity: 15,
    category: "equipment",
    images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80"],
    location: "Jos North",
    seller: { name: "AgroTech Solutions", avatar: null, rating: 4.6, verified: true },
    views: 189,
    likes: 34,
    featured: true,
    isNew: false,
    createdAt: "2026-04-01",
  },
  {
    id: "5",
    title: "Hybrid Maize Seeds (SAMMAZ-15)",
    description: "High-yield hybrid maize seeds, drought tolerant. Perfect for Plateau State climate.",
    price: 12000,
    unit: "10kg bag",
    quantity: 200,
    category: "seedlings",
    images: ["https://images.unsplash.com/photo-1601593768799-76e3c06e5e4b?w=800&q=80"],
    location: "Barkin Ladi",
    seller: { name: "Green Seeds Nigeria", avatar: null, rating: 4.8, verified: true },
    views: 412,
    likes: 78,
    featured: false,
    isNew: true,
    createdAt: "2026-04-06",
  },
  {
    id: "6",
    title: "NPK Fertilizer 15-15-15",
    description: "Premium quality NPK fertilizer for all crops. Government approved, tested for Plateau soil.",
    price: 22000,
    unit: "50kg bag",
    quantity: 500,
    category: "fertilizers",
    images: ["https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"],
    location: "Pankshin",
    seller: { name: "Plateau Agro Inputs", avatar: null, rating: 4.5, verified: false },
    views: 623,
    likes: 112,
    featured: false,
    isNew: false,
    createdAt: "2026-03-28",
  },
  {
    id: "7",
    title: "Fresh Catfish (Live)",
    description: "Farm-raised catfish, healthy and well-fed. Available in various sizes from 1kg-3kg.",
    price: 3500,
    unit: "per kg",
    quantity: 200,
    category: "livestock",
    images: ["https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=800&q=80"],
    location: "Langtang North",
    seller: { name: "Aqua Farms Ltd", avatar: null, rating: 4.7, verified: true },
    views: 298,
    likes: 56,
    featured: true,
    isNew: false,
    createdAt: "2026-04-03",
  },
  {
    id: "8",
    title: "Irish Potatoes (Grade A)",
    description: "Premium grade Irish potatoes from Jos Plateau. Clean, sorted, and ready for market.",
    price: 45000,
    unit: "100kg bag",
    quantity: 80,
    category: "crops",
    images: ["https://images.unsplash.com/photo-1518977676601-b53f82abe636?w=800&q=80"],
    location: "Bokkos",
    seller: { name: "Highland Farmers Coop", avatar: null, rating: 4.9, verified: true },
    views: 756,
    likes: 145,
    featured: true,
    isNew: true,
    createdAt: "2026-04-08",
  },
]

export default function MarketplacePage() {
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("latest")
  const [priceRange, setPriceRange] = useState("any")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [showFilters, setShowFilters] = useState(false)
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set())
  const [cartItems, setCartItems] = useState<string[]>([])
  const [showCart, setShowCart] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()
        if (profile) setCurrentUser(profile)
      }
    }
    fetchUser()
  }, [supabase])

  // Filter products
  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = selectedLocation === "All Locations" || product.location === selectedLocation
    return matchesCategory && matchesSearch && matchesLocation
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price
      case "price-high": return b.price - a.price
      case "popular": return b.views - a.views
      case "rating": return b.seller.rating - a.seller.rating
      default: return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  const handleLike = (productId: string) => {
    setLikedProducts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  const handleAddToCart = (productId: string) => {
    if (!cartItems.includes(productId)) {
      setCartItems(prev => [...prev, productId])
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(price)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Store className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">AgroMarketplace</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-aldrich)] mb-4">
                Farm to <span className="text-primary">Market</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl">
                Buy and sell agricultural products directly from verified farmers and suppliers across Plateau State.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {currentUser && (
                <Link
                  href="/dashboard/marketplace/sell"
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-[4px] hover:bg-primary/90 transition-colors font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Sell Product
                </Link>
              )}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { icon: Shield, label: "Verified Sellers", value: "500+" },
              { icon: Package, label: "Products Listed", value: "2,420" },
              { icon: Truck, label: "Deliveries Made", value: "15K+" },
              { icon: Star, label: "Avg. Rating", value: "4.8" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card/50 border border-border/50 rounded-[4px] p-4 flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-[4px]">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xl font-bold font-[family-name:var(--font-aldrich)]">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-[4px] text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  selectedCategory === cat.id ? "bg-white/20" : "bg-muted"
                }`}>
                  {cat.count.toLocaleString()}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-36 space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium mb-2">Search Products</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-[4px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-[4px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label key={range.id} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                          priceRange === range.id ? "border-primary bg-primary" : "border-border group-hover:border-primary/50"
                        }`}>
                          {priceRange === range.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="text-sm text-muted-foreground group-hover:text-foreground">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Verified Only */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 rounded-[3px] border-2 border-border flex items-center justify-center group-hover:border-primary/50">
                      <Shield className="w-3 h-3 text-primary opacity-0 group-hover:opacity-50" />
                    </div>
                    <span className="text-sm">Verified Sellers Only</span>
                  </label>
                </div>

                {/* Reset Filters */}
                <button
                  onClick={() => {
                    setSelectedCategory("all")
                    setSearchQuery("")
                    setPriceRange("any")
                    setSelectedLocation("All Locations")
                  }}
                  className="w-full py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-secondary/50 border border-border rounded-[4px] text-sm"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </button>
                  <span className="text-sm text-muted-foreground">
                    {sortedProducts.length} products found
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-secondary/50 border border-border rounded-[4px] text-sm focus:outline-none"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>{opt.label}</option>
                    ))}
                  </select>

                  {/* View Toggle */}
                  <div className="flex items-center bg-secondary/50 rounded-[4px] p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-[3px] transition-colors ${
                        viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-[3px] transition-colors ${
                        viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products */}
              {sortedProducts.length === 0 ? (
                <div className="text-center py-20">
                  <Package className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
                </div>
              ) : (
                <div className={viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                  : "space-y-4"
                }>
                  {sortedProducts.map((product) => (
                    <div
                      key={product.id}
                      className={`group bg-card border border-border/50 rounded-[4px] overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all ${
                        viewMode === "list" ? "flex" : ""
                      }`}
                    >
                      {/* Image */}
                      <div className={`relative ${viewMode === "list" ? "w-48 shrink-0" : "aspect-[4/3]"}`}>
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.featured && (
                            <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-[3px] font-medium">
                              Featured
                            </span>
                          )}
                          {product.isNew && (
                            <span className="px-2 py-1 bg-primary text-white text-xs rounded-[3px] font-medium">
                              New
                            </span>
                          )}
                        </div>

                        {/* Like Button */}
                        <button
                          onClick={() => handleLike(product.id)}
                          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
                            likedProducts.has(product.id)
                              ? "bg-red-500 text-white"
                              : "bg-black/40 text-white opacity-0 group-hover:opacity-100 hover:bg-black/60"
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${likedProducts.has(product.id) ? "fill-current" : ""}`} />
                        </button>
                      </div>

                      {/* Content */}
                      <div className={`p-4 flex flex-col ${viewMode === "list" ? "flex-1" : ""}`}>
                        {/* Category Tag */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full capitalize">
                            {categories.find(c => c.id === product.category)?.label || product.category}
                          </span>
                          {product.seller.verified && (
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Shield className="w-3 h-3 text-primary" />
                              Verified
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="font-semibold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                          {product.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {product.description}
                        </p>

                        {/* Price & Quantity */}
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-xl font-bold text-primary font-[family-name:var(--font-aldrich)]">
                            {formatPrice(product.price)}
                          </span>
                          <span className="text-sm text-muted-foreground">/ {product.unit}</span>
                        </div>

                        {/* Location & Stats */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {product.location}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {product.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {product.likes}
                            </span>
                          </div>
                        </div>

                        {/* Seller */}
                        <div className="flex items-center justify-between pt-3 border-t border-border/50">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium line-clamp-1">{product.seller.name}</p>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                                <span className="text-xs text-muted-foreground">{product.seller.rating}</span>
                              </div>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleAddToCart(product.id)}
                            className={`p-2 rounded-[4px] transition-colors ${
                              cartItems.includes(product.id)
                                ? "bg-primary text-white"
                                : "bg-secondary hover:bg-primary hover:text-white"
                            }`}
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Load More */}
              {sortedProducts.length > 0 && (
                <div className="text-center mt-8">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-[4px] hover:bg-secondary/80 transition-colors">
                    Load More Products
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Shopping Sidebar - Logged In Users */}
            {currentUser && cartItems.length > 0 && (
              <aside className="hidden xl:block w-80 shrink-0">
                <div className="sticky top-36 bg-card border border-border rounded-[4px] p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-primary" />
                      Cart ({cartItems.length})
                    </h3>
                    <button
                      onClick={() => setCartItems([])}
                      className="text-xs text-muted-foreground hover:text-destructive"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {cartItems.map((itemId) => {
                      const product = mockProducts.find(p => p.id === itemId)
                      if (!product) return null
                      return (
                        <div key={itemId} className="flex items-center gap-3 p-2 bg-secondary/30 rounded-[4px]">
                          <div className="relative w-12 h-12 rounded-[3px] overflow-hidden shrink-0">
                            <Image
                              src={product.images[0]}
                              alt={product.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium line-clamp-1">{product.title}</p>
                            <p className="text-xs text-primary font-semibold">{formatPrice(product.price)}</p>
                          </div>
                          <button
                            onClick={() => setCartItems(prev => prev.filter(id => id !== itemId))}
                            className="p-1 text-muted-foreground hover:text-destructive"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">Subtotal</span>
                      <span className="font-bold text-primary">
                        {formatPrice(cartItems.reduce((sum, id) => {
                          const product = mockProducts.find(p => p.id === id)
                          return sum + (product?.price || 0)
                        }, 0))}
                      </span>
                    </div>
                    <button className="w-full py-3 bg-primary text-primary-foreground rounded-[4px] font-medium hover:bg-primary/90 transition-colors">
                      Proceed to Checkout
                    </button>
                    <button className="w-full py-2 mt-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-orange-500/10 rounded-[4px] p-8 md:p-12 border border-primary/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-aldrich)] mb-2">
                  Ready to Sell Your Products?
                </h2>
                <p className="text-muted-foreground max-w-xl">
                  Join thousands of farmers and agro-businesses selling on GreenV1n3 marketplace. 
                  Reach buyers across Plateau State and beyond.
                </p>
              </div>
              <Link
                href={currentUser ? "/dashboard/marketplace/sell" : "/register"}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-[4px] font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Start Selling
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Cart Floating Button */}
      {currentUser && cartItems.length > 0 && (
        <button
          onClick={() => setShowCart(true)}
          className="xl:hidden fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="font-medium">{cartItems.length}</span>
        </button>
      )}
    </div>
  )
}
