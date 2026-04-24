import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
// @ts-ignore: Next.js supports side-effect CSS imports in app router
import LayoutClient from '../../components/LayouClient'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Smart UniMate — Sabaragamuwa University',
  description: 'AI-powered digital campus assistant for SUSL students',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <LayoutClient>{children}</LayoutClient>

  )
}