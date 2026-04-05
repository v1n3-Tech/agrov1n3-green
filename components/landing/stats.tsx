"use client"

import { useEffect, useState } from "react"
import { Users, MapPin, Layers, Coins } from "lucide-react"

const stats = [
  { icon: Users, value: 10000, suffix: "+", label: "Target Youth", description: "Phase 1" },
  { icon: MapPin, value: 17, suffix: "", label: "Local Governments", description: "Full Coverage" },
  { icon: Layers, value: 14, suffix: "", label: "Communities", description: "Agro Sectors" },
  { icon: Coins, value: 1000, suffix: "+", label: "New Millionaires", description: "Per LGA Goal" },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return <span>{count.toLocaleString()}{suffix}</span>
}

export function Stats() {
  return (
    <section className="py-10 lg:py-14 bg-grey/60 border-y border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center lg:justify-start gap-2.5 mb-2">
                <div className={`w-9 h-9 rounded-[3px] flex items-center justify-center ${i % 2 === 0 ? 'bg-primary/10' : 'bg-orange/10'}`}>
                  <stat.icon className={`w-4 h-4 ${i % 2 === 0 ? 'text-primary' : 'text-orange-400'}`} />
                </div>
                <p className="font-[family-name:var(--font-aldrich)] text-2xl lg:text-3xl text-foreground">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </p>
              </div>
              <p className="text-sm text-foreground font-medium">{stat.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
