"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/landing/header"
import type { Profile } from "@/types/database"
import { 
  Search, 
  Grid3X3, 
  LayoutGrid,
  Heart,
  MapPin,
  Star,
  ShoppingCart,
  Plus,
  Minus,
  X,
  SlidersHorizontal,
  Package,
  Truck,
  Shield,
  ArrowRight,
  Store,
  Leaf,
  User,
  Eye,
  Wheat,
  Beef,
  Factory,
  Tractor,
  TreePine,
  Trash2
} from "lucide-react"
import { Button } from "@/components/ui/button"

// V1n3 Token conversion rate (mock - 1 V1n3 = ~18.5 NGN)
const V1N3_RATE = 18.5

// Product categories for agro marketplace
const categories = [
  { id: "all", label: "All", icon: Package, count: 2420 },
  { id: "crops", label: "Crops & Grains", icon: Wheat, count: 856 },
  { id: "livestock", label: "Livestock", icon: Beef, count: 324 },
  { id: "processed", label: "Processed Foods", icon: Factory, count: 512 },
  { id: "equipment", label: "Equipment", icon: Tractor, count: 289 },
  { id: "seedlings", label: "Seeds", icon: TreePine, count: 198 },
  { id: "fertilizers", label: "Fertilizers", icon: Leaf, count: 241 },
]

// Filter options
const priceRanges = [
  { id: "any", label: "Any Price" },
  { id: "0-5000", label: "Under ₦5,000" },
  { id: "5000-20000", label: "₦5,000 - ₦20,000" },
  { id: "20000-100000", label: "₦20,000 - ₦100,000" },
  { id: "100000+", label: "Above ₦100,000" },
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
    description: "Locally grown organic tomatoes, perfect for cooking and salads.",
    price: 15000,
    unit: "basket",
    category: "crops",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80",
    location: "Jos South",
    seller: { name: "Mama Grace Farm", rating: 4.8, verified: true, reviews: 124 },
    views: 234,
    featured: true,
    isNew: true,
  },
  {
    id: "2",
    title: "Day-Old Broiler Chicks",
    description: "Healthy day-old broiler chicks from certified hatchery.",
    price: 800,
    unit: "per chick",
    category: "livestock",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80",
    location: "Mangu",
    seller: { name: "Plateau Poultry", rating: 4.9, verified: true, reviews: 89 },
    views: 567,
    featured: true,
    isNew: false,
  },
  {
    id: "3",
    title: "Premium Cassava Flour (Garri)",
    description: "High-quality processed garri made from fresh cassava.",
    price: 8500,
    unit: "50kg bag",
    category: "processed",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80",
    location: "Shendam",
    seller: { name: "Agro Processing Hub", rating: 4.7, verified: true, reviews: 256 },
    views: 345,
    featured: false,
    isNew: true,
  },
  {
    id: "4",
    title: "Irrigation Drip System Kit",
    description: "Complete drip irrigation system for 1 acre farm.",
    price: 185000,
    unit: "complete kit",
    category: "equipment",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    location: "Jos North",
    seller: { name: "AgroTech Solutions", rating: 4.6, verified: true, reviews: 178 },
    views: 189,
    featured: true,
    isNew: false,
  },
  {
    id: "5",
    title: "Hybrid Maize Seeds (SAMMAZ-15)",
    description: "High-yield hybrid maize seeds, drought tolerant.",
    price: 12000,
    unit: "10kg bag",
    category: "seedlings",
    image: "https://images.unsplash.com/photo-1601593768799-76e3c06e5e4b?w=800&q=80",
    location: "Barkin Ladi",
    seller: { name: "Green Seeds Nigeria", rating: 4.8, verified: true, reviews: 312 },
    views: 412,
    featured: false,
    isNew: true,
  },
  {
    id: "6",
    title: "NPK Fertilizer 15-15-15",
    description: "Premium quality NPK fertilizer for all crops.",
    price: 22000,
    unit: "50kg bag",
    category: "fertilizers",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
    location: "Pankshin",
    seller: { name: "Plateau Agro Inputs", rating: 4.5, verified: false, reviews: 95 },
    views: 623,
    featured: false,
    isNew: false,
  },
  {
    id: "7",
    title: "Fresh Catfish (Live)",
    description: "Farm-raised catfish, healthy and well-fed. 1kg-3kg sizes.",
    price: 3500,
    unit: "per kg",
    category: "livestock",
    image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=800&q=80",
    location: "Langtang North",
    seller: { name: "Aqua Farms Ltd", rating: 4.7, verified: true, reviews: 145 },
    views: 298,
    featured: true,
    isNew: false,
  },
  {
    id: "8",
    title: "Irish Potatoes (Grade A)",
    description: "Premium grade Irish potatoes from Jos Plateau.",
    price: 45000,
    unit: "100kg bag",
    category: "crops",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82abe636?w=800&q=80",
    location: "Bokkos",
    seller: { name: "Highland Farmers Coop", rating: 4.9, verified: true, reviews: 278 },
    views: 756,
    featured: true,
    isNew: true,
  },
]

interface CartItem {
  product: typeof mockProducts[0]
  quantity: number
}

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
  const [cartItems, setCartItems] = useState<CartItem[]>([])
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
      default: return 0
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

  const addToCart = (product: typeof mockProducts[0]) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
    if (currentUser) setShowCart(true)
  }

  const updateCartQuantity = (productId: string, delta: number) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta
          return newQty > 0 ? { ...item, quantity: newQty } : item
        }
        return item
      }).filter(item => item.quantity > 0)
    )
  }

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', { minimumFractionDigits: 0 }).format(price)
  }

  const toV1n3 = (naira: number) => {
    return (naira / V1N3_RATE).toFixed(1)
  }

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-background">
      <Header profile={currentUser} />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="inline-block px-2.5 py-1 text-[10px] font-medium text-primary bg-primary/10 border border-primary/20 rounded-[3px] uppercase tracking-widest mb-4">
                Agro Marketplace
              </span>
              <h1 className="font-[family-name:var(--font-aldrich)] text-3xl lg:text-4xl tracking-tight mb-2">
                Shop Local <span className="text-primary">Produce</span>
              </h1>
              <p className="text-sm text-muted-foreground max-w-xl">
                Fresh agricultural products from verified sellers. Pay in Naira or V1n3 tokens.
              </p>
            </div>
            
            {currentUser && (
              <Link
                href="/dashboard/marketplace/sell"
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-[3px] hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                <Store className="w-4 h-4" />
                Sell Product
              </Link>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            {[
              { icon: Shield, label: "Verified Sellers", value: "500+" },
              { icon: Package, label: "Products", value: "2,420" },
              { icon: Truck, label: "Deliveries", value: "15K+" },
              { icon: Star, label: "Avg. Rating", value: "4.8" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card/50 border border-border/50 rounded-[4px] p-3 flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-[4px]">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-lg font-bold font-[family-name:var(--font-aldrich)]">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 py-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-[3px] transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {cat.label}
                <span className={`ml-1.5 text-[10px] ${selectedCategory === cat.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {cat.count.toLocaleString()}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex gap-6">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-32 space-y-5">
                {/* Search */}
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-secondary/50 border border-border rounded-[4px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2.5 bg-secondary/50 border border-border rounded-[4px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Price Range</label>
                  <div className="space-y-1.5">
                    {priceRanges.map((range) => (
                      <label key={range.id} className="flex items-center gap-2.5 cursor-pointer group">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                          priceRange === range.id ? "border-primary bg-primary" : "border-border group-hover:border-primary/50"
                        }`}>
                          {priceRange === range.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="text-xs text-muted-foreground group-hover:text-foreground">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Reset */}
                <button
                  onClick={() => {
                    setSelectedCategory("all")
                    setSearchQuery("")
                    setPriceRange("any")
                    setSelectedLocation("All Locations")
                  }}
                  className="w-full py-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-muted-foreground">
                  {sortedProducts.length} products
                </span>
                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1.5 bg-secondary/50 border border-border rounded-[3px] text-xs focus:outline-none"
                  >
                    <option value="latest">Latest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <div className="flex items-center bg-secondary/50 rounded-[3px] p-0.5">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-1.5 rounded-[2px] transition-colors ${
                        viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                      }`}
                    >
                      <Grid3X3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-1.5 rounded-[2px] transition-colors ${
                        viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                      }`}
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products - Matching Landing Page Card Design */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-card/60 border border-border/30 rounded-[4px] overflow-hidden hover:border-primary/40 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-secondary/40">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.featured && (
                          <span className="px-2 py-0.5 text-[9px] font-medium bg-orange-500/90 text-white rounded-[2px]">
                            Featured
                          </span>
                        )}
                        {product.isNew && (
                          <span className="px-2 py-0.5 text-[9px] font-medium bg-primary/90 text-white rounded-[2px]">
                            New
                          </span>
                        )}
                      </div>

                      {/* Like */}
                      <button
                        onClick={() => handleLike(product.id)}
                        className="absolute top-2 right-2 w-7 h-7 bg-card/80 backdrop-blur-sm rounded-[3px] flex items-center justify-center hover:bg-card transition-colors"
                      >
                        <Heart className={`w-3.5 h-3.5 ${likedProducts.has(product.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-3 space-y-2">
                      <div>
                        <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-1">{product.title}</h3>
                        <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                          {product.seller.name}
                          {product.seller.verified && <Shield className="w-3 h-3 text-primary" />}
                          <span className="mx-1">·</span>
                          {product.location}
                        </p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
                        <span className="text-xs font-medium text-foreground">{product.seller.rating}</span>
                        <span className="text-[11px] text-muted-foreground">({product.seller.reviews})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between pt-2 border-t border-border/30">
                        <div>
                          <p className="text-[15px] font-semibold text-foreground">₦{formatPrice(product.price)}</p>
                          <p className="text-[10px] text-primary font-medium">{toV1n3(product.price)} V1N3</p>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => addToCart(product)}
                          className="h-7 px-3 rounded-[3px] text-xs bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {sortedProducts.length === 0 && (
                <div className="text-center py-16">
                  <Package className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                  <h3 className="text-lg font-medium mb-1">No products found</h3>
                  <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
                </div>
              )}
            </div>

            {/* Shopping Cart Sidebar - Only for authenticated users */}
            {currentUser && (
              <aside className={`fixed lg:sticky top-0 lg:top-32 right-0 h-screen lg:h-auto w-80 bg-card border-l lg:border border-border lg:rounded-[4px] transform transition-transform duration-300 z-50 lg:z-auto ${showCart ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}>
                <div className="flex flex-col h-full lg:max-h-[calc(100vh-9rem)]">
                  {/* Cart Header */}
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Your Cart</span>
                      {cartCount > 0 && (
                        <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                          {cartCount}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setShowCart(false)}
                      className="lg:hidden p-1 hover:bg-secondary rounded-[4px]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Cart Items */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {cartItems.length === 0 ? (
                      <div className="text-center py-8">
                        <ShoppingCart className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground">Your cart is empty</p>
                        <p className="text-xs text-muted-foreground mt-1">Add products to get started</p>
                      </div>
                    ) : (
                      cartItems.map((item) => (
                        <div key={item.product.id} className="flex gap-3 p-2 bg-secondary/30 rounded-[4px]">
                          <div className="relative w-16 h-16 rounded-[3px] overflow-hidden shrink-0">
                            <Image
                              src={item.product.image}
                              alt={item.product.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-medium line-clamp-1">{item.product.title}</h4>
                            <p className="text-[10px] text-muted-foreground">{item.product.unit}</p>
                            <div className="flex items-center justify-between mt-1.5">
                              <div className="flex items-center gap-1 bg-secondary rounded-[3px]">
                                <button
                                  onClick={() => updateCartQuantity(item.product.id, -1)}
                                  className="p-1 hover:bg-secondary/80"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs w-6 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateCartQuantity(item.product.id, 1)}
                                  className="p-1 hover:bg-secondary/80"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="p-1 text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="text-xs font-semibold mt-1">₦{formatPrice(item.product.price * item.quantity)}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Cart Footer */}
                  {cartItems.length > 0 && (
                    <div className="p-4 border-t border-border space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Subtotal</span>
                        <div className="text-right">
                          <p className="font-semibold">₦{formatPrice(cartTotal)}</p>
                          <p className="text-[10px] text-primary">{toV1n3(cartTotal)} V1N3</p>
                        </div>
                      </div>
                      <Button className="w-full rounded-[3px] bg-primary hover:bg-primary/90">
                        Checkout
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <p className="text-[10px] text-center text-muted-foreground">
                        Pay with V1n3 tokens and get 5% discount
                      </p>
                    </div>
                  )}
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Cart FAB */}
      {currentUser && cartCount > 0 && (
        <button
          onClick={() => setShowCart(true)}
          className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center z-40"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        </button>
      )}

      {/* Cart Backdrop for Mobile */}
      {showCart && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setShowCart(false)}
        />
      )}
    </div>
  )
}
