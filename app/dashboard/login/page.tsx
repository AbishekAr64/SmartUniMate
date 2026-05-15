'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldAlert, Lock, LogIn } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Invalid Admin Credentials')
      }

      // Successful Admin Login -> Send directly to the Admin Panel
      router.push('/dashboard')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Authentication failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 dark:bg-stone-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xl p-6">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-full bg-amber-50 dark:bg-amber-950/40">
              <ShieldAlert size={28} className="text-amber-700" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-stone-800 dark:text-stone-100">
            Administrative Portal
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Authorized Personnel Access Only
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-stone-600 dark:text-stone-300">Admin Email</label>
            <div className="flex items-center mt-1 gap-2 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800">
              <input
                type="email"
                required
                className="w-full bg-transparent outline-none text-sm"
                placeholder="admin@smartuni.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-stone-600 dark:text-stone-300">Secret Password</label>
            <div className="flex items-center mt-1 gap-2 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800">
              <Lock size={16} className="text-stone-400" />
              <input
                type="password"
                required
                className="w-full bg-transparent outline-none text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-500 font-medium bg-red-50 dark:bg-red-950/20 p-2.5 rounded-lg border border-red-200 dark:border-red-900">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-900 text-white text-sm py-2.5 rounded-xl font-medium transition disabled:opacity-60"
          >
            <LogIn size={16} />
            {loading ? 'Authenticating Officer...' : 'Verify & Enter'}
          </button>
        </form>
      </div>
    </div>
  )
}