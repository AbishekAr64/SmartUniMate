export const runtime = 'nodejs';
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Admin logged out successfully' });
  
  // Wipe the structural cookie reference values completely
  response.cookies.set('admin_token', '', { path: '/', maxAge: 0 });
  
  return response;
}