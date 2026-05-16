'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Lock, LogIn } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

  router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950 px-3 sm:px-4">
      <div className="w-full max-w-sm sm:max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-lg p-4 sm:p-6">

        {/* Header */}
        <div className="text-center mb-5 sm:mb-6">
          <div className="flex justify-center mb-3">
            <div className="p-2 sm:p-3 rounded-full bg-red-50 dark:bg-red-950/40">
              <User size={24} className="sm:w-7 sm:h-7" color="#800000" />
            </div>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-stone-800 dark:text-stone-100">
            Smart Uni Mate Student Login
          </h1>
          <p className="text-[11px] sm:text-xs text-stone-500 mt-1">
            Sign in with your registered university credentials
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">

          {/* Email */}
          <div>
            <label className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-300">
              University Email Address
            </label>
            <div className="flex items-center mt-1 gap-2 px-2 sm:px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800">
              <User size={16} />
              <input
                type="email"
                required
                className="w-full bg-transparent outline-none text-xs sm:text-sm"
                placeholder="student@uni.ac.lk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-300">
              Password
            </label>
            <div className="flex items-center mt-1 gap-2 px-2 sm:px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800">
              <Lock size={16} />
              <input
                type="password"
                required
                className="w-full bg-transparent outline-none text-xs sm:text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Error Feedbacks */}
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl">
              <p className="text-[11px] sm:text-xs text-red-600 dark:text-red-400 font-medium">{error}</p>
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#800000] hover:bg-[#660000] text-white text-xs sm:text-sm py-2.5 rounded-xl transition disabled:opacity-60"
          >
            <LogIn size={16} />
            {loading ? 'Verifying Student Identity...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}