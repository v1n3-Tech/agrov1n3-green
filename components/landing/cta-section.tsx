"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"

const benefits = [
  "Access 14 specialized communities",
  "Personal V1n3 wallet",
  "Weekly performance ratings",
  "Connect with investors",
  "Trade in the marketplace",
  "Training and certification",
]

export function CTASection() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div>
              <span className="inline-block px-2.5 py-1 text-[10px] font-medium text-primary bg-primary/10 border border-primary/20 rounded-[3px] uppercase tracking-widest mb-4">
                Join the Movement
              </span>
              <h2 className="font-[family-name:var(--font-aldrich)] text-3xl lg:text-4xl tracking-tight mb-3">
                Ready to Transform <span className="text-primary">Agriculture</span>?
              </h2>
              <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                Whether you&apos;re a farmer, investor, marketer, or tech enthusiast — there&apos;s a place for you in GreenV1n3.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary/20 rounded-[2px] flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button className="h-10 px-5 rounded-[3px] bg-orange/90 hover:bg-orange text-white text-sm gap-2 transition-colors">
                Register Now <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="h-10 px-5 rounded-[3px] border-border/50 hover:border-primary/40 text-sm">
                Contact Us
              </Button>
            </div>

            {/* Trust */}
            <div className="flex items-center gap-3 pt-3">
              <div className="flex -space-x-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/60 to-primary border-2 border-background flex items-center justify-center">
                    <span className="text-[9px] font-bold text-primary-foreground">{String.fromCharCode(64 + i)}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">Join 8,000+ users</p>
                <p className="text-[10px] text-muted-foreground">Growing daily</p>
              </div>
            </div>
          </div>

          {/* Registration Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[320px]">
              {/* Glow */}
              <div className="absolute -inset-4 bg-primary/5 rounded-[5px] blur-2xl" />
              
              <div className="relative bg-grey/80 backdrop-blur-sm border border-border/50 rounded-[4px] p-5">
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 relative">
                    <Image src="/images/greenvine-logo.png" alt="GreenV1n3" fill className="object-contain" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-aldrich)] text-base text-foreground">Get Started</h3>
                    <p className="text-[10px] text-muted-foreground">Create your free account</p>
                  </div>
                </div>

                {/* Form */}
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] text-muted-foreground uppercase tracking-wide">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full mt-1 px-3 py-2 bg-secondary border border-border/50 rounded-[3px] text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/60"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-muted-foreground uppercase tracking-wide">Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full mt-1 px-3 py-2 bg-secondary border border-border/50 rounded-[3px] text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/60"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-muted-foreground uppercase tracking-wide">Community</label>
                    <select className="w-full mt-1 px-3 py-2 bg-secondary border border-border/50 rounded-[3px] text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-muted-foreground">
                      <option>Choose a community</option>
                      <option>Crop Farming</option>
                      <option>Animal Farming</option>
                      <option>Agro Marketing</option>
                      <option>Agro Technology</option>
                    </select>
                  </div>
                  <Button className="w-full h-9 rounded-[3px] bg-primary hover:bg-primary/90 text-primary-foreground text-sm mt-2">
                    Create Account
                  </Button>
                </div>

                <p className="text-[11px] text-center text-muted-foreground mt-4">
                  By signing up, you agree to our Terms &amp; Privacy Policy
                </p>
              </div>

              {/* Badge */}
              <div className="absolute -bottom-2 -right-2 px-2.5 py-1 bg-orange/90 text-white rounded-[3px] text-[10px] font-bold shadow-lg">
                FREE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
