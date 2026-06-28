import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // 1. Allow public access
  if (
    pathname === '/' ||
    pathname === '/login' ||
    pathname === '/register' ||
    pathname.startsWith('/api/auth/')
  ) {
    return NextResponse.next();
  }

  // 2. Protect all dashboard routes
  if (pathname.startsWith('/dashboard')) {
    // Block if token is missing
    if (!token || token === 'none') {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('medicare_user');
      return response;
    }

    // Stop redirect loops on root dashboard or undefined
    if (pathname === '/dashboard/undefined' || pathname === '/dashboard' || pathname === '/dashboard/') {
      return NextResponse.redirect(new URL('/dashboard/patient', request.url));
    }

    // RBAC
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
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
