import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Stats } from "@/components/landing/stats"
import { Communities } from "@/components/landing/communities"
import { Features } from "@/components/landing/features"
import { Marketplace } from "@/components/landing/marketplace"
import { TokenSection } from "@/components/landing/token-section"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"
import { getUserProfile } from "@/lib/auth/actions"

export default async function Home() {
  const profile = await getUserProfile()

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header profile={profile} />
      <Hero />
      <Stats />
      <Communities />
      <Features />
      <Marketplace />
      <TokenSection />
      <CTASection />
      <Footer />
    </main>
  )
}
