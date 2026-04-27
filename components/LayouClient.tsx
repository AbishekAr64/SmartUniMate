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

        <main className="flex-1 p-5">
          {children}
        </main>
      </div>
    </ThemeProvider>
  )
}