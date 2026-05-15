import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. BYPASS GUARD: Allow anyone to access the student login page or admin pages without a token
  if (pathname === '/login' || pathname.startsWith('/dashboard')) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;

  // Protect student paths
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_development_only');
    await jose.jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    console.error("Student middleware token validation failed:", error);
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    return response;
  }
}

// 2. UPDATED MATCHER: Added "login" to the exclusion list
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - login (Bypasses the student login screen loop)
     * - dashboard (Bypasses admin portal completely)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|login|dashboard|_next/static|_next/image|favicon.ico).*)',
  ],
};