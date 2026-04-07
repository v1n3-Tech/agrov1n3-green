"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Shield, 
  UserCheck, 
  UserX,
  ChevronDown,
  Check,
  X,
  Eye,
  Mail,
  Copy,
  RefreshCw,
  Download,
  Upload,
  MapPin,
  Sprout,
  Tractor,
  ShoppingCart,
  Factory,
  Scale,
  Palmtree,
  Cpu,
  Heart,
  Megaphone,
  BookOpen,
  GraduationCap,
  Building2,
  Truck,
  AlertCircle,
  CheckCircle,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  UserPlus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { V1n3PageLoader } from "@/components/ui/v1n3-loader"
import type { Profile, UserRole, CommunityType, LocalGovernment } from "@/types/database"
import { roleDisplayNames, roleDescriptions, communityDisplayNames, lgaDisplayNames } from "@/types/database"

const communities = [
  { name: "Crop Farming", value: "crop_farming", icon: Sprout },
  { name: "Animal Farming", value: "animal_farming", icon: Tractor },
  { name: "Agro Marketing", value: "agro_marketing", icon: ShoppingCart },
  { name: "Agro Processing", value: "agro_processing", icon: Factory },
  { name: "Management & Legislation", value: "management_legislation", icon: Scale },
  { name: "Agro Tourism", value: "agro_tourism", icon: Palmtree },
  { name: "Agro Technology", value: "agro_technology", icon: Cpu },
  { name: "Agro Health Care", value: "agro_health_care", icon: Heart },
  { name: "Agro Media & Branding", value: "agro_media_branding", icon: Megaphone },
  { name: "Agro Security", value: "agro_security", icon: Shield },
  { name: "Agro Literature", value: "agro_literature", icon: BookOpen },
  { name: "Motivation & Training", value: "motivation_training", icon: GraduationCap },
  { name: "Agro Real Estate", value: "agro_real_estate", icon: Building2 },
  { name: "Agro Logistics", value: "agro_logistics", icon: Truck }
]

const localGovernments = [
  { name: "Barkin Ladi", value: "barkin_ladi" },
  { name: "Bassa", value: "bassa" },
  { name: "Bokkos", value: "bokkos" },
  { name: "Jos East", value: "jos_east" },
  { name: "Jos North", value: "jos_north" },
  { name: "Jos South", value: "jos_south" },
  { name: "Kanam", value: "kanam" },
  { name: "Kanke", value: "kanke" },
  { name: "Langtang North", value: "langtang_north" },
  { name: "Langtang South", value: "langtang_south" },
  { name: "Mangu", value: "mangu" },
  { name: "Mikang", value: "mikang" },
  { name: "Pankshin", value: "pankshin" },
  { name: "Qua'an Pan", value: "quaan_pan" },
  { name: "Riyom", value: "riyom" },
  { name: "Shendam", value: "shendam" },
  { name: "Wase", value: "wase" }
]

const roles: { name: string; value: UserRole; description: string; color: string }[] = [
  { name: "Administrator", value: "admin", description: "Full platform access", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  { name: "Agro Executive", value: "agro_executive", description: "Trained participant", color: "bg-primary/20 text-primary border-primary/30" },
  { name: "Regular User", value: "regular", description: "Standard access", color: "bg-muted text-muted-foreground border-border" },
  { name: "LG Program Admin", value: "lgpa", description: "Local government level", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { name: "State Coordinating Council", value: "scc", description: "State-wide oversight", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  { name: "Community Manager", value: "gcm", description: "Community management", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
]

// Custom Dropdown Component
function CustomDropdown({ 
  label, 
  value, 
  onChange, 
  options, 
  placeholder,
  type = "text",
  disabled = false
}: { 
  label: string
  value: string
  onChange: (value: string) => void
  options: { name: string; value: string; icon?: React.ComponentType<{ className?: string }>; description?: string; color?: string }[]
  placeholder: string
  type?: "lga" | "community" | "role" | "text"
  disabled?: boolean
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

  const selectedOption = options.find(o => o.value === value)

  return (
    <div className="space-y-2" ref={dropdownRef}>
      <label className="text-sm text-foreground font-medium">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full h-11 bg-secondary/50 border rounded-[4px] px-3 text-left flex items-center justify-between transition-all duration-200 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          } ${
            isOpen ? 'border-primary ring-1 ring-primary/20' : 'border-border/60 hover:border-border'
          }`}
        >
          <span className={value ? 'text-foreground flex items-center gap-2' : 'text-muted-foreground/60'}>
            {selectedOption?.icon && <selectedOption.icon className="w-4 h-4 text-primary" />}
            {selectedOption?.name || placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-card border border-border/60 rounded-[4px] shadow-xl shadow-black/20 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
            <div className="max-h-[280px] overflow-y-auto scrollbar-thin">
              {options.map((option) => {
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
                    {option.icon && (
                      <option.icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-primary-foreground' : 'text-primary'}`} />
                    )}
                    {type === "lga" && !option.icon && (
                      <MapPin className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-primary-foreground' : 'text-orange-400'}`} />
                    )}
                    <div className="flex-1">
                      <span className="text-sm block">{option.name}</span>
                      {option.description && (
                        <span className={`text-xs ${isSelected ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                          {option.description}
                        </span>
                      )}
                    </div>
                    {isSelected && <Check className="w-4 h-4 flex-shrink-0" />}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Create User Modal
function CreateUserModal({ 
  isOpen, 
  onClose, 
  onSuccess 
}: { 
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    role: "regular" as UserRole,
    community: "" as CommunityType | "",
    localGovernment: "" as LocalGovernment | "",
    managedLga: "" as LocalGovernment | "",
    managedCommunity: "" as CommunityType | "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const needsManagedLga = formData.role === "lgpa"
  const needsManagedCommunity = formData.role === "gcm"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/admin/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create user")
      }

      onSuccess()
      onClose()
      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        role: "regular",
        community: "",
        localGovernment: "",
        managedLga: "",
        managedCommunity: "",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border/60 rounded-[4px] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border/60 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[4px] bg-primary/20 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Create New User</h2>
              <p className="text-sm text-muted-foreground">Add a new user to the platform</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-secondary/80 rounded-[4px] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 rounded-[4px] bg-red-500/10 border border-red-500/30 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="John"
                  className="h-11 bg-secondary/50 border-border/60 rounded-[4px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Doe"
                  className="h-11 bg-secondary/50 border-border/60 rounded-[4px]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="h-11 bg-secondary/50 border-border/60 rounded-[4px]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+234 800 000 0000"
                  className="h-11 bg-secondary/50 border-border/60 rounded-[4px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Min 8 characters"
                  className="h-11 bg-secondary/50 border-border/60 rounded-[4px]"
                  required
                  minLength={8}
                />
              </div>
            </div>
          </div>

          {/* Role & Assignment */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Role & Assignment</h3>
            
            <CustomDropdown
              label="User Role"
              value={formData.role}
              onChange={(value) => setFormData({ ...formData, role: value as UserRole, managedLga: "", managedCommunity: "" })}
              options={roles}
              placeholder="Select role"
              type="role"
            />

            <div className="grid grid-cols-2 gap-4">
              <CustomDropdown
                label="Community"
                value={formData.community}
                onChange={(value) => setFormData({ ...formData, community: value as CommunityType })}
                options={communities}
                placeholder="Select community"
                type="community"
              />
              <CustomDropdown
                label="Local Government"
                value={formData.localGovernment}
                onChange={(value) => setFormData({ ...formData, localGovernment: value as LocalGovernment })}
                options={localGovernments}
                placeholder="Select LGA"
                type="lga"
              />
            </div>

            {/* Conditional fields based on role */}
            {needsManagedLga && (
              <div className="p-4 rounded-[4px] bg-blue-500/10 border border-blue-500/30 space-y-3">
                <p className="text-sm text-blue-400 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  LG Program Administrator Assignment
                </p>
                <CustomDropdown
                  label="Managed Local Government"
                  value={formData.managedLga}
                  onChange={(value) => setFormData({ ...formData, managedLga: value as LocalGovernment })}
                  options={localGovernments}
                  placeholder="Select LGA to manage"
                  type="lga"
                />
              </div>
            )}

            {needsManagedCommunity && (
              <div className="p-4 rounded-[4px] bg-orange-500/10 border border-orange-500/30 space-y-3">
                <p className="text-sm text-orange-400 flex items-center gap-2">
                  <Sprout className="w-4 h-4" />
                  Community Manager Assignment
                </p>
                <CustomDropdown
                  label="Managed Community"
                  value={formData.managedCommunity}
                  onChange={(value) => setFormData({ ...formData, managedCommunity: value as CommunityType })}
                  options={communities}
                  placeholder="Select community to manage"
                  type="community"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-[4px]">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="rounded-[4px] bg-primary hover:bg-primary/90 gap-2">
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Create User
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Edit User Modal
function EditUserModal({ 
  isOpen, 
  onClose, 
  user,
  onSuccess 
}: { 
  isOpen: boolean
  onClose: () => void
  user: Profile | null
  onSuccess: () => void
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    role: "regular" as UserRole,
    community: "" as CommunityType | "",
    localGovernment: "" as LocalGovernment | "",
    managedLga: "" as LocalGovernment | "",
    managedCommunity: "" as CommunityType | "",
    isVerified: false,
    isActive: true,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        phone: user.phone || "",
        role: user.role,
        community: user.community || "",
        localGovernment: user.local_government || "",
        managedLga: user.managed_lga || "",
        managedCommunity: user.managed_community || "",
        isVerified: user.is_verified,
        isActive: user.is_active,
      })
    }
  }, [user])

  const needsManagedLga = formData.role === "lgpa"
  const needsManagedCommunity = formData.role === "gcm"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update user")
      }

      onSuccess()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update user")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen || !user) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border/60 rounded-[4px] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border/60 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 rounded-[4px]">
              <AvatarImage src={user.avatar_url || undefined} alt={user.username} />
              <AvatarFallback className="rounded-[4px] bg-primary/20 text-primary">
                {user.first_name?.[0]}{user.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">Edit User</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-secondary/80 rounded-[4px] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 rounded-[4px] bg-red-500/10 border border-red-500/30 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* User Info Display */}
          <div className="p-4 rounded-[4px] bg-secondary/30 border border-border/40 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Username</p>
              <p className="font-medium">{user.username}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Agro ID</p>
              <p className="font-mono text-primary text-sm">{user.agro_id}</p>
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="John"
                  className="h-11 bg-secondary/50 border-border/60 rounded-[4px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Doe"
                  className="h-11 bg-secondary/50 border-border/60 rounded-[4px]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+234 800 000 0000"
                className="h-11 bg-secondary/50 border-border/60 rounded-[4px]"
              />
            </div>
          </div>

          {/* Role & Assignment */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Role & Assignment</h3>
            
            <CustomDropdown
              label="User Role"
              value={formData.role}
              onChange={(value) => setFormData({ ...formData, role: value as UserRole, managedLga: "", managedCommunity: "" })}
              options={roles}
              placeholder="Select role"
              type="role"
            />

            <div className="grid grid-cols-2 gap-4">
              <CustomDropdown
                label="Community"
                value={formData.community}
                onChange={(value) => setFormData({ ...formData, community: value as CommunityType })}
                options={communities}
                placeholder="Select community"
                type="community"
              />
              <CustomDropdown
                label="Local Government"
                value={formData.localGovernment}
                onChange={(value) => setFormData({ ...formData, localGovernment: value as LocalGovernment })}
                options={localGovernments}
                placeholder="Select LGA"
                type="lga"
              />
            </div>

            {needsManagedLga && (
              <div className="p-4 rounded-[4px] bg-blue-500/10 border border-blue-500/30 space-y-3">
                <p className="text-sm text-blue-400 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  LG Program Administrator Assignment
                </p>
                <CustomDropdown
                  label="Managed Local Government"
                  value={formData.managedLga}
                  onChange={(value) => setFormData({ ...formData, managedLga: value as LocalGovernment })}
                  options={localGovernments}
                  placeholder="Select LGA to manage"
                  type="lga"
                />
              </div>
            )}

            {needsManagedCommunity && (
              <div className="p-4 rounded-[4px] bg-orange-500/10 border border-orange-500/30 space-y-3">
                <p className="text-sm text-orange-400 flex items-center gap-2">
                  <Sprout className="w-4 h-4" />
                  Community Manager Assignment
                </p>
                <CustomDropdown
                  label="Managed Community"
                  value={formData.managedCommunity}
                  onChange={(value) => setFormData({ ...formData, managedCommunity: value as CommunityType })}
                  options={communities}
                  placeholder="Select community to manage"
                  type="community"
                />
              </div>
            )}
          </div>

          {/* Account Status */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Account Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, isVerified: !formData.isVerified })}
                className={`p-4 rounded-[4px] border text-left transition-all ${
                  formData.isVerified 
                    ? 'bg-primary/10 border-primary/30' 
                    : 'bg-secondary/30 border-border/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <UserCheck className={`w-5 h-5 ${formData.isVerified ? 'text-primary' : 'text-muted-foreground'}`} />
                  {formData.isVerified && <Check className="w-4 h-4 text-primary" />}
                </div>
                <p className={`font-medium ${formData.isVerified ? 'text-primary' : 'text-foreground'}`}>Verified</p>
                <p className="text-xs text-muted-foreground">User identity confirmed</p>
              </button>
              
              <button
                type="button"
                onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                className={`p-4 rounded-[4px] border text-left transition-all ${
                  formData.isActive 
                    ? 'bg-green-500/10 border-green-500/30' 
                    : 'bg-red-500/10 border-red-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  {formData.isActive ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <UserX className="w-5 h-5 text-red-400" />
                  )}
                  {formData.isActive && <Check className="w-4 h-4 text-green-400" />}
                </div>
                <p className={`font-medium ${formData.isActive ? 'text-green-400' : 'text-red-400'}`}>
                  {formData.isActive ? 'Active' : 'Suspended'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formData.isActive ? 'Account is active' : 'Account is suspended'}
                </p>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-[4px]">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="rounded-[4px] bg-primary hover:bg-primary/90 gap-2">
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// View User Modal
function ViewUserModal({ 
  isOpen, 
  onClose, 
  user 
}: { 
  isOpen: boolean
  onClose: () => void
  user: Profile | null
}) {
  if (!isOpen || !user) return null

  const getCommunityIcon = (community: CommunityType | null) => {
    const found = communities.find(c => c.value === community)
    return found?.icon || Sprout
  }

  const CommunityIcon = getCommunityIcon(user.community)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border/60 rounded-[4px] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="relative h-32 bg-gradient-to-br from-primary/30 via-primary/10 to-background">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 rounded-[4px] transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        
        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-12 mb-6">
            <Avatar className="h-24 w-24 rounded-[4px] border-4 border-card">
              <AvatarImage src={user.avatar_url || undefined} alt={user.username} />
              <AvatarFallback className="rounded-[4px] bg-primary/20 text-primary text-2xl">
                {user.first_name?.[0]}{user.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">{user.first_name} {user.last_name}</h2>
                {user.is_verified && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
              </div>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>
            <Badge className={roles.find(r => r.value === user.role)?.color || "bg-muted"}>
              {roleDisplayNames[user.role]}
            </Badge>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Agro ID */}
            <div className="col-span-2 p-4 rounded-[4px] bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
              <p className="text-xs text-muted-foreground mb-1">Agro ID</p>
              <p className="font-mono text-lg text-primary font-semibold">{user.agro_id}</p>
            </div>

            {/* Contact */}
            <div className="p-4 rounded-[4px] bg-secondary/30 border border-border/40">
              <p className="text-xs text-muted-foreground mb-1">Email</p>
              <p className="text-sm">{user.email}</p>
            </div>
            <div className="p-4 rounded-[4px] bg-secondary/30 border border-border/40">
              <p className="text-xs text-muted-foreground mb-1">Phone</p>
              <p className="text-sm">{user.phone || "Not set"}</p>
            </div>

            {/* Community & LGA */}
            <div className="p-4 rounded-[4px] bg-secondary/30 border border-border/40">
              <p className="text-xs text-muted-foreground mb-2">Community</p>
              <div className="flex items-center gap-2">
                <CommunityIcon className="w-4 h-4 text-primary" />
                <span className="text-sm">{user.community ? communityDisplayNames[user.community] : "Not set"}</span>
              </div>
            </div>
            <div className="p-4 rounded-[4px] bg-secondary/30 border border-border/40">
              <p className="text-xs text-muted-foreground mb-2">Local Government</p>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span className="text-sm">{user.local_government ? lgaDisplayNames[user.local_government] : "Not set"}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="p-4 rounded-[4px] bg-secondary/30 border border-border/40">
              <p className="text-xs text-muted-foreground mb-1">V1n3 Balance</p>
              <p className="text-lg font-semibold text-primary">{user.v1n3_balance.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-[4px] bg-secondary/30 border border-border/40">
              <p className="text-xs text-muted-foreground mb-1">Performance Rating</p>
              <p className="text-lg font-semibold">{user.performance_rating.toFixed(1)} / 5.0</p>
            </div>

            {/* Account Status */}
            <div className="col-span-2 flex items-center gap-3">
              <div className={`flex-1 p-3 rounded-[4px] border ${user.is_verified ? 'bg-primary/10 border-primary/30' : 'bg-secondary/30 border-border/40'}`}>
                <div className="flex items-center gap-2">
                  <UserCheck className={`w-4 h-4 ${user.is_verified ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="text-sm">{user.is_verified ? 'Verified' : 'Not Verified'}</span>
                </div>
              </div>
              <div className={`flex-1 p-3 rounded-[4px] border ${user.is_active ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                <div className="flex items-center gap-2">
                  {user.is_active ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <UserX className="w-4 h-4 text-red-400" />
                  )}
                  <span className="text-sm">{user.is_active ? 'Active' : 'Suspended'}</span>
                </div>
              </div>
            </div>

            {/* Timestamps */}
            <div className="col-span-2 grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-[4px] bg-secondary/20">
                <p className="text-xs text-muted-foreground">Member Since</p>
                <p className="text-sm font-medium">{new Date(user.created_at).toLocaleDateString()}</p>
              </div>
              <div className="p-3 rounded-[4px] bg-secondary/20">
                <p className="text-xs text-muted-foreground">Last Updated</p>
                <p className="text-sm font-medium">{new Date(user.updated_at).toLocaleDateString()}</p>
              </div>
              <div className="p-3 rounded-[4px] bg-secondary/20">
                <p className="text-xs text-muted-foreground">Last Login</p>
                <p className="text-sm font-medium">
                  {user.last_login_at ? new Date(user.last_login_at).toLocaleDateString() : 'Never'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function UserManagementPage() {
  const router = useRouter()
  const [users, setUsers] = useState<Profile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all")
  const [communityFilter, setCommunityFilter] = useState<CommunityType | "all">("all")
  const [sortField, setSortField] = useState<"created_at" | "username" | "role">("created_at")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const pageSize = 10

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null)

  async function fetchUsers() {
    setIsLoading(true)
    const supabase = createClient()
    
    let query = supabase
      .from("profiles")
      .select("*", { count: "exact" })
    
    // Apply filters
    if (roleFilter !== "all") {
      query = query.eq("role", roleFilter)
    }
    if (communityFilter !== "all") {
      query = query.eq("community", communityFilter)
    }
    if (searchQuery) {
      query = query.or(`username.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%,agro_id.ilike.%${searchQuery}%`)
    }
    
    // Apply sorting
    query = query.order(sortField, { ascending: sortOrder === "asc" })
    
    // Apply pagination
    const from = (currentPage - 1) * pageSize
    const to = from + pageSize - 1
    query = query.range(from, to)
    
    const { data, count, error } = await query
    
    if (error) {
      console.error("Error fetching users:", error)
    } else {
      setUsers(data || [])
      setTotalCount(count || 0)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [roleFilter, communityFilter, sortField, sortOrder, currentPage, searchQuery])

  const totalPages = Math.ceil(totalCount / pageSize)

  const getRoleColor = (role: UserRole) => {
    return roles.find(r => r.value === role)?.color || "bg-muted text-muted-foreground border-border"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-aldrich)]">User Management</h1>
          <p className="text-muted-foreground">Manage all users on the GreenV1n3 platform</p>
        </div>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="rounded-[4px] bg-primary hover:bg-primary/90 gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-[4px] bg-card border border-border/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[4px] bg-primary/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalCount}</p>
              <p className="text-xs text-muted-foreground">Total Users</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-[4px] bg-card border border-border/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[4px] bg-green-500/20 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{users.filter(u => u.is_verified).length}</p>
              <p className="text-xs text-muted-foreground">Verified</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-[4px] bg-card border border-border/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[4px] bg-blue-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{users.filter(u => ["admin", "lgpa", "scc", "gcm"].includes(u.role)).length}</p>
              <p className="text-xs text-muted-foreground">Admins</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-[4px] bg-card border border-border/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[4px] bg-orange-500/20 flex items-center justify-center">
              <UserX className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{users.filter(u => !u.is_active).length}</p>
              <p className="text-xs text-muted-foreground">Suspended</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, username, or Agro ID..."
            className="pl-10 h-11 bg-secondary/50 border-border/60 rounded-[4px]"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-[4px] gap-2">
              <Filter className="w-4 h-4" />
              Role: {roleFilter === "all" ? "All" : roleDisplayNames[roleFilter]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-[4px]">
            <DropdownMenuItem onClick={() => setRoleFilter("all")}>All Roles</DropdownMenuItem>
            <DropdownMenuSeparator />
            {roles.map(role => (
              <DropdownMenuItem key={role.value} onClick={() => setRoleFilter(role.value)}>
                {role.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-[4px] gap-2">
              <Sprout className="w-4 h-4" />
              Community
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-[4px] max-h-[300px] overflow-y-auto">
            <DropdownMenuItem onClick={() => setCommunityFilter("all")}>All Communities</DropdownMenuItem>
            <DropdownMenuSeparator />
            {communities.map(c => (
              <DropdownMenuItem key={c.value} onClick={() => setCommunityFilter(c.value as CommunityType)}>
                <c.icon className="w-4 h-4 mr-2 text-primary" />
                {c.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button 
          variant="outline" 
          className="rounded-[4px] gap-2"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          <ArrowUpDown className="w-4 h-4" />
          {sortOrder === "asc" ? "Oldest" : "Newest"}
        </Button>
      </div>

      {/* Users Table */}
      <div className="rounded-[4px] border border-border/60 bg-card overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex items-center justify-center">
            <V1n3PageLoader />
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No users found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
            <Button onClick={() => setShowCreateModal(true)} className="rounded-[4px] gap-2">
              <Plus className="w-4 h-4" />
              Add First User
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/30 border-b border-border/60">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">User</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Community</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">LGA</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {users.map((user) => {
                  const CommunityIcon = communities.find(c => c.value === user.community)?.icon || Sprout
                  return (
                    <tr key={user.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 rounded-[4px]">
                            <AvatarImage src={user.avatar_url || undefined} alt={user.username} />
                            <AvatarFallback className="rounded-[4px] bg-primary/20 text-primary text-sm">
                              {user.first_name?.[0]}{user.last_name?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{user.first_name} {user.last_name}</p>
                              {user.is_verified && (
                                <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                                  <Check className="w-2.5 h-2.5 text-primary-foreground" />
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">@{user.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={`${getRoleColor(user.role)} border`}>
                          {roleDisplayNames[user.role]}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        {user.community ? (
                          <div className="flex items-center gap-2">
                            <CommunityIcon className="w-4 h-4 text-primary" />
                            <span className="text-sm">{communityDisplayNames[user.community]}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {user.local_government ? (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-orange-400" />
                            <span className="text-sm">{lgaDisplayNames[user.local_government]}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-[3px] text-xs ${
                          user.is_active 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${user.is_active ? 'bg-green-400' : 'bg-red-400'}`} />
                          {user.is_active ? 'Active' : 'Suspended'}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-[4px]">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-[4px]">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => { setSelectedUser(user); setShowViewModal(true); }}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setSelectedUser(user); setShowEditModal(true); }}>
                              <Edit2 className="w-4 h-4 mr-2" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.email)}>
                              <Mail className="w-4 h-4 mr-2" />
                              Copy Email
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.agro_id)}>
                              <Copy className="w-4 h-4 mr-2" />
                              Copy Agro ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} users
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-[4px]"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  className="rounded-[4px]"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              )
            })}
            <Button
              variant="outline"
              size="icon"
              className="rounded-[4px]"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Modals */}
      <CreateUserModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
        onSuccess={fetchUsers}
      />
      <EditUserModal 
        isOpen={showEditModal} 
        onClose={() => { setShowEditModal(false); setSelectedUser(null); }} 
        user={selectedUser}
        onSuccess={fetchUsers}
      />
      <ViewUserModal 
        isOpen={showViewModal} 
        onClose={() => { setShowViewModal(false); setSelectedUser(null); }} 
        user={selectedUser}
      />
    </div>
  )
}
