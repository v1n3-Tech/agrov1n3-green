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
  AtSign
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { V1n3PageLoader } from "@/components/ui/v1n3-loader"
import { 
  type Profile, 
  type CommunityType,
  type LocalGovernment,
  communityDisplayNames, 
  lgaDisplayNames
} from "@/types/database"

const communities = Object.entries(communityDisplayNames).map(([value, label]) => ({ value, label }))
const localGovernments = Object.entries(lgaDisplayNames).map(([value, label]) => ({ value, label }))
const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
]

export default function EditProfilePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    bio: "",
    date_of_birth: "",
    gender: "",
    community: "",
    local_government: "",
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
        first_name: p.first_name || "",
        last_name: p.last_name || "",
        phone: p.phone || "",
        bio: p.bio || "",
        date_of_birth: p.date_of_birth || "",
        gender: p.gender || "",
        community: p.community || "",
        local_government: p.local_government || "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload/avatar', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload avatar')
      }

      // Update local profile state with new avatar URL
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
      // Prepare updates - only include changed fields
      const updates: Record<string, string | null> = {}
      
      if (formData.first_name !== (profile?.first_name || "")) updates.first_name = formData.first_name || null
      if (formData.last_name !== (profile?.last_name || "")) updates.last_name = formData.last_name || null
      if (formData.phone !== (profile?.phone || "")) updates.phone = formData.phone || null
      if (formData.bio !== (profile?.bio || "")) updates.bio = formData.bio || null
      if (formData.date_of_birth !== (profile?.date_of_birth || "")) updates.date_of_birth = formData.date_of_birth || null
      if (formData.gender !== (profile?.gender || "")) updates.gender = formData.gender || null
      if (formData.community !== (profile?.community || "")) updates.community = formData.community || null
      if (formData.local_government !== (profile?.local_government || "")) updates.local_government = formData.local_government || null
      if (formData.username !== (profile?.username || "")) updates.username = formData.username
      if (formData.twitter_url !== (profile?.twitter_url || "")) updates.twitter_url = formData.twitter_url || null
      if (formData.facebook_url !== (profile?.facebook_url || "")) updates.facebook_url = formData.facebook_url || null
      if (formData.instagram_url !== (profile?.instagram_url || "")) updates.instagram_url = formData.instagram_url || null
      if (formData.linkedin_url !== (profile?.linkedin_url || "")) updates.linkedin_url = formData.linkedin_url || null

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

          {/* Personal Information */}
          <div className="bg-card border border-border/60 rounded-[4px] p-6">
            <h2 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="first_name" className="text-xs text-muted-foreground">First Name</label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Your first name"
                  className="h-10 bg-secondary/50 border-border/60 rounded-[4px] text-sm"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="last_name" className="text-xs text-muted-foreground">Last Name</label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Your last name"
                  className="h-10 bg-secondary/50 border-border/60 rounded-[4px] text-sm"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-xs text-muted-foreground">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+234 800 000 0000"
                    className="h-10 pl-10 bg-secondary/50 border-border/60 rounded-[4px] text-sm"
                  />
                </div>
              </div>
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
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="gender" className="text-xs text-muted-foreground">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full h-10 bg-secondary/50 border border-border/60 rounded-[4px] px-3 text-sm text-foreground"
                >
                  <option value="">Select gender</option>
                  {genderOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="bio" className="text-xs text-muted-foreground">Bio</label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  rows={3}
                  className="bg-secondary/50 border-border/60 rounded-[4px] text-sm resize-none"
                />
              </div>
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
                  className="h-10 pl-10 bg-secondary/50 border-border/60 rounded-[4px] text-sm disabled:opacity-50"
                />
              </div>
              {profile.username_changed ? (
                <p className="text-xs text-muted-foreground">
                  You have already used your one-time username change.
                  {profile.original_username && ` Original: ${profile.original_username}`}
                </p>
              ) : (
                <p className="text-xs text-orange">
                  You can only change your username once. Choose wisely!
                </p>
              )}
            </div>
          </div>

          {/* Community & Location */}
          <div className="bg-card border border-border/60 rounded-[4px] p-6">
            <h2 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
              <Sprout className="w-4 h-4 text-primary" />
              Community & Location
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="community" className="text-xs text-muted-foreground">Community</label>
                <select
                  id="community"
                  name="community"
                  value={formData.community}
                  onChange={handleChange}
                  className="w-full h-10 bg-secondary/50 border border-border/60 rounded-[4px] px-3 text-sm text-foreground"
                >
                  <option value="">Select community</option>
                  {communities.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="local_government" className="text-xs text-muted-foreground">Local Government</label>
                <div className="relative">
                  <select
                    id="local_government"
                    name="local_government"
                    value={formData.local_government}
                    onChange={handleChange}
                    className="w-full h-10 bg-secondary/50 border border-border/60 rounded-[4px] px-3 text-sm text-foreground"
                  >
                    <option value="">Select LGA</option>
                    {localGovernments.map(lg => (
                      <option key={lg.value} value={lg.value}>{lg.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-card border border-border/60 rounded-[4px] p-6">
            <h2 className="text-sm font-medium text-foreground mb-4">Social Links</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="twitter_url" className="text-xs text-muted-foreground">Twitter</label>
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

          {/* Account Info (Read Only) */}
          <div className="bg-card border border-border/60 rounded-[4px] p-6">
            <h2 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              Account Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-[4px]">
                <div>
                  <p className="text-xs text-muted-foreground">Email Address</p>
                  <p className="text-sm text-foreground">{profile.email}</p>
                </div>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">Cannot be changed</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-[4px]">
                <div>
                  <p className="text-xs text-muted-foreground">Agro ID</p>
                  <p className="text-sm text-primary font-mono font-bold">{profile.agro_id}</p>
                </div>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">Permanent</span>
              </div>
            </div>
          </div>

          {/* Submit Button - Mobile */}
          <div className="sm:hidden">
            <Button 
              type="submit"
              disabled={saving}
              className="w-full h-11 rounded-[4px] gap-2"
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
