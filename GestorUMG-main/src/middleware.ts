import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
 
export function middleware(request: NextRequest) {
  const cookieStore = cookies()
  var token = cookieStore.get('next-token');
  if (token && request.nextUrl.pathname.includes('/auth')) {
    return NextResponse.redirect(new URL('/pages/inicio', request.url))
  } else if (!token && !request.nextUrl.pathname.includes('/auth')) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  } else if (token && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL('/pages/inicio', request.url))
  } else {
    return NextResponse.next();  
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|javascript|www.canella-interfaces.com.gt|robots|sitemap|favicon.ico).*)',
  ],
}