"use client"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { UserRole } from "@/types/dashboard"

// Mock user data - In production, this would come from auth/session
const mockUser = {
  name: "Adamu Yakubu",
  email: "adamu.yakubu@greenvine.ng",
  avatar: "",
  role: "lgpa" as UserRole, // Change this to test different roles: 'admin' | 'regular' | 'lgpa' | 'scc' | 'gcm' | 'agro_executive'
  community: "Crop Farming",
  localGovernment: "Jos North",
  wallet: {
    balance: 12450,
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardShell user={mockUser}>
      {children}
    </DashboardShell>
  )
}
