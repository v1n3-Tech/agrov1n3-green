import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { 
  Sprout, 
  Dog, 
  TrendingUp, 
  Factory, 
  Scale, 
  Palmtree,
  Cpu,
  HeartPulse,
  Megaphone,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  Building2,
  Truck,
  Users,
  ArrowLeft,
  Star,
  MessageCircle,
  Calendar,
  Sparkles,
  Activity,
  Bell,
  Share2,
  MoreHorizontal,
  Heart,
  MessageSquare,
  Repeat2,
  Bookmark,
  TrendingUp as Trending,
  Clock,
  Award,
  Zap,
  FileText,
  Video,
  ExternalLink,
  ChevronRight,
  Pin,
  type LucideIcon,
} from "lucide-react"
import { getUserProfile } from "@/lib/auth/actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

// Community data
const communityData: Record<string, {
  id: string
  name: string
  slug: string
  icon: LucideIcon
  color: string
  bgColor: string
  borderColor: string
  gradientFrom: string
  gradientTo: string
  description: string
  longDescription: string
  memberCount: number
  activeNow: number
  postsThisWeek: number
  topics: string[]
  leaders: { name: string; role: string; avatar?: string }[]
  pinnedAnnouncement?: { title: string; content: string; date: string }
  upcomingEvents: { title: string; date: string; type: string }[]
  resources: { title: string; type: string; url: string }[]
  stats: { label: string; value: string; trend?: string }[]
}> = {
  "crop-farming": {
    id: "crop_farming",
    name: "Crop Farming",
    slug: "crop-farming",
    icon: Sprout,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    gradientFrom: "from-green-500/20",
    gradientTo: "to-green-600/5",
    description: "Growing crops, sustainable agriculture, and modern farming techniques.",
    longDescription: "Join the largest community of crop farmers in Plateau State. Share knowledge on sustainable agriculture practices, learn modern farming techniques, discuss soil health, irrigation systems, pest control strategies, and harvest optimization. Connect with fellow farmers, agricultural experts, and extension officers.",
    memberCount: 2847,
    activeNow: 156,
    postsThisWeek: 234,
    topics: ["Irrigation", "Soil Health", "Pest Control", "Harvest", "Seeds", "Fertilizers", "Organic Farming", "Climate Adaptation"],
    leaders: [
      { name: "Dr. Ibrahim Musa", role: "Community Lead", avatar: "" },
      { name: "Grace Adamu", role: "Expert Advisor", avatar: "" },
      { name: "Samuel Dung", role: "Moderator", avatar: "" },
    ],
    pinnedAnnouncement: {
      title: "Planting Season 2026 Guidelines Released",
      content: "The Ministry of Agriculture has released new guidelines for the 2026 planting season. All farmers are advised to review the updated recommendations for seed selection and planting dates.",
      date: "2 days ago",
    },
    upcomingEvents: [
      { title: "Soil Testing Workshop", date: "Apr 12, 2026", type: "Workshop" },
      { title: "Modern Irrigation Webinar", date: "Apr 15, 2026", type: "Webinar" },
      { title: "Farmers Market Day", date: "Apr 20, 2026", type: "Event" },
    ],
    resources: [
      { title: "Crop Calendar 2026", type: "PDF", url: "#" },
      { title: "Pest Identification Guide", type: "Guide", url: "#" },
      { title: "Irrigation Best Practices", type: "Video", url: "#" },
    ],
    stats: [
      { label: "Members", value: "2,847", trend: "+12%" },
      { label: "Posts Today", value: "48", trend: "+5%" },
      { label: "Resources", value: "156", trend: "" },
      { label: "Events", value: "8", trend: "" },
    ],
  },
  "agro-technology": {
    id: "agro_technology",
    name: "Agro Technology",
    slug: "agro-technology",
    icon: Cpu,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    gradientFrom: "from-cyan-500/20",
    gradientTo: "to-cyan-600/5",
    description: "Smart farming, AgriTech innovations, and digital agriculture.",
    longDescription: "The hub for agricultural technology enthusiasts and innovators. Explore IoT applications in farming, drone technology, AI-powered crop analysis, farm management software, and precision agriculture. Connect with tech developers, farmers adopting smart solutions, and AgriTech startups.",
    memberCount: 2134,
    activeNow: 112,
    postsThisWeek: 189,
    topics: ["IoT", "Drones", "AI Farming", "Software", "Sensors", "Data Analytics", "Precision Ag", "Automation"],
    leaders: [
      { name: "Eng. Peter Yakubu", role: "Community Lead", avatar: "" },
      { name: "Amina Tech", role: "Innovation Lead", avatar: "" },
      { name: "David Okonkwo", role: "Moderator", avatar: "" },
    ],
    pinnedAnnouncement: {
      title: "GreenV1n3 AgriTech Hackathon 2026",
      content: "Calling all innovators! Join our first AgriTech hackathon to build solutions for Plateau farmers. Prizes worth N5M to be won. Registration now open.",
      date: "1 day ago",
    },
    upcomingEvents: [
      { title: "Drone Mapping Demo", date: "Apr 10, 2026", type: "Demo" },
      { title: "AgriTech Hackathon", date: "Apr 25, 2026", type: "Hackathon" },
      { title: "IoT in Farming Workshop", date: "May 2, 2026", type: "Workshop" },
    ],
    resources: [
      { title: "Smart Farming Guide", type: "PDF", url: "#" },
      { title: "Drone Operation Manual", type: "Guide", url: "#" },
      { title: "Farm Management Apps", type: "List", url: "#" },
    ],
    stats: [
      { label: "Members", value: "2,134", trend: "+18%" },
      { label: "Posts Today", value: "32", trend: "+8%" },
      { label: "Resources", value: "89", trend: "" },
      { label: "Events", value: "5", trend: "" },
    ],
  },
  // Add more communities as needed - for now, using a default template
}

// Default community template for others
function getDefaultCommunity(slug: string): typeof communityData["crop-farming"] | null {
  const communityMap: Record<string, { name: string; icon: LucideIcon; color: string; bgColor: string; borderColor: string; gradientFrom: string; gradientTo: string }> = {
    "animal-farming": { name: "Animal Farming", icon: Dog, color: "text-amber-500", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/30", gradientFrom: "from-amber-500/20", gradientTo: "to-amber-600/5" },
    "agro-marketing": { name: "Agro Marketing", icon: TrendingUp, color: "text-blue-500", bgColor: "bg-blue-500/10", borderColor: "border-blue-500/30", gradientFrom: "from-blue-500/20", gradientTo: "to-blue-600/5" },
    "agro-processing": { name: "Agro Processing", icon: Factory, color: "text-orange-500", bgColor: "bg-orange-500/10", borderColor: "border-orange-500/30", gradientFrom: "from-orange-500/20", gradientTo: "to-orange-600/5" },
    "management-legislation": { name: "Management & Legislation", icon: Scale, color: "text-purple-500", bgColor: "bg-purple-500/10", borderColor: "border-purple-500/30", gradientFrom: "from-purple-500/20", gradientTo: "to-purple-600/5" },
    "agro-tourism": { name: "Agro Tourism", icon: Palmtree, color: "text-teal-500", bgColor: "bg-teal-500/10", borderColor: "border-teal-500/30", gradientFrom: "from-teal-500/20", gradientTo: "to-teal-600/5" },
    "agro-health-care": { name: "Agro Health Care", icon: HeartPulse, color: "text-red-500", bgColor: "bg-red-500/10", borderColor: "border-red-500/30", gradientFrom: "from-red-500/20", gradientTo: "to-red-600/5" },
    "agro-media-branding": { name: "Agro Media & Branding", icon: Megaphone, color: "text-pink-500", bgColor: "bg-pink-500/10", borderColor: "border-pink-500/30", gradientFrom: "from-pink-500/20", gradientTo: "to-pink-600/5" },
    "agro-security": { name: "Agro Security", icon: ShieldCheck, color: "text-slate-500", bgColor: "bg-slate-500/10", borderColor: "border-slate-500/30", gradientFrom: "from-slate-500/20", gradientTo: "to-slate-600/5" },
    "agro-literature": { name: "Agro Literature", icon: BookOpen, color: "text-indigo-500", bgColor: "bg-indigo-500/10", borderColor: "border-indigo-500/30", gradientFrom: "from-indigo-500/20", gradientTo: "to-indigo-600/5" },
    "motivation-training": { name: "Motivation & Training", icon: GraduationCap, color: "text-yellow-500", bgColor: "bg-yellow-500/10", borderColor: "border-yellow-500/30", gradientFrom: "from-yellow-500/20", gradientTo: "to-yellow-600/5" },
    "agro-real-estate": { name: "Agro Real Estate", icon: Building2, color: "text-emerald-500", bgColor: "bg-emerald-500/10", borderColor: "border-emerald-500/30", gradientFrom: "from-emerald-500/20", gradientTo: "to-emerald-600/5" },
    "agro-logistics": { name: "Agro Logistics", icon: Truck, color: "text-rose-500", bgColor: "bg-rose-500/10", borderColor: "border-rose-500/30", gradientFrom: "from-rose-500/20", gradientTo: "to-rose-600/5" },
  }
  
  const base = communityMap[slug]
  if (!base) return null
  
  return {
    id: slug.replace(/-/g, "_"),
    name: base.name,
    slug,
    icon: base.icon,
    color: base.color,
    bgColor: base.bgColor,
    borderColor: base.borderColor,
    gradientFrom: base.gradientFrom,
    gradientTo: base.gradientTo,
    description: `Welcome to the ${base.name} community.`,
    longDescription: `Connect with fellow professionals and enthusiasts in ${base.name}. Share knowledge, discuss best practices, and grow together in this vibrant community.`,
    memberCount: Math.floor(Math.random() * 2000) + 500,
    activeNow: Math.floor(Math.random() * 100) + 20,
    postsThisWeek: Math.floor(Math.random() * 150) + 50,
    topics: ["Discussion", "Resources", "Events", "Q&A"],
    leaders: [
      { name: "Community Lead", role: "Lead", avatar: "" },
      { name: "Expert Advisor", role: "Advisor", avatar: "" },
    ],
    upcomingEvents: [
      { title: "Community Meetup", date: "Coming Soon", type: "Event" },
    ],
    resources: [
      { title: "Getting Started Guide", type: "PDF", url: "#" },
    ],
    stats: [
      { label: "Members", value: "1,000+", trend: "" },
      { label: "Posts", value: "100+", trend: "" },
    ],
  }
}

// Mock feed posts
const feedPosts = [
  {
    id: 1,
    author: { name: "John Farmer", username: "johnfarmer", avatar: "", role: "Agro Executive" },
    content: "Just harvested my first batch of tomatoes using the drip irrigation system recommended by the community. The yield increased by 40%! Thank you all for the guidance.",
    image: null,
    likes: 45,
    comments: 12,
    shares: 5,
    time: "2 hours ago",
    isPinned: false,
  },
  {
    id: 2,
    author: { name: "Grace Adamu", username: "graceadamu", avatar: "", role: "Expert Advisor" },
    content: "Reminder: The soil testing workshop is happening this Saturday at the LGA agricultural office. Bring your soil samples for free analysis. Limited slots available!",
    image: null,
    likes: 78,
    comments: 23,
    shares: 34,
    time: "5 hours ago",
    isPinned: true,
  },
  {
    id: 3,
    author: { name: "Musa Ibrahim", username: "musaibrahim", avatar: "", role: "Regular Member" },
    content: "Has anyone tried the new pest-resistant maize variety from IITA? Looking for feedback before I plant next season.",
    image: null,
    likes: 23,
    comments: 45,
    shares: 2,
    time: "8 hours ago",
    isPinned: false,
  },
]

export default async function CommunityPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const profile = await getUserProfile()
  
  if (!profile) {
    redirect("/sign-in")
  }

  // Get community data
  const community = communityData[slug] || getDefaultCommunity(slug)
  
  if (!community) {
    notFound()
  }

  const Icon = community.icon
  const isUserCommunity = profile.community === community.id

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button asChild variant="ghost" size="sm" className="gap-2 -ml-2">
        <Link href="/dashboard/communities">
          <ArrowLeft className="w-4 h-4" />
          Back to Communities
        </Link>
      </Button>

      {/* Community Header Banner */}
      <div className={`relative overflow-hidden rounded-[4px] border-2 ${community.borderColor} bg-gradient-to-br ${community.gradientFrom} ${community.gradientTo}`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 -translate-y-1/2 translate-x-1/3">
            <Icon className="w-full h-full" />
          </div>
        </div>
        
        <div className="relative p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Community Info */}
            <div className="flex items-start gap-4">
              <div className={`w-20 h-20 rounded-[4px] ${community.bgColor} border-2 ${community.borderColor} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-10 h-10 ${community.color}`} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {isUserCommunity && (
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      Your Community
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    <Activity className="w-3 h-3 mr-1" />
                    {community.activeNow} online
                  </Badge>
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-aldrich)] text-foreground">
                  {community.name}
                </h1>
                <p className="text-muted-foreground mt-2 max-w-2xl">
                  {community.longDescription}
                </p>
                
                {/* Stats Row */}
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  {community.stats.map((stat) => (
                    <div key={stat.label} className="flex items-center gap-2">
                      <span className="text-lg font-bold font-[family-name:var(--font-aldrich)]">
                        {stat.value}
                      </span>
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      {stat.trend && (
                        <Badge variant="secondary" className="text-xs text-primary">
                          {stat.trend}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button variant="outline" size="icon" className="rounded-[4px]">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-[4px]">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-[4px]">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Topics */}
          <div className="flex flex-wrap gap-2 mt-6">
            {community.topics.map((topic) => (
              <Badge 
                key={topic} 
                variant="secondary" 
                className={`${community.bgColor} ${community.color} border ${community.borderColor} hover:bg-opacity-80 cursor-pointer`}
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pinned Announcement */}
          {community.pinnedAnnouncement && (
            <div className={`rounded-[4px] border-2 ${community.borderColor} ${community.bgColor} p-4`}>
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-[4px] ${community.bgColor} border ${community.borderColor} flex items-center justify-center`}>
                  <Pin className={`w-4 h-4 ${community.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className={`text-xs ${community.color} border-current`}>
                      Pinned
                    </Badge>
                    <span className="text-xs text-muted-foreground">{community.pinnedAnnouncement.date}</span>
                  </div>
                  <h3 className="font-semibold">{community.pinnedAnnouncement.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{community.pinnedAnnouncement.content}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <Tabs defaultValue="feed" className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none p-0 h-auto">
              <TabsTrigger 
                value="feed" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 pb-3"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Feed
              </TabsTrigger>
              <TabsTrigger 
                value="discussions" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 pb-3"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Discussions
              </TabsTrigger>
              <TabsTrigger 
                value="resources" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 pb-3"
              >
                <FileText className="w-4 h-4 mr-2" />
                Resources
              </TabsTrigger>
              <TabsTrigger 
                value="members" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 pb-3"
              >
                <Users className="w-4 h-4 mr-2" />
                Members
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="mt-6 space-y-4">
              {/* Create Post */}
              <div className="rounded-[4px] border border-border bg-card p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 rounded-[4px]">
                    <AvatarImage src={profile.avatar_url || ""} />
                    <AvatarFallback className="rounded-[4px] bg-primary/20 text-primary">
                      {profile.first_name?.[0] || profile.username?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-secondary/50 rounded-[4px] px-4 py-2.5 text-muted-foreground text-sm cursor-pointer hover:bg-secondary transition-colors">
                      Share something with the community...
                    </div>
                  </div>
                  <Button className="rounded-[4px]">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>

              {/* Feed Posts */}
              {feedPosts.map((post) => (
                <div key={post.id} className={`rounded-[4px] border ${post.isPinned ? `border-2 ${community.borderColor}` : 'border-border'} bg-card p-4`}>
                  {post.isPinned && (
                    <div className="flex items-center gap-2 text-xs text-primary mb-3">
                      <Pin className="w-3 h-3" />
                      <span>Pinned by moderator</span>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10 rounded-[4px]">
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback className="rounded-[4px] bg-secondary">
                        {post.author.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{post.author.name}</span>
                        <span className="text-muted-foreground text-xs">@{post.author.username}</span>
                        <Badge variant="outline" className="text-xs py-0 h-5">
                          {post.author.role}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{post.time}</span>
                      <p className="mt-2 text-sm">{post.content}</p>
                      
                      {/* Post Actions */}
                      <div className="flex items-center gap-6 mt-4">
                        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-red-500 transition-colors text-sm">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm">
                          <MessageSquare className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm">
                          <Repeat2 className="w-4 h-4" />
                          <span>{post.shares}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-orange transition-colors text-sm ml-auto">
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="discussions" className="mt-6">
              <div className="text-center py-12 text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Discussions coming soon</p>
              </div>
            </TabsContent>

            <TabsContent value="resources" className="mt-6">
              <div className="grid gap-4">
                {community.resources.map((resource) => (
                  <Link 
                    key={resource.title}
                    href={resource.url}
                    className="flex items-center gap-4 p-4 rounded-[4px] border border-border bg-card hover:border-primary/50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-[4px] ${community.bgColor} flex items-center justify-center`}>
                      {resource.type === "Video" ? (
                        <Video className={`w-5 h-5 ${community.color}`} />
                      ) : (
                        <FileText className={`w-5 h-5 ${community.color}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{resource.title}</h4>
                      <p className="text-sm text-muted-foreground">{resource.type}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="members" className="mt-6">
              <div className="text-center py-12 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Member directory coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Community Leaders */}
          <div className="rounded-[4px] border border-border bg-card p-4">
            <h3 className="font-semibold font-[family-name:var(--font-aldrich)] mb-4 flex items-center gap-2">
              <Award className={`w-4 h-4 ${community.color}`} />
              Community Leaders
            </h3>
            <div className="space-y-3">
              {community.leaders.map((leader) => (
                <div key={leader.name} className="flex items-center gap-3">
                  <Avatar className="w-9 h-9 rounded-[4px]">
                    <AvatarImage src={leader.avatar} />
                    <AvatarFallback className="rounded-[4px] bg-secondary text-xs">
                      {leader.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{leader.name}</p>
                    <p className="text-xs text-muted-foreground">{leader.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="rounded-[4px] border border-border bg-card p-4">
            <h3 className="font-semibold font-[family-name:var(--font-aldrich)] mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange" />
              Upcoming Events
            </h3>
            <div className="space-y-3">
              {community.upcomingEvents.map((event) => (
                <div key={event.title} className="flex items-start gap-3 p-2 rounded-[4px] hover:bg-secondary/50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-[4px] bg-orange/10 border border-orange/30 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-orange" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                    <Badge variant="outline" className="text-xs mt-1 py-0 h-5">
                      {event.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button asChild variant="ghost" size="sm" className="w-full mt-3">
              <Link href={`/dashboard/communities/${slug}/events`}>
                View All Events
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="rounded-[4px] border border-border bg-card p-4">
            <h3 className="font-semibold font-[family-name:var(--font-aldrich)] mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              This Week
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 rounded-[4px] bg-secondary/50">
                <p className="text-2xl font-bold font-[family-name:var(--font-aldrich)] text-primary">
                  {community.postsThisWeek}
                </p>
                <p className="text-xs text-muted-foreground">New Posts</p>
              </div>
              <div className="text-center p-3 rounded-[4px] bg-secondary/50">
                <p className="text-2xl font-bold font-[family-name:var(--font-aldrich)] text-orange">
                  {community.activeNow}
                </p>
                <p className="text-xs text-muted-foreground">Online Now</p>
              </div>
            </div>
          </div>

          {/* Trending Topics */}
          <div className="rounded-[4px] border border-border bg-card p-4">
            <h3 className="font-semibold font-[family-name:var(--font-aldrich)] mb-4 flex items-center gap-2">
              <Trending className="w-4 h-4 text-primary" />
              Trending Topics
            </h3>
            <div className="space-y-2">
              {community.topics.slice(0, 5).map((topic, index) => (
                <div key={topic} className="flex items-center gap-3 p-2 rounded-[4px] hover:bg-secondary/50 transition-colors cursor-pointer">
                  <span className="text-sm font-medium text-muted-foreground w-5">{index + 1}</span>
                  <span className="text-sm font-medium">#{topic.replace(/\s/g, "")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
