import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if already liked
    const { data: existingLike } = await supabase
      .from('gallery_likes')
      .select('id')
      .eq('image_id', id)
      .eq('user_id', user.id)
      .single()

    if (existingLike) {
      return NextResponse.json({ liked: true, message: 'Already liked' })
    }

    // Add the like
    await supabase
      .from('gallery_likes')
      .insert({
        image_id: id,
        user_id: user.id,
      })

    // Increment likes count
    await supabase.rpc('increment_gallery_likes', { image_id: id })

    return NextResponse.json({ liked: true })
  } catch (error) {
    console.error('Like error:', error)
    return NextResponse.json({ error: 'Failed to process like' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Remove the like
    const { error: deleteError } = await supabase
      .from('gallery_likes')
      .delete()
      .eq('image_id', id)
      .eq('user_id', user.id)

    if (deleteError) {
      console.error('Delete like error:', deleteError)
      return NextResponse.json({ error: 'Failed to unlike' }, { status: 500 })
    }

    // Decrement likes count
    await supabase.rpc('decrement_gallery_likes', { image_id: id })

    return NextResponse.json({ liked: false })
  } catch (error) {
    console.error('Unlike error:', error)
    return NextResponse.json({ error: 'Failed to process unlike' }, { status: 500 })
  }
}
