"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, TrendingUp } from "lucide-react"

const rotatingWords = ["Innovation", "Technology", "Community", "Prosperity", "Revolution"]

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length)
        setIsAnimating(false)
      }, 300)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[100svh] pt-14 lg:pt-16 flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-farm.jpg"
          alt="Agricultural landscape"
          fill
          className="object-cover opacity-15"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/98 to-background" />
      </div>

      {/* Subtle Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-7">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-[3px]">
              <div className="w-3.5 h-3.5 relative">
                <Image src="/images/greenvine-logo.png" alt="V1n3" fill className="object-contain" />
              </div>
              <span className="text-[11px] text-primary font-medium tracking-wider uppercase">Powered by V1n3 on Solana</span>
            </div>

            {/* Headline */}
            <h1 className="font-[family-name:var(--font-aldrich)] text-[2.5rem] sm:text-5xl lg:text-[3.5rem] xl:text-6xl tracking-tight leading-[1.05]">
              Agriculture
              <br />
              <span className="text-muted-foreground">Meets </span>
              <span className={`text-primary inline-block min-w-[200px] transition-all duration-300 ease-out ${isAnimating ? 'opacity-0 -translate-y-1' : 'opacity-100 translate-y-0'}`}>
                {rotatingWords[wordIndex]}
              </span>
            </h1>

            {/* Description */}
            <p className="text-[15px] lg:text-base text-muted-foreground max-w-md leading-relaxed">
              Join thousands of young Nigerians transforming agriculture. Trade, invest, and grow your agribusiness with GreenV1n3 — connecting farmers, investors, and consumers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Button size="lg" className="h-11 px-5 rounded-[3px] bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium group">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="h-11 px-5 rounded-[3px] border-border/60 text-sm hover:bg-secondary/60">
                <Play className="w-3.5 h-3.5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Quick Stats Row */}
            <div className="flex items-center gap-8 pt-6 border-t border-border/30">
              <div>
                <p className="font-[family-name:var(--font-aldrich)] text-2xl text-foreground">10K+</p>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide">Agro Executives</p>
              </div>
              <div className="w-px h-8 bg-border/50" />
              <div>
                <p className="font-[family-name:var(--font-aldrich)] text-2xl text-foreground">17</p>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide">Local Govts</p>
              </div>
              <div className="w-px h-8 bg-border/50" />
              <div>
                <p className="font-[family-name:var(--font-aldrich)] text-2xl text-foreground">14</p>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide">Communities</p>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Card */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px]">
              {/* Glow */}
              <div className="absolute -inset-4 bg-primary/5 rounded-[5px] blur-2xl" />
              
              {/* Main Card */}
              <div className="relative bg-card/90 backdrop-blur-sm border border-border/60 rounded-[5px] p-5 shadow-2xl">
                {/* Logo */}
                <div className="flex justify-center mb-5">
                  <div className="w-24 h-24 lg:w-28 lg:h-28 relative">
                    <Image
                      src="/images/greenvine-logo.png"
                      alt="GreenV1n3"
                      fill
                      className="object-contain drop-shadow-lg"
                    />
                  </div>
                </div>

                {/* Balance */}
                <div className="text-center mb-5">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">V1n3 Balance</p>
                  <p className="font-[family-name:var(--font-aldrich)] text-3xl text-primary">12,450</p>
                  <p className="text-xs text-muted-foreground">V1n3 Tokens</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-secondary/60 rounded-[3px] p-3 text-center">
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Local Govts</p>
                    <p className="font-[family-name:var(--font-aldrich)] text-lg text-foreground mt-0.5">17</p>
                  </div>
                  <div className="bg-secondary/60 rounded-[3px] p-3 text-center">
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Communities</p>
                    <p className="font-[family-name:var(--font-aldrich)] text-lg text-foreground mt-0.5">14</p>
                  </div>
                </div>

                {/* Live indicator */}
                <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-border/40">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  <span className="text-[10px] text-muted-foreground">Live marketplace activity</span>
                </div>
              </div>

              {/* Floating Badge - Growth */}
              <div className="absolute -top-3 -right-3 bg-card border border-border/60 rounded-[3px] px-2.5 py-1.5 shadow-xl">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-primary" />
                  <div>
                    <p className="text-[8px] text-muted-foreground leading-none">Growth</p>
                    <p className="text-xs font-semibold text-primary leading-tight">+24.5%</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge - Token */}
              <div className="absolute -bottom-2 -left-2 bg-card border border-border/60 rounded-[3px] px-2.5 py-1.5 shadow-xl">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 relative">
                    <Image src="/images/greenvine-logo.png" alt="V1n3" fill className="object-contain" />
                  </div>
                  <div>
                    <p className="text-[8px] text-muted-foreground leading-none">V1n3</p>
                    <p className="text-xs font-semibold text-accent leading-tight">$0.0842</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
