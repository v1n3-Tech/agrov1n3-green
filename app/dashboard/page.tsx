import { redirect } from "next/navigation"
import { 
  Users, 
  Wallet, 
  TrendingUp, 
  ShoppingBag,
  ArrowUpRight,
  Calendar,
  MapPin,
  Sprout,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Shield,
  Star,
  Copy,
  ExternalLink,
  UserCircle,
  Briefcase,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  StatsCard, 
  ActivityItem, 
  SectionHeader 
} from "@/components/dashboard/dashboard-shell"
import { getUserProfile } from "@/lib/auth/actions"
import { 
  communityDisplayNames, 
  lgaDisplayNames, 
  roleDisplayNames,
  roleDescriptions,
  type CommunityType,
  type LocalGovernment,
  type UserRole
} from "@/types/database"

// Community icons and colors
const communityConfig: Record<string, { icon: typeof Sprout, color: string }> = {
  'crop_farming': { icon: Sprout, color: 'text-primary' },
  'animal_farming': { icon: Sprout, color: 'text-orange' },
  'agro_marketing': { icon: ShoppingBag, color: 'text-accent' },
  'agro_processing': { icon: Briefcase, color: 'text-chart-3' },
  'management_legislation': { icon: Shield, color: 'text-chart-4' },
  'agro_tourism': { icon: MapPin, color: 'text-chart-5' },
  'agro_technology': { icon: BarChart3, color: 'text-primary' },
  'agro_health_care': { icon: UserCircle, color: 'text-orange' },
  'agro_media_branding': { icon: ExternalLink, color: 'text-accent' },
  'agro_security': { icon: Shield, color: 'text-chart-3' },
  'agro_literature': { icon: Briefcase, color: 'text-chart-4' },
  'motivation_training': { icon: Star, color: 'text-chart-5' },
  'agro_real_estate': { icon: MapPin, color: 'text-primary' },
  'agro_logistics': { icon: TrendingUp, color: 'text-orange' },
}

// Calculate profile completion percentage
function calculateProfileCompletion(profile: Record<string, unknown>): { percentage: number, missing: string[] } {
  const fields = [
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'phone', label: 'Phone Number' },
    { key: 'avatar_url', label: 'Profile Picture' },
    { key: 'bio', label: 'Bio' },
    { key: 'date_of_birth', label: 'Date of Birth' },
    { key: 'gender', label: 'Gender' },
    { key: 'community', label: 'Community' },
    { key: 'local_government', label: 'Local Government' },
  ]
  
  const missing: string[] = []
  let completed = 0
  
  fields.forEach(field => {
    if (profile[field.key]) {
      completed++
    } else {
      missing.push(field.label)
    }
  })
  
  return {
    percentage: Math.round((completed / fields.length) * 100),
    missing
  }
}

// Format date for display
function formatDate(dateString: string | null): string {
  if (!dateString) return 'Never'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-NG', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Format member since date
function formatMemberSince(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-NG', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  })
}

// Get today's date formatted
function getTodayFormatted(): string {
  return new Date().toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export default async function DashboardPage() {
  const profile = await getUserProfile()
  
  if (!profile) {
    redirect("/sign-in")
  }

  const profileCompletion = calculateProfileCompletion(profile as unknown as Record<string, unknown>)
  const communityKey = profile.community as CommunityType | null
  const lgaKey = profile.local_government as LocalGovernment | null
  const roleKey = profile.role as UserRole
  
  const communityDisplay = communityKey ? communityDisplayNames[communityKey] : null
  const lgaDisplay = lgaKey ? lgaDisplayNames[lgaKey] : null
  const roleDisplay = roleDisplayNames[roleKey] || roleKey
  const roleDesc = roleDescriptions[roleKey] || ''
  
  const CommunityIcon = communityKey ? communityConfig[communityKey]?.icon || Sprout : Sprout
  const communityColor = communityKey ? communityConfig[communityKey]?.color || 'text-primary' : 'text-primary'
  
  // Display name
  const displayName = profile.first_name 
    ? `${profile.first_name}${profile.last_name ? ' ' + profile.last_name : ''}`
    : profile.username

  // Stats based on real data
  const stats = [
    { 
      title: "V1n3 Balance", 
      value: Number(profile.v1n3_balance || 0).toLocaleString(), 
      change: { value: 0, trend: 'up' as const },
      icon: <Wallet className="h-4 w-4" />
    },
    { 
      title: "Performance Rating", 
      value: profile.performance_rating ? `${Number(profile.performance_rating).toFixed(1)}/5.0` : 'N/A', 
      change: profile.total_ratings ? { value: profile.total_ratings, trend: 'up' as const } : undefined,
      icon: <Star className="h-4 w-4" />
    },
    { 
      title: "Profile Status", 
      value: profile.is_verified ? 'Verified' : 'Unverified', 
      icon: profile.is_verified ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />
    },
    { 
      title: "Account Status", 
      value: profile.is_active ? 'Active' : 'Inactive', 
      icon: <Shield className="h-4 w-4" />
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-[family-name:var(--font-aldrich)]">
            Welcome back, {displayName}
          </h1>
          <p className="text-muted-foreground mt-1">
            {roleDisplay} {communityDisplay ? `in ${communityDisplay}` : ''} {lgaDisplay ? `- ${lgaDisplay}` : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-[4px] gap-2">
            <Calendar className="h-4 w-4" />
            {getTodayFormatted()}
          </Button>
          <Link href="/profile">
            <Button size="sm" className="rounded-[4px] gap-2">
              <UserCircle className="h-4 w-4" />
              View Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* Profile Completion Alert */}
      {profileCompletion.percentage < 100 && (
        <div className="rounded-[4px] border border-orange/30 bg-orange/5 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-orange mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-orange">Complete Your Profile</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your profile is {profileCompletion.percentage}% complete. Add missing information to unlock all features.
              </p>
              {profileCompletion.missing.length > 0 && (
                <p className="text-xs text-muted-foreground mt-2">
                  Missing: {profileCompletion.missing.slice(0, 3).join(', ')}
                  {profileCompletion.missing.length > 3 && ` and ${profileCompletion.missing.length - 3} more`}
                </p>
              )}
              <Link href="/profile/edit">
                <Button size="sm" variant="outline" className="mt-3 rounded-[4px] border-orange/50 text-orange hover:bg-orange/10">
                  Complete Profile
                </Button>
              </Link>
            </div>
            <div className="text-right">
              <span className="text-2xl font-semibold font-[family-name:var(--font-aldrich)] text-orange">
                {profileCompletion.percentage}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="rounded-[4px] border border-border bg-card p-4">
            <SectionHeader title="Quick Actions" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link href="/dashboard/communities" className="group">
                <div className="rounded-[4px] border border-border bg-secondary/30 p-4 text-center hover:border-primary/50 hover:bg-primary/5 transition-all">
                  <Sprout className="h-6 w-6 mx-auto text-primary mb-2" />
                  <p className="text-sm font-medium">Communities</p>
                </div>
              </Link>
              <Link href="/dashboard/marketplace" className="group">
                <div className="rounded-[4px] border border-border bg-secondary/30 p-4 text-center hover:border-orange/50 hover:bg-orange/5 transition-all">
                  <ShoppingBag className="h-6 w-6 mx-auto text-orange mb-2" />
                  <p className="text-sm font-medium">Marketplace</p>
                </div>
              </Link>
              <Link href="/dashboard/wallet" className="group">
                <div className="rounded-[4px] border border-border bg-secondary/30 p-4 text-center hover:border-accent/50 hover:bg-accent/5 transition-all">
                  <Wallet className="h-6 w-6 mx-auto text-accent mb-2" />
                  <p className="text-sm font-medium">Wallet</p>
                </div>
              </Link>
              <Link href="/dashboard/analytics" className="group">
                <div className="rounded-[4px] border border-border bg-secondary/30 p-4 text-center hover:border-chart-3/50 hover:bg-chart-3/5 transition-all">
                  <BarChart3 className="h-6 w-6 mx-auto text-chart-3 mb-2" />
                  <p className="text-sm font-medium">Analytics</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Agro ID Card */}
          <div className="rounded-[4px] border border-primary/30 bg-gradient-to-r from-primary/10 via-card to-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Your Agro ID</p>
                <p className="text-xl font-semibold font-[family-name:var(--font-aldrich)] text-primary">
                  {profile.agro_id || 'Not Assigned'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Use this ID for all official AgroV1n3 transactions
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Button size="sm" variant="outline" className="rounded-[4px] gap-2 border-primary/50 hover:bg-primary/10">
                  <Copy className="h-3 w-3" />
                  Copy
                </Button>
              </div>
            </div>
          </div>

          {/* Role & Responsibilities Card */}
          <div className="rounded-[4px] border border-border bg-card p-4">
            <SectionHeader title="Your Role & Responsibilities" />
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-[4px] bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">{roleDisplay}</h3>
                  <Badge variant="outline" className="text-xs border-primary/50 text-primary">
                    {roleKey.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{roleDesc}</p>
                
                {/* Show managed areas for special roles */}
                {(roleKey === 'lgpa' || roleKey === 'scc' || roleKey === 'gcm') && (
                  <div className="mt-3 pt-3 border-t border-border">
                    {profile.managed_lga && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-orange" />
                        <span className="text-muted-foreground">Managing:</span>
                        <span className="font-medium">{lgaDisplayNames[profile.managed_lga as LocalGovernment] || profile.managed_lga}</span>
                      </div>
                    )}
                    {profile.managed_community && (
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <Sprout className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">Community:</span>
                        <span className="font-medium">{communityDisplayNames[profile.managed_community as CommunityType] || profile.managed_community}</span>
                      </div>
                    )}
                    {profile.appointed_at && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Appointed on {formatDate(profile.appointed_at)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Account Activity */}
          <div className="rounded-[4px] border border-border bg-card p-4">
            <SectionHeader title="Account Activity" />
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-[4px] bg-secondary/30">
                <p className="text-xs text-muted-foreground">Member Since</p>
                <p className="font-medium mt-1">{formatMemberSince(profile.created_at)}</p>
              </div>
              <div className="p-3 rounded-[4px] bg-secondary/30">
                <p className="text-xs text-muted-foreground">Last Login</p>
                <p className="font-medium mt-1">{formatDate(profile.last_login_at)}</p>
              </div>
              <div className="p-3 rounded-[4px] bg-secondary/30">
                <p className="text-xs text-muted-foreground">Profile Updated</p>
                <p className="font-medium mt-1">{formatDate(profile.updated_at)}</p>
              </div>
              <div className="p-3 rounded-[4px] bg-secondary/30">
                <p className="text-xs text-muted-foreground">Username Changed</p>
                <p className="font-medium mt-1">{profile.username_changed ? 'Yes' : 'Available'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar Content */}
        <div className="space-y-6">
          {/* V1n3 Token Card */}
          <div className="rounded-[4px] border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-4 relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 relative">
                  <Image 
                    src="/images/greenvine-logo.png" 
                    alt="V1n3 Token" 
                    fill 
                    className="object-contain" 
                  />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-aldrich)] text-sm text-muted-foreground">V1N3 TOKEN</p>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30 text-xs">
                    SOLANA
                  </Badge>
                </div>
              </div>
              <p className="text-3xl font-semibold font-[family-name:var(--font-aldrich)] text-primary mb-1">
                {Number(profile.v1n3_balance || 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">V1n3 Tokens</p>
              
              {profile.wallet_address && (
                <div className="mt-3 p-2 rounded-[4px] bg-secondary/50">
                  <p className="text-xs text-muted-foreground mb-1">Wallet</p>
                  <p className="text-xs font-mono truncate">{profile.wallet_address}</p>
                </div>
              )}
              
              <div className="flex gap-2 mt-4">
                <Button size="sm" className="flex-1 rounded-[4px] text-xs">
                  Buy V1n3
                </Button>
                <Button size="sm" variant="outline" className="flex-1 rounded-[4px] text-xs border-primary/50 hover:bg-primary/10">
                  Transfer
                </Button>
              </div>
            </div>
          </div>

          {/* Community & Location Card */}
          <div className="rounded-[4px] border border-border bg-card p-4">
            <SectionHeader title="Your Area" />
            <div className="space-y-4">
              {/* Community */}
              <div className="flex items-center gap-3 p-3 rounded-[4px] bg-primary/5 border border-primary/20">
                <div className="h-10 w-10 rounded-[4px] bg-primary/10 flex items-center justify-center">
                  <CommunityIcon className={`h-5 w-5 ${communityColor}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Community</p>
                  <p className="font-medium">{communityDisplay || 'Not Selected'}</p>
                </div>
              </div>
              
              {/* Local Government */}
              <div className="flex items-center gap-3 p-3 rounded-[4px] bg-orange/5 border border-orange/20">
                <div className="h-10 w-10 rounded-[4px] bg-orange/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-orange" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Local Government</p>
                  <p className="font-medium">{lgaDisplay || 'Not Selected'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Completion Card */}
          <div className="rounded-[4px] border border-border bg-card p-4">
            <SectionHeader title="Profile Completion" />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium">{profileCompletion.percentage}%</span>
              </div>
              <Progress value={profileCompletion.percentage} className="h-2" />
              
              <div className="space-y-2 mt-4">
                {[
                  { label: 'Basic Info', done: !!(profile.first_name && profile.last_name) },
                  { label: 'Contact', done: !!profile.phone },
                  { label: 'Profile Picture', done: !!profile.avatar_url },
                  { label: 'Community', done: !!profile.community },
                  { label: 'Bio', done: !!profile.bio },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm">
                    {item.done ? (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-muted-foreground/30" />
                    )}
                    <span className={item.done ? 'text-foreground' : 'text-muted-foreground'}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              
              {profileCompletion.percentage < 100 && (
                <Link href="/profile/edit">
                  <Button size="sm" className="w-full mt-3 rounded-[4px]">
                    Complete Profile
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Verification Status */}
          <div className="rounded-[4px] border border-border bg-card p-4">
            <SectionHeader title="Account Status" />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {profile.is_verified ? (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-orange" />
                  )}
                  <span className="text-sm">Verification</span>
                </div>
                <Badge variant={profile.is_verified ? 'default' : 'secondary'}>
                  {profile.is_verified ? 'Verified' : 'Pending'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {profile.is_active ? (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  )}
                  <span className="text-sm">Account</span>
                </div>
                <Badge variant={profile.is_active ? 'default' : 'destructive'}>
                  {profile.is_active ? 'Active' : 'Suspended'}
                </Badge>
              </div>
              
              {profile.performance_rating && profile.total_ratings && profile.total_ratings > 0 && (
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-orange" />
                    <span className="text-sm">Rating</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{Number(profile.performance_rating).toFixed(1)}</span>
                    <span className="text-xs text-muted-foreground">({profile.total_ratings} reviews)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
