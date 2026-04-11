import { put } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin or team leader
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const allowedRoles = ['admin', 'agro_executive', 'gcm', 'lgpa', 'scc', 'agro_media']
    if (!allowedRoles.includes(profile.role)) {
      return NextResponse.json({ error: 'Only admins and team leaders can upload to gallery' }, { status: 403 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const title = formData.get('title') as string
    const description = formData.get('description') as string | null
    const community = formData.get('community') as string | null
    const location = formData.get('location') as string | null
    const category = formData.get('category') as string | null
    const tags = formData.get('tags') as string | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed' }, { status: 400 })
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size must be less than 10MB' }, { status: 400 })
    }

    // Upload to Vercel Blob
    const timestamp = Date.now()
    const fileName = `gallery/${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    
    const blob = await put(fileName, file, {
      access: 'public',
    })

    // Insert into database
    const { data: galleryImage, error: insertError } = await supabase
      .from('gallery_images')
      .insert({
        uploaded_by: user.id,
        title,
        description,
        image_url: blob.url,
        community: community || null,
        location,
        category,
        tags: tags ? tags.split(',').map(t => t.trim()) : [],
        is_approved: true, // Auto-approve for admins/leaders
      })
      .select()
      .single()

    if (insertError) {
      console.error('Database insert error:', insertError)
      return NextResponse.json({ error: 'Failed to save image to database' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      image: galleryImage,
      url: blob.url 
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
