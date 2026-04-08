import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { 
  Wheat, Beef, TrendingUp, Factory, Scale, Palmtree, Cpu, Heart, 
  Megaphone, Shield, BookOpen, GraduationCap, Building2, Truck,
  Users, ArrowLeft, MessageSquare, Calendar, FileText, Star,
  Pin, ThumbsUp, Share2, Clock, Lock, ArrowRight, Sparkles,
  TrendingUp as Trending, Bell, ExternalLink
} from "lucide-react"
import { Header } from "@/components/landing/header"
import { getUserProfile } from "@/lib/auth/actions"
import { Button } from "@/components/ui/button"

// Community data
const communityData: Record<string, {
  name: string
  slug: string
  icon: any
  color: string
  gradientFrom: string
  gradientTo: string
  description: string
  longDescription: string
  members: number
  online: number
  topics: string[]
  features: string[]
}> = {
  "crop-farming": {
    name: "Crop Farming",
    slug: "crop-farming",
    icon: Wheat,
    color: "text-green-500",
    gradientFrom: "from-green-500",
    gradientTo: "to-emerald-600",
    description: "Sustainable crop cultivation and modern farming",
    longDescription: "Join the largest agricultural community in Plateau State focused on sustainable crop cultivation. Share knowledge about modern farming techniques, irrigation systems, pest management, and harvest optimization. Connect with experienced farmers and agricultural experts.",
    members: 2450,
    online: 127,
    topics: ["Maize Farming", "Rice Cultivation", "Vegetable Production", "Irrigation Systems", "Soil Management", "Pest Control"],
    features: ["Expert Advice", "Market Prices", "Weather Updates", "Farming Calendar"]
  },
  "animal-farming": {
    name: "Animal Farming",
    slug: "animal-farming",
    icon: Beef,
    color: "text-amber-500",
    gradientFrom: "from-amber-500",
    gradientTo: "to-orange-600",
    description: "Livestock management and animal husbandry",
    longDescription: "Connect with livestock farmers and animal husbandry experts. Discuss best practices in poultry farming, cattle rearing, fish farming, and veterinary care. Access resources for improving animal health and productivity.",
    members: 1890,
    online: 89,
    topics: ["Poultry Farming", "Cattle Rearing", "Fish Farming", "Goat Farming", "Veterinary Tips", "Feed Management"],
    features: ["Vet Directory", "Disease Alerts", "Breeding Tips", "Market Prices"]
  },
  "agro-marketing": {
    name: "Agro Marketing",
    slug: "agro-marketing",
    icon: TrendingUp,
    color: "text-blue-500",
    gradientFrom: "from-blue-500",
    gradientTo: "to-cyan-600",
    description: "Market access and pricing strategies",
    longDescription: "Master the art of agricultural marketing. Learn about market trends, pricing strategies, export opportunities, and building a brand for your farm products. Connect with buyers and distributors across Nigeria.",
    members: 1560,
    online: 72,
    topics: ["Market Analysis", "Pricing", "Exports", "Branding", "Sales Strategies", "Distribution"],
    features: ["Price Tracker", "Buyer Network", "Market Insights", "Export Guide"]
  },
  "agro-processing": {
    name: "Agro Processing",
    slug: "agro-processing",
    icon: Factory,
    color: "text-purple-500",
    gradientFrom: "from-purple-500",
    gradientTo: "to-violet-600",
    description: "Value addition and food processing",
    longDescription: "Transform raw agricultural products into high-value goods. Learn about food processing techniques, packaging, storage, and quality control. Connect with processors and equipment suppliers.",
    members: 1320,
    online: 56,
    topics: ["Food Processing", "Packaging", "Storage", "Quality Control", "Equipment", "Standards"],
    features: ["Processing Guide", "Equipment Reviews", "Quality Tips", "Supplier Network"]
  },
  "management-legislation": {
    name: "Management & Legislation",
    slug: "management-legislation",
    icon: Scale,
    color: "text-slate-500",
    gradientFrom: "from-slate-500",
    gradientTo: "to-gray-600",
    description: "Agricultural policies and regulations",
    longDescription: "Stay informed about agricultural policies, regulations, and compliance requirements. Learn about farm management practices, legal considerations, and industry standards.",
    members: 890,
    online: 34,
    topics: ["Policies", "Regulations", "Compliance", "Standards", "Licensing", "Legal"],
    features: ["Policy Updates", "Legal Guide", "Compliance Check", "Standards Info"]
  },
  "agro-tourism": {
    name: "Agro Tourism",
    slug: "agro-tourism",
    icon: Palmtree,
    color: "text-teal-500",
    gradientFrom: "from-teal-500",
    gradientTo: "to-emerald-600",
    description: "Farm tourism and rural hospitality",
    longDescription: "Explore the intersection of agriculture and tourism. Learn how to create farm experiences, host visitors, and build a hospitality business around your agricultural activities.",
    members: 670,
    online: 28,
    topics: ["Farm Tours", "Events", "Hospitality", "Experience Design", "Marketing", "Accommodation"],
    features: ["Tour Planning", "Event Ideas", "Visitor Tips", "Success Stories"]
  },
  "agro-technology": {
    name: "Agro Technology",
    slug: "agro-technology",
    icon: Cpu,
    color: "text-primary",
    gradientFrom: "from-primary",
    gradientTo: "to-green-600",
    description: "Smart farming and innovation",
    longDescription: "Embrace the future of farming with cutting-edge technology. Discuss IoT sensors, drone technology, AI-powered analytics, and automation solutions for modern agriculture.",
    members: 2100,
    online: 156,
    topics: ["IoT Sensors", "Drones", "AI Analytics", "Automation", "Mobile Apps", "Data"],
    features: ["Tech Reviews", "Innovation Hub", "Startup Connect", "Tool Directory"]
  },
  "agro-health-care": {
    name: "Agro Health Care",
    slug: "agro-health-care",
    icon: Heart,
    color: "text-red-500",
    gradientFrom: "from-red-500",
    gradientTo: "to-rose-600",
    description: "Plant health and crop protection",
    longDescription: "Protect your crops and ensure optimal plant health. Learn about disease prevention, pest management, nutrition, and safety practices for healthy agricultural production.",
    members: 980,
    online: 45,
    topics: ["Pest Control", "Disease Prevention", "Plant Nutrition", "Safety", "Organic Methods", "Diagnosis"],
    features: ["Disease ID", "Treatment Guide", "Expert Consult", "Safety Tips"]
  },
  "agro-media-branding": {
    name: "Agro Media & Branding",
    slug: "agro-media-branding",
    icon: Megaphone,
    color: "text-pink-500",
    gradientFrom: "from-pink-500",
    gradientTo: "to-fuchsia-600",
    description: "Agricultural storytelling and media",
    longDescription: "Tell your agricultural story. Learn about content creation, social media marketing, brand building, and public relations for agricultural businesses.",
    members: 750,
    online: 38,
    topics: ["Content Creation", "Social Media", "Branding", "PR", "Photography", "Video"],
    features: ["Content Ideas", "Brand Guide", "Media Kit", "Success Stories"]
  },
  "agro-security": {
    name: "Agro Security",
    slug: "agro-security",
    icon: Shield,
    color: "text-orange-500",
    gradientFrom: "from-orange-500",
    gradientTo: "to-amber-600",
    description: "Farm security and asset protection",
    longDescription: "Protect your agricultural investments. Learn about farm security systems, asset protection, insurance, and safety protocols for agricultural operations.",
    members: 560,
    online: 22,
    topics: ["Surveillance", "Protection", "Insurance", "Safety", "Risk Management", "Prevention"],
    features: ["Security Tips", "Insurance Guide", "Risk Assessment", "Alert System"]
  },
  "agro-literature": {
    name: "Agro Literature",
    slug: "agro-literature",
    icon: BookOpen,
    color: "text-indigo-500",
    gradientFrom: "from-indigo-500",
    gradientTo: "to-blue-600",
    description: "Research and knowledge sharing",
    longDescription: "Dive into agricultural research and documentation. Access publications, share findings, and contribute to the body of agricultural knowledge.",
    members: 420,
    online: 18,
    topics: ["Research", "Publications", "Documentation", "Archives", "Case Studies", "Reports"],
    features: ["Research Hub", "Publication Access", "Archive Search", "Collaboration"]
  },
  "motivation-training": {
    name: "Motivation & Training",
    slug: "motivation-training",
    icon: GraduationCap,
    color: "text-yellow-500",
    gradientFrom: "from-yellow-500",
    gradientTo: "to-amber-600",
    description: "Skill development and education",
    longDescription: "Develop your agricultural skills and knowledge. Access training programs, workshops, mentorship opportunities, and educational resources.",
    members: 1680,
    online: 94,
    topics: ["Workshops", "Courses", "Mentorship", "Skills", "Certifications", "Events"],
    features: ["Course Catalog", "Mentors", "Certifications", "Events Calendar"]
  },
  "agro-real-estate": {
    name: "Agro Real Estate",
    slug: "agro-real-estate",
    icon: Building2,
    color: "text-cyan-500",
    gradientFrom: "from-cyan-500",
    gradientTo: "to-teal-600",
    description: "Farmland and property management",
    longDescription: "Navigate agricultural real estate. Learn about farmland acquisition, leasing, property management, and agricultural investment opportunities.",
    members: 890,
    online: 41,
    topics: ["Farmland", "Property", "Leasing", "Investment", "Valuation", "Development"],
    features: ["Listings", "Valuation Tools", "Investment Tips", "Legal Guide"]
  },
  "agro-logistics": {
    name: "Agro Logistics",
    slug: "agro-logistics",
    icon: Truck,
    color: "text-rose-500",
    gradientFrom: "from-rose-500",
    gradientTo: "to-red-600",
    description: "Transportation and supply chain",
    longDescription: "Master agricultural logistics. Learn about transportation, supply chain management, cold storage, and distribution networks for agricultural products.",
    members: 1120,
    online: 52,
    topics: ["Transport", "Supply Chain", "Cold Storage", "Delivery", "Warehousing", "Fleet"],
    features: ["Logistics Network", "Route Planning", "Storage Guide", "Provider Directory"]
  },
}

// Mock announcements and posts
const mockAnnouncements = [
  {
    id: 1,
    title: "Q2 2026 Community Goals Announced",
    content: "Our community targets for Q2 have been set. Let's work together to achieve them!",
    author: "Community Admin",
    time: "2 hours ago",
    pinned: true
  },
  {
    id: 2,
    title: "New Training Program Starting Next Week",
    content: "Register now for our comprehensive training program on modern techniques.",
    author: "Training Lead",
    time: "1 day ago",
    pinned: true
  }
]

const mockPosts = [
  {
    id: 1,
    author: { name: "John Danladi", avatar: null, role: "Agro Executive" },
    content: "Just harvested my first batch this season! The new techniques we learned in the workshop really paid off. Thanks to everyone who shared their knowledge.",
    likes: 24,
    comments: 8,
    time: "3 hours ago",
    image: null
  },
  {
    id: 2,
    author: { name: "Mary Yakubu", avatar: null, role: "GCM" },
    content: "Reminder: Our weekly community meetup is tomorrow at 4 PM. We'll be discussing market trends and sharing success stories. Don't miss it!",
    likes: 45,
    comments: 12,
    time: "5 hours ago",
    image: null
  },
  {
    id: 3,
    author: { name: "Ibrahim Musa", avatar: null, role: "LGPA" },
    content: "Great progress from our members in Jos North. Keep up the excellent work! Your dedication is inspiring the whole community.",
    likes: 67,
    comments: 15,
    time: "8 hours ago",
    image: null
  }
]

const mockEvents = [
  { title: "Community Meetup", date: "Apr 10", type: "Meetup" },
  { title: "Training Workshop", date: "Apr 15", type: "Training" },
  { title: "Market Day", date: "Apr 20", type: "Market" },
]

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const community = communityData[slug]
  
  if (!community) {
    return { title: "Community Not Found | GreenV1n3" }
  }
  
  return {
    title: `${community.name} | GreenV1n3 Communities`,
    description: community.description,
  }
}

export default async function CommunityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const community = communityData[slug]
  
  if (!community) {
    notFound()
  }
  
  const profile = await getUserProfile()
  const isMember = profile?.community === slug.replace(/-/g, '_')
  const isAuthenticated = !!profile
  
  const Icon = community.icon

  return (
    <div className="min-h-screen bg-background">
      <Header profile={profile} />
      
      <main className="pt-16">
        {/* Hero Banner */}
        <section className={`relative h-64 md:h-80 bg-gradient-to-br ${community.gradientFrom} ${community.gradientTo} overflow-hidden`}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8 relative">
            <div className="flex items-end gap-4 md:gap-6 w-full">
              {/* Community Icon */}
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-[4px] bg-background/95 backdrop-blur-sm border-4 border-background shadow-xl flex items-center justify-center -mb-8 md:-mb-12">
                <Icon className={`w-10 h-10 md:w-14 md:h-14 ${community.color}`} />
              </div>
              
              {/* Community Info */}
              <div className="flex-1 mb-4">
                <h1 className="text-2xl md:text-4xl font-bold font-[family-name:var(--font-aldrich)] text-white drop-shadow-lg">
                  {community.name}
                </h1>
                <p className="text-white/80 text-sm md:text-base mt-1">
                  {community.description}
                </p>
              </div>
              
              {/* Join/Member Button */}
              <div className="hidden md:block mb-4">
                {isMember ? (
                  <div className="px-4 py-2 rounded-[4px] bg-white/20 backdrop-blur-sm text-white font-medium">
                    Your Community
                  </div>
                ) : isAuthenticated ? (
                  <Button className="bg-white text-gray-900 hover:bg-white/90">
                    Request to Join
                  </Button>
                ) : (
                  <Link href="/register">
                    <Button className="bg-white text-gray-900 hover:bg-white/90">
                      Join GreenV1n3
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Content Area */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Link & Stats Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pt-4 md:pt-8">
            <Link 
              href="/communities" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Communities</span>
            </Link>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{community.members.toLocaleString()}</span>
                <span className="text-muted-foreground">members</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium">{community.online}</span>
                <span className="text-muted-foreground">online</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              <div className="bg-card rounded-[4px] border border-border p-6">
                <h2 className="text-lg font-semibold font-[family-name:var(--font-aldrich)] mb-3">About This Community</h2>
                <p className="text-muted-foreground">{community.longDescription}</p>
                
                {/* Topics */}
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Popular Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {community.topics.map((topic) => (
                      <span 
                        key={topic}
                        className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Announcements */}
              <div className="bg-card rounded-[4px] border border-border overflow-hidden">
                <div className="px-6 py-4 border-b border-border flex items-center gap-2">
                  <Pin className="w-4 h-4 text-primary" />
                  <h2 className="font-semibold font-[family-name:var(--font-aldrich)]">Announcements</h2>
                </div>
                <div className="divide-y divide-border">
                  {mockAnnouncements.map((announcement) => (
                    <div key={announcement.id} className="p-4 hover:bg-secondary/30 transition-colors">
                      <h3 className="font-medium mb-1">{announcement.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{announcement.content}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{announcement.author}</span>
                        <span>•</span>
                        <span>{announcement.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Feed */}
              <div className="bg-card rounded-[4px] border border-border overflow-hidden">
                <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <h2 className="font-semibold font-[family-name:var(--font-aldrich)]">Community Feed</h2>
                  </div>
                  {!isAuthenticated && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Sign in to post
                    </span>
                  )}
                </div>
                
                {/* Post Input - Only for members */}
                {isMember && (
                  <div className="p-4 border-b border-border bg-secondary/20">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                        {profile?.first_name?.[0] || profile?.username?.[0] || 'U'}
                      </div>
                      <div className="flex-1">
                        <textarea 
                          placeholder="Share something with your community..."
                          className="w-full px-4 py-3 rounded-[4px] bg-background border border-border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          rows={2}
                        />
                        <div className="flex justify-end mt-2">
                          <Button size="sm" className="rounded-[4px]">
                            Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Posts */}
                <div className="divide-y divide-border">
                  {mockPosts.map((post) => (
                    <div key={post.id} className="p-4 hover:bg-secondary/20 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-orange-500/30 flex items-center justify-center text-sm font-medium">
                          {post.author.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{post.author.name}</span>
                            <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                              {post.author.role}
                            </span>
                            <span className="text-xs text-muted-foreground">• {post.time}</span>
                          </div>
                          <p className="text-sm text-foreground/90 mb-3">{post.content}</p>
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                              <MessageSquare className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </button>
                            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                              <Share2 className="w-4 h-4" />
                              <span>Share</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More */}
                <div className="p-4 text-center border-t border-border">
                  {isAuthenticated ? (
                    <button className="text-sm text-primary hover:underline">
                      Load more posts
                    </button>
                  ) : (
                    <Link href="/sign-in" className="text-sm text-primary hover:underline flex items-center justify-center gap-1">
                      Sign in to see more
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-card rounded-[4px] border border-border p-4">
                <h3 className="font-semibold mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  {community.features.map((feature) => (
                    <button 
                      key={feature}
                      className="p-3 text-xs text-center rounded-[4px] bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-card rounded-[4px] border border-border overflow-hidden">
                <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-sm">Upcoming Events</h3>
                </div>
                <div className="divide-y divide-border">
                  {mockEvents.map((event) => (
                    <div key={event.title} className="p-3 hover:bg-secondary/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[4px] bg-primary/10 flex flex-col items-center justify-center">
                          <span className="text-[10px] text-primary uppercase">{event.date.split(' ')[0]}</span>
                          <span className="text-sm font-bold text-primary">{event.date.split(' ')[1]}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{event.title}</p>
                          <p className="text-xs text-muted-foreground">{event.type}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Topics */}
              <div className="bg-card rounded-[4px] border border-border overflow-hidden">
                <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                  <Trending className="w-4 h-4 text-orange-500" />
                  <h3 className="font-semibold text-sm">Trending</h3>
                </div>
                <div className="p-3 space-y-2">
                  {["Market prices rising", "New irrigation tech", "Season planning", "Success stories"].map((topic, i) => (
                    <div key={topic} className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">#{i + 1}</span>
                      <span className="hover:text-primary cursor-pointer transition-colors">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Join CTA for non-members */}
              {!isMember && (
                <div className={`rounded-[4px] bg-gradient-to-br ${community.gradientFrom}/10 ${community.gradientTo}/5 border border-primary/20 p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-sm">Join This Community</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {isAuthenticated 
                      ? "Request to join this community to access exclusive content and connect with members."
                      : "Create an account to join communities and connect with agricultural professionals."
                    }
                  </p>
                  {isAuthenticated ? (
                    <Button size="sm" className="w-full rounded-[4px]">
                      Request to Join
                    </Button>
                  ) : (
                    <Link href="/register">
                      <Button size="sm" className="w-full rounded-[4px]">
                        Get Started
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
