"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ChevronDown, LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserMenu, UserMenuMobile } from "./user-menu"

interface UserProfile {
  id: string
  username: string | null
  avatar_url: string | null
  first_name: string | null
  last_name: string | null
  role: string
}

interface HeaderProps {
  profile?: UserProfile | null
}

const communities = [
  "Crop Farming", "Animal Farming", "Agro Marketing", "Agro Processing",
  "Management & Legislation", "Agro Tourism", "Agro Technology", "Agro Health Care",
  "Agro Media & Branding", "Agro Security", "Agro Literature", "Motivation & Training",
  "Agro Real Estate", "Agro Logistics"
]

export function Header({ profile }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showCommunities, setShowCommunities] = useState(false)
  const isAuthenticated = !!profile

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 lg:w-11 lg:h-11 relative flex-shrink-0">
              <Image
                src="/images/greenvine-logo.png"
                alt="GreenV1n3"
                fill
                className="object-contain object-center"
                priority
              />
            </div>
            <span className="font-[family-name:var(--font-aldrich)] text-lg lg:text-2xl">
              Green<span className="text-primary">V1n3</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/features" className="text-[15px] text-muted-foreground hover:text-foreground transition-colors duration-200">
              Features
            </Link>

            {/* Communities Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowCommunities(true)}
              onMouseLeave={() => setShowCommunities(false)}
            >
              <Link href="/communities" className="flex items-center gap-1 text-[15px] text-muted-foreground hover:text-foreground transition-colors duration-200">
                Communities
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showCommunities ? 'rotate-180' : ''}`} />
              </Link>

              {showCommunities && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                  <div className="w-56 bg-card/95 backdrop-blur-lg border border-border/60 rounded-[4px] shadow-2xl p-1.5">
                    <div className="grid grid-cols-1 gap-0.5 max-h-72 overflow-y-auto">
                      {communities.map((community) => (
                        <Link
                          key={community}
                          href={`/communities/${community.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
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

            <Link href="/marketplace" className="text-[15px] text-muted-foreground hover:text-foreground transition-colors duration-200">
              Marketplace
            </Link>
            <Link href="/gallery" className="text-[15px] text-muted-foreground hover:text-foreground transition-colors duration-200">
              Gallery
            </Link>
            <Link href="/token" className="flex items-center gap-1.5 text-[13px] text-orange-400 font-medium hover:text-orange-500 transition-colors duration-200 font-[family-name:var(--font-aldrich)]">
              V1N3 TOKEN
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2">
            {isAuthenticated ? (
              <UserMenu profile={profile} />
            ) : (
              <>
                <Link href="/sign-in">
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-[family-name:var(--font-aldrich)] h-9 px-4 rounded-[4px] border-orange-400/70 text-white/70 hover:bg-orange/10 hover:border-orange-400 hover:text-white/100 text-[12px] gap-2 transition-colors transition-all duration-[1000ms] ease-out"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="sm"
                    className="font-[family-name:var(--font-aldrich)] h-9 px-4 rounded-[4px] bg-primary/70 hover:bg-primary/100 hover:border-primary-400 text-white/70 hover:text-white/100 text-[12px] gap-2 font-medium transition-all duration-[500ms] ease-out"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    Get Started
                  </Button>
                </Link>
              </>
            )}
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
              <Link href="/features" className="text-[15px] text-muted-foreground hover:text-foreground px-3 py-2 rounded-[3px] hover:bg-secondary/50 transition-colors">
                Features
              </Link>
              <Link href="/communities" className="text-[15px] text-muted-foreground hover:text-foreground px-3 py-2 rounded-[3px] hover:bg-secondary/50 transition-colors">
                14 Communities
              </Link>
              <Link href="/marketplace" className="text-[15px] text-muted-foreground hover:text-foreground px-3 py-2 rounded-[3px] hover:bg-secondary/50 transition-colors">
                Marketplace
              </Link>
              <Link href="/gallery" className="text-[15px] text-muted-foreground hover:text-foreground px-3 py-2 rounded-[3px] hover:bg-secondary/50 transition-colors">
                Gallery
              </Link>
              <Link href="/token" className="text-[14px] text-orange-500 px-3 py-2 rounded-[3px] hover:bg-orange/30 transition-colors font-[family-name:var(--font-aldrich)]">
                V1N3 TOKEN
              </Link>

              {/* Mobile Auth Section */}
              {isAuthenticated ? (
                <div className="mt-2 pt-2 border-t border-border/40">
                  <UserMenuMobile profile={profile} />
                </div>
              ) : (
                <div className="flex gap-2 mt-2 px-3 pb-1">
                  <Link href="/sign-in" className="flex-1 min-w-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-[family-name:var(--font-aldrich)] w-full h-9 rounded-[3px] border-orange-400/60 text-white/70 hover:bg-orange/5 hover:text-white/100 text-[11px] gap-1.5 transition-all duration-[500ms] ease-out"
                    >
                      <LogIn className="w-3.5 h-3.5 flex-shrink-0" />
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register" className="flex-1 min-w-0">
                    <Button
                      size="sm"
                      className="font-[family-name:var(--font-aldrich)] w-full h-9 rounded-[3px] bg-primary/70 text-white/70 hover:bg-primary/100 hover:text-white/100 text-[11px] gap-1.5 transition-all duration-[500ms] ease-out"
                    >
                      <UserPlus className="w-3.5 h-3.5 flex-shrink-0" />
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
