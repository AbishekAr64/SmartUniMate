export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "../../../../lib/prisma"; 
import bcrypt from 'bcryptjs';
import * as jose from 'jose';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // 1. Check if the student exists in the database populated by the admin
    const student = await prisma.student.findUnique({
      where: { uniEmail: email },
    });

    // CRITICAL: If the student record doesn't exist, block login instantly
    if (!student) {
      return NextResponse.json(
        { error: 'Access Denied. Your account has not been registered by an administrator.' },
        { status: 403 }
      );
    }

    // 2. Compare the submitted plaintext password with the hashed password stored via admin registry
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password credentials' }, { status: 401 });
    }

    // 3. Set up JWT security token payload
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_development_only');
    const token = await new jose.SignJWT({ 
        id: student.id, 
        email: student.uniEmail,
        role: 'student' 
      })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(secret);

    // 4. Send successful response with secure cookie
    const response = NextResponse.json(
      { message: 'Authentication successful', studentId: student.id },
      { status: 200 }
    );

    response.cookies.set('token', token, {
      httpOnly: true, // Blocks XSS client script access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 2, // 2 Hours
    });

    return response;

  } catch (error) {
    console.error("Auth System Error:", error);
    return NextResponse.json({ error: 'Internal system authentication failed' }, { status: 500 });
  }
}