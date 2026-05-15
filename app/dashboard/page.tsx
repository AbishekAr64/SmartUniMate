import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminDashboardClient from './AdminDashboardClient';

export const runtime = 'nodejs';

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('admin_token')?.value;

  // If there's no admin token, redirect to the admin login page immediately
  if (!adminToken) {
    redirect('/dashboard/login');
  }

  // If authorized, render the actual dashboard layout securely
  return <AdminDashboardClient />;
}