import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import {
  Wallet,
  ShoppingCart,
  TrendingUp,
  BarChart3,
  MessageSquare,
  Newspaper,
  Users,
  Brain,
  Zap,
  Award,
  Globe,
  Lock,
  Leaf,
  MapPin,
} from 'lucide-react'

const mainFeatures = [
  {
    icon: Wallet,
    title: 'V1n3 Wallet',
    description: 'Manage your V1n3 tokens with a secure, integrated wallet. Instant transactions, token payments, and financial tracking in one place.',
    color: 'from-primary/10 to-primary/5',
    iconColor: 'text-primary',
  },
  {
    icon: ShoppingCart,
    title: 'Agro Shop',
    description: 'Buy and sell agricultural products directly from verified farmers and producers across Nigeria. Fair pricing with blockchain transparency.',
    color: 'from-orange-500/10 to-orange-500/5',
    iconColor: 'text-orange-500',
  },
  {
    icon: TrendingUp,
    title: 'Investment Platform',
    description: 'Fund agribusiness ventures and grow your portfolio with real returns. Connect with entrepreneurs and scale agriculture startups.',
    color: 'from-green-500/10 to-green-500/5',
    iconColor: 'text-green-500',
  },
  {
    icon: BarChart3,
    title: 'Weekly Performance Ratings',
    description: 'Track detailed financial and operational metrics. Get personalized insights on your agribusiness performance and growth opportunities.',
    color: 'from-blue-500/10 to-blue-500/5',
    iconColor: 'text-blue-500',
  },
  {
    icon: MessageSquare,
    title: 'Social Profile & Sharing',
    description: 'Create your Agro Executive profile with photos, videos, and updates. Share achievements, connect with other farmers, and build your network.',
    color: 'from-purple-500/10 to-purple-500/5',
    iconColor: 'text-purple-500',
  },
  {
    icon: Newspaper,
    title: 'Agro News & Updates',
    description: 'Stay informed with live agriculture news, market trends, and economic updates. Never miss critical information for your business.',
    color: 'from-red-500/10 to-red-500/5',
    iconColor: 'text-red-500',
  },
]

const communityFeatures = [
  {
    icon: Users,
    title: '14 Agriculture Communities',
    description: 'Join specialized communities: Crop Farming, Animal Farming, Agro Marketing, Processing, Technology, Tourism, Health Care, Media & Branding, Security, Literature, Motivation & Training, Real Estate, and Logistics.',
  },
  {
    icon: Brain,
    title: 'Community Learning',
    description: 'Access training programs, workshops, and knowledge sharing sessions led by experienced Agro Executives and agricultural experts.',
  },
  {
    icon: Award,
    title: 'Recognition & Achievements',
    description: 'Earn badges, certifications, and recognition within your community. Build your reputation as a trusted Agro Executive.',
  },
  {
    icon: Zap,
    title: 'Real-time Collaboration',
    description: 'Work together on community projects, share resources, and collectively solve agricultural challenges in your region.',
  },
]

const platformFeatures = [
  {
    icon: Globe,
    title: 'Pan-African Marketplace',
    description: 'Access a growing network of agricultural products and services across Nigeria and expanding to the African continent.',
  },
  {
    icon: Lock,
    title: 'Secure & Transparent',
    description: 'All transactions secured with blockchain technology. Complete transparency in pricing, inventory, and farmer ratings.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Agriculture',
    description: 'Promote eco-friendly farming practices. Track sustainability metrics and access certifications for green farming.',
  },
  {
    icon: MapPin,
    title: 'Location-based Features',
    description: 'Find local farmers, suppliers, and markets near you. Connect with your geographical community and support local business.',
  },
]

const goals = [
  {
    value: '60%',
    label: 'Local Agro Products Patronage',
    subtext: '3-year target',
  },
  {
    value: '1,000',
    label: 'New Agro Millionaires per LGA',
    subtext: 'Poverty eradication',
  },
  {
    value: '30%',
    label: 'Nigerians Out of Poverty',
    subtext: 'Socio-economic impact',
  },
  {
    value: '10K+',
    label: 'Youth Participants (Phase 1)',
    subtext: 'Plateau State Agro Executives',
  },
]

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1.5 text-xs font-bold text-primary bg-primary/10 border border-primary/20 rounded-full mb-6 uppercase tracking-wider">
            Platform Capabilities
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Everything You Need to <span className="text-primary">Succeed</span> in Agriculture
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            GreenV1n3 is a comprehensive platform designed to empower young Agro Executives with tools for trading, investment, community building, and financial growth.
          </p>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Platform Features</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to manage your agribusiness, from trading to investments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainFeatures.map((feature) => (
              <div
                key={feature.title}
                className={`bg-gradient-to-br ${feature.color} border border-border/30 rounded-[6px] p-8 hover:border-border/60 hover:shadow-lg transition-all duration-300 group`}
              >
                <div className={`w-14 h-14 rounded-[5px] flex items-center justify-center mb-6 bg-white/5 group-hover:bg-white/10 transition-colors`}>
                  <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Community Ecosystem</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Connect, learn, and grow within specialized agriculture communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {communityFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-card border border-border/40 rounded-[6px] p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-[5px] bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Technology */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Technology</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built on secure, transparent, and scalable infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {platformFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-card border border-border/40 rounded-[6px] p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-[5px] bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Year Goals */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our 3-Year Vision</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Transforming Nigeria's agriculture through youth participation and innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {goals.map((goal, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-primary/5 to-primary/2 border border-primary/20 rounded-[6px] p-8 text-center hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-3">{goal.value}</div>
                <h3 className="font-bold text-foreground mb-2">{goal.label}</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{goal.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14 Communities Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The 14 Agriculture Communities</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose your specialty and join thousands of Agro Executives in your field.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Crop Farming',
              'Animal Farming',
              'Agro Marketing',
              'Agro Processing',
              'Management & Legislation',
              'Agro Tourism',
              'Agro Technology',
              'Agro Health Care',
              'Agro Media & Branding',
              'Agro Security',
              'Agro Literature',
              'Motivation & Training',
              'Agro Real Estate',
              'Agro Logistics',
            ].map((community) => (
              <div
                key={community}
                className="bg-card border border-border/40 rounded-[6px] p-6 text-center hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-[4px] bg-primary/10 group-hover:bg-primary/20 transition-colors mx-auto mb-4 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{community}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-orange-500/10 border border-primary/20 rounded-[8px] p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Agro Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of Agro Executives transforming Nigeria's agriculture. Register today and access all these powerful features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-[5px] font-bold hover:bg-primary/90 transition-colors"
            >
              Register as Agro Executive
            </a>
            <a
              href="/#features"
              className="px-8 py-3 bg-card border border-border text-foreground rounded-[5px] font-bold hover:bg-secondary transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
