"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Wallet,
  BarChart3,
  Settings,
  Bell,
  MessageSquare,
  FileText,
  Building2,
  MapPin,
  Sprout,
  TrendingUp,
  Shield,
  Megaphone,
  GraduationCap,
  HelpCircle,
  LogOut,
  ChevronRight,
  Coins,
  Store,
  Calendar,
  Target,
  Award,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { UserRole, roleLabels, roleColors } from "@/types/dashboard"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  badge?: string | number
  roles?: UserRole[]
  children?: Omit<NavItem, 'icon' | 'children'>[]
}

// Navigation items based on roles
const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Communities",
    href: "/dashboard/communities",
    icon: Sprout,
    children: [
      { title: "Browse All", href: "/dashboard/communities" },
      { title: "My Community", href: "/dashboard/communities/my" },
      { title: "Activity Feed", href: "/dashboard/communities/feed" },
    ],
  },
  {
    title: "Marketplace",
    href: "/dashboard/marketplace",
    icon: Store,
    badge: "New",
  },
  {
    title: "V1n3 Wallet",
    href: "/dashboard/wallet",
    icon: Wallet,
  },
  {
    title: "Investments",
    href: "/dashboard/investments",
    icon: TrendingUp,
    roles: ['admin', 'lgpa', 'scc', 'gcm', 'agro_executive'],
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    roles: ['admin', 'lgpa', 'scc', 'gcm'],
  },
  {
    title: "Training",
    href: "/dashboard/training",
    icon: GraduationCap,
    children: [
      { title: "Courses", href: "/dashboard/training/courses" },
      { title: "Certifications", href: "/dashboard/training/certifications" },
      { title: "Events", href: "/dashboard/training/events" },
    ],
  },
]

const managementNavItems: NavItem[] = [
  {
    title: "User Management",
    href: "/dashboard/users",
    icon: Users,
    roles: ['admin', 'lgpa', 'scc'],
  },
  {
    title: "Local Governments",
    href: "/dashboard/local-governments",
    icon: MapPin,
    roles: ['admin', 'scc'],
  },
  {
    title: "Community Managers",
    href: "/dashboard/managers",
    icon: Building2,
    roles: ['admin', 'lgpa', 'scc'],
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
    roles: ['admin', 'lgpa', 'scc', 'gcm'],
    children: [
      { title: "Performance", href: "/dashboard/reports/performance", roles: ['admin', 'lgpa', 'scc'] },
      { title: "Financial", href: "/dashboard/reports/financial", roles: ['admin', 'scc'] },
      { title: "Activities", href: "/dashboard/reports/activities" },
    ],
  },
  {
    title: "Announcements",
    href: "/dashboard/announcements",
    icon: Megaphone,
    roles: ['admin', 'lgpa', 'scc', 'gcm'],
  },
  {
    title: "Security",
    href: "/dashboard/security",
    icon: Shield,
    roles: ['admin'],
  },
]

const secondaryNavItems: NavItem[] = [
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
    badge: 3,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
    badge: 5,
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    title: "Goals & Targets",
    href: "/dashboard/goals",
    icon: Target,
    roles: ['lgpa', 'scc', 'gcm', 'agro_executive'],
  },
  {
    title: "Achievements",
    href: "/dashboard/achievements",
    icon: Award,
  },
]

interface DashboardSidebarProps {
  user: {
    name: string
    email: string
    avatar?: string
    role: UserRole
    community?: string
    wallet?: { balance: number }
  }
}

function filterNavByRole(items: NavItem[], userRole: UserRole): NavItem[] {
  return items.filter(item => {
    if (!item.roles) return true
    return item.roles.includes(userRole)
  }).map(item => ({
    ...item,
    children: item.children?.filter(child => {
      if (!child.roles) return true
      return child.roles.includes(userRole)
    })
  }))
}

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname()
  const { state } = useSidebar()
  const isCollapsed = state === 'collapsed'

  const mainNav = filterNavByRole(mainNavItems, user.role)
  const managementNav = filterNavByRole(managementNavItems, user.role)
  const secondaryNav = filterNavByRole(secondaryNavItems, user.role)

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      {/* Header with Logo */}
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-2 px-2">
          <div className="w-9 h-9 relative flex-shrink-0">
            <Image
              src="/images/greenvine-logo.png"
              alt="GreenV1n3"
              fill
              className="object-contain"
            />
          </div>
          {!isCollapsed && (
            <span className="font-[family-name:var(--font-aldrich)] text-lg text-foreground">
              Agro<span className="text-primary">V1n3</span>
            </span>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* Wallet Quick View */}
        {!isCollapsed && user.wallet && (
          <div className="mx-2 mt-4 p-3 rounded-[4px] bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Coins className="w-3.5 h-3.5 text-primary" />
              <span>V1n3 Balance</span>
            </div>
            <p className="text-lg font-semibold text-primary font-[family-name:var(--font-aldrich)]">
              {user.wallet.balance.toLocaleString()}
            </p>
          </div>
        )}

        {/* Main Navigation */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <NavItemComponent 
                  key={item.href} 
                  item={item} 
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Management Navigation - Only for elevated roles */}
        {managementNav.length > 0 && (
          <>
            <SidebarSeparator className="my-2" />
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70">
                Management
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {managementNav.map((item) => (
                    <NavItemComponent 
                      key={item.href} 
                      item={item} 
                      pathname={pathname}
                      isCollapsed={isCollapsed}
                    />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}

        {/* Secondary Navigation */}
        <SidebarSeparator className="my-2" />
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70">
            Activity
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNav.map((item) => (
                <NavItemComponent 
                  key={item.href} 
                  item={item} 
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with User */}
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-[4px]">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-[4px] bg-primary/20 text-primary text-sm">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {!isCollapsed && (
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{user.name}</span>
                      <span className={cn(
                        "truncate text-xs px-1.5 py-0.5 rounded-[3px] w-fit",
                        roleColors[user.role]
                      )}>
                        {roleLabels[user.role]}
                      </span>
                    </div>
                  )}
                  {!isCollapsed && <ChevronRight className="ml-auto size-4" />}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-[4px]"
                side="right"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    {user.community && (
                      <Badge variant="outline" className="w-fit mt-1 text-xs">
                        {user.community}
                      </Badge>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/help" className="cursor-pointer">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Help & Support
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function NavItemComponent({ 
  item, 
  pathname,
  isCollapsed 
}: { 
  item: NavItem
  pathname: string
  isCollapsed: boolean
}) {
  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
  const hasChildren = item.children && item.children.length > 0

  if (hasChildren && !isCollapsed) {
    return (
      <Collapsible asChild defaultOpen={isActive}>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.title} isActive={isActive}>
              <item.icon className="size-4" />
              <span>{item.title}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto text-xs px-1.5 py-0 h-5">
                  {item.badge}
                </Badge>
              )}
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.children?.map((child) => (
                <SidebarMenuSubItem key={child.href}>
                  <SidebarMenuSubButton asChild isActive={pathname === child.href}>
                    <Link href={child.href}>
                      <span>{child.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
        <Link href={item.href}>
          <item.icon className="size-4" />
          <span>{item.title}</span>
          {item.badge && !isCollapsed && (
            <Badge variant="secondary" className="ml-auto text-xs px-1.5 py-0 h-5 bg-primary/20 text-primary">
              {item.badge}
            </Badge>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
