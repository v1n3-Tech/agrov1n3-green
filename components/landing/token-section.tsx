"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Wallet, ArrowUpRight, Shield, Zap, Globe } from "lucide-react"

const tokenStats = [
  { label: "Network", value: "Solana", icon: Globe },
  { label: "Transaction Speed", value: "< 1 sec", icon: Zap },
  { label: "Security", value: "Audited", icon: Shield },
]

const useCases = [
  "Buy and sell agricultural products",
  "Invest in agribusiness projects",
  "Pay for training and certifications",
  "Receive payments and dividends",
  "Trade across African markets",
  "Access premium platform features",
]

export function TokenSection() {
  return (
    <section id="v1n3" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-accent bg-accent/10 rounded-full mb-4">
                <Wallet className="w-4 h-4" /> V1n3 Token
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
                Powered by <span className="text-accent">V1n3</span> on Solana
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                V1n3 is the native cryptocurrency of the GreenV1n3 ecosystem. Built on Solana for lightning-fast transactions and minimal fees, it powers every aspect of agricultural commerce on our platform.
              </p>
            </div>

            {/* Token Stats */}
            <div className="flex flex-wrap gap-4">
              {tokenStats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 px-4 py-2 bg-card border border-border rounded">
                  <stat.icon className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-sm font-semibold text-foreground">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Use Cases */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">What You Can Do with V1n3</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {useCases.map((useCase) => (
                  <div key={useCase} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-sm text-muted-foreground">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded gap-2">
                Get V1n3 Token <ArrowUpRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded gap-2 border-border">
                View on Solscan <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Token Visual */}
          <div className="relative flex items-center justify-center">
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl scale-150" />
              
              {/* Token Card */}
              <div className="relative bg-card border border-border rounded p-8 space-y-6">
                {/* Logo */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent/30 blur-2xl rounded-full" />
                    <Image
                      src="/images/greenvine-logo.png"
                      alt="V1n3 Token"
                      width={160}
                      height={160}
                      className="relative w-36 h-36 lg:w-40 lg:h-40"
                    />
                  </div>
                </div>

                {/* Token Info */}
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">V1n3</h3>
                  <p className="text-sm text-muted-foreground">The Currency of Agricultural Innovation</p>
                </div>

                {/* Price Display (Mock) */}
                <div className="p-4 bg-secondary/50 rounded space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current Price</span>
                    <span className="text-xl font-bold text-accent">$0.0234</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">24h Change</span>
                    <span className="text-primary font-medium">+12.4%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Market Cap</span>
                    <span className="text-foreground font-medium">$2.34M</span>
                  </div>
                </div>

                {/* Network Badge */}
                <div className="flex items-center justify-center gap-2 p-2 bg-primary/10 border border-primary/20 rounded">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">S</span>
                  </div>
                  <span className="text-sm font-medium text-primary">Built on Solana</span>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 px-3 py-2 bg-accent text-accent-foreground rounded shadow-lg">
                <span className="text-sm font-bold">Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
