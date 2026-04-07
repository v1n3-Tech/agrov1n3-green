import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const updates = await request.json()

    // Remove fields that shouldn't be updated directly
    const {
      id,
      email,
      agro_id,
      created_at,
      role, // Role can only be changed by admins
      is_verified,
      is_active,
      v1n3_balance,
      wallet_address,
      managed_lga,
      managed_community,
      appointed_at,
      appointed_by,
      performance_rating,
      total_ratings,
      ...allowedUpdates
    } = updates

    // Add updated_at timestamp
    allowedUpdates.updated_at = new Date().toISOString()

    // Check if username is being changed
    if (allowedUpdates.username) {
      // Get current profile to check if username change is allowed
      const { data: currentProfile } = await supabase
        .from('profiles')
        .select('username, username_changed')
        .eq('id', user.id)
        .single()

      if (currentProfile?.username_changed) {
        return NextResponse.json({ 
          error: 'Username can only be changed once. You have already used your username change.' 
        }, { status: 400 })
      }

      // The database trigger will handle setting username_changed = true
      // and granting admin role if username is 'mantim'
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(allowedUpdates)
      .eq('id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Profile update error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ profile: data })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
