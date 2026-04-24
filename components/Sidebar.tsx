'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Bot,
  Book,
  CalendarDays,
  TrendingUp,
  Users,
  User,
  ShieldAlert,
  Newspaper,
  X
} from 'lucide-react'

const NAV = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/chat', icon: Bot, label: 'AI Chat' },
  { href: '/academic', icon: Book, label: 'Academic' },
  { href: '/timetable', icon: CalendarDays, label: 'Timetable' },
  { href: '/gpa', icon: TrendingUp, label: 'GPA Calculator' },
  { href: '/news', icon: Newspaper, label: 'News', danger: false },
  { href: '/community', icon: Users, label: 'Community' },
  { href: '/profile', icon: User, label: 'Profile' },
  { href: '/admin', icon: ShieldAlert, label: 'Admin', danger: true },
]

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen
}: {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}) {
  const path = usePathname()

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed sm:sticky top-[60px] left-0 z-50 sm:z-auto
        w-[200px] md:w-[220px] min-w-[200px] md:min-w-[220px]
        h-[calc(100vh-60px)] overflow-y-auto px-2 md:px-3 py-4 md:py-5
        bg-white dark:bg-stone-900 border-r border-stone-100 dark:border-stone-800
        transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        sm:translate-x-0`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-end sm:hidden mb-2">
          <button onClick={() => setSidebarOpen(false)} className="text-stone-400 hover:text-[#7f1d1d] transition">
            <X size={20} />
          </button>
        </div>

        {/* Title */}
        <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 px-3 mb-3">
          Main
        </p>

        {/* Navigation */}
        {NAV.map(({ href, icon: Icon, label, danger }) => {
          const active = path === href

          return (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg mb-0.5 text-xs md:text-sm font-medium transition-all duration-150
                ${
                  active
                    ? 'bg-[#fef2f2] text-[#7f1d1d] border-l-[3px] border-[#7f1d1d] pl-[9px]'
                    : danger
                    ? 'text-red-500 hover:bg-[#fef2f2] hover:text-[#7f1d1d] border-l-[3px] border-transparent pl-[9px]'
                    : 'text-stone-600 dark:text-stone-300 hover:bg-[#fef2f2] hover:text-[#7f1d1d] border-l-[3px] border-transparent pl-[9px]'
                }`}
            >
              <Icon size={18} className={active ? 'text-[#7f1d1d]' : ''} />
              <span className="truncate">{label}</span>
            </Link>
          )
        })}
      </aside>
    </>
  )
}