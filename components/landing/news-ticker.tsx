"use client"

import { TrendingUp, Newspaper, AlertCircle, Sparkles } from "lucide-react"

const newsItems = [
  {
    icon: TrendingUp,
    text: "V1n3 token up 12.4% in the last 24 hours",
    type: "market",
  },
  {
    icon: Sparkles,
    text: "New Agro Technology community launches with 500+ members",
    type: "update",
  },
  {
    icon: Newspaper,
    text: "Plateau State partners with GreenV1n3 for youth empowerment",
    type: "news",
  },
  {
    icon: AlertCircle,
    text: "Registration now open for all 17 local governments",
    type: "alert",
  },
]

export function NewsTicker() {
  return (
    <div className="bg-secondary/50 border-b border-border/50 py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8 animate-marquee">
          {[...newsItems, ...newsItems].map((item, index) => (
            <div key={index} className="flex items-center gap-2 whitespace-nowrap">
              <item.icon className={`w-4 h-4 ${
                item.type === "market" ? "text-primary" :
                item.type === "update" ? "text-accent" :
                item.type === "alert" ? "text-amber-400" :
                "text-muted-foreground"
              }`} />
              <span className="text-sm text-muted-foreground">{item.text}</span>
              <span className="w-2 h-2 bg-border rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
