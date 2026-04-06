"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { UserRole } from "@/types/dashboard"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardHeader } from "./dashboard-header"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface DashboardShellProps {
  children: React.ReactNode
  breadcrumbs?: BreadcrumbItem[]
  user: {
    name: string
    email: string
    avatar?: string
    role: UserRole
    community?: string
    localGovernment?: string
    wallet?: { balance: number }
  }
  className?: string
}

export function DashboardShell({ 
  children, 
  breadcrumbs = [],
  user,
  className 
}: DashboardShellProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar user={user} />
      <SidebarInset>
        <DashboardHeader breadcrumbs={breadcrumbs} user={user} />
        <main className={cn("flex-1 p-4 md:p-6", className)}>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

// Stats Card Component for dashboards
interface StatsCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    trend: 'up' | 'down'
  }
  icon?: React.ReactNode
  className?: string
}

export function StatsCard({ title, value, change, icon, className }: StatsCardProps) {
  return (
    <div className={cn(
      "rounded-[4px] border border-border bg-card p-4",
      className
    )}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{title}</p>
        {icon && (
          <div className="h-8 w-8 rounded-[4px] bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-semibold font-[family-name:var(--font-aldrich)]">{value}</p>
        {change && (
          <p className={cn(
            "text-xs mt-1",
            change.trend === 'up' ? "text-primary" : "text-destructive"
          )}>
            {change.trend === 'up' ? '↑' : '↓'} {Math.abs(change.value)}%
            <span className="text-muted-foreground ml-1">vs last week</span>
          </p>
        )}
      </div>
    </div>
  )
}

// Activity Item Component
interface ActivityItemProps {
  avatar?: string
  name: string
  action: string
  time: string
  className?: string
}

export function ActivityItem({ avatar, name, action, time, className }: ActivityItemProps) {
  return (
    <div className={cn("flex items-start gap-3 py-3 border-b border-border last:border-0", className)}>
      <div className="h-8 w-8 rounded-[4px] bg-secondary flex items-center justify-center text-xs font-medium">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-medium">{name}</span>
          <span className="text-muted-foreground"> {action}</span>
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{time}</p>
      </div>
    </div>
  )
}

// Section Header Component
interface SectionHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function SectionHeader({ title, description, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  )
}

// Empty State Component
interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 px-4 text-center",
      className
    )}>
      {icon && (
        <div className="h-12 w-12 rounded-[4px] bg-muted flex items-center justify-center text-muted-foreground mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
