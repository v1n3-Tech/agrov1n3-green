import { Metadata } from "next"
import Link from "next/link"
import { 
  Wheat, Beef, TrendingUp, Factory, Scale, Palmtree, Cpu, Heart, 
  Megaphone, Shield, BookOpen, GraduationCap, Building2, Truck,
  Users, ArrowRight, Sparkles
} from "lucide-react"
import { Header } from "@/components/landing/header"
import { getUserProfile } from "@/lib/auth/actions"

export const metadata: Metadata = {
  title: "Communities | GreenV1n3",
  description: "Explore 14 specialized agriculture communities across Plateau State",
}

const communities = [
  { 
    slug: "crop-farming", 
    name: "Crop Farming", 
    icon: Wheat, 
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    description: "Sustainable crop cultivation, modern farming techniques, and harvest optimization",
    members: 2450,
    topics: ["Maize", "Rice", "Vegetables", "Irrigation"]
  },
  { 
    slug: "animal-farming", 
    name: "Animal Farming", 
    icon: Beef, 
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    description: "Livestock management, poultry farming, and animal husbandry best practices",
    members: 1890,
    topics: ["Poultry", "Cattle", "Fish Farming", "Veterinary"]
  },
  { 
    slug: "agro-marketing", 
    name: "Agro Marketing", 
    icon: TrendingUp, 
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    description: "Market access, pricing strategies, and agricultural product distribution",
    members: 1560,
    topics: ["Sales", "Distribution", "Exports", "Pricing"]
  },
  { 
    slug: "agro-processing", 
    name: "Agro Processing", 
    icon: Factory, 
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    description: "Value addition, food processing, and agricultural product transformation",
    members: 1320,
    topics: ["Processing", "Packaging", "Storage", "Quality"]
  },
  { 
    slug: "management-legislation", 
    name: "Management & Legislation", 
    icon: Scale, 
    color: "from-slate-500 to-gray-600",
    bgColor: "bg-slate-500/10",
    borderColor: "border-slate-500/30",
    description: "Agricultural policies, regulations, and farm management practices",
    members: 890,
    topics: ["Policies", "Regulations", "Compliance", "Standards"]
  },
  { 
    slug: "agro-tourism", 
    name: "Agro Tourism", 
    icon: Palmtree, 
    color: "from-teal-500 to-emerald-600",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/30",
    description: "Farm tourism, agricultural experiences, and rural hospitality",
    members: 670,
    topics: ["Farm Tours", "Events", "Hospitality", "Experiences"]
  },
  { 
    slug: "agro-technology", 
    name: "Agro Technology", 
    icon: Cpu, 
    color: "from-primary to-green-600",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    description: "Smart farming, agricultural innovation, and technology solutions",
    members: 2100,
    topics: ["IoT", "Drones", "AI", "Automation"]
  },
  { 
    slug: "agro-health-care", 
    name: "Agro Health Care", 
    icon: Heart, 
    color: "from-red-500 to-rose-600",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    description: "Plant health, crop protection, and agricultural wellness",
    members: 980,
    topics: ["Pest Control", "Disease", "Nutrition", "Safety"]
  },
  { 
    slug: "agro-media-branding", 
    name: "Agro Media & Branding", 
    icon: Megaphone, 
    color: "from-pink-500 to-fuchsia-600",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    description: "Agricultural storytelling, branding, and media production",
    members: 750,
    topics: ["Content", "Branding", "Social Media", "PR"]
  },
  { 
    slug: "agro-security", 
    name: "Agro Security", 
    icon: Shield, 
    color: "from-orange-500 to-amber-600",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    description: "Farm security, asset protection, and agricultural safety",
    members: 560,
    topics: ["Surveillance", "Protection", "Insurance", "Safety"]
  },
  { 
    slug: "agro-literature", 
    name: "Agro Literature", 
    icon: BookOpen, 
    color: "from-indigo-500 to-blue-600",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/30",
    description: "Agricultural research, documentation, and knowledge sharing",
    members: 420,
    topics: ["Research", "Publications", "Documentation", "Archives"]
  },
  { 
    slug: "motivation-training", 
    name: "Motivation & Training", 
    icon: GraduationCap, 
    color: "from-yellow-500 to-amber-600",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
    description: "Skill development, agricultural education, and capacity building",
    members: 1680,
    topics: ["Workshops", "Courses", "Mentorship", "Skills"]
  },
  { 
    slug: "agro-real-estate", 
    name: "Agro Real Estate", 
    icon: Building2, 
    color: "from-cyan-500 to-teal-600",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    description: "Farmland acquisition, agricultural property, and land management",
    members: 890,
    topics: ["Farmland", "Property", "Leasing", "Investment"]
  },
  { 
    slug: "agro-logistics", 
    name: "Agro Logistics", 
    icon: Truck, 
    color: "from-rose-500 to-red-600",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
    description: "Agricultural transportation, supply chain, and distribution networks",
    members: 1120,
    topics: ["Transport", "Supply Chain", "Cold Storage", "Delivery"]
  },
]

export default async function CommunitiesPage() {
  const profile = await getUserProfile()
  const userCommunity = profile?.community

  return (
    <div className="min-h-screen bg-background">
      <Header profile={profile} />
      
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                <span>14 Specialized Communities</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-aldrich)] mb-4">
                Find Your <span className="text-primary">Community</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Join thousands of agricultural professionals across Plateau State. Connect, learn, and grow together in specialized communities tailored to your expertise.
              </p>
            </div>
          </div>
        </section>

        {/* Communities Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community) => {
              const Icon = community.icon
              const isMember = userCommunity === community.slug.replace(/-/g, '_')
              
              return (
                <Link
                  key={community.slug}
                  href={`/communities/${community.slug}`}
                  className={`group relative overflow-hidden rounded-[4px] border ${community.borderColor} ${community.bgColor} p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/5`}
                >
                  {/* Member Badge */}
                  {isMember && (
                    <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-primary text-white text-xs font-medium">
                      Your Community
                    </div>
                  )}
                  
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-[4px] bg-gradient-to-br ${community.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold font-[family-name:var(--font-aldrich)] mb-2 group-hover:text-primary transition-colors">
                    {community.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {community.description}
                  </p>
                  
                  {/* Topics */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {community.topics.slice(0, 3).map((topic) => (
                      <span 
                        key={topic}
                        className="px-2 py-0.5 text-xs rounded-full bg-background/50 text-muted-foreground"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/30">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{community.members.toLocaleString()} members</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* CTA Section */}
        {!profile && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
            <div className="relative overflow-hidden rounded-[4px] bg-gradient-to-br from-primary/20 via-primary/10 to-orange-500/10 border border-primary/20 p-8 md:p-12 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.1),transparent_50%)]" />
              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-aldrich)] mb-4">
                  Ready to Join?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Create your account and become part of a thriving agricultural community. Access exclusive resources, connect with experts, and grow your agribusiness.
                </p>
                <Link 
                  href="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
