import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Protect all dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!token || token === 'none') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Since Edge Middleware cannot easily decode JWTs without extra libraries,
    // we use a secure client-cookie fallback or strict server-side validation in the layouts.
    // For pure route-based isolation based on paths (basic level):
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
        // Invalid cookie data
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
