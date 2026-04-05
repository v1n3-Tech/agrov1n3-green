"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ChevronDown, LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

const communities = [
  "Crop Farming", "Animal Farming", "Agro Marketing", "Agro Processing",
  "Management & Legislation", "Agro Tourism", "Agro Technology", "Agro Health Care",
  "Agro Media & Branding", "Agro Security", "Agro Literature", "Motivation & Training",
  "Agro Real Estate", "Agro Logistics"
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [showCommunities, setShowCommunities] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 lg:w-9 lg:h-9 relative flex-shrink-0">
              <Image
                src="/images/greenvine-logo.png"
                alt="GreenV1n3"
                fill
                className="object-contain object-center"
                priority
              />
            </div>
            <span className="font-[family-name:var(--font-aldrich)] text-lg lg:text-xl tracking-wide">
              Green<span className="text-primary">V1n3</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="#features" className="text-[15px] text-muted-foreground hover:text-foreground transition-colors duration-200">
              Features
            </Link>
            
            {/* Communities Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowCommunities(true)}
              onMouseLeave={() => setShowCommunities(false)}
            >
              <button className="flex items-center gap-1 text-[15px] text-muted-foreground hover:text-foreground transition-colors duration-200">
                Communities
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showCommunities ? 'rotate-180' : ''}`} />
              </button>
              
              {showCommunities && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                  <div className="w-56 bg-card/95 backdrop-blur-lg border border-border/60 rounded-[4px] shadow-2xl p-1.5">
                    <div className="grid grid-cols-1 gap-0.5 max-h-72 overflow-y-auto">
                      {communities.map((community) => (
                        <Link
                          key={community}
                          href={`#${community.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                          className="px-3 py-1.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-[3px] transition-colors duration-150"
                        >
                          {community}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="#marketplace" className="text-[15px] text-muted-foreground hover:text-foreground transition-colors duration-200">
              Marketplace
            </Link>
            <Link href="#token" className="flex items-center gap-1.5 text-[15px] text-orange-400 font-medium hover:text-orange-300 transition-colors duration-200">
              V1n3 Token
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-4 rounded-[5px] border-orange-400/70 text-orange-400 hover:bg-orange/10 hover:border-orange-400 text-[14px] gap-2 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign In
            </Button>
            <Button
              size="sm"
              className="h-9 px-4 rounded-[5px] bg-primary hover:bg-primary/90 text-primary-foreground text-[14px] gap-2 font-medium"
            >
              <UserPlus className="w-3.5 h-3.5" />
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-1.5 text-foreground"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-3 border-t border-border/40">
            <nav className="flex flex-col gap-1">
              <Link href="#features" className="text-[15px] text-muted-foreground hover:text-foreground px-3 py-2 rounded-[3px] hover:bg-secondary/50 transition-colors">
                Features
              </Link>
              <Link href="#communities" className="text-[15px] text-muted-foreground hover:text-foreground px-3 py-2 rounded-[3px] hover:bg-secondary/50 transition-colors">
                14 Communities
              </Link>
              <Link href="#marketplace" className="text-[15px] text-muted-foreground hover:text-foreground px-3 py-2 rounded-[3px] hover:bg-secondary/50 transition-colors">
                Marketplace
              </Link>
              <Link href="#token" className="text-[15px] text-orange-400 px-3 py-2 rounded-[3px] hover:bg-orange/10 transition-colors">
                V1n3 Token
              </Link>
              <div className="flex gap-2 mt-2 px-3 pb-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-9 rounded-[5px] border-orange-400/70 text-orange-400 hover:bg-orange/10 text-[14px] gap-2 min-w-0"
                >
                  <LogIn className="w-3.5 h-3.5 flex-shrink-0" />
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="flex-1 h-9 rounded-[5px] bg-primary text-primary-foreground text-[14px] gap-2 min-w-0"
                >
                  <UserPlus className="w-3.5 h-3.5 flex-shrink-0" />
                  Register
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
