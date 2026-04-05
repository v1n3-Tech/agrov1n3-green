"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Sparkles } from "lucide-react"

const benefits = [
  "Access to 14 specialized communities",
  "Personal V1n3 wallet integration",
  "Weekly performance ratings",
  "Connect with investors",
  "Trade in the marketplace",
  "Training and certification",
]

export function CTASection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
                <Sparkles className="w-4 h-4" /> Join the Movement
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
                Ready to Transform <span className="text-primary">Agriculture</span>?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether {"you're"} a farmer, investor, marketer, or tech enthusiast — there&apos;s a place for you in GreenV1n3. Join thousands of young Nigerians building the future of agriculture.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid sm:grid-cols-2 gap-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded gap-2 px-8">
                Register Now <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded gap-2 border-border">
                Contact Us
              </Button>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-medium"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Join 8,000+ users</p>
                <p className="text-xs text-muted-foreground">Growing every day</p>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Glow */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
              
              {/* Registration Card */}
              <div className="relative bg-card border border-border rounded p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <Image
                    src="/images/greenvine-logo.png"
                    alt="GreenV1n3"
                    width={48}
                    height={48}
                    className="w-12 h-12"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Get Started</h3>
                    <p className="text-sm text-muted-foreground">Create your free account</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full mt-1 px-4 py-2.5 bg-secondary border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Email Address</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full mt-1 px-4 py-2.5 bg-secondary border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Select Community</label>
                    <select className="w-full mt-1 px-4 py-2.5 bg-secondary border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                      <option>Choose a community</option>
                      <option>Crop Farming</option>
                      <option>Animal Farming</option>
                      <option>Agro Marketing</option>
                      <option>Agro Technology</option>
                    </select>
                  </div>
                  <Button className="w-full bg-primary text-primary-foreground rounded">
                    Create Account
                  </Button>
                </div>

                <p className="text-xs text-center text-muted-foreground">
                  By signing up, you agree to our Terms & Privacy Policy
                </p>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-accent text-accent-foreground rounded shadow-lg">
                <span className="text-sm font-bold">Free to Join!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
