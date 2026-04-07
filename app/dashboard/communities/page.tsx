import { redirect } from "next/navigation"
import Link from "next/link"
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
  ArrowRight,
  Star,
  MessageCircle,
  Calendar,
  Sparkles,
  Activity,
  type LucideIcon,
} from "lucide-react"
import { getUserProfile } from "@/lib/auth/actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Community data with icons and colors
const communities: {
  id: string
  name: string
  slug: string
  icon: LucideIcon
  color: string
  bgColor: string
  borderColor: string
  description: string
  memberCount: number
  activeNow: number
  topics: string[]
}[] = [
  {
    id: "crop_farming",
    name: "Crop Farming",
    slug: "crop-farming",
    icon: Sprout,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    description: "Growing crops, sustainable agriculture, and modern farming techniques.",
    memberCount: 2847,
    activeNow: 156,
    topics: ["Irrigation", "Soil Health", "Pest Control", "Harvest"],
  },
  {
    id: "animal_farming",
    name: "Animal Farming",
    slug: "animal-farming",
    icon: Dog,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    description: "Livestock management, poultry, fishery, and animal husbandry.",
    memberCount: 1923,
    activeNow: 89,
    topics: ["Poultry", "Cattle", "Fishery", "Feed"],
  },
  {
    id: "agro_marketing",
    name: "Agro Marketing",
    slug: "agro-marketing",
    icon: TrendingUp,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    description: "Market access, pricing strategies, and agricultural trade.",
    memberCount: 1456,
    activeNow: 67,
    topics: ["Pricing", "Export", "Market Access", "Branding"],
  },
  {
    id: "agro_processing",
    name: "Agro Processing",
    slug: "agro-processing",
    icon: Factory,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    description: "Value addition, food processing, and agro-industrial techniques.",
    memberCount: 1234,
    activeNow: 45,
    topics: ["Processing", "Packaging", "Storage", "Quality"],
  },
  {
    id: "management_legislation",
    name: "Management & Legislation",
    slug: "management-legislation",
    icon: Scale,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    description: "Agricultural policies, regulations, and farm management.",
    memberCount: 892,
    activeNow: 34,
    topics: ["Policy", "Regulations", "Compliance", "Management"],
  },
  {
    id: "agro_tourism",
    name: "Agro Tourism",
    slug: "agro-tourism",
    icon: Palmtree,
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/30",
    description: "Farm tourism, eco-tourism, and agricultural experiences.",
    memberCount: 756,
    activeNow: 28,
    topics: ["Farm Tours", "Eco-Tourism", "Events", "Experiences"],
  },
  {
    id: "agro_technology",
    name: "Agro Technology",
    slug: "agro-technology",
    icon: Cpu,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    description: "Smart farming, AgriTech innovations, and digital agriculture.",
    memberCount: 2134,
    activeNow: 112,
    topics: ["IoT", "Drones", "AI Farming", "Software"],
  },
  {
    id: "agro_health_care",
    name: "Agro Health Care",
    slug: "agro-health-care",
    icon: HeartPulse,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    description: "Plant and animal health, veterinary services, and disease control.",
    memberCount: 1087,
    activeNow: 52,
    topics: ["Veterinary", "Plant Health", "Disease Control", "Nutrition"],
  },
  {
    id: "agro_media_branding",
    name: "Agro Media & Branding",
    slug: "agro-media-branding",
    icon: Megaphone,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    description: "Agricultural media, content creation, and brand building.",
    memberCount: 934,
    activeNow: 41,
    topics: ["Content", "Social Media", "Branding", "Marketing"],
  },
  {
    id: "agro_security",
    name: "Agro Security",
    slug: "agro-security",
    icon: ShieldCheck,
    color: "text-slate-500",
    bgColor: "bg-slate-500/10",
    borderColor: "border-slate-500/30",
    description: "Farm security, food safety, and agricultural protection.",
    memberCount: 678,
    activeNow: 23,
    topics: ["Farm Security", "Food Safety", "Insurance", "Protection"],
  },
  {
    id: "agro_literature",
    name: "Agro Literature",
    slug: "agro-literature",
    icon: BookOpen,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/30",
    description: "Agricultural research, publications, and knowledge sharing.",
    memberCount: 567,
    activeNow: 19,
    topics: ["Research", "Publications", "Education", "Documentation"],
  },
  {
    id: "motivation_training",
    name: "Motivation & Training",
    slug: "motivation-training",
    icon: GraduationCap,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
    description: "Skill development, training programs, and agricultural education.",
    memberCount: 1456,
    activeNow: 78,
    topics: ["Training", "Workshops", "Certification", "Mentorship"],
  },
  {
    id: "agro_real_estate",
    name: "Agro Real Estate",
    slug: "agro-real-estate",
    icon: Building2,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    description: "Farmland, agricultural properties, and land development.",
    memberCount: 823,
    activeNow: 36,
    topics: ["Farmland", "Properties", "Investment", "Development"],
  },
  {
    id: "agro_logistics",
    name: "Agro Logistics",
    slug: "agro-logistics",
    icon: Truck,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
    description: "Supply chain, transportation, and agricultural logistics.",
    memberCount: 945,
    activeNow: 42,
    topics: ["Transport", "Supply Chain", "Storage", "Distribution"],
  },
]

// Format community type for display
function formatCommunityName(community: string): string {
  return community
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export default async function CommunitiesPage() {
  const profile = await getUserProfile()
  
  if (!profile) {
    redirect("/sign-in")
  }

  const userCommunity = profile.community ? 
    communities.find(c => c.id === profile.community) : null

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-aldrich)] text-foreground">
            Communities
          </h1>
          <p className="text-muted-foreground mt-1">
            Connect, learn, and grow with fellow Agro Executives
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1.5 py-1.5 px-3">
            <Activity className="w-3.5 h-3.5 text-primary" />
            <span>{communities.reduce((acc, c) => acc + c.activeNow, 0).toLocaleString()} online</span>
          </Badge>
        </div>
      </div>

      {/* Your Community Highlight */}
      {userCommunity && (
        <div className={`relative overflow-hidden rounded-[4px] border-2 ${userCommunity.borderColor} ${userCommunity.bgColor} p-6`}>
          <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
            <userCommunity.icon className="w-full h-full" />
          </div>
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`w-16 h-16 rounded-[4px] ${userCommunity.bgColor} border ${userCommunity.borderColor} flex items-center justify-center`}>
                <userCommunity.icon className={`w-8 h-8 ${userCommunity.color}`} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                    Your Community
                  </Badge>
                </div>
                <h2 className="text-xl font-bold font-[family-name:var(--font-aldrich)]">
                  {userCommunity.name}
                </h2>
                <p className="text-sm text-muted-foreground mt-1 max-w-lg">
                  {userCommunity.description}
                </p>
                <div className="flex items-center gap-4 mt-3 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{userCommunity.memberCount.toLocaleString()}</span>
                    <span className="text-muted-foreground">members</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="font-medium">{userCommunity.activeNow}</span>
                    <span className="text-muted-foreground">online</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild variant="outline" className="rounded-[4px]">
                <Link href={`/dashboard/communities/${userCommunity.slug}/feed`}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Activity Feed
                </Link>
              </Button>
              <Button asChild className="rounded-[4px]">
                <Link href={`/dashboard/communities/${userCommunity.slug}`}>
                  Enter Community
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* All Communities Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold font-[family-name:var(--font-aldrich)]">
            All Communities
          </h2>
          <span className="text-sm text-muted-foreground">
            {communities.length} communities
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {communities.map((community) => {
            const isUserCommunity = profile.community === community.id
            const Icon = community.icon
            
            return (
              <Link
                key={community.id}
                href={`/dashboard/communities/${community.slug}`}
                className={`group relative overflow-hidden rounded-[4px] border ${
                  isUserCommunity 
                    ? `border-2 ${community.borderColor}` 
                    : 'border-border hover:border-primary/50'
                } bg-card p-5 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5`}
              >
                {/* Background Icon */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Icon className="w-full h-full" />
                </div>
                
                {/* Content */}
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 rounded-[4px] ${community.bgColor} border ${community.borderColor} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${community.color}`} />
                    </div>
                    {isUserCommunity && (
                      <Badge className="bg-primary text-primary-foreground text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        Joined
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="font-semibold font-[family-name:var(--font-aldrich)] text-foreground group-hover:text-primary transition-colors">
                    {community.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {community.description}
                  </p>
                  
                  {/* Topics */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {community.topics.slice(0, 3).map((topic) => (
                      <span 
                        key={topic} 
                        className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                      >
                        {topic}
                      </span>
                    ))}
                    {community.topics.length > 3 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                        +{community.topics.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {community.memberCount.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {community.activeNow} online
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Upcoming Events Banner */}
      <div className="rounded-[4px] border border-orange/30 bg-gradient-to-r from-orange/10 to-transparent p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[4px] bg-orange/20 border border-orange/30 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange" />
            </div>
            <div>
              <h3 className="font-semibold font-[family-name:var(--font-aldrich)]">
                Community Events
              </h3>
              <p className="text-sm text-muted-foreground">
                Join upcoming webinars, workshops, and meetups across all communities
              </p>
            </div>
          </div>
          <Button asChild variant="outline" className="rounded-[4px] border-orange/30 hover:bg-orange/10">
            <Link href="/dashboard/communities/events">
              <Sparkles className="w-4 h-4 mr-2 text-orange" />
              View Events
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
