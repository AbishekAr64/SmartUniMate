export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "../../../../lib/prisma"; // Adjust the path as necessary
import * as jose from 'jose';

export async function GET(request: NextRequest) {
  try {
    // 1. Grab cookie token value
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'No authentication session found' }, { status: 401 });
    }

    // 2. Decode verification signatures
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_development_only');
    const { payload } = await jose.jwtVerify(token, secret);
    
    const studentId = payload.id as string;

    // 3. Fetch current student schema row
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      select: {
        name: true,
        uniId: true,
        faculty: true,
        department: true,
      }
    });

    if (!student) {
      return NextResponse.json({ error: 'Student database profile missing' }, { status: 404 });
    }

    return NextResponse.json({ student }, { status: 200 });

  } catch (error) {
    console.error("Session Identity Retrieval Failure:", error);
    return NextResponse.json({ error: 'Session read error' }, { status: 500 });
  }
}