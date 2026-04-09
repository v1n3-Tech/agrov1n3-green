"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import type { Profile } from "@/types/database"
import { 
  Search, 
  Grid3X3, 
  Heart,
  MapPin,
  Star,
  ShoppingCart,
  Plus,
  Minus,
  X,
  Package,
  Truck,
  Shield,
  ArrowRight,
  Store,
  Leaf,
  Eye,
  Wheat,
  Beef,
  Factory,
  Tractor,
  TreePine,
  Trash2,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"

// V1n3 Token conversion rate
const V1N3_RATE = 18.5

// Product categories
const categories = [
  { id: "all", label: "All", icon: Package },
  { id: "crops", label: "Crops", icon: Wheat },
  { id: "livestock", label: "Livestock", icon: Beef },
  { id: "processed", label: "Processed", icon: Factory },
  { id: "equipment", label: "Equipment", icon: Tractor },
  { id: "seedlings", label: "Seeds", icon: TreePine },
  { id: "fertilizers", label: "Fertilizers", icon: Leaf },
]

const locations = [
  "All Locations", "Jos North", "Jos South", "Barkin Ladi", "Bassa", "Bokkos",
  "Mangu", "Pankshin", "Shendam", "Langtang North", "Langtang South"
]

// Mock products
const mockProducts = [
  {
    id: "1",
    title: "Fresh Organic Tomatoes",
    description: "Locally grown organic tomatoes",
    price: 15000,
    unit: "basket",
    category: "crops",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80",
    location: "Jos South",
    seller: { name: "Mama Grace Farm", rating: 4.8, verified: true, reviews: 124 },
    views: 234,
    featured: true,
  },
  {
    id: "2",
    title: "Day-Old Broiler Chicks",
    description: "Healthy day-old chicks from certified hatchery",
    price: 800,
    unit: "per chick",
    category: "livestock",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80",
    location: "Mangu",
    seller: { name: "Plateau Poultry", rating: 4.9, verified: true, reviews: 89 },
    views: 567,
    featured: true,
  },
  {
    id: "3",
    title: "Premium Cassava Flour",
    description: "High-quality garri from fresh cassava",
    price: 8500,
    unit: "50kg bag",
    category: "processed",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80",
    location: "Shendam",
    seller: { name: "Agro Processing Hub", rating: 4.7, verified: true, reviews: 256 },
    views: 345,
    featured: false,
  },
  {
    id: "4",
    title: "Irrigation Drip System",
    description: "Complete kit for 1 acre farm",
    price: 185000,
    unit: "kit",
    category: "equipment",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    location: "Jos North",
    seller: { name: "AgroTech Solutions", rating: 4.6, verified: true, reviews: 178 },
    views: 189,
    featured: true,
  },
  {
    id: "5",
    title: "Hybrid Maize Seeds",
    description: "High-yield SAMMAZ-15 seeds",
    price: 12000,
    unit: "10kg bag",
    category: "seedlings",
    image: "https://images.unsplash.com/photo-1601593768799-76e3c06e5e4b?w=800&q=80",
    location: "Barkin Ladi",
    seller: { name: "Green Seeds Nigeria", rating: 4.8, verified: true, reviews: 312 },
    views: 412,
    featured: false,
  },
  {
    id: "6",
    title: "NPK Fertilizer 15-15-15",
    description: "Premium quality for all crops",
    price: 22000,
    unit: "50kg bag",
    category: "fertilizers",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
    location: "Pankshin",
    seller: { name: "Plateau Agro Inputs", rating: 4.5, verified: false, reviews: 95 },
    views: 623,
    featured: false,
  },
]

interface CartItem {
  product: typeof mockProducts[0]
  quantity: number
}

export default function DashboardMarketplacePage() {
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set())
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const supabase = createClient()

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()
        if (profile) setCurrentUser(profile)
      }
    }
    fetchUser()
  }, [supabase])

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = selectedLocation === "All Locations" || product.location === selectedLocation
    return matchesCategory && matchesSearch && matchesLocation
  })

  const handleLike = (id: string) => {
    setLikedProducts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) newSet.delete(id)
      else newSet.add(id)
      return newSet
    })
  }

  const addToCart = (product: typeof mockProducts[0]) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const updateCartQty = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQty = item.quantity + delta
        return newQty > 0 ? { ...item, quantity: newQty } : item
      }
      return item
    }).filter(item => item.quantity > 0))
  }

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== id))
  }

  const formatPrice = (price: number) => new Intl.NumberFormat('en-NG', { minimumFractionDigits: 0 }).format(price)
  const toV1n3 = (naira: number) => (naira / V1N3_RATE).toFixed(1)
  
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-aldrich)]">Marketplace</h1>
          <p className="text-muted-foreground text-sm">Buy and sell agricultural products</p>
        </div>
        <Link
          href="/dashboard/marketplace/sell"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-[4px] hover:bg-primary/90 transition-colors font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          List Product
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-[4px] p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-[4px]">
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-muted-foreground">My Orders</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-[4px] p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-[4px]">
              <Package className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-muted-foreground">My Listings</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-[4px] p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-[4px]">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">₦45K</p>
              <p className="text-xs text-muted-foreground">Total Sales</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-[4px] p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-[4px]">
              <Heart className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{likedProducts.size}</p>
              <p className="text-xs text-muted-foreground">Wishlist</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-secondary/50 border border-border rounded-[4px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-3 py-2.5 bg-secondary/50 border border-border rounded-[4px] text-sm"
            >
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-[3px] transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                <cat.icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-card/60 border border-border/30 rounded-[4px] overflow-hidden hover:border-primary/40 transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary/40">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  
                  {product.featured && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-medium bg-orange-500/90 text-white rounded-[2px]">
                      Featured
                    </span>
                  )}

                  <button
                    onClick={() => handleLike(product.id)}
                    className="absolute top-2 right-2 w-7 h-7 bg-card/80 backdrop-blur-sm rounded-[3px] flex items-center justify-center"
                  >
                    <Heart className={`w-3.5 h-3.5 ${likedProducts.has(product.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                  </button>
                </div>

                <div className="p-3 space-y-2">
                  <div>
                    <h3 className="text-sm font-medium line-clamp-1">{product.title}</h3>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                      {product.seller.name}
                      {product.seller.verified && <Shield className="w-3 h-3 text-primary" />}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
                    <span className="text-xs font-medium">{product.seller.rating}</span>
                    <span className="text-[11px] text-muted-foreground">({product.seller.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/30">
                    <div>
                      <p className="text-sm font-semibold">₦{formatPrice(product.price)}</p>
                      <p className="text-[10px] text-primary">{toV1n3(product.price)} V1N3</p>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => addToCart(product)}
                      className="h-7 px-3 rounded-[3px] text-xs bg-orange-500 hover:bg-orange-600"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 bg-card border border-border rounded-[4px]">
              <Package className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <h3 className="font-medium">No products found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
            </div>
          )}
        </div>

        {/* Shopping Cart Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-6 bg-card border border-border rounded-[4px] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <span className="font-semibold">Cart</span>
                {cartCount > 0 && (
                  <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>

            <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="text-center py-6">
                  <ShoppingCart className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Cart is empty</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-3 p-2 bg-secondary/30 rounded-[4px]">
                    <div className="relative w-14 h-14 rounded-[3px] overflow-hidden shrink-0">
                      <Image src={item.product.image} alt={item.product.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium line-clamp-1">{item.product.title}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-1 bg-secondary rounded-[3px]">
                          <button onClick={() => updateCartQty(item.product.id, -1)} className="p-1">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs w-5 text-center">{item.quantity}</span>
                          <button onClick={() => updateCartQty(item.product.id, 1)} className="p-1">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs font-semibold mt-1">₦{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-4 border-t border-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <div className="text-right">
                    <p className="font-semibold">₦{formatPrice(cartTotal)}</p>
                    <p className="text-[10px] text-primary">{toV1n3(cartTotal)} V1N3</p>
                  </div>
                </div>
                <Button className="w-full rounded-[3px]">
                  Checkout <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-[10px] text-center text-muted-foreground">
                  Pay with V1n3 and get 5% off
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
