"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, ArrowUpRight, Zap, Globe, Shield } from "lucide-react"

const useCases = [
  "Buy and sell agricultural products",
  "Invest in agribusiness projects",
  "Pay for training programs",
  "Receive payments and dividends",
]

export function TokenSection() {
  return (
    <section id="token" className="py-16 lg:py-24 relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div>
              <span className="inline-block px-2.5 py-1 text-[10px] font-medium text-accent bg-accent/10 border border-accent/20 rounded-[3px] uppercase tracking-widest mb-4">
                V1n3 Token
              </span>
              <h2 className="font-[family-name:var(--font-aldrich)] text-3xl lg:text-4xl tracking-tight mb-3">
                Powered by <span className="text-accent">V1n3</span> on Solana
              </h2>
              <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                V1n3 is the native cryptocurrency of GreenV1n3. Built on Solana for fast transactions and minimal fees.
              </p>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border/40 rounded-[3px]">
                <Globe className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-[9px] text-muted-foreground uppercase">Network</p>
                  <p className="text-xs font-medium text-foreground">Solana</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border/40 rounded-[3px]">
                <Zap className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-[9px] text-muted-foreground uppercase">Speed</p>
                  <p className="text-xs font-medium text-foreground">{"<"} 1 sec</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border/40 rounded-[3px]">
                <Shield className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-[9px] text-muted-foreground uppercase">Security</p>
                  <p className="text-xs font-medium text-foreground">Audited</p>
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-foreground uppercase tracking-wide">Use Cases</p>
              <div className="grid grid-cols-2 gap-1.5">
                {useCases.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    <span className="text-xs text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button className="h-9 px-4 rounded-[3px] bg-accent hover:bg-accent/90 text-accent-foreground text-sm gap-2">
                Get V1n3 <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
              <Button variant="outline" className="h-9 px-4 rounded-[3px] border-border/60 text-sm gap-2">
                View on Solscan <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Token Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-8 bg-accent/10 rounded-full blur-3xl" />
              
              <div className="relative bg-card/90 backdrop-blur-sm border border-border/60 rounded-[5px] p-6 w-full max-w-[300px]">
                {/* Logo */}
                <div className="flex justify-center mb-5">
                  <div className="w-24 h-24 relative">
                    <Image
                      src="/images/greenvine-logo.png"
                      alt="V1n3 Token"
                      fill
                      className="object-contain drop-shadow-lg"
                    />
                  </div>
                </div>

                {/* Token Name */}
                <div className="text-center mb-5">
                  <h3 className="font-[family-name:var(--font-aldrich)] text-xl text-foreground">V1n3</h3>
                  <p className="text-[10px] text-muted-foreground">Agricultural Innovation Token</p>
                </div>

                {/* Price Info */}
                <div className="space-y-2 p-3 bg-secondary/50 rounded-[3px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">Price</span>
                    <span className="font-[family-name:var(--font-aldrich)] text-lg text-accent">$0.0842</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">24h Change</span>
                    <span className="text-xs font-medium text-primary">+12.4%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">Market Cap</span>
                    <span className="text-xs font-medium text-foreground">$8.4M</span>
                  </div>
                </div>

                {/* Solana Badge */}
                <div className="flex items-center justify-center gap-2 mt-4 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-[3px]">
                  <div className="w-4 h-4 bg-primary/30 rounded-full flex items-center justify-center">
                    <span className="text-[8px] font-bold text-primary">S</span>
                  </div>
                  <span className="text-[10px] font-medium text-primary">Built on Solana</span>
                </div>
              </div>

              {/* Live Badge */}
              <div className="absolute -top-2 -right-2 px-2 py-1 bg-accent text-accent-foreground rounded-[3px] text-[10px] font-bold shadow-lg">
                LIVE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
