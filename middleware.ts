// Global Standard RBAC Middleware
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
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

    // Fast check via userCookie
    if (userCookie) {
      try {
        role = JSON.parse(userCookie).role;
      } catch (e) {}
    }

    // Cryptographically verify token if present
    if (token) {
      try {
        const secret = new TextEncoder().encode(
          process.env.JWT_SECRET || 'fallback_secret_for_local_dev'
        );
        const { payload } = await jwtVerify(token, secret);
        role = payload.role as string;
      } catch (error) {
        // Verification failed (tampered or expired)
        return NextResponse.redirect(new URL('/login', request.url));
      }
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
