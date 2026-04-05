"use client"

import Image from "next/image"
import Link from "next/link"
import { Twitter, Facebook, Instagram, Linkedin, Youtube, Mail, MapPin, Phone } from "lucide-react"

const footerLinks = {
  Platform: [
    { label: "Features", href: "#features" },
    { label: "Communities", href: "#communities" },
    { label: "Marketplace", href: "#marketplace" },
    { label: "Investors", href: "#investors" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Blog", href: "#" },
    { label: "News & Updates", href: "#" },
  ],
  Token: [
    { label: "About V1n3", href: "#v1n3" },
    { label: "Buy V1n3", href: "#" },
    { label: "Tokenomics", href: "#" },
    { label: "Whitepaper", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Partners", href: "#" },
    { label: "Contact", href: "#" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export function Footer() {
  return (
    <footer className="relative bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/greenvine-logo.png"
                alt="GreenV1n3"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <span className="font-mono text-xl font-bold">
                Green<span className="text-primary">V1n3</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Transforming Nigerian agriculture through youth participation, technology, and the V1n3 cryptocurrency ecosystem.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Plateau State, Nigeria</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>hello@greenv1n3.ng</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+234 XXX XXX XXXX</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 bg-secondary rounded flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GreenV1n3. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded">
              <span className="text-xs font-medium text-primary">Powered by Solana</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
