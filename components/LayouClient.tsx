'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Header setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}/>

      <div className="flex">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-5">
          {children}
        </main>
      </div>
    </>
  )
}