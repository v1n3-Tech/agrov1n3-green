"use client"

import { 
  Users, 
  Wallet, 
  TrendingUp, 
  ShoppingBag,
  ArrowUpRight,
  Calendar,
  MapPin,
  Sprout,
  BarChart3,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  StatsCard, 
  ActivityItem, 
  SectionHeader 
} from "@/components/dashboard/dashboard-shell"

// Mock data
const stats = [
  { 
    title: "Total Members", 
    value: "8,432", 
    change: { value: 12.5, trend: 'up' as const },
    icon: <Users className="h-4 w-4" />
  },
  { 
    title: "V1n3 Balance", 
    value: "12,450", 
    change: { value: 24.5, trend: 'up' as const },
    icon: <Wallet className="h-4 w-4" />
  },
  { 
    title: "Active Investments", 
    value: "23", 
    change: { value: 8.2, trend: 'up' as const },
    icon: <TrendingUp className="h-4 w-4" />
  },
  { 
    title: "Marketplace Sales", 
    value: "₦2.4M", 
    change: { value: 3.1, trend: 'down' as const },
    icon: <ShoppingBag className="h-4 w-4" />
  },
]

const recentActivity = [
  { name: "Sarah Johnson", action: "joined Crop Farming community", time: "2 minutes ago" },
  { name: "Michael Ade", action: "invested ₦50,000 in livestock project", time: "15 minutes ago" },
  { name: "Grace Uche", action: "listed new product in marketplace", time: "1 hour ago" },
  { name: "David Okonkwo", action: "completed training certification", time: "2 hours ago" },
  { name: "Amina Ibrahim", action: "received weekly bonus of 250 V1n3", time: "3 hours ago" },
]

const topCommunities = [
  { name: "Crop Farming", members: 2341, growth: 15.2, color: "bg-primary" },
  { name: "Animal Farming", members: 1856, growth: 12.8, color: "bg-orange" },
  { name: "Agro Marketing", members: 1523, growth: 18.4, color: "bg-accent" },
  { name: "Agro Processing", members: 1204, growth: 9.6, color: "bg-chart-3" },
]

const upcomingEvents = [
  { title: "Quarterly Review Meeting", date: "Apr 15, 2026", time: "10:00 AM", type: "meeting" },
  { title: "Agro Tourism Workshop", date: "Apr 18, 2026", time: "2:00 PM", type: "training" },
  { title: "Investor Meetup", date: "Apr 22, 2026", time: "11:00 AM", type: "networking" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Welcome back, Adamu</h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening across your communities today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-[4px] gap-2">
            <Calendar className="h-4 w-4" />
            Apr 6, 2026
          </Button>
          <Button size="sm" className="rounded-[4px] gap-2">
            <ArrowUpRight className="h-4 w-4" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Activity & Communities */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="rounded-[4px] border border-border bg-card p-4">
            <SectionHeader title="Quick Actions" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link href="/dashboard/communities" className="group">
                <div className="rounded-[4px] border border-border bg-secondary/30 p-4 text-center hover:border-primary/50 hover:bg-primary/5 transition-all">
                  <Sprout className="h-6 w-6 mx-auto text-primary mb-2" />
                  <p className="text-sm font-medium">Communities</p>
                </div>
              </Link>
              <Link href="/dashboard/marketplace" className="group">
                <div className="rounded-[4px] border border-border bg-secondary/30 p-4 text-center hover:border-orange/50 hover:bg-orange/5 transition-all">
                  <ShoppingBag className="h-6 w-6 mx-auto text-orange mb-2" />
                  <p className="text-sm font-medium">Marketplace</p>
                </div>
              </Link>
              <Link href="/dashboard/wallet" className="group">
                <div className="rounded-[4px] border border-border bg-secondary/30 p-4 text-center hover:border-accent/50 hover:bg-accent/5 transition-all">
                  <Wallet className="h-6 w-6 mx-auto text-accent mb-2" />
                  <p className="text-sm font-medium">Wallet</p>
                </div>
              </Link>
              <Link href="/dashboard/analytics" className="group">
                <div className="rounded-[4px] border border-border bg-secondary/30 p-4 text-center hover:border-chart-3/50 hover:bg-chart-3/5 transition-all">
                  <BarChart3 className="h-6 w-6 mx-auto text-chart-3 mb-2" />
                  <p className="text-sm font-medium">Analytics</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Top Communities */}
          <div className="rounded-[4px] border border-border bg-card p-4">
            <SectionHeader 
              title="Top Communities" 
              description="Performance across your local government"
              action={
                <Button variant="ghost" size="sm" className="text-xs gap-1">
                  View all <ArrowRight className="h-3 w-3" />
                </Button>
              }
            />
            <div className="space-y-4">
              {topCommunities.map((community, index) => (
                <div key={community.name} className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-4">{index + 1}</span>
                  <div className={`h-8 w-8 rounded-[4px] ${community.color}/20 flex items-center justify-center`}>
                    <Sprout className={`h-4 w-4 text-primary`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium truncate">{community.name}</p>
                      <Badge variant="secondary" className="text-xs">
                        +{community.growth}%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={(community.members / 2500) * 100} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground">{community.members.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-[4px] border border-border bg-card p-4">
            <SectionHeader 
              title="Recent Activity" 
              action={
                <Button variant="ghost" size="sm" className="text-xs gap-1">
                  View all <ArrowRight className="h-3 w-3" />
                </Button>
              }
            />
            <div>
              {recentActivity.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar Content */}
        <div className="space-y-6">
          {/* V1n3 Token Card */}
          <div className="rounded-[4px] border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-4 relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 relative">
                  <Image 
                    src="/images/greenvine-logo.png" 
                    alt="V1n3 Token" 
                    fill 
                    className="object-contain" 
                  />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-aldrich)] text-sm text-muted-foreground">V1N3 TOKEN</p>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30 text-xs">
                    +24.5%
                  </Badge>
                </div>
              </div>
              <p className="text-3xl font-semibold font-[family-name:var(--font-aldrich)] text-primary mb-1">
                12,450
              </p>
              <p className="text-sm text-muted-foreground">V1n3 Tokens</p>
              <div className="flex gap-2 mt-4">
                <Button size="sm" className="flex-1 rounded-[4px] text-xs">
                  Buy V1n3
                </Button>
                <Button size="sm" variant="outline" className="flex-1 rounded-[4px] text-xs border-primary/50 hover:bg-primary/10">
                  Transfer
                </Button>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="rounded-[4px] border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-orange" />
              <p className="text-sm font-medium">Your Area</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Local Government</span>
                <span className="font-medium">Jos North</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Community</span>
                <span className="font-medium">Crop Farming</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Members in LGA</span>
                <span className="font-medium">1,234</span>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="rounded-[4px] border border-border bg-card p-4">
            <SectionHeader 
              title="Upcoming Events" 
              action={
                <Button variant="ghost" size="sm" className="text-xs gap-1">
                  View all <ArrowRight className="h-3 w-3" />
                </Button>
              }
            />
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-start gap-3 p-2 rounded-[4px] hover:bg-muted/50 transition-colors">
                  <div className="h-10 w-10 rounded-[4px] bg-secondary flex flex-col items-center justify-center text-xs">
                    <span className="font-medium">{event.date.split(' ')[1].replace(',', '')}</span>
                    <span className="text-muted-foreground text-[10px]">{event.date.split(' ')[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Card */}
          <div className="rounded-[4px] border border-border bg-card p-4">
            <SectionHeader title="Weekly Performance" />
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Tasks Completed</span>
                  <span className="font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Revenue Target</span>
                  <span className="font-medium">72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Engagement</span>
                  <span className="font-medium">93%</span>
                </div>
                <Progress value={93} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
