// Database types for AgroV1n3 platform
// Matches the Supabase schema

export type UserRole = 
  | 'admin'
  | 'regular'
  | 'lgpa'
  | 'scc'
  | 'gcm'
  | 'agro_executive'

export type CommunityType =
  | 'crop_farming'
  | 'animal_farming'
  | 'agro_marketing'
  | 'agro_processing'
  | 'management_legislation'
  | 'agro_tourism'
  | 'agro_technology'
  | 'agro_health_care'
  | 'agro_media_branding'
  | 'agro_security'
  | 'agro_literature'
  | 'motivation_training'
  | 'agro_real_estate'
  | 'agro_logistics'

export type LocalGovernment =
  | 'barkin_ladi'
  | 'bassa'
  | 'bokkos'
  | 'jos_east'
  | 'jos_north'
  | 'jos_south'
  | 'kanam'
  | 'kanke'
  | 'langtang_north'
  | 'langtang_south'
  | 'mangu'
  | 'mikang'
  | 'pankshin'
  | 'quaan_pan'
  | 'riyom'
  | 'shendam'
  | 'wase'

export interface Profile {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  avatar_url: string | null
  
  // Cool auto-generated identifiers
  // Username format: SwiftFalcon42, GreenVine77, etc.
  username: string
  // Agro ID format: GV-CROP-X7K9M2, GV-TECH-B3N8P5, etc.
  agro_id: string
  
  // Role and user type
  role: UserRole
  
  // Community and location
  community: CommunityType | null
  local_government: LocalGovernment | null
  
  // Username change tracking (can only change once)
  username_changed: boolean
  username_changed_at: string | null
  original_username: string | null
  
  // V1n3 wallet
  v1n3_balance: number
  wallet_address: string | null
  
  // Status and verification
  is_verified: boolean
  is_active: boolean
  
  // Profile completeness
  profile_completed: boolean
  onboarding_step: number
  
  // Additional metadata
  bio: string | null
  date_of_birth: string | null
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null
  
  // Social links
  twitter_url: string | null
  facebook_url: string | null
  instagram_url: string | null
  linkedin_url: string | null
  
  // For LGPA, SCC, GCM specific fields
  managed_lga: LocalGovernment | null
  managed_community: CommunityType | null
  appointed_at: string | null
  appointed_by: string | null
  
  // Ratings and performance
  performance_rating: number
  total_ratings: number
  
  // Timestamps
  created_at: string
  updated_at: string
  last_login_at: string | null
}

// Helper type for creating a new profile
export type ProfileInsert = Omit<Profile, 
  | 'id' 
  | 'username' 
  | 'agro_id' 
  | 'username_changed'
  | 'username_changed_at'
  | 'original_username'
  | 'v1n3_balance'
  | 'is_verified'
  | 'is_active'
  | 'profile_completed'
  | 'onboarding_step'
  | 'performance_rating'
  | 'total_ratings'
  | 'created_at'
  | 'updated_at'
  | 'last_login_at'
>

// Helper type for updating a profile
export type ProfileUpdate = Partial<Omit<Profile, 
  | 'id' 
  | 'email' 
  | 'agro_id' 
  | 'created_at'
>>

// Community display names mapping
export const communityDisplayNames: Record<CommunityType, string> = {
  crop_farming: 'Crop Farming',
  animal_farming: 'Animal Farming',
  agro_marketing: 'Agro Marketing',
  agro_processing: 'Agro Processing',
  management_legislation: 'Management & Legislation',
  agro_tourism: 'Agro Tourism',
  agro_technology: 'Agro Technology',
  agro_health_care: 'Agro Health Care',
  agro_media_branding: 'Agro Media & Branding',
  agro_security: 'Agro Security',
  agro_literature: 'Agro Literature',
  motivation_training: 'Motivation & Training',
  agro_real_estate: 'Agro Real Estate',
  agro_logistics: 'Agro Logistics',
}

// LGA display names mapping
export const lgaDisplayNames: Record<LocalGovernment, string> = {
  barkin_ladi: 'Barkin Ladi',
  bassa: 'Bassa',
  bokkos: 'Bokkos',
  jos_east: 'Jos East',
  jos_north: 'Jos North',
  jos_south: 'Jos South',
  kanam: 'Kanam',
  kanke: 'Kanke',
  langtang_north: 'Langtang North',
  langtang_south: 'Langtang South',
  mangu: 'Mangu',
  mikang: 'Mikang',
  pankshin: 'Pankshin',
  quaan_pan: "Qua'an Pan",
  riyom: 'Riyom',
  shendam: 'Shendam',
  wase: 'Wase',
}

// Role display names mapping
export const roleDisplayNames: Record<UserRole, string> = {
  admin: 'Administrator',
  regular: 'Regular User',
  lgpa: 'LG Program Administrator',
  scc: 'State Coordinating Council',
  gcm: 'Green V1n3 Community Manager',
  agro_executive: 'Agro Executive',
}

// Role descriptions
export const roleDescriptions: Record<UserRole, string> = {
  admin: 'Full platform access and control',
  regular: 'Standard user with basic access',
  lgpa: 'Manages participants at the local government level',
  scc: 'Oversees all activities across the state',
  gcm: 'Manages participants within a specific community',
  agro_executive: 'Trained participant in the agriculture value chain',
}
