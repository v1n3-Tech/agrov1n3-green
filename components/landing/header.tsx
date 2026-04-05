"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ChevronDown, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const communities = [
  "Crop Farming",
  "Animal Farming",
  "Agro Marketing",
  "Agro Processing",
  "Agro Management",
  "Agro Tourism",
  "Agro Technology",
]

const moreCommunities = [
  "Agro Healthcare",
  "Agro Media & Branding",
  "Agro Security",
  "Agro Literature",
  "Agro Motivation & Training",
  "Agro Real Estate",
  "Agro Logistics",
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/greenvine-logo.png"
              alt="GreenV1n3"
              width={44}
              height={44}
              className="w-10 h-10 lg:w-11 lg:h-11"
            />
            <span className="font-mono text-lg lg:text-xl font-bold tracking-tight">
              Green<span className="text-primary">V1n3</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="#features" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                Communities <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56 bg-card border-border">
                {communities.map((c) => (
                  <DropdownMenuItem key={c} className="cursor-pointer">
                    {c}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem className="text-primary font-medium cursor-pointer">
                  View all 14 communities
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="#marketplace" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Marketplace
            </Link>
            <Link href="#investors" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Investors
            </Link>
            <Link href="#v1n3" className="px-4 py-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors flex items-center gap-1">
              <Wallet className="w-4 h-4" /> V1n3 Token
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Sign In
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col gap-2">
              <Link href="#features" className="px-4 py-3 text-sm font-medium hover:bg-secondary/50 rounded">
                Features
              </Link>
              <Link href="#communities" className="px-4 py-3 text-sm font-medium hover:bg-secondary/50 rounded">
                14 Communities
              </Link>
              <Link href="#marketplace" className="px-4 py-3 text-sm font-medium hover:bg-secondary/50 rounded">
                Marketplace
              </Link>
              <Link href="#investors" className="px-4 py-3 text-sm font-medium hover:bg-secondary/50 rounded">
                Investors
              </Link>
              <Link href="#v1n3" className="px-4 py-3 text-sm font-medium text-accent hover:bg-secondary/50 rounded flex items-center gap-2">
                <Wallet className="w-4 h-4" /> V1n3 Token
              </Link>
              <div className="flex gap-2 px-4 pt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  Sign In
                </Button>
                <Button size="sm" className="flex-1 bg-primary text-primary-foreground">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
