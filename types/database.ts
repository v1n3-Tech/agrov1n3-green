// Database types for AgroV1n3 platform
// Matches the Supabase schema

export type UserRole = 
  | 'admin'
  | 'regular'
  | 'lgpa'
  | 'scc'
  | 'gcm'
  | 'agro_executive'
  | 'agro_media'

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
  agro_media: 'Content creator and media specialist for agriculture',
}

// =============================================
// COMMUNITY TABLES TYPES
// =============================================

export type PostType = 'text' | 'image' | 'video' | 'poll' | 'announcement' | 'event' | 'resource'
export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
export type ResourceType = 'document' | 'video' | 'link' | 'guide' | 'template'

// Community Post
export interface CommunityPost {
  id: string
  author_id: string
  community: CommunityType
  post_type: PostType
  title: string | null
  content: string
  media_urls: string[]
  is_pinned: boolean
  is_announcement: boolean
  likes_count: number
  comments_count: number
  shares_count: number
  views_count: number
  is_approved: boolean
  is_hidden: boolean
  moderated_by: string | null
  moderated_at: string | null
  created_at: string
  updated_at: string
  // Joined fields
  author?: Profile
}

export type CommunityPostInsert = Omit<CommunityPost, 
  | 'id' 
  | 'likes_count' 
  | 'comments_count' 
  | 'shares_count' 
  | 'views_count'
  | 'is_approved'
  | 'is_hidden'
  | 'moderated_by'
  | 'moderated_at'
  | 'created_at'
  | 'updated_at'
  | 'author'
>

// Post Like
export interface PostLike {
  id: string
  post_id: string
  user_id: string
  created_at: string
}

// Post Comment
export interface PostComment {
  id: string
  post_id: string
  author_id: string
  parent_comment_id: string | null
  content: string
  likes_count: number
  is_hidden: boolean
  created_at: string
  updated_at: string
  // Joined fields
  author?: Profile
  replies?: PostComment[]
}

export type PostCommentInsert = Omit<PostComment, 
  | 'id' 
  | 'likes_count' 
  | 'is_hidden' 
  | 'created_at' 
  | 'updated_at'
  | 'author'
  | 'replies'
>

// Comment Like
export interface CommentLike {
  id: string
  comment_id: string
  user_id: string
  created_at: string
}

// Community Event
export interface CommunityEvent {
  id: string
  organizer_id: string
  community: CommunityType
  title: string
  description: string
  cover_image_url: string | null
  location: string | null
  is_virtual: boolean
  meeting_link: string | null
  start_date: string
  end_date: string
  max_attendees: number | null
  registration_deadline: string | null
  requires_registration: boolean
  status: EventStatus
  attendees_count: number
  interested_count: number
  tags: string[]
  created_at: string
  updated_at: string
  // Joined fields
  organizer?: Profile
}

export type CommunityEventInsert = Omit<CommunityEvent, 
  | 'id' 
  | 'attendees_count' 
  | 'interested_count' 
  | 'created_at' 
  | 'updated_at'
  | 'organizer'
>

// Event Registration
export interface EventRegistration {
  id: string
  event_id: string
  user_id: string
  status: 'registered' | 'attended' | 'cancelled' | 'no_show'
  notes: string | null
  created_at: string
  // Joined fields
  user?: Profile
  event?: CommunityEvent
}

// Community Resource
export interface CommunityResource {
  id: string
  uploaded_by: string
  community: CommunityType
  title: string
  description: string | null
  resource_type: ResourceType
  file_url: string | null
  external_link: string | null
  file_size: number | null
  tags: string[]
  downloads_count: number
  views_count: number
  is_approved: boolean
  approved_by: string | null
  approved_at: string | null
  created_at: string
  updated_at: string
  // Joined fields
  uploader?: Profile
}

export type CommunityResourceInsert = Omit<CommunityResource, 
  | 'id' 
  | 'downloads_count' 
  | 'views_count' 
  | 'is_approved'
  | 'approved_by'
  | 'approved_at'
  | 'created_at' 
  | 'updated_at'
  | 'uploader'
>

// Community Discussion
export interface CommunityDiscussion {
  id: string
  author_id: string
  community: CommunityType
  title: string
  content: string
  category: string | null
  tags: string[]
  is_pinned: boolean
  is_locked: boolean
  is_answered: boolean
  best_answer_id: string | null
  replies_count: number
  views_count: number
  likes_count: number
  last_reply_at: string | null
  last_reply_by: string | null
  created_at: string
  updated_at: string
  // Joined fields
  author?: Profile
}

export type CommunityDiscussionInsert = Omit<CommunityDiscussion, 
  | 'id' 
  | 'is_pinned'
  | 'is_locked'
  | 'is_answered'
  | 'best_answer_id'
  | 'replies_count' 
  | 'views_count' 
  | 'likes_count'
  | 'last_reply_at'
  | 'last_reply_by'
  | 'created_at' 
  | 'updated_at'
  | 'author'
>

// Discussion Reply
export interface DiscussionReply {
  id: string
  discussion_id: string
  author_id: string
  parent_reply_id: string | null
  content: string
  likes_count: number
  is_best_answer: boolean
  created_at: string
  updated_at: string
  // Joined fields
  author?: Profile
  replies?: DiscussionReply[]
}

export type DiscussionReplyInsert = Omit<DiscussionReply, 
  | 'id' 
  | 'likes_count' 
  | 'is_best_answer' 
  | 'created_at' 
  | 'updated_at'
  | 'author'
  | 'replies'
>

// Gallery Image
export interface GalleryImage {
  id: string
  uploaded_by: string
  community: CommunityType | null
  title: string
  description: string | null
  image_url: string
  thumbnail_url: string | null
  location: string | null
  category: string | null
  tags: string[]
  is_featured: boolean
  likes_count: number
  comments_count: number
  views_count: number
  downloads_count: number
  is_approved: boolean
  created_at: string
  updated_at: string
  // Joined fields
  uploader?: Profile
}

export type GalleryImageInsert = Omit<GalleryImage, 
  | 'id' 
  | 'is_featured'
  | 'likes_count' 
  | 'comments_count' 
  | 'views_count'
  | 'downloads_count'
  | 'is_approved'
  | 'created_at' 
  | 'updated_at'
  | 'uploader'
>

// Gallery Like
export interface GalleryLike {
  id: string
  image_id: string
  user_id: string
  created_at: string
}

// Gallery Comment
export interface GalleryComment {
  id: string
  image_id: string
  author_id: string
  content: string
  created_at: string
  // Joined fields
  author?: Profile
}

export type GalleryCommentInsert = Omit<GalleryComment, 
  | 'id' 
  | 'created_at'
  | 'author'
>
