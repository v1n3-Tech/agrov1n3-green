"use client"

import { useState } from "react"
import { 
  Sprout, 
  PawPrint, 
  ShoppingBag, 
  Factory, 
  Briefcase, 
  MapPin, 
  Cpu, 
  HeartPulse, 
  Megaphone, 
  Shield, 
  BookOpen, 
  GraduationCap, 
  Building2, 
  Truck,
  ArrowRight,
  Users
} from "lucide-react"
import { Button } from "@/components/ui/button"

const communities = [
  { 
    id: 1, 
    name: "Crop Farming", 
    icon: Sprout, 
    members: "2,340",
    description: "Cultivate crops and leverage modern farming techniques",
    color: "text-emerald-400"
  },
  { 
    id: 2, 
    name: "Animal Farming", 
    icon: PawPrint, 
    members: "1,856",
    description: "Livestock management and animal husbandry",
    color: "text-amber-400"
  },
  { 
    id: 3, 
    name: "Agro Marketing", 
    icon: ShoppingBag, 
    members: "1,523",
    description: "Market and sell agricultural products effectively",
    color: "text-blue-400"
  },
  { 
    id: 4, 
    name: "Agro Processing", 
    icon: Factory, 
    members: "987",
    description: "Transform raw products into finished goods",
    color: "text-orange-400"
  },
  { 
    id: 5, 
    name: "Agro Management", 
    icon: Briefcase, 
    members: "654",
    description: "Business administration and policy development",
    color: "text-purple-400"
  },
  { 
    id: 6, 
    name: "Agro Tourism", 
    icon: MapPin, 
    members: "432",
    description: "Agricultural tourism experiences and hospitality",
    color: "text-pink-400"
  },
  { 
    id: 7, 
    name: "Agro Technology", 
    icon: Cpu, 
    members: "1,234",
    description: "Tech solutions for modern agriculture",
    color: "text-cyan-400"
  },
  { 
    id: 8, 
    name: "Agro Healthcare", 
    icon: HeartPulse, 
    members: "567",
    description: "Health and wellness in agriculture",
    color: "text-red-400"
  },
  { 
    id: 9, 
    name: "Agro Media", 
    icon: Megaphone, 
    members: "789",
    description: "Branding, content creation, and PR",
    color: "text-violet-400"
  },
  { 
    id: 10, 
    name: "Agro Security", 
    icon: Shield, 
    members: "345",
    description: "Safety and security in agribusiness",
    color: "text-slate-400"
  },
  { 
    id: 11, 
    name: "Agro Literature", 
    icon: BookOpen, 
    members: "234",
    description: "Research, documentation, and publishing",
    color: "text-yellow-400"
  },
  { 
    id: 12, 
    name: "Agro Training", 
    icon: GraduationCap, 
    members: "1,456",
    description: "Education, motivation, and skill development",
    color: "text-teal-400"
  },
  { 
    id: 13, 
    name: "Agro Real Estate", 
    icon: Building2, 
    members: "678",
    description: "Green building and agricultural property",
    color: "text-lime-400"
  },
  { 
    id: 14, 
    name: "Agro Logistics", 
    icon: Truck, 
    members: "890",
    description: "Transportation and supply chain solutions",
    color: "text-indigo-400"
  },
]

export function Communities() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section id="communities" className="relative py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
            14 Communities
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
            Find Your <span className="text-primary">Agricultural Path</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose from 14 specialized communities designed to match your skills, interests, and career goals in the agriculture value chain.
          </p>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 lg:gap-4">
          {communities.map((community) => (
            <div
              key={community.id}
              onMouseEnter={() => setHoveredId(community.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`
                group relative p-4 bg-card border border-border/50 rounded cursor-pointer
                transition-all duration-300 hover:border-primary/50 hover:bg-primary/5
                ${hoveredId === community.id ? "scale-105 shadow-lg shadow-primary/10 z-10" : ""}
              `}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className={`w-12 h-12 rounded flex items-center justify-center bg-secondary/50 transition-colors group-hover:bg-primary/10`}>
                  <community.icon className={`w-6 h-6 ${community.color}`} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground leading-tight">{community.name}</h3>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Users className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{community.members}</span>
                  </div>
                </div>
              </div>

              {/* Hover Tooltip */}
              {hoveredId === community.id && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 p-3 bg-popover border border-border rounded shadow-xl z-20">
                  <p className="text-xs text-muted-foreground">{community.description}</p>
                  <Button size="sm" className="w-full mt-2 h-7 text-xs bg-primary text-primary-foreground">
                    Join Community
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="gap-2 rounded">
            Explore All Communities <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
