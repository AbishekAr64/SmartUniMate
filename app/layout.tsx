import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
// @ts-ignore: Next.js supports side-effect CSS imports in app router
import "./globals.css"

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${playfair.variable} font-sans`}>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            try{
              var saved = localStorage.getItem('susl_theme');
              if(saved === 'dark') document.documentElement.classList.add('dark');
              else if(saved === 'light') document.documentElement.classList.remove('dark');
              else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.classList.add('dark');
            }catch(e){}
          })();
        `}} />
        {children}
      </body>
    </html>
  )
}