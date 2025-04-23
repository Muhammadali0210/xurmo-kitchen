import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = NextResponse.json({ success: true })

    // Bu yerda cookie o'chirishning to'g'ri yo'li
    response.cookies.set('admin-auth', '', {
      path: '/',               // MUHIM — aynan shu path bilan o'chadi
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      expires: new Date(0),    // o'tmishga qo'yib yo'q qilamiz
      maxAge: 0,
    })

    // YOKI (Yangi Next.js versiyalarida ishlaydi):
    // response.cookies.delete('admin-auth', { path: '/' })

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ success: false, message: 'Logout failed' }, { status: 500 })
  }
}
