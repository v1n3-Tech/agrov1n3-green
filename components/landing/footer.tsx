"use client"

import Image from "next/image"
import Link from "next/link"
import { Mail, MapPin, Twitter, Facebook, Instagram, Linkedin } from "lucide-react"

const footerLinks = {
  Platform: ["Features", "Communities", "Marketplace", "Investors"],
  Resources: ["Documentation", "Help Center", "Blog", "News"],
  Token: ["About V1n3", "Buy V1n3", "Tokenomics", "Whitepaper"],
  Company: ["About Us", "Careers", "Partners", "Contact"],
}

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main */}
        <div className="py-10 lg:py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 relative">
                <Image src="/images/greenvine-logo.png" alt="GreenV1n3" fill className="object-contain" />
              </div>
              <span className="font-[family-name:var(--font-aldrich)] text-lg">
                Green<span className="text-primary">V1n3</span>
              </span>
            </Link>
            <p className="text-[13px] text-muted-foreground max-w-[240px] leading-relaxed">
              Transforming Nigerian agriculture through youth participation, technology, and V1n3 cryptocurrency. A <span className="text-foreground/80 font-medium">V1n3Tech</span> initiative.
            </p>
            
            {/* Contact */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
                <span>Plateau State, Nigeria</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                <Mail className="w-3 h-3 text-primary flex-shrink-0" />
                <span>hello@greenv1n3.ng</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-2">
              {[
                { icon: Twitter, label: "X / Twitter" },
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 bg-grey rounded-[3px] flex items-center justify-center text-muted-foreground hover:text-orange-400 hover:bg-orange/10 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-3">
              <h4 className="text-[11px] font-medium text-foreground uppercase tracking-wider">{title}</h4>
              <ul className="space-y-1.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-[13px] text-muted-foreground hover:text-orange-400 transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="py-4 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3">
            <p className="text-[13px] text-muted-foreground">
              &copy; {new Date().getFullYear()} GreenV1n3. All rights reserved.
            </p>
            <span className="hidden sm:inline text-border">|</span>
            <p className="text-[13px] text-muted-foreground">
              Founded by <span className="text-foreground/70 font-medium">Danzaki Mantim</span> &middot; <span className="text-primary/80">V1n3Tech</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
            <span className="px-2 py-0.5 bg-primary/10 rounded-[2px] text-[11px] font-medium text-primary">Solana</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
