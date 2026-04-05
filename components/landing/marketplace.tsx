"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Star, Heart, ArrowRight, Filter, Search } from "lucide-react"

const categories = ["All", "Crops", "Livestock", "Equipment", "Seeds", "Fertilizers"]

const products = [
  {
    id: 1,
    name: "Premium Maize Seeds",
    category: "Seeds",
    price: "2,500",
    currency: "V1n3",
    rating: 4.8,
    reviews: 124,
    seller: "AgriCo Farm",
    location: "Jos, Plateau",
    image: "🌽",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Fresh Tomatoes (50kg)",
    category: "Crops",
    price: "15,000",
    currency: "V1n3",
    rating: 4.9,
    reviews: 89,
    seller: "GreenHarvest",
    location: "Mangu, Plateau",
    image: "🍅",
    badge: null,
  },
  {
    id: 3,
    name: "Organic Fertilizer",
    category: "Fertilizers",
    price: "8,500",
    currency: "V1n3",
    rating: 4.7,
    reviews: 56,
    seller: "EcoFarm Solutions",
    location: "Pankshin, Plateau",
    image: "🧪",
    badge: "New",
  },
  {
    id: 4,
    name: "Layer Chickens (100)",
    category: "Livestock",
    price: "85,000",
    currency: "V1n3",
    rating: 4.6,
    reviews: 34,
    seller: "PoultryPro NG",
    location: "Barkin Ladi, Plateau",
    image: "🐔",
    badge: null,
  },
  {
    id: 5,
    name: "Irrigation Pump",
    category: "Equipment",
    price: "45,000",
    currency: "V1n3",
    rating: 4.8,
    reviews: 78,
    seller: "FarmTech Hub",
    location: "Jos South, Plateau",
    image: "💧",
    badge: "Featured",
  },
  {
    id: 6,
    name: "Yam Seedlings (500)",
    category: "Seeds",
    price: "12,000",
    currency: "V1n3",
    rating: 4.5,
    reviews: 45,
    seller: "TuberKing",
    location: "Langtang, Plateau",
    image: "🥔",
    badge: null,
  },
]

export function Marketplace() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [likedProducts, setLikedProducts] = useState<number[]>([])

  const toggleLike = (id: number) => {
    setLikedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <section id="marketplace" className="relative py-20 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
              <ShoppingBag className="w-4 h-4" /> Agro Marketplace
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
              Trade with <span className="text-primary">V1n3</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Discover fresh produce, quality seeds, livestock, and equipment from verified sellers across Plateau State.
            </p>
          </div>

          {/* Search */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 bg-card border border-border rounded text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <Button variant="outline" size="icon" className="rounded">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-4 py-2 text-sm font-medium rounded transition-colors
                ${activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-card border border-border/50 rounded overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
            >
              {/* Image Area */}
              <div className="relative h-40 bg-secondary/50 flex items-center justify-center">
                <span className="text-6xl">{product.image}</span>
                
                {/* Badge */}
                {product.badge && (
                  <span className={`
                    absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded
                    ${product.badge === "Best Seller" ? "bg-accent text-accent-foreground" : ""}
                    ${product.badge === "New" ? "bg-primary text-primary-foreground" : ""}
                    ${product.badge === "Featured" ? "bg-foreground text-background" : ""}
                  `}>
                    {product.badge}
                  </span>
                )}

                {/* Like Button */}
                <button
                  onClick={() => toggleLike(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors hover:bg-card"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      likedProducts.includes(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                  <h3 className="text-base font-semibold text-foreground line-clamp-1">{product.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                    <span className="text-sm font-medium text-foreground">{product.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div>
                    <p className="text-lg font-bold text-primary">{product.price}</p>
                    <p className="text-xs text-muted-foreground">{product.currency}</p>
                  </div>
                  <Button size="sm" className="bg-primary text-primary-foreground rounded">
                    Buy Now
                  </Button>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{product.seller}</span>
                  <span>{product.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="gap-2 rounded">
            Explore Full Marketplace <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
