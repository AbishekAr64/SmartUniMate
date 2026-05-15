export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "../../../../lib/prisma"; // Adjust the path as necessary
import bcrypt from 'bcryptjs';
import * as jose from 'jose';

// ==========================================
// 1. GET API: Fetches all students from Supabase
// ==========================================
export async function GET(request: NextRequest) {
  try {
    // Guard against unauthenticated requests
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized operation' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_development_only');
    await jose.jwtVerify(token, secret);

    // Fetch all students from Supabase using Prisma, sorted newest first
    const students = await prisma.student.findMany({
      orderBy: {
        joinedDate: 'desc',
      },
      select: {
        id: true,
        name: true,
        uniEmail: true,
        uniId: true,
        faculty: true,
        department: true,
        joinedDate: true,
      }
    });

    return NextResponse.json({ students }, { status: 200 });
  } catch (error) {
    console.error("Database Fetch Error:", error);
    return NextResponse.json({ error: 'Failed to fetch student registry' }, { status: 500 });
  }
}

// ==========================================
// 2. POST API: Registers a new student
// ==========================================
export async function POST(request: NextRequest) {
  try {
    // Guard against unauthenticated requests hitting this API
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized operation' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_development_only');
    await jose.jwtVerify(token, secret);

    // Parse payload data
    const { name, uniEmail, uniId, password, faculty, department } = await request.json();

    if (!name || !uniEmail || !uniId || !password || !faculty || !department) {
      return NextResponse.json({ error: 'All fields are strictly required' }, { status: 400 });
    }

    // Prevent duplicate entry crashes
    const emailExists = await prisma.student.findUnique({ where: { uniEmail } });
    const idExists = await prisma.student.findUnique({ where: { uniId } });

    if (emailExists || idExists) {
      return NextResponse.json({ error: 'Student with this Email or Uni ID already exists' }, { status: 400 });
    }

    // Securely hash student password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Write to Supabase database
    const newStudent = await prisma.student.create({
      data: {
        name,
        uniEmail,
        uniId,
        password: hashedPassword,
        faculty,
        department
      },
      select: { // Exclude returning the password hash back to the client
        id: true,
        name: true,
        uniEmail: true,
        uniId: true,
        faculty: true,
        department: true,
        joinedDate: true,
      }
    });

    return NextResponse.json({ message: 'Student created successfully', student: newStudent }, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: 'Database transaction failed' }, { status: 500 });
  }
}