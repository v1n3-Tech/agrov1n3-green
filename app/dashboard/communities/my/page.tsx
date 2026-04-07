import { redirect } from "next/navigation"
import { getUserProfile } from "@/lib/auth/actions"

// This page redirects to the user's community page
export default async function MyCommunityPage() {
  const profile = await getUserProfile()
  
  if (!profile) {
    redirect("/sign-in")
  }

  if (!profile.community) {
    redirect("/dashboard/communities")
  }

  // Convert community ID to slug
  const slug = profile.community.replace(/_/g, "-")
  redirect(`/dashboard/communities/${slug}`)
}
