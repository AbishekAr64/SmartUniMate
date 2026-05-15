'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bot, CalendarDays, TrendingUp, Users } from 'lucide-react'

interface StudentProfile {
  name: string;
  faculty: string;
  department: string;
  uniId: string;
}

export default function HomePage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSessionProfile() {
      try {
        // Fetches data of the currently authenticated session user
        const res = await fetch('/api/auth/me')
        if (res.ok) {
          const data = await res.json()
          setProfile(data.student)
        }
      } catch (error) {
        console.error("Failed to retrieve user session profile:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchSessionProfile()
  }, [])

  // Quick fallback layout to prevent layout shifting during database lookup
  if (loading) {
    return (
      <div className="px-2 sm:px-3 md:px-4 animate-pulse">
        <div className="h-7 w-48 bg-stone-200 dark:bg-stone-800 rounded-lg mb-2" />
        <div className="h-4 w-64 bg-stone-200 dark:bg-stone-800 rounded-md mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"><div className="h-24 bg-stone-100 dark:bg-stone-800 rounded-2xl" /></div>
      </div>
    )
  }

  // Fallback greeting if session fails or token is missing
  const displayName = profile?.name ? profile.name.split(' ')[0] : 'Student'

  return (
    <div className="px-2 sm:px-3 md:px-4">
      {/* Dynamic Header */}
      <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-[#800000] mb-1">
        Good morning, {displayName} 👋
      </h2>
      <p className="text-stone-500 text-xs sm:text-sm mb-6 sm:mb-8 capitalize">
        {profile?.faculty || 'University Faculty'} · {profile?.department || 'Department'} · Student ID: {profile?.uniId || 'N/A'}
      </p>

      {/* Stats Dashboard Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
        {[
          { label: 'Current GPA', value: '3.72', sub: 'First Class' },
          { label: 'Credits Earned', value: '98', sub: 'of 120 total' },
          { label: 'Modules This Sem', value: '5', sub: 'Active' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-stone-900 rounded-2xl border
            border-stone-200 dark:border-stone-800 p-3 sm:p-5 shadow-sm text-center">
            <p className="text-2xl sm:text-3xl font-bold text-[#800000]">{s.value}</p>
            <p className="text-[10px] sm:text-xs text-stone-400 mt-0.5 sm:mt-1">{s.sub}</p>
            <p className="text-[10px] sm:text-xs font-medium text-stone-600 dark:text-stone-300 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Today's Classes Registry Block */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200
        dark:border-stone-800 p-4 sm:p-6 shadow-sm mb-4 sm:mb-5">
        <h3 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4">Today&apos;s Classes</h3>
        {[
          { time: '9:00 – 10:00', code: 'IS 4102', room: 'E201' },
          { time: '13:00 – 15:00', code: 'IS 4110', room: 'Lab 3' },
        ].map(c => (
          <div key={c.code} className="flex items-center gap-2 sm:gap-4 py-2 sm:py-2.5 border-b
            border-stone-100 dark:border-stone-800 last:border-0">
            <span className="text-[10px] sm:text-xs text-stone-400 w-20 sm:w-28">{c.time}</span>
            <span className="font-semibold text-xs sm:text-sm">{c.code}</span>
            <span className="text-[10px] sm:text-xs text-stone-400">{c.room}</span>
          </div>
        ))}
      </div>

      {/* Navigation Quick Links Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {[
          { href: '/chat',       icon: Bot,          label: 'AI Chat',        desc: 'Ask UniMate anything' },
          { href: '/timetable', icon: CalendarDays, label: 'Timetable',      desc: 'View your schedule' },
          { href: '/gpa',        icon: TrendingUp,   label: 'GPA Calculator', desc: 'Track your grades' },
          { href: '/community', icon: Users,        label: 'Community',      desc: 'Connect with peers' },
        ].map(({ href, icon: Icon, label, desc }) => (
          <Link key={href} href={href}
            className="flex items-center gap-3 sm:gap-4 p-3 sm:p-5 rounded-2xl border border-stone-200
              dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm
              hover:border-[#800000]/30 hover:bg-red-50/30 dark:hover:bg-red-950/10 transition">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#800000]/10 flex items-center justify-center">
              <Icon size={16} className="text-[#800000] sm:text-[18px]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold">{label}</p>
              <p className="text-[10px] sm:text-xs text-stone-400">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}