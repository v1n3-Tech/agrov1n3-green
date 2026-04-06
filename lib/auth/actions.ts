"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

// Map community display names to enum values
const communityMap: Record<string, string> = {
  "Crop Farming": "crop_farming",
  "Animal Farming": "animal_farming",
  "Agro Marketing": "agro_marketing",
  "Agro Processing": "agro_processing",
  "Management & Legislation": "management_legislation",
  "Agro Tourism": "agro_tourism",
  "Agro Technology": "agro_technology",
  "Agro Health Care": "agro_health_care",
  "Agro Media & Branding": "agro_media_branding",
  "Agro Security": "agro_security",
  "Agro Literature": "agro_literature",
  "Motivation & Training": "motivation_training",
  "Agro Real Estate": "agro_real_estate",
  "Agro Logistics": "agro_logistics",
}

// Map LGA display names to enum values
const lgaMap: Record<string, string> = {
  "Barkin Ladi": "barkin_ladi",
  "Bassa": "bassa",
  "Bokkos": "bokkos",
  "Jos East": "jos_east",
  "Jos North": "jos_north",
  "Jos South": "jos_south",
  "Kanam": "kanam",
  "Kanke": "kanke",
  "Langtang North": "langtang_north",
  "Langtang South": "langtang_south",
  "Mangu": "mangu",
  "Mikang": "mikang",
  "Pankshin": "pankshin",
  "Qua'an Pan": "quaan_pan",
  "Riyom": "riyom",
  "Shendam": "shendam",
  "Wase": "wase",
}

export async function signUp(formData: FormData) {
  const supabase = await createClient()
  
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const phone = formData.get("phone") as string
  const communityDisplay = formData.get("community") as string
  const lgaDisplay = formData.get("localGovernment") as string
  
  // Convert display names to enum values
  const community = communityMap[communityDisplay] || "crop_farming"
  const localGovernment = lgaMap[lgaDisplay] || null

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || 
        `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback`,
      data: {
        first_name: firstName,
        last_name: lastName,
        phone,
        community,
        local_government: localGovernment,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true, message: "Check your email to confirm your account" }
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()
  
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect("/")
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/")
}

export async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getUserProfile() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    console.log("[v0] getUserProfile - user:", user?.id, "error:", userError?.message)
    
    if (!user) return null
    
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()
    
    console.log("[v0] getUserProfile - profile:", profile?.username, "error:", profileError?.message)
    
    return profile
  } catch (error) {
    console.log("[v0] getUserProfile - catch error:", error)
    return null
  }
}
