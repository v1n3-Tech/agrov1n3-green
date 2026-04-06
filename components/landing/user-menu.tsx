"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { User, LayoutDashboard, LogOut, ChevronDown } from "lucide-react"
import { signOut } from "@/lib/auth/actions"

interface UserProfile {
  id: string
  username: string | null
  avatar_url: string | null
  first_name: string | null
  last_name: string | null
  role: string
}

interface UserMenuProps {
  profile: UserProfile
}

export function UserMenu({ profile }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const displayName = profile.username || profile.first_name || "User"
  const initials = profile.first_name && profile.last_name 
    ? `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase()
    : displayName.slice(0, 2).toUpperCase()

  async function handleSignOut() {
    await signOut()
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-9 px-2.5 rounded-[4px] bg-secondary/50 border border-border/40 hover:border-border/60 hover:bg-secondary/70 transition-all duration-200"
      >
        {/* Avatar */}
        <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden">
          {profile.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={displayName}
              width={24}
              height={24}
              className="object-cover"
            />
          ) : (
            <span className="text-[10px] font-medium text-primary">{initials}</span>
          )}
        </div>
        
        {/* Username - Hidden on small screens */}
        <span className="hidden sm:block text-sm text-foreground/80 max-w-[100px] truncate">
          {displayName}
        </span>
        
        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-card/95 backdrop-blur-lg border border-border/60 rounded-[4px] shadow-xl shadow-black/20 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
          {/* User Info */}
          <div className="px-3 py-2.5 border-b border-border/40">
            <p className="text-sm font-medium text-foreground truncate">{displayName}</p>
            <p className="text-xs text-muted-foreground capitalize">{profile.role.replace('_', ' ')}</p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
            >
              <User className="w-4 h-4" />
              Profile
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          </div>

          {/* Logout */}
          <div className="border-t border-border/40 py-1">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Mobile version
export function UserMenuMobile({ profile }: UserMenuProps) {
  const displayName = profile.username || profile.first_name || "User"
  const initials = profile.first_name && profile.last_name 
    ? `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase()
    : displayName.slice(0, 2).toUpperCase()

  async function handleSignOut() {
    await signOut()
  }

  return (
    <div className="space-y-1 px-3 pb-2">
      {/* User Info */}
      <div className="flex items-center gap-2.5 py-2">
        <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden">
          {profile.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={displayName}
              width={32}
              height={32}
              className="object-cover"
            />
          ) : (
            <span className="text-xs font-medium text-primary">{initials}</span>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{displayName}</p>
          <p className="text-xs text-muted-foreground capitalize">{profile.role.replace('_', ' ')}</p>
        </div>
      </div>

      {/* Links */}
      <Link
        href="/profile"
        className="flex items-center gap-2.5 px-2 py-2 text-[15px] text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-[3px] transition-colors"
      >
        <User className="w-4 h-4" />
        Profile
      </Link>
      <Link
        href="/dashboard"
        className="flex items-center gap-2.5 px-2 py-2 text-[15px] text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-[3px] transition-colors"
      >
        <LayoutDashboard className="w-4 h-4" />
        Dashboard
      </Link>
      <button
        onClick={handleSignOut}
        className="flex items-center gap-2.5 w-full px-2 py-2 text-[15px] text-destructive hover:bg-destructive/10 rounded-[3px] transition-colors"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </div>
  )
}
