import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Protect all dashboard routes
  if (pathname.startsWith('/dashboard')) {
    // 1. Check Token Existence
    if (!token || token === 'none') {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 2. Prevent /dashboard/undefined loops
    if (pathname === '/dashboard/undefined' || pathname === '/dashboard/') {
       return NextResponse.redirect(new URL('/dashboard/patient', request.url));
    }

    // 3. Strict RBAC based on local cookie fallback
    const userCookie = request.cookies.get('medicare_user')?.value;
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        if (pathname.startsWith('/dashboard/admin') && user.role !== 'admin') {
           return NextResponse.redirect(new URL('/dashboard/patient', request.url));
        }
        if (pathname.startsWith('/dashboard/doctor') && user.role !== 'doctor') {
           return NextResponse.redirect(new URL('/dashboard/patient', request.url));
        }
      } catch (e) {
        // Silently catch corrupt JSON
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
