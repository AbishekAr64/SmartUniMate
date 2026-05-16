import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminDashboardClient from './AdminDashboardClient';

export const runtime = 'nodejs';

export default async function AdminDashboardPage() {
  // If authorized, render the actual dashboard layout securely
  return <AdminDashboardClient />;
}