import { NextRequest, NextResponse } from 'next/server'

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL?.replace('.cloud', '.site') || ''

export async function POST(request: NextRequest) {
  try {
    // Forward the request to Convex HTTP endpoint
    const response = await fetch(`${CONVEX_URL}/api/pause-websites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('authorization') || '',
      },
      body: JSON.stringify(await request.json()),
    })

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}