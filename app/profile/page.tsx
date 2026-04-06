"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Shield,
  Wallet,
  Star,
  Edit3,
  Camera,
  Copy,
  Check,
  ExternalLink,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Sprout,
  BadgeCheck,
  Clock,
  Users
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { V1n3PageLoader } from "@/components/ui/v1n3-loader"
import { 
  type Profile, 
  communityDisplayNames, 
  lgaDisplayNames, 
  roleDisplayNames,
  roleDescriptions,
  type CommunityType,
  type LocalGovernment
} from "@/types/database"

// Community icons mapping
const communityIcons: Record<string, React.ReactNode> = {
  crop_farming: <Sprout className="w-4 h-4" />,
  animal_farming: <Users className="w-4 h-4" />,
  agro_technology: <Shield className="w-4 h-4" />,
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push("/sign-in")
        return
      }

      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (error || !profileData) {
        router.push("/sign-in")
        return
      }

      setProfile(profileData as Profile)
      setLoading(false)
    }

    fetchProfile()
  }, [router])

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  if (loading || !profile) {
    return <V1n3PageLoader />
  }

  const displayName = profile.first_name && profile.last_name 
    ? `${profile.first_name} ${profile.last_name}`
    : profile.username
  
  const initials = profile.first_name && profile.last_name 
    ? `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase()
    : profile.username?.slice(0, 2).toUpperCase() || "U"

  const memberSince = new Date(profile.created_at).toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  })

  const completionPercentage = calculateProfileCompletion(profile)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Home</span>
            </Link>
            <Link href="/profile/edit">
              <Button size="sm" variant="outline" className="h-8 gap-2 rounded-[4px] text-xs">
                <Edit3 className="w-3.5 h-3.5" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header Card */}
        <div className="relative bg-card border border-border/60 rounded-[4px] overflow-hidden mb-6">
          {/* Banner Gradient */}
          <div className="h-24 sm:h-32 bg-gradient-to-r from-primary/30 via-primary/20 to-orange/20" />
          
          {/* Profile Info */}
          <div className="px-4 sm:px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 sm:-mt-14">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-card border-4 border-card flex items-center justify-center overflow-hidden shadow-xl">
                  {profile.avatar_url ? (
                    <Image
                      src={profile.avatar_url}
                      alt={displayName || "Profile"}
                      width={112}
                      height={112}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl font-bold text-primary">{initials}</span>
                    </div>
                  )}
                </div>
                {profile.is_verified && (
                  <div className="absolute bottom-1 right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-card">
                    <BadgeCheck className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                )}
              </div>

              {/* Name & Role */}
              <div className="flex-1 sm:pb-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground font-[family-name:var(--font-aldrich)]">
                    {displayName}
                  </h1>
                  {profile.is_verified && (
                    <span className="px-2 py-0.5 text-[10px] font-medium bg-primary/20 text-primary rounded-full uppercase tracking-wide">
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  @{profile.username}
                </p>
              </div>

              {/* Stats Quick View - Desktop */}
              <div className="hidden sm:flex items-center gap-4 pb-1">
                <div className="text-center">
                  <p className="text-lg font-bold text-primary font-[family-name:var(--font-aldrich)]">
                    {profile.v1n3_balance.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">V1n3 Tokens</p>
                </div>
                <div className="w-px h-10 bg-border/60" />
                <div className="text-center">
                  <p className="text-lg font-bold text-orange font-[family-name:var(--font-aldrich)]">
                    {profile.performance_rating.toFixed(1)}
                  </p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              </div>
            </div>

            {/* Bio */}
            {profile.bio && (
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                {profile.bio}
              </p>
            )}

            {/* Tags Row */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-full">
                <Shield className="w-3 h-3" />
                {roleDisplayNames[profile.role]}
              </span>
              {profile.community && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-orange/10 text-orange border border-orange/20 rounded-full">
                  <Sprout className="w-3 h-3" />
                  {communityDisplayNames[profile.community as CommunityType]}
                </span>
              )}
              {profile.local_government && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-secondary text-muted-foreground border border-border/40 rounded-full">
                  <MapPin className="w-3 h-3" />
                  {lgaDisplayNames[profile.local_government as LocalGovernment]}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards - Mobile */}
        <div className="grid grid-cols-2 gap-3 mb-6 sm:hidden">
          <div className="bg-card border border-border/60 rounded-[4px] p-4 text-center">
            <p className="text-2xl font-bold text-primary font-[family-name:var(--font-aldrich)]">
              {profile.v1n3_balance.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">V1n3 Tokens</p>
          </div>
          <div className="bg-card border border-border/60 rounded-[4px] p-4 text-center">
            <div className="flex items-center justify-center gap-1">
              <Star className="w-4 h-4 text-orange fill-orange" />
              <p className="text-2xl font-bold text-orange font-[family-name:var(--font-aldrich)]">
                {profile.performance_rating.toFixed(1)}
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{profile.total_ratings} ratings</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Agro ID Card */}
            <div className="bg-card border border-border/60 rounded-[4px] p-5">
              <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Agro Executive ID
              </h3>
              <div className="flex items-center justify-between p-4 bg-secondary/30 border border-border/40 rounded-[4px]">
                <div>
                  <p className="text-2xl font-bold text-primary font-[family-name:var(--font-aldrich)] tracking-wider">
                    {profile.agro_id}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your unique identification on the GreenV1n3 platform
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={() => copyToClipboard(profile.agro_id, 'agro_id')}
                >
                  {copiedField === 'agro_id' ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-card border border-border/60 rounded-[4px] p-5">
              <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoItem 
                  icon={<Mail className="w-4 h-4" />} 
                  label="Email" 
                  value={profile.email}
                  copyable
                  onCopy={() => copyToClipboard(profile.email, 'email')}
                  copied={copiedField === 'email'}
                />
                <InfoItem 
                  icon={<Phone className="w-4 h-4" />} 
                  label="Phone" 
                  value={profile.phone || "Not provided"}
                />
                <InfoItem 
                  icon={<Calendar className="w-4 h-4" />} 
                  label="Date of Birth" 
                  value={profile.date_of_birth 
                    ? new Date(profile.date_of_birth).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric' 
                      })
                    : "Not provided"
                  }
                />
                <InfoItem 
                  icon={<User className="w-4 h-4" />} 
                  label="Gender" 
                  value={profile.gender 
                    ? profile.gender.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
                    : "Not provided"
                  }
                />
              </div>
            </div>

            {/* Role Details */}
            <div className="bg-card border border-border/60 rounded-[4px] p-5">
              <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Role & Responsibilities
              </h3>
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-[4px]">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">
                      {roleDisplayNames[profile.role]}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {roleDescriptions[profile.role]}
                    </p>
                  </div>
                </div>
              </div>

              {/* LGPA/SCC/GCM specific info */}
              {(profile.managed_lga || profile.managed_community) && (
                <div className="mt-4 pt-4 border-t border-border/40">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">
                    Management Scope
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {profile.managed_lga && (
                      <span className="px-3 py-1.5 text-sm bg-secondary border border-border/40 rounded-[4px]">
                        {lgaDisplayNames[profile.managed_lga as LocalGovernment]} LGA
                      </span>
                    )}
                    {profile.managed_community && (
                      <span className="px-3 py-1.5 text-sm bg-secondary border border-border/40 rounded-[4px]">
                        {communityDisplayNames[profile.managed_community as CommunityType]}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <div className="bg-card border border-border/60 rounded-[4px] p-5">
              <h3 className="text-sm font-medium text-foreground mb-4">
                Profile Completion
              </h3>
              <div className="relative pt-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Progress</span>
                  <span className="text-xs font-medium text-primary">{completionPercentage}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
              {completionPercentage < 100 && (
                <Link href="/profile/edit">
                  <Button size="sm" className="w-full mt-4 h-9 rounded-[4px] text-xs">
                    Complete Your Profile
                  </Button>
                </Link>
              )}
            </div>

            {/* Wallet */}
            <div className="bg-card border border-border/60 rounded-[4px] p-5">
              <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-primary" />
                V1n3 Wallet
              </h3>
              <div className="text-center py-4">
                <p className="text-3xl font-bold text-primary font-[family-name:var(--font-aldrich)]">
                  {profile.v1n3_balance.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">V1n3 Tokens</p>
              </div>
              {profile.wallet_address && (
                <div className="mt-3 p-2 bg-secondary/30 rounded-[4px]">
                  <p className="text-xs text-muted-foreground mb-1">Wallet Address</p>
                  <p className="text-xs font-mono text-foreground truncate">
                    {profile.wallet_address}
                  </p>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="bg-card border border-border/60 rounded-[4px] p-5">
              <h3 className="text-sm font-medium text-foreground mb-4">
                Social Links
              </h3>
              <div className="space-y-2">
                <SocialLink 
                  icon={<Twitter className="w-4 h-4" />} 
                  name="Twitter" 
                  url={profile.twitter_url} 
                />
                <SocialLink 
                  icon={<Facebook className="w-4 h-4" />} 
                  name="Facebook" 
                  url={profile.facebook_url} 
                />
                <SocialLink 
                  icon={<Instagram className="w-4 h-4" />} 
                  name="Instagram" 
                  url={profile.instagram_url} 
                />
                <SocialLink 
                  icon={<Linkedin className="w-4 h-4" />} 
                  name="LinkedIn" 
                  url={profile.linkedin_url} 
                />
              </div>
              {!profile.twitter_url && !profile.facebook_url && !profile.instagram_url && !profile.linkedin_url && (
                <p className="text-xs text-muted-foreground text-center py-2">
                  No social links added yet
                </p>
              )}
            </div>

            {/* Member Info */}
            <div className="bg-card border border-border/60 rounded-[4px] p-5">
              <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Account Info
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Member since</span>
                  <span className="text-foreground">{memberSince}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Username changes</span>
                  <span className={profile.username_changed ? "text-muted-foreground" : "text-primary"}>
                    {profile.username_changed ? "Used" : "Available"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Account status</span>
                  <span className={`flex items-center gap-1.5 ${profile.is_active ? "text-primary" : "text-destructive"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${profile.is_active ? "bg-primary" : "bg-destructive"}`} />
                    {profile.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// Helper Components
function InfoItem({ 
  icon, 
  label, 
  value, 
  copyable = false, 
  onCopy, 
  copied 
}: { 
  icon: React.ReactNode
  label: string
  value: string
  copyable?: boolean
  onCopy?: () => void
  copied?: boolean
}) {
  return (
    <div className="flex items-start gap-3 p-3 bg-secondary/20 rounded-[4px]">
      <div className="text-muted-foreground mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground truncate">{value}</p>
      </div>
      {copyable && onCopy && (
        <button onClick={onCopy} className="text-muted-foreground hover:text-foreground transition-colors">
          {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      )}
    </div>
  )
}

function SocialLink({ icon, name, url }: { icon: React.ReactNode, name: string, url: string | null }) {
  if (!url) {
    return (
      <div className="flex items-center gap-3 p-2.5 text-muted-foreground/50">
        {icon}
        <span className="text-sm">{name}</span>
      </div>
    )
  }

  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-[4px] transition-colors group"
    >
      {icon}
      <span className="text-sm flex-1">{name}</span>
      <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  )
}

function calculateProfileCompletion(profile: Profile): number {
  const fields = [
    profile.first_name,
    profile.last_name,
    profile.phone,
    profile.avatar_url,
    profile.bio,
    profile.date_of_birth,
    profile.gender,
    profile.community,
    profile.local_government,
    profile.twitter_url || profile.facebook_url || profile.instagram_url || profile.linkedin_url,
  ]
  
  const filledFields = fields.filter(Boolean).length
  return Math.round((filledFields / fields.length) * 100)
}
