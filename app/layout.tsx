import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk'
});

export const metadata: Metadata = {
  title: 'GreenV1n3 | Agricultural Revolution Platform',
  description: 'Join millions of Agro Executives transforming agriculture in Nigeria. Explore 14 agriculture communities, invest, trade with V1n3 crypto, and build your future in agribusiness.',
  keywords: ['agriculture', 'Nigeria', 'agribusiness', 'farming', 'V1n3', 'crypto', 'youth empowerment', 'Plateau State'],
  icons: {
    icon: '/images/greenvine-logo.png',
    apple: '/images/greenvine-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
