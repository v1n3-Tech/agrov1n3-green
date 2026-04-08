import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import type { UserRole, CommunityType, LocalGovernment } from "@/types/database"

// GET single user
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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
    
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single()
    
    if (error || !profile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    
    return NextResponse.json({ user: profile })
    
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// UPDATE user
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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
      first_name,
      last_name,
      phone,
      email,
      role,
      community,
      local_government,
      managed_lga,
      managed_community,
      is_verified,
      is_active,
      date_of_birth,
      gender,
      v1n3_balance
    } = body
    
    // Get target user's current profile
    const { data: targetProfile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", id)
      .single()
    
    // Only agro_executive can modify admin or agro_executive users
    if (targetProfile && ["admin", "agro_executive"].includes(targetProfile.role) && currentProfile.role !== "agro_executive") {
      return NextResponse.json({ error: "Only Agro Executive can modify admin users" }, { status: 403 })
    }
    
    // Only agro_executive can promote to admin or agro_executive
    if (role && ["admin", "agro_executive"].includes(role) && currentProfile.role !== "agro_executive") {
      return NextResponse.json({ error: "Only Agro Executive can assign admin roles" }, { status: 403 })
    }
    
    // Build update object
    const updateData: Record<string, unknown> = {}
    
    if (first_name !== undefined) updateData.first_name = first_name
    if (last_name !== undefined) updateData.last_name = last_name
    if (phone !== undefined) updateData.phone = phone
    if (role !== undefined) {
      updateData.role = role as UserRole
      // If role is being set to a management role, set appointment info
      if (["lgpa", "scc", "gcm", "admin"].includes(role)) {
        updateData.appointed_at = new Date().toISOString()
        updateData.appointed_by = user.id
      }
    }
    if (community !== undefined) updateData.community = community as CommunityType
    if (local_government !== undefined) updateData.local_government = local_government as LocalGovernment
    if (managed_lga !== undefined) updateData.managed_lga = managed_lga as LocalGovernment || null
    if (managed_community !== undefined) updateData.managed_community = managed_community as CommunityType || null
    if (is_verified !== undefined) updateData.is_verified = is_verified
    if (is_active !== undefined) updateData.is_active = is_active
    if (date_of_birth !== undefined) updateData.date_of_birth = date_of_birth
    if (gender !== undefined) updateData.gender = gender
    if (v1n3_balance !== undefined) updateData.v1n3_balance = v1n3_balance
    
    updateData.updated_at = new Date().toISOString()
    
    const { data: updatedProfile, error } = await supabase
      .from("profiles")
      .update(updateData)
      .eq("id", id)
      .select()
      .single()
    
    if (error) {
      console.error("Update error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    
    // Update auth email if changed
    if (email) {
      const { error: authError } = await supabase.auth.admin.updateUserById(id, {
        email
      })
      if (authError) {
        console.error("Auth email update error:", authError)
      }
    }
    
    return NextResponse.json({ success: true, user: updatedProfile })
    
  } catch (error) {
    console.error("Update user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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
    
    // Prevent self-deletion
    if (id === user.id) {
      return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 })
    }
    
    // Get target user's profile
    const { data: targetProfile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", id)
      .single()
    
    // Only agro_executive can delete admin or agro_executive users
    if (targetProfile && ["admin", "agro_executive"].includes(targetProfile.role) && currentProfile.role !== "agro_executive") {
      return NextResponse.json({ error: "Only Agro Executive can delete admin users" }, { status: 403 })
    }
    
    // Delete auth user (this will cascade to profile due to foreign key)
    const { error } = await supabase.auth.admin.deleteUser(id)
    
    if (error) {
      console.error("Delete error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error("Delete user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
