"use client"

import Image from "next/image"
import { Sprout, PawPrint, ShoppingBag, Factory, Briefcase, MapPin, Cpu, HeartPulse, Megaphone, Shield, BookOpen, GraduationCap, Building2, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

const communities = [
  { name: "Crop Farming", icon: Sprout, members: "2.3K", color: "primary" },
  { name: "Animal Farming", icon: PawPrint, members: "1.8K", color: "orange" },
  { name: "Agro Marketing", icon: ShoppingBag, members: "1.5K", color: "primary" },
  { name: "Agro Processing", icon: Factory, members: "980", color: "orange" },
  { name: "Management", icon: Briefcase, members: "650", color: "primary" },
  { name: "Agro Tourism", icon: MapPin, members: "430", color: "orange" },
  { name: "Agro Tech", icon: Cpu, members: "1.2K", color: "primary" },
  { name: "Healthcare", icon: HeartPulse, members: "560", color: "orange" },
  { name: "Media", icon: Megaphone, members: "780", color: "primary" },
  { name: "Security", icon: Shield, members: "340", color: "orange" },
  { name: "Literature", icon: BookOpen, members: "230", color: "primary" },
  { name: "Training", icon: GraduationCap, members: "1.4K", color: "orange" },
  { name: "Real Estate", icon: Building2, members: "670", color: "primary" },
  { name: "Logistics", icon: Truck, members: "890", color: "orange" },
]

export function Communities() {
  return (
    <section id="communities" className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/community.jpg"
          alt="Community"
          fill
          className="object-cover opacity-5"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-2.5 py-1 text-[10px] font-medium text-primary bg-primary/10 border border-primary/20 rounded-[3px] uppercase tracking-widest mb-4">
            14 Communities
          </span>
          <h2 className="font-[family-name:var(--font-aldrich)] text-3xl lg:text-4xl tracking-tight mb-3">
            Choose Your <span className="text-primary">Path</span>
          </h2>
          <p className="text-sm lg:text-base text-muted-foreground">
            Join specialized communities matching your skills and interests in the agriculture value chain.
          </p>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 lg:gap-2.5">
          {communities.map((community) => {
            const isOrange = community.color === "orange"
            return (
              <div
                key={community.name}
                className={`group p-3 lg:p-3.5 bg-grey/70 backdrop-blur-sm border border-border/30 rounded-[4px] cursor-pointer transition-all duration-200 ${
                  isOrange
                    ? "hover:border-orange/50 hover:bg-orange/5"
                    : "hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div className={`w-9 h-9 rounded-[3px] flex items-center justify-center transition-colors ${
                    isOrange
                      ? "bg-secondary/80 group-hover:bg-orange/15"
                      : "bg-secondary/80 group-hover:bg-primary/20"
                  }`}>
                    <community.icon className={`w-4 h-4 ${isOrange ? "text-orange-400" : "text-primary"}`} />
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs font-medium text-foreground leading-tight">{community.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{community.members}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Button variant="outline" className="h-9 px-5 rounded-[3px] border-border/60 text-sm">
            Explore All Communities
          </Button>
        </div>
      </div>
    </section>
  )
}
