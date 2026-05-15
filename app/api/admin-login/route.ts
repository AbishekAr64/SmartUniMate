export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // HARDCODED ADMIN CREDENTIALS
    const SYSTEM_ADMIN_EMAIL = "admin@smartuni.com";
    const SYSTEM_ADMIN_PASSWORD = "123456"; 

    // Guard matching validation check
    if (email !== SYSTEM_ADMIN_EMAIL || password !== SYSTEM_ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized Administrative Access Credentials' }, 
        { status: 401 }
      );
    }

    // Generate secure admin token signature
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_development_only');
    const token = await new jose.SignJWT({ role: 'super_admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('4h')
      .sign(secret);

    const response = NextResponse.json(
      { success: true, message: 'Welcome back Control Officer' }, 
      { status: 200 }
    );

    // Set separate HTTP-Only Admin Cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 4, // 4 Hours
    });

    return response;
  } catch (error) {
    console.error("Admin Authentication Failure:", error);
    return NextResponse.json({ error: 'Authentication routine failed' }, { status: 500 });
  }
}