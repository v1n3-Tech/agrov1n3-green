"use client"

import * as React from "react"
import Link from "next/link"
import { 
  Search, 
  Bell, 
  MessageSquare, 
  Plus,
  Moon,
  Sun,
  ChevronDown,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { UserRole, roleLabels, roleColors } from "@/types/dashboard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface DashboardHeaderProps {
  breadcrumbs?: BreadcrumbItem[]
  user: {
    name: string
    email: string
    avatar?: string
    role: UserRole
  }
}

const notifications = [
  {
    id: 1,
    title: "New member joined",
    description: "John Doe joined Crop Farming community",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    title: "Investment opportunity",
    description: "New agro investment available in your area",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    title: "Weekly report ready",
    description: "Your performance report is ready to view",
    time: "3 hours ago",
    unread: false,
  },
]

const messages = [
  {
    id: 1,
    from: "Sarah Admin",
    avatar: "",
    message: "Please review the new policy update...",
    time: "5 min ago",
    unread: true,
  },
  {
    id: 2,
    from: "Crop Farming Group",
    avatar: "",
    message: "Meeting scheduled for tomorrow at 2PM",
    time: "30 min ago",
    unread: true,
  },
]

export function DashboardHeader({ breadcrumbs = [], user }: DashboardHeaderProps) {
  const [searchOpen, setSearchOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex w-full items-center gap-2 px-4">
        {/* Left side - Sidebar trigger + Breadcrumbs */}
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          
          {breadcrumbs.length > 0 && (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs.map((item, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {item.href ? (
                        <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          )}
        </div>

        {/* Center - Search */}
        <div className="flex-1 flex justify-center max-w-xl mx-auto">
          <div className="relative w-full hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search communities, users, products..." 
              className="w-full pl-9 h-9 bg-secondary/50 border-border/60 rounded-[4px] focus:bg-background"
            />
            <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-1">
          {/* Quick Action */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="h-8 gap-1 rounded-[4px] hidden sm:flex">
                <Plus className="h-4 w-4" />
                <span className="hidden lg:inline">Quick Action</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-[4px]">
              <DropdownMenuItem>
                <Sparkles className="mr-2 h-4 w-4 text-primary" />
                Create Post
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                New Investment
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Messages */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                <MessageSquare className="h-5 w-5" />
                {messages.filter(m => m.unread).length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                    {messages.filter(m => m.unread).length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 rounded-[4px]" align="end">
              <div className="flex items-center justify-between p-3 border-b">
                <h4 className="font-medium">Messages</h4>
                <Link href="/dashboard/messages" className="text-xs text-primary hover:underline">
                  View all
                </Link>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {messages.map((message) => (
                  <Link 
                    key={message.id} 
                    href={`/dashboard/messages/${message.id}`}
                    className={cn(
                      "flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors border-b last:border-0",
                      message.unread && "bg-primary/5"
                    )}
                  >
                    <Avatar className="h-9 w-9 rounded-[4px]">
                      <AvatarImage src={message.avatar} />
                      <AvatarFallback className="rounded-[4px] bg-secondary text-xs">
                        {message.from.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium truncate">{message.from}</p>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{message.message}</p>
                    </div>
                    {message.unread && (
                      <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                    )}
                  </Link>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                <Bell className="h-5 w-5" />
                {notifications.filter(n => n.unread).length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-orange text-[10px] font-medium text-orange-foreground flex items-center justify-center">
                    {notifications.filter(n => n.unread).length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 rounded-[4px]" align="end">
              <div className="flex items-center justify-between p-3 border-b">
                <h4 className="font-medium">Notifications</h4>
                <Button variant="ghost" size="sm" className="h-auto py-1 px-2 text-xs text-muted-foreground">
                  Mark all read
                </Button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={cn(
                      "p-3 hover:bg-muted/50 transition-colors border-b last:border-0 cursor-pointer",
                      notification.unread && "bg-primary/5"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "h-2 w-2 rounded-full mt-2 flex-shrink-0",
                        notification.unread ? "bg-primary" : "bg-transparent"
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{notification.description}</p>
                        <p className="text-xs text-muted-foreground/70 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t">
                <Link 
                  href="/dashboard/notifications" 
                  className="block text-center text-sm text-primary hover:underline py-1"
                >
                  View all notifications
                </Link>
              </div>
            </PopoverContent>
          </Popover>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" className="h-9 w-9 hidden sm:flex">
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
