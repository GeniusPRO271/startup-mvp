import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ReduxProvider from '../redux/ReduxProvider'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AndesLab',
  description: 'made by Benjamin Toro',
}

export default function RootLayout(props: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <ReduxProvider>
            {props.children}
            <div id="portal-root"></div>
          </ReduxProvider>
          <Analytics/>
          <SpeedInsights />
        </body>
    </html>
  )
}
