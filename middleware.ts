import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin')
  const adminAuth = request.cookies.get('admin-auth')?.value

  // Agar admin sahifaga kira boshlasa va cookie yo'q bo'lsa => login sahifaga yuboramiz
  if (isAdminPage && !adminAuth) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}