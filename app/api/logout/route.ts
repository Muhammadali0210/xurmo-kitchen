import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin-auth', '', {
      httpOnly: true,
      expires: new Date(0), // cookie ni muddatsiz qiladi (yo'q qiladi)
    })
    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ success: false, message: 'Logout failed' }, { status: 500 })
  }
}