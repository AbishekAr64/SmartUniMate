'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'light',
  toggle: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('susl_theme') as Theme | null
        if (saved) return saved
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
      }
    } catch (e) {}
    return 'light'
  })

  useEffect(() => {
    try {
      document.documentElement.classList.toggle('dark', theme === 'dark')
      localStorage.setItem('susl_theme', theme)
    } catch (e) {}
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>
}

export const useTheme = () => useContext(ThemeCtx)
