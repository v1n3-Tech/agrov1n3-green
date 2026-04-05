import { Header } from "@/components/landing/header"
import { NewsTicker } from "@/components/landing/news-ticker"
import { Hero } from "@/components/landing/hero"
import { Communities } from "@/components/landing/communities"
import { Features } from "@/components/landing/features"
import { TokenSection } from "@/components/landing/token-section"
import { Marketplace } from "@/components/landing/marketplace"
import { Investors } from "@/components/landing/investors"
import { Structure } from "@/components/landing/structure"
import { Testimonials } from "@/components/landing/testimonials"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <NewsTicker />
      <Hero />
      <Communities />
      <Features />
      <TokenSection />
      <Marketplace />
      <Investors />
      <Structure />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  )
}
