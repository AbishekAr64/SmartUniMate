'use client'
import { useState } from 'react'
import { Moon, Sun, Bell, LogIn, LogOut, Menu } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import NotificationPanel from './NotificationPanel'
import Link from 'next/link'

export default function Header({setSidebarOpen, sidebarOpen}:{setSidebarOpen: (open: boolean) => void, sidebarOpen: boolean}) {
  const { theme, toggle } = useTheme()
  const [loggedIn, setLoggedIn] = useState(true)
  const [notifOpen, setNotifOpen] = useState(false)

  return (
    <>
      <header className="h-[60px] px-3 sm:px-5 md:px-8 flex items-center justify-between sticky top-0 z-50
        bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">

        <div className="flex items-center gap-2">
          {/* Hamburger button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="sm:hidden w-8 h-8 rounded-lg flex items-center justify-center
              text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
          >
            <Menu size={18} />
          </button>

          <span className="font-playfair text-sm sm:text-lg md:text-xl font-bold text-[#800000] cursor-pointer select-none whitespace-nowrap">
            ◈ Smart UniMate
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={toggle}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center
              text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => setNotifOpen(o => !o)}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center relative
              text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full
              border-2 border-white dark:border-stone-900" />
          </button>

          <button
            onClick={async () => {
                await fetch('/api/auth/logout', { method: 'POST' })  
              setLoggedIn(l => !l)}
            }
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 h-[32px] sm:h-[34px] rounded-lg text-xs sm:text-sm font-semibold
              text-white bg-[#800000] hover:bg-[#a01010] transition whitespace-nowrap">
            {loggedIn ? (
              <>
              <Link href="/login" className='flex items-center gap-2'><LogOut size={14} /> <span className="hidden sm:inline">Sign Out</span></Link>
                
              </>
            ) : (
              <>
                <LogIn size={14} /> <span className="hidden sm:inline">Sign In</span>
              </>
            )}
          </button>
        </div>
      </header>

      <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
    </>
  )
}