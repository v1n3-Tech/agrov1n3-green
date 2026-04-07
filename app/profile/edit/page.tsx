"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  Camera,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  Loader2,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Sprout,
  AtSign,
  Lock,
  ChevronDown,
  Check,
  Tractor,
  ShoppingCart,
  Factory,
  Scale,
  Palmtree,
  Cpu,
  Heart,
  Megaphone,
  Shield,
  BookOpen,
  GraduationCap,
  Building2,
  Truck,
  Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { V1n3PageLoader } from "@/components/ui/v1n3-loader"
import { 
  type Profile, 
  communityDisplayNames, 
  lgaDisplayNames
} from "@/types/database"

// Community options with icons
const communityOptions = [
  { value: "crop_farming", name: "Crop Farming", icon: Sprout },
  { value: "animal_farming", name: "Animal Farming", icon: Tractor },
  { value: "agro_marketing", name: "Agro Marketing", icon: ShoppingCart },
  { value: "agro_processing", name: "Agro Processing", icon: Factory },
  { value: "management_legislation", name: "Management & Legislation", icon: Scale },
  { value: "agro_tourism", name: "Agro Tourism", icon: Palmtree },
  { value: "agro_technology", name: "Agro Technology", icon: Cpu },
  { value: "agro_health_care", name: "Agro Health Care", icon: Heart },
  { value: "agro_media_branding", name: "Agro Media & Branding", icon: Megaphone },
  { value: "agro_security", name: "Agro Security", icon: Shield },
  { value: "agro_literature", name: "Agro Literature", icon: BookOpen },
  { value: "motivation_training", name: "Motivation & Training", icon: GraduationCap },
  { value: "agro_real_estate", name: "Agro Real Estate", icon: Building2 },
  { value: "agro_logistics", name: "Agro Logistics", icon: Truck }
]

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
]

// Read-only Field Component with lock icon and admin contact info
function ReadOnlyField({ 
  label, 
  value, 
  icon: Icon,
  helperText 
}: { 
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
  helperText?: string
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs text-muted-foreground flex items-center gap-1.5">
        {label}
        <Lock className="w-3 h-3 text-muted-foreground/60" />
      </label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />}
        <div className={`w-full h-10 bg-secondary/30 border border-border/40 rounded-[4px] flex items-center text-sm text-muted-foreground ${Icon ? 'pl-10 pr-3' : 'px-3'}`}>
          {value || <span className="text-muted-foreground/40">Not set</span>}
        </div>
      </div>
      {helperText && (
        <p className="text-[10px] text-muted-foreground/60 flex items-center gap-1">
          <Info className="w-3 h-3" />
          {helperText}
        </p>
      )}
    </div>
  )
}

// Beautiful Custom Dropdown for Gender (only when not set)
function CustomGenderDropdown({ 
  value, 
  onChange,
  disabled
}: { 
  value: string
  onChange: (value: string) => void
  disabled: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selectedOption = genderOptions.find(g => g.value === value)

  if (disabled) {
    return (
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground flex items-center gap-1.5">
          Gender
          <Lock className="w-3 h-3 text-muted-foreground/60" />
        </label>
        <div className="w-full h-10 bg-secondary/30 border border-border/40 rounded-[4px] flex items-center px-3 text-sm text-muted-foreground">
          {selectedOption?.label || <span className="text-muted-foreground/40">Not set</span>}
        </div>
        <p className="text-[10px] text-muted-foreground/60 flex items-center gap-1">
          <Info className="w-3 h-3" />
          Contact admin to change
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2" ref={dropdownRef}>
      <label className="text-xs text-muted-foreground">Gender</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full h-10 bg-secondary/50 border rounded-[4px] px-3 text-left flex items-center justify-between transition-all duration-200 ${
            isOpen ? 'border-primary ring-1 ring-primary/20' : 'border-border/60 hover:border-border'
          }`}
        >
          <span className={value ? 'text-foreground text-sm' : 'text-muted-foreground/60 text-sm'}>
            {selectedOption?.label || "Select gender"}
          </span>
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-card border border-border/60 rounded-[4px] shadow-xl shadow-black/20 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
            <div className="max-h-[200px] overflow-y-auto">
              {genderOptions.map((option) => {
                const isSelected = value === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value)
                      setIsOpen(false)
                    }}
                    className={`w-full px-3 py-2.5 flex items-center gap-3 text-left transition-all duration-150 ${
                      isSelected 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-primary/10 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <User className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-primary-foreground' : 'text-primary'}`} />
                    <span className="flex-1 text-sm">{option.label}</span>
                    {isSelected && <Check className="w-4 h-4 flex-shrink-0" />}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
      <p className="text-[10px] text-orange flex items-center gap-1">
        <AlertCircle className="w-3 h-3" />
        Once set, gender cannot be changed
      </p>
    </div>
  )
}

// Display-only Community Card
function CommunityDisplay({ communityValue }: { communityValue: string }) {
  const community = communityOptions.find(c => c.value === communityValue)
  const Icon = community?.icon || Sprout

  return (
    <div className="space-y-2">
      <label className="text-xs text-muted-foreground flex items-center gap-1.5">
        Community
        <Lock className="w-3 h-3 text-muted-foreground/60" />
      </label>
      <div className="w-full bg-secondary/30 border border-border/40 rounded-[4px] p-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-[4px] bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-foreground font-medium">{community?.name || communityDisplayNames[communityValue as keyof typeof communityDisplayNames] || "Not set"}</p>
          <p className="text-[10px] text-muted-foreground">Agro Community</p>
        </div>
      </div>
      <p className="text-[10px] text-muted-foreground/60 flex items-center gap-1">
        <Info className="w-3 h-3" />
        Contact admin to request community change
      </p>
    </div>
  )
}

// Display-only LGA Card
function LGADisplay({ lgaValue }: { lgaValue: string }) {
  return (
    <div className="space-y-2">
      <label className="text-xs text-muted-foreground flex items-center gap-1.5">
        Local Government
        <Lock className="w-3 h-3 text-muted-foreground/60" />
      </label>
      <div className="w-full bg-secondary/30 border border-border/40 rounded-[4px] p-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-[4px] bg-orange/10 border border-orange/20 flex items-center justify-center">
          <MapPin className="w-5 h-5 text-orange" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-foreground font-medium">{lgaDisplayNames[lgaValue as keyof typeof lgaDisplayNames] || lgaValue || "Not set"}</p>
          <p className="text-[10px] text-muted-foreground">Plateau State, Nigeria</p>
        </div>
      </div>
      <p className="text-[10px] text-muted-foreground/60 flex items-center gap-1">
        <Lock className="w-3 h-3" />
        Local government cannot be changed
      </p>
    </div>
  )
}

export default function EditProfilePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  // Form state - only editable fields
  const [formData, setFormData] = useState({
    bio: "",
    date_of_birth: "",
    gender: "",
    username: "",
    twitter_url: "",
    facebook_url: "",
    instagram_url: "",
    linkedin_url: "",
  })

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

      const p = profileData as Profile
      setProfile(p)
      setFormData({
        bio: p.bio || "",
        date_of_birth: p.date_of_birth || "",
        gender: p.gender || "",
        username: p.username || "",
        twitter_url: p.twitter_url || "",
        facebook_url: p.facebook_url || "",
        instagram_url: p.instagram_url || "",
        linkedin_url: p.linkedin_url || "",
      })
      setLoading(false)
    }

    fetchProfile()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingAvatar(true)
    setError(null)

    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)

      const response = await fetch('/api/upload/avatar', {
        method: 'POST',
        body: formDataUpload,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload avatar')
      }

      setProfile(prev => prev ? { ...prev, avatar_url: data.url } : null)
      setSuccess('Avatar updated successfully!')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload avatar')
    } finally {
      setUploadingAvatar(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const updates: Record<string, string | null> = {}
      
      // Only allow updating specific fields
      if (formData.bio !== (profile?.bio || "")) updates.bio = formData.bio || null
      if (formData.username !== (profile?.username || "")) updates.username = formData.username
      if (formData.twitter_url !== (profile?.twitter_url || "")) updates.twitter_url = formData.twitter_url || null
      if (formData.facebook_url !== (profile?.facebook_url || "")) updates.facebook_url = formData.facebook_url || null
      if (formData.instagram_url !== (profile?.instagram_url || "")) updates.instagram_url = formData.instagram_url || null
      if (formData.linkedin_url !== (profile?.linkedin_url || "")) updates.linkedin_url = formData.linkedin_url || null
      
      // Date of birth - only if not already set
      if (!profile?.date_of_birth && formData.date_of_birth) {
        updates.date_of_birth = formData.date_of_birth
      }
      
      // Gender - only if not already set
      if (!profile?.gender && formData.gender) {
        updates.gender = formData.gender
      }

      if (Object.keys(updates).length === 0) {
        setSuccess('No changes to save')
        setTimeout(() => setSuccess(null), 3000)
        setSaving(false)
        return
      }

      const response = await fetch('/api/profile/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile')
      }

      setProfile(data.profile)
      setSuccess('Profile updated successfully!')
      setTimeout(() => {
        setSuccess(null)
        router.push('/profile')
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading || !profile) {
    return <V1n3PageLoader />
  }

  const initials = profile.first_name && profile.last_name 
    ? `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase()
    : profile.username?.slice(0, 2).toUpperCase() || "U"

  // Determine if DOB and Gender are locked (already set)
  const isDobLocked = !!profile.date_of_birth
  const isGenderLocked = !!profile.gender

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link 
              href="/profile" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Profile</span>
            </Link>
            <Button 
              size="sm" 
              onClick={handleSubmit}
              disabled={saving}
              className="h-8 gap-2 rounded-[4px] text-xs"
            >
              {saving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Messages */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-[4px] flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
            <p className="text-sm text-destructive">{error}</p>
            <button onClick={() => setError(null)} className="ml-auto">
              <X className="w-4 h-4 text-destructive" />
            </button>
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-[4px] flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm text-primary">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Section */}
          <div className="bg-card border border-border/60 rounded-[4px] p-6">
            <h2 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
              <Camera className="w-4 h-4 text-primary" />
              Profile Photo
            </h2>
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-secondary border-2 border-border/60 flex items-center justify-center overflow-hidden">
                  {profile.avatar_url ? (
                    <Image
                      src={profile.avatar_url}
                      alt="Profile"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-muted-foreground">{initials}</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleAvatarClick}
                  disabled={uploadingAvatar}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {uploadingAvatar ? (
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  ) : (
                    <Camera className="w-6 h-6 text-white" />
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
              <div>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={handleAvatarClick}
                  disabled={uploadingAvatar}
                  className="h-9 rounded-[4px] text-xs"
                >
                  {uploadingAvatar ? 'Uploading...' : 'Change Photo'}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  JPG, PNG, WebP or GIF. Max 5MB.
                </p>
              </div>
            </div>
          </div>

          {/* Personal Information (Read-Only) */}
          <div className="bg-card border border-border/60 rounded-[4px] p-6">
            <h2 className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Personal Information
            </h2>
            <p className="text-[10px] text-muted-foreground mb-4">These fields require admin approval to change</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ReadOnlyField 
                label="First Name" 
                value={profile.first_name || ""} 
                icon={User}
                helperText="Contact admin to change"
              />
              <ReadOnlyField 
                label="Last Name" 
                value={profile.last_name || ""} 
                icon={User}
                helperText="Contact admin to change"
              />
              <ReadOnlyField 
                label="Email" 
                value={profile.email || ""} 
                icon={Mail}
                helperText="Email cannot be changed"
              />
              <ReadOnlyField 
                label="Phone Number" 
                value={profile.phone || ""} 
                icon={Phone}
                helperText="Contact admin to change"
              />
            </div>
          </div>

          {/* Date of Birth & Gender */}
          <div className="bg-card border border-border/60 rounded-[4px] p-6">
            <h2 className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Additional Details
            </h2>
            <p className="text-[10px] text-muted-foreground mb-4">These fields can only be set once</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Date of Birth */}
              {isDobLocked ? (
                <ReadOnlyField 
                  label="Date of Birth" 
                  value={profile.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ""} 
                  icon={Calendar}
                  helperText="Contact admin to change"
                />
              ) : (
                <div className="space-y-2">
                  <label htmlFor="date_of_birth" className="text-xs text-muted-foreground">Date of Birth</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="date_of_birth"
                      name="date_of_birth"
                      type="date"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      className="h-10 pl-10 bg-secondary/50 border-border/60 rounded-[4px] text-sm"
                    />
                  </div>
                  <p className="text-[10px] text-orange flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Once set, date of birth cannot be changed
                  </p>
                </div>
              )}
              
              {/* Gender */}
              <CustomGenderDropdown
                value={formData.gender}
                onChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                disabled={isGenderLocked}
              />
            </div>
          </div>

          {/* Bio */}
          <div className="bg-card border border-border/60 rounded-[4px] p-6">
            <h2 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              About You
            </h2>
            <div className="space-y-2">
              <label htmlFor="bio" className="text-xs text-muted-foreground">Bio</label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself, your agricultural journey, and your goals..."
                rows={4}
                maxLength={500}
                className="bg-secondary/50 border-border/60 rounded-[4px] text-sm resize-none"
              />
              <p className="text-[10px] text-muted-foreground text-right">
                {formData.bio.length}/500 characters
              </p>
            </div>
          </div>

          {/* Username */}
          <div className="bg-card border border-border/60 rounded-[4px] p-6">
            <h2 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
              <AtSign className="w-4 h-4 text-primary" />
              Username
            </h2>
            <div className="space-y-2">
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={profile.username_changed}
                  placeholder="Your username"
                  className="h-10 pl-10 bg-secondary/50 border-border/60 rounded-[4px] text-sm disabled:opacity-50 disabled:bg-secondary/30"
                />
              </div>
              {profile.username_changed ? (
                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Username already changed once.
                  {profile.original_username && ` Original: ${profile.original_username}`}
                </p>
              ) : (
                <p className="text-[10px] text-orange flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  You can only change your username once. Choose wisely!
                </p>
              )}
            </div>
          </div>

          {/* Community & Location (Read-Only) */}
          <div className="bg-card border border-border/60 rounded-[4px] p-6">
            <h2 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
              <Sprout className="w-4 h-4 text-primary" />
              Community & Location
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CommunityDisplay communityValue={profile.community || ""} />
              <LGADisplay lgaValue={profile.local_government || ""} />
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-card border border-border/60 rounded-[4px] p-6">
            <h2 className="text-sm font-medium text-foreground mb-4">Social Links</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="twitter_url" className="text-xs text-muted-foreground">Twitter / X</label>
                <div className="relative">
                  <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="twitter_url"
                    name="twitter_url"
                    value={formData.twitter_url}
                    onChange={handleChange}
                    placeholder="https://twitter.com/username"
                    className="h-10 pl-10 bg-secondary/50 border-border/60 rounded-[4px] text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="facebook_url" className="text-xs text-muted-foreground">Facebook</label>
                <div className="relative">
                  <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="facebook_url"
                    name="facebook_url"
                    value={formData.facebook_url}
                    onChange={handleChange}
                    placeholder="https://facebook.com/username"
                    className="h-10 pl-10 bg-secondary/50 border-border/60 rounded-[4px] text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="instagram_url" className="text-xs text-muted-foreground">Instagram</label>
                <div className="relative">
                  <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="instagram_url"
                    name="instagram_url"
                    value={formData.instagram_url}
                    onChange={handleChange}
                    placeholder="https://instagram.com/username"
                    className="h-10 pl-10 bg-secondary/50 border-border/60 rounded-[4px] text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="linkedin_url" className="text-xs text-muted-foreground">LinkedIn</label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="linkedin_url"
                    name="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                    className="h-10 pl-10 bg-secondary/50 border-border/60 rounded-[4px] text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Admin Contact Notice */}
          <div className="bg-orange/5 border border-orange/20 rounded-[4px] p-4">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-orange">Need to change locked fields?</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Personal information (name, phone), date of birth, gender, and community require admin approval to change. 
                  Local government cannot be changed under any circumstances.
                </p>
                <Button 
                  type="button"
                  variant="outline" 
                  size="sm" 
                  className="mt-3 h-8 text-xs border-orange/30 text-orange hover:bg-orange/10 rounded-[4px]"
                  onClick={() => {/* TODO: Open contact admin modal */}}
                >
                  Contact Admin
                </Button>
              </div>
            </div>
          </div>

          {/* Save Button (Mobile) */}
          <div className="sm:hidden">
            <Button 
              type="submit"
              disabled={saving}
              className="w-full h-11 gap-2 rounded-[4px]"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Changes
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
