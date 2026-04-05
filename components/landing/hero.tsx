"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Users, TrendingUp, Leaf, Sparkles } from "lucide-react"

const stats = [
  { value: "10K+", label: "Target Youth", icon: Users },
  { value: "14", label: "Communities", icon: Leaf },
  { value: "17", label: "Local Governments", icon: TrendingUp },
]

const floatingWords = ["Innovate", "Grow", "Prosper", "Connect", "Transform"]

export function Hero() {
  const [currentWord, setCurrentWord] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % floatingWords.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen pt-20 lg:pt-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powered by V1n3 on Solana</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-balance">
                Agriculture Meets{" "}
                <span className="relative">
                  <span className="text-primary">Innovation</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 10C50 4 150 4 198 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/30" />
                  </svg>
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Join thousands of young Nigerians transforming agriculture. Trade, invest, and grow your agribusiness with GreenV1n3 — the platform connecting farmers, investors, and consumers.
              </p>
            </div>

            {/* Rotating Words */}
            <div className="flex items-center gap-3 text-2xl font-mono">
              <span className="text-muted-foreground">{">"}</span>
              <span className="text-primary font-semibold transition-all duration-500">
                {floatingWords[currentWord]}
              </span>
              <span className="w-0.5 h-6 bg-primary animate-pulse" />
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded gap-2 px-6">
                Start Your Journey <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded gap-2 border-border hover:bg-secondary">
                <Play className="w-4 h-4" /> Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <stat.icon className="w-4 h-4 text-primary" />
                    <span className="text-2xl lg:text-3xl font-bold text-foreground">{stat.value}</span>
                  </div>
                  <p className="text-xs lg:text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative flex items-center justify-center">
            {/* Main Card */}
            <div className="relative w-full max-w-md">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded blur-2xl" />
              
              {/* Card */}
              <div className="relative bg-card border border-border/50 rounded p-6 space-y-6">
                {/* Logo */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150" />
                    <Image
                      src="/images/greenvine-logo.png"
                      alt="GreenV1n3"
                      width={120}
                      height={120}
                      className="relative w-28 h-28 lg:w-32 lg:h-32"
                    />
                  </div>
                </div>

                {/* Mini Dashboard */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded">
                    <span className="text-sm text-muted-foreground">V1n3 Balance</span>
                    <span className="text-lg font-bold text-accent">12,450 V1n3</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-secondary/50 rounded text-center">
                      <p className="text-xs text-muted-foreground">Weekly Rating</p>
                      <p className="text-lg font-bold text-primary">A+</p>
                    </div>
                    <div className="p-3 bg-secondary/50 rounded text-center">
                      <p className="text-xs text-muted-foreground">Community</p>
                      <p className="text-lg font-bold text-foreground">Crop</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-primary/10 border border-primary/20 rounded">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-sm text-primary">Live marketplace activity</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 p-3 bg-card border border-border rounded shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Growth</p>
                    <p className="text-sm font-bold text-primary">+24.5%</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 p-3 bg-card border border-border rounded shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent/20 rounded flex items-center justify-center">
                    <Users className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Active Users</p>
                    <p className="text-sm font-bold text-accent">8,234</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-secondary/30 to-transparent" />
    </section>
  )
}
