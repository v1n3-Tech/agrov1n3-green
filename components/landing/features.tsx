"use client"

import { Wallet, ShoppingCart, TrendingUp, BarChart3, MessageSquare, Newspaper } from "lucide-react"

const features = [
  {
    icon: Wallet,
    title: "V1n3 Wallet",
    description: "Secure crypto wallet for instant transactions and V1n3 token payments.",
    style: "primary",
  },
  {
    icon: ShoppingCart,
    title: "Agro Shop",
    description: "Buy and sell agricultural products directly from verified farmers.",
    style: "grey",
  },
  {
    icon: TrendingUp,
    title: "Investments",
    description: "Fund agribusiness ventures and grow your portfolio with real returns.",
    style: "orange",
  },
  {
    icon: BarChart3,
    title: "Weekly Ratings",
    description: "Track your performance with detailed financial and operational ratings.",
    style: "grey",
  },
  {
    icon: MessageSquare,
    title: "Social Profile",
    description: "Share updates, photos, videos and connect with Agro Executives.",
    style: "primary",
  },
  {
    icon: Newspaper,
    title: "Agro News",
    description: "Stay ahead with live agriculture and economic news updates.",
    style: "orange",
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-3.5">
          {features.map((feature) => {
            const isPrimary = feature.style === "primary"
            const isOrange = feature.style === "orange"
            return (
              <div
                key={feature.title}
                className={`group p-5 border rounded-[4px] transition-all duration-200 hover:-translate-y-0.5 ${
                  isPrimary
                    ? "bg-primary/5 border-primary/25 hover:border-primary/50"
                    : isOrange
                    ? "bg-orange/5 border-orange/20 hover:border-orange/45"
                    : "bg-grey/70 border-border/30 hover:border-border/60"
                }`}
              >
                <div className={`w-10 h-10 rounded-[3px] flex items-center justify-center mb-4 ${
                  isPrimary ? "bg-primary/20" : isOrange ? "bg-orange/15" : "bg-secondary/60"
                }`}>
                  <feature.icon className={`w-5 h-5 ${isPrimary ? "text-primary" : isOrange ? "text-orange-400" : "text-grey-foreground"}`} />
                </div>
                <h3 className="font-[family-name:var(--font-aldrich)] text-[15px] mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Goals Bar */}
        <div className="mt-10 p-5 bg-grey/70 border border-border/30 rounded-[4px]">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-5 text-center font-medium">3-Year Program Goals</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="font-[family-name:var(--font-aldrich)] text-2xl lg:text-3xl text-primary">60%</p>
              <p className="text-xs text-muted-foreground mt-1">Local Patronage</p>
            </div>
            <div className="text-center">
              <p className="font-[family-name:var(--font-aldrich)] text-2xl lg:text-3xl text-orange-400">1,000</p>
              <p className="text-xs text-muted-foreground mt-1">Millionaires / LGA</p>
            </div>
            <div className="text-center">
              <p className="font-[family-name:var(--font-aldrich)] text-2xl lg:text-3xl text-primary">30%</p>
              <p className="text-xs text-muted-foreground mt-1">Poverty Reduction</p>
            </div>
            <div className="text-center">
              <p className="font-[family-name:var(--font-aldrich)] text-2xl lg:text-3xl text-orange-400">3 Yrs</p>
              <p className="text-xs text-muted-foreground mt-1">Timeline</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
