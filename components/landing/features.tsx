"use client"

import { Wallet, ShoppingCart, TrendingUp, BarChart3, MessageSquare, Newspaper } from "lucide-react"

const features = [
  {
    icon: Wallet,
    title: "V1n3 Wallet",
    description: "Secure crypto wallet for transactions and instant payments.",
    accent: true,
  },
  {
    icon: ShoppingCart,
    title: "Agro Shop",
    description: "Buy and sell agricultural products directly from farmers.",
    accent: false,
  },
  {
    icon: TrendingUp,
    title: "Investments",
    description: "Fund agribusiness ventures and grow your portfolio.",
    accent: true,
  },
  {
    icon: BarChart3,
    title: "Weekly Ratings",
    description: "Track performance with financial and operational ratings.",
    accent: false,
  },
  {
    icon: MessageSquare,
    title: "Social Profile",
    description: "Share updates, connect with other Agro Executives.",
    accent: false,
  },
  {
    icon: Newspaper,
    title: "Agro News",
    description: "Stay informed with agriculture and economic updates.",
    accent: false,
  },
]

export function Features() {
  return (
    <section id="features" className="py-16 lg:py-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="inline-block px-2.5 py-1 text-[10px] font-medium text-accent bg-accent/10 border border-accent/20 rounded-[3px] uppercase tracking-widest mb-4">
            Platform Features
          </span>
          <h2 className="font-[family-name:var(--font-aldrich)] text-3xl lg:text-4xl tracking-tight mb-3">
            Everything to <span className="text-primary">Succeed</span>
          </h2>
          <p className="text-sm lg:text-base text-muted-foreground">
            GreenV1n3 provides all tools for modern agribusiness — trading, investment, and community building.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`group p-5 bg-card border rounded-[4px] transition-all duration-200 hover:border-primary/40 ${
                feature.accent ? "border-primary/30 bg-primary/5" : "border-border/40"
              }`}
            >
              <div className={`w-10 h-10 rounded-[3px] flex items-center justify-center mb-4 ${
                feature.accent ? "bg-primary/20" : "bg-secondary"
              }`}>
                <feature.icon className={`w-5 h-5 ${feature.accent ? "text-primary" : "text-foreground"}`} />
              </div>
              <h3 className="font-[family-name:var(--font-aldrich)] text-base mb-1.5 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Goals Bar */}
        <div className="mt-12 p-5 bg-card border border-border/40 rounded-[4px]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="font-[family-name:var(--font-aldrich)] text-2xl lg:text-3xl text-primary">60%</p>
              <p className="text-xs text-muted-foreground mt-1">Local Patronage Goal</p>
            </div>
            <div className="text-center">
              <p className="font-[family-name:var(--font-aldrich)] text-2xl lg:text-3xl text-accent">1,000</p>
              <p className="text-xs text-muted-foreground mt-1">Millionaires Per LGA</p>
            </div>
            <div className="text-center">
              <p className="font-[family-name:var(--font-aldrich)] text-2xl lg:text-3xl text-primary">30%</p>
              <p className="text-xs text-muted-foreground mt-1">Poverty Reduction</p>
            </div>
            <div className="text-center">
              <p className="font-[family-name:var(--font-aldrich)] text-2xl lg:text-3xl text-accent">3 Yrs</p>
              <p className="text-xs text-muted-foreground mt-1">Program Timeline</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
