import { redirect } from "next/navigation"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { getUserProfile } from "@/lib/auth/actions"
import { UserRole } from "@/types/dashboard"

// Map community enum values to display names
const communityDisplayNames: Record<string, string> = {
  'crop_farming': 'Crop Farming',
  'animal_farming': 'Animal Farming',
  'agro_marketing': 'Agro Marketing',
  'agro_processing': 'Agro Processing',
  'management_legislation': 'Management & Legislation',
  'agro_tourism': 'Agro Tourism',
  'agro_technology': 'Agro Technology',
  'agro_health_care': 'Agro Health Care',
  'agro_media_branding': 'Agro Media & Branding',
  'agro_security': 'Agro Security',
  'agro_literature': 'Agro Literature',
  'motivation_training': 'Motivation & Training',
  'agro_real_estate': 'Agro Real Estate',
  'agro_logistics': 'Agro Logistics',
}

// Map LGA enum values to display names  
const lgaDisplayNames: Record<string, string> = {
  'barkin_ladi': 'Barkin Ladi',
  'bassa': 'Bassa',
  'bokkos': 'Bokkos',
  'jos_east': 'Jos East',
  'jos_north': 'Jos North',
  'jos_south': 'Jos South',
  'kanam': 'Kanam',
  'kanke': 'Kanke',
  'langtang_north': 'Langtang North',
  'langtang_south': 'Langtang South',
  'mangu': 'Mangu',
  'mikang': 'Mikang',
  'pankshin': 'Pankshin',
  'quaan_pan': "Qua'an Pan",
  'riyom': 'Riyom',
  'shendam': 'Shendam',
  'wase': 'Wase',
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await getUserProfile()

  // Redirect to sign-in if not authenticated
  if (!profile) {
    redirect("/sign-in")
  }

  // Transform profile data for dashboard
  const user = {
    name: profile.first_name && profile.last_name 
      ? `${profile.first_name} ${profile.last_name}`
      : profile.username || "User",
    email: profile.email,
    avatar: profile.avatar_url || "",
    role: profile.role as UserRole,
    community: profile.community ? communityDisplayNames[profile.community] || profile.community : undefined,
    localGovernment: profile.local_government ? lgaDisplayNames[profile.local_government] || profile.local_government : undefined,
    wallet: {
      balance: Number(profile.v1n3_balance) || 0,
    },
  }

  return (
    <DashboardShell user={user}>
      {children}
    </DashboardShell>
  )
}
