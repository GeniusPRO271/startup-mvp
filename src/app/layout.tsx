import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {store} from "@/app/redux/store"
import { Provider } from 'react-redux'
import ReduxProvider from './redux/ReduxProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AndesLab',
  description: 'made by Benjamin Toro',
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </body>
    </html>
  )
}
