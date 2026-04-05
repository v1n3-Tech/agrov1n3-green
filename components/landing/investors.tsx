"use client"

import { Button } from "@/components/ui/button"
import { TrendingUp, Shield, PieChart, ArrowRight, Clock, Target, Percent, Users } from "lucide-react"

const investmentOptions = [
  {
    title: "Crop Projects",
    description: "Fund large-scale crop farming initiatives across Plateau State",
    minInvestment: "50,000 V1n3",
    returns: "15-25% annually",
    duration: "6-12 months",
    risk: "Medium",
    icon: "🌾",
  },
  {
    title: "Livestock Ventures",
    description: "Invest in poultry, cattle, and goat farming enterprises",
    minInvestment: "100,000 V1n3",
    returns: "20-35% annually",
    duration: "12-18 months",
    risk: "Medium-High",
    icon: "🐄",
  },
  {
    title: "Agro Processing",
    description: "Fund processing plants and value-addition facilities",
    minInvestment: "250,000 V1n3",
    returns: "25-40% annually",
    duration: "18-24 months",
    risk: "High",
    icon: "🏭",
  },
  {
    title: "Agro Tech Startups",
    description: "Support innovative agricultural technology solutions",
    minInvestment: "75,000 V1n3",
    returns: "30-50% annually",
    duration: "12-36 months",
    risk: "High",
    icon: "💻",
  },
]

const benefits = [
  {
    icon: Shield,
    title: "Verified Projects",
    description: "All investment opportunities are vetted and verified by our team",
  },
  {
    icon: PieChart,
    title: "Diversified Portfolio",
    description: "Spread your investments across multiple agricultural sectors",
  },
  {
    icon: Clock,
    title: "Flexible Terms",
    description: "Choose investment durations that match your financial goals",
  },
  {
    icon: Target,
    title: "Impact Investing",
    description: "Support Nigerian youth and drive agricultural transformation",
  },
]

export function Investors() {
  return (
    <section id="investors" className="relative py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-accent bg-accent/10 rounded-full mb-4">
            <TrendingUp className="w-4 h-4" /> Investment Platform
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
            Invest in <span className="text-primary">Agriculture</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Put your V1n3 tokens to work. Fund verified agricultural projects and earn competitive returns while supporting Nigerian youth.
          </p>
        </div>

        {/* Investment Options */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
          {investmentOptions.map((option) => (
            <div
              key={option.title}
              className="group p-6 bg-card border border-border/50 rounded hover:border-primary/50 hover:shadow-lg transition-all"
            >
              {/* Icon */}
              <div className="text-4xl mb-4">{option.icon}</div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-2">{option.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{option.description}</p>

              {/* Stats */}
              <div className="space-y-2 py-4 border-t border-border/50">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Min Investment</span>
                  <span className="font-medium text-foreground">{option.minInvestment}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Est. Returns</span>
                  <span className="font-medium text-primary">{option.returns}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium text-foreground">{option.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Risk Level</span>
                  <span className={`font-medium ${
                    option.risk === "Medium" ? "text-amber-400" :
                    option.risk === "Medium-High" ? "text-orange-400" :
                    "text-red-400"
                  }`}>{option.risk}</span>
                </div>
              </div>

              {/* CTA */}
              <Button className="w-full mt-4 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded">
                View Projects
              </Button>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex items-start gap-4 p-4 bg-secondary/30 rounded"
            >
              <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center flex-shrink-0">
                <benefit.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded gap-2">
            Start Investing <ArrowRight className="w-4 h-4" />
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Investment involves risk. Please read our terms before investing.
          </p>
        </div>
      </div>
    </section>
  )
}
