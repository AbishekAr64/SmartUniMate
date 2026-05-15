import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Mock database - Replace with your actual DB model
const users: any[] = []; 

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Check if user already exists
    const userExists = users.find(u => u.email === email);
    if (userExists) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to DB
    const newUser = { id: Date.now().toString(), email, password: hashedPassword };
    users.push(newUser); 

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}