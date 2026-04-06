import type { Metadata } from 'next'
import { Aldrich, Abel } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const aldrich = Aldrich({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-aldrich'
});
const abel = Abel({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-abel'
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
    <html lang="en" className={`${aldrich.variable} ${abel.variable}`} data-scroll-behavior="smooth">
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
