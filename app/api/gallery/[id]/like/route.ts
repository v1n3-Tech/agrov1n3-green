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
      // Unlike - remove the like
      await supabase
        .from('gallery_likes')
        .delete()
        .eq('image_id', id)
        .eq('user_id', user.id)

      // Decrement likes count
      await supabase.rpc('decrement_gallery_likes', { image_id: id })

      return NextResponse.json({ liked: false })
    } else {
      // Like - add the like
      await supabase
        .from('gallery_likes')
        .insert({
          image_id: id,
          user_id: user.id,
        })

      // Increment likes count
      await supabase.rpc('increment_gallery_likes', { image_id: id })

      return NextResponse.json({ liked: true })
    }
  } catch (error) {
    console.error('Like error:', error)
    return NextResponse.json({ error: 'Failed to process like' }, { status: 500 })
  }
}
