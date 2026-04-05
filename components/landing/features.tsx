"use client"

import { 
  Wallet, 
  ShoppingCart, 
  TrendingUp, 
  BarChart3, 
  MessageSquare, 
  Newspaper,
  Image as ImageIcon,
  Music,
  Video,
  Bell
} from "lucide-react"

const features = [
  {
    icon: Wallet,
    title: "Personal Wallet",
    description: "Secure V1n3 crypto wallet for transactions, savings, and instant payments across the platform.",
    highlight: true,
  },
  {
    icon: ShoppingCart,
    title: "Agro Online Shop",
    description: "Buy and sell agricultural products directly. From farm fresh produce to equipment and supplies.",
    highlight: false,
  },
  {
    icon: TrendingUp,
    title: "Investment Platform",
    description: "Connect with investors or fund promising agribusiness ventures. Grow your portfolio in agriculture.",
    highlight: true,
  },
  {
    icon: BarChart3,
    title: "Weekly Ratings",
    description: "Track your performance with personal financial and operational ratings updated weekly.",
    highlight: false,
  },
  {
    icon: MessageSquare,
    title: "Interactive Profile",
    description: "Share updates, photos, music, and videos. Connect with other Agro Executives and build your network.",
    highlight: false,
  },
  {
    icon: Newspaper,
    title: "News & Updates",
    description: "Stay informed with agriculture and economic news. Never miss important market updates.",
    highlight: false,
  },
]

const mediaFeatures = [
  { icon: ImageIcon, label: "Photos" },
  { icon: Music, label: "Music" },
  { icon: Video, label: "Videos" },
  { icon: Bell, label: "Alerts" },
]

export function Features() {
  return (
    <section id="features" className="relative py-20 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 text-sm font-medium text-accent bg-accent/10 rounded-full mb-4">
              Platform Features
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
              Everything You Need to <span className="text-primary">Succeed</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              GreenV1n3 provides all the tools for modern agribusiness — from trading and investment to community building and personal branding.
            </p>
          </div>
          
          {/* Media Features */}
          <div className="flex items-center gap-4 p-4 bg-card border border-border rounded">
            {mediaFeatures.map((f) => (
              <div key={f.label} className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 bg-secondary rounded flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`
                group relative p-6 bg-card border rounded transition-all duration-300
                hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5
                ${feature.highlight ? "border-primary/30 bg-primary/5" : "border-border/50"}
              `}
            >
              {/* Icon */}
              <div className={`
                w-12 h-12 rounded flex items-center justify-center mb-4
                ${feature.highlight ? "bg-primary/20" : "bg-secondary"}
              `}>
                <feature.icon className={`w-6 h-6 ${feature.highlight ? "text-primary" : "text-foreground"}`} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>

              {/* Hover Arrow */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-16 p-6 bg-card border border-border rounded">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl lg:text-4xl font-bold text-primary">60%</p>
              <p className="text-sm text-muted-foreground mt-1">Target Local Patronage</p>
            </div>
            <div className="text-center">
              <p className="text-3xl lg:text-4xl font-bold text-accent">1,000</p>
              <p className="text-sm text-muted-foreground mt-1">New Millionaires/LGA</p>
            </div>
            <div className="text-center">
              <p className="text-3xl lg:text-4xl font-bold text-primary">30%</p>
              <p className="text-sm text-muted-foreground mt-1">Poverty Reduction Goal</p>
            </div>
            <div className="text-center">
              <p className="text-3xl lg:text-4xl font-bold text-accent">3 Years</p>
              <p className="text-sm text-muted-foreground mt-1">Program Timeline</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
