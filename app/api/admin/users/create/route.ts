import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import type { UserRole, CommunityType, LocalGovernment } from "@/types/database"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Check if current user is admin or agro_executive
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const { data: currentProfile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()
    
    if (!currentProfile || !["admin", "agro_executive"].includes(currentProfile.role)) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }
    
    const body = await request.json()
    const {
      email,
      password,
      first_name,
      last_name,
      phone,
      role,
      community,
      local_government,
      managed_lga,
      managed_community,
      is_verified,
      is_active
    } = body
    
    // Validate required fields
    if (!email || !password || !first_name || !last_name || !role || !community || !local_government) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    
    // Validate role
    const validRoles: UserRole[] = ["regular", "lgpa", "scc", "gcm", "admin", "agro_executive"]
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }
    
    // Only agro_executive can create admin or agro_executive users
    if (["admin", "agro_executive"].includes(role) && currentProfile.role !== "agro_executive") {
      return NextResponse.json({ error: "Only Agro Executive can create admin users" }, { status: 403 })
    }
    
    // Create auth user using admin API
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        first_name,
        last_name,
        phone,
        community,
        local_government
      }
    })
    
    if (authError) {
      console.error("Auth error:", authError)
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }
    
    if (!authData.user) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }
    
    // Update profile with additional fields (trigger creates basic profile)
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        role: role as UserRole,
        managed_lga: managed_lga as LocalGovernment || null,
        managed_community: managed_community as CommunityType || null,
        is_verified: is_verified ?? false,
        is_active: is_active ?? true,
        appointed_at: ["lgpa", "scc", "gcm", "admin"].includes(role) ? new Date().toISOString() : null,
        appointed_by: ["lgpa", "scc", "gcm", "admin"].includes(role) ? user.id : null
      })
      .eq("id", authData.user.id)
    
    if (updateError) {
      console.error("Profile update error:", updateError)
      // Don't fail the request, the user was created
    }
    
    return NextResponse.json({ 
      success: true, 
      user: { 
        id: authData.user.id, 
        email: authData.user.email 
      } 
    })
    
  } catch (error) {
    console.error("Create user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
