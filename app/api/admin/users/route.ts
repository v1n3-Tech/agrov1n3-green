import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
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
    
    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const search = searchParams.get("search") || ""
    const role = searchParams.get("role") || ""
    const community = searchParams.get("community") || ""
    const lga = searchParams.get("lga") || ""
    const status = searchParams.get("status") || ""
    const sortBy = searchParams.get("sortBy") || "created_at"
    const sortOrder = searchParams.get("sortOrder") || "desc"
    
    // Build query
    let query = supabase
      .from("profiles")
      .select("*", { count: "exact" })
    
    // Apply filters
    if (search) {
      query = query.or(`username.ilike.%${search}%,email.ilike.%${search}%,first_name.ilike.%${search}%,last_name.ilike.%${search}%,agro_id.ilike.%${search}%`)
    }
    
    if (role) {
      query = query.eq("role", role)
    }
    
    if (community) {
      query = query.eq("community", community)
    }
    
    if (lga) {
      query = query.eq("local_government", lga)
    }
    
    if (status === "active") {
      query = query.eq("is_active", true)
    } else if (status === "inactive") {
      query = query.eq("is_active", false)
    } else if (status === "verified") {
      query = query.eq("is_verified", true)
    } else if (status === "unverified") {
      query = query.eq("is_verified", false)
    }
    
    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === "asc" })
    
    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)
    
    const { data: users, count, error } = await query
    
    if (error) {
      console.error("Query error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    
    return NextResponse.json({
      users: users || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit)
    })
    
  } catch (error) {
    console.error("List users error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
