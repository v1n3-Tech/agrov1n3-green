"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Star, Heart, ArrowRight } from "lucide-react"

const categories = ["All", "Vegetables", "Seeds", "Poultry", "Processed", "Grains"]

const products = [
  {
    id: 1,
    name: "Fresh Organic Tomatoes",
    category: "Vegetables",
    price: "2,500",
    v1n3Price: "135.1",
    rating: 4.8,
    reviews: 124,
    seller: "Chinedu Farms",
    location: "Jos North",
    image: "/images/products/tomatoes.jpg",
  },
  {
    id: 2,
    name: "Premium Maize Seeds",
    category: "Seeds",
    price: "15,000",
    v1n3Price: "810.8",
    rating: 4.9,
    reviews: 89,
    seller: "AgroTech Solutions",
    location: "Barkin Ladi",
    image: "/images/products/maize.jpg",
  },
  {
    id: 3,
    name: "Local Honey (Pure)",
    category: "Processed",
    price: "3,500",
    v1n3Price: "189.2",
    rating: 4.7,
    reviews: 256,
    seller: "Plateau Apiaries",
    location: "Mangu",
    image: "/images/products/honey.jpg",
  },
  {
    id: 4,
    name: "Free Range Eggs",
    category: "Poultry",
    price: "2,800",
    v1n3Price: "151.4",
    rating: 4.6,
    reviews: 178,
    seller: "Green Valley Poultry",
    location: "Jos South",
    image: "/images/products/eggs.jpg",
  },
  {
    id: 5,
    name: "Premium Local Rice",
    category: "Grains",
    price: "42,000",
    v1n3Price: "2,270.3",
    rating: 4.8,
    reviews: 312,
    seller: "Shendam Farmers Co-op",
    location: "Shendam",
    image: "/images/products/rice.jpg",
  },
  {
    id: 6,
    name: "Fresh Peppers Mix",
    category: "Vegetables",
    price: "1,800",
    v1n3Price: "97.3",
    rating: 4.5,
    reviews: 95,
    seller: "Mama Amina Farms",
    location: "Bukuru",
    image: "/images/products/peppers.jpg",
  },
]

export function Marketplace() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [liked, setLiked] = useState<number[]>([])

  const toggleLike = (id: number) => {
    setLiked((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id])
  }

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter((p) => p.category === activeCategory)

  return (
    <section id="marketplace" className="py-16 lg:py-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
          <div>
            <span className="inline-block px-2.5 py-1 text-[10px] font-medium text-primary bg-primary/10 border border-primary/20 rounded-[3px] uppercase tracking-widest mb-4">
              Agro Marketplace
            </span>
            <h2 className="font-[family-name:var(--font-aldrich)] text-3xl lg:text-4xl tracking-tight mb-2">
              Shop Local <span className="text-primary">Produce</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Fresh agricultural products from verified sellers. Pay in V1n3 tokens.
            </p>
          </div>
          <Button variant="outline" className="h-9 rounded-[3px] text-sm self-start lg:self-auto">
            Become a Seller
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-[3px] transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-card border border-border/40 rounded-[4px] overflow-hidden hover:border-primary/40 transition-all duration-200"
            >
              {/* Image */}
              <div className="relative h-40 lg:h-44 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                
                {/* Category Badge */}
                <span className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-medium bg-card/90 backdrop-blur-sm text-foreground rounded-[2px]">
                  {product.category}
                </span>

                {/* Like */}
                <button
                  onClick={() => toggleLike(product.id)}
                  className="absolute top-2 right-2 w-7 h-7 bg-card/80 backdrop-blur-sm rounded-[3px] flex items-center justify-center hover:bg-card transition-colors"
                >
                  <Heart className={`w-3.5 h-3.5 ${liked.includes(product.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                </button>
              </div>

              {/* Content */}
              <div className="p-3 space-y-2">
                <div>
                  <h3 className="text-sm font-medium text-foreground line-clamp-1">{product.name}</h3>
                  <p className="text-[10px] text-muted-foreground">{product.seller} · {product.location}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-accent text-accent" />
                  <span className="text-xs font-medium text-foreground">{product.rating}</span>
                  <span className="text-[10px] text-muted-foreground">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <div>
                    <p className="text-base font-semibold text-foreground">₦{product.price}</p>
                    <p className="text-[10px] text-primary">{product.v1n3Price} V1N3</p>
                  </div>
                  <Button size="sm" className="h-7 px-3 rounded-[3px] text-xs bg-primary text-primary-foreground">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <Button variant="outline" className="h-9 px-5 rounded-[3px] text-sm gap-2">
            View All Products <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
