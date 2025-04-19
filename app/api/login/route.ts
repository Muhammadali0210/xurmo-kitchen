import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const response = NextResponse.json({ success: true })

    // Cookie orqali token yuboramiz (frontend ko‘rolmaydi!)
    response.cookies.set('admin-auth', 'true', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 2 // 2 soat
    })

    return response
  }

  return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
}
