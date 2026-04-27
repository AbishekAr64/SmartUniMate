'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { ThemeProvider } from './ThemeProvider'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ThemeProvider>
      <Header setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}/>

      <div className="flex flex-col sm:flex-row">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 px-3 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 lg:px-8 lg:py-8">
          <div className="max-w-[1200px] mx-auto">{children}</div>
        </main>
      </div>
    </ThemeProvider>
  )
}