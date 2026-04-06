// User role types for the dashboard
export type UserRole = 'admin' | 'regular' | 'lgpa' | 'scc' | 'gcm' | 'agro_executive'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  community?: string
  localGovernment?: string
  wallet?: {
    balance: number
    currency: string
  }
}

export interface NavItem {
  title: string
  href: string
  icon: string
  badge?: string | number
  roles?: UserRole[] // If undefined, available to all roles
  children?: NavItem[]
}

export interface DashboardConfig {
  nav: NavItem[]
  userNav: NavItem[]
}

// Role-specific dashboard configurations
export const roleLabels: Record<UserRole, string> = {
  admin: 'Administrator',
  regular: 'Member',
  lgpa: 'LG Program Admin',
  scc: 'State Council',
  gcm: 'Community Manager',
  agro_executive: 'Agro Executive',
}

export const roleColors: Record<UserRole, string> = {
  admin: 'bg-destructive/20 text-destructive',
  regular: 'bg-muted text-muted-foreground',
  lgpa: 'bg-orange/20 text-orange',
  scc: 'bg-primary/20 text-primary',
  gcm: 'bg-accent/20 text-accent-foreground',
  agro_executive: 'bg-primary/20 text-primary',
}
