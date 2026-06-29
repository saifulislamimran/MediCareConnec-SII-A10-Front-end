// Global Standard RBAC Middleware
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (
    pathname === '/' ||
    pathname === '/login' ||
    pathname === '/register' ||
    pathname.startsWith('/api/auth/')
  ) {
    return NextResponse.next();
  }

  // Dashboard Isolation
  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('token')?.value;
    const userCookie = request.cookies.get('medicare_user')?.value;
    
    let role = null;

    // Try to extract role from userCookie first (fastest)
    if (userCookie) {
      try {
        role = JSON.parse(userCookie).role;
      } catch (e) {}
    }

    // Fallback: extract from JWT token payload if userCookie is missing
    if (!role && token) {
      try {
        const payload = token.split('.')[1];
        if (payload) {
          const decoded = JSON.parse(atob(payload));
          role = decoded.role;
        }
      } catch (e) {}
    }

    if (!role) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Strict RBAC Rules
    if (pathname.startsWith('/dashboard/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (pathname.startsWith('/dashboard/doctor') && role !== 'doctor' && role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (pathname.startsWith('/dashboard/patient') && role !== 'patient' && role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Redirect generic dashboard path to correct specific portal
    if (pathname === '/dashboard' || pathname === '/dashboard/') {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
