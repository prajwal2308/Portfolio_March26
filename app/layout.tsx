import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Prajwal Srinivas | Full-Stack Cloud Developer & CTO',
  description:
    'Portfolio of Prajwal Srinivas - Full-Stack Cloud Developer, Co-Founder & CTO of Beunec Technologies. Building AI-powered platforms with AWS, GCP, and modern web technologies.',
  keywords: [
    'Full-Stack Developer',
    'Cloud Engineer',
    'CTO',
    'AI',
    'AWS',
    'GCP',
    'Next.js',
    'React',
    'Portfolio',
  ],
  authors: [{ name: 'Prajwal Srinivas' }],
  openGraph: {
    title: 'Prajwal Srinivas | Full-Stack Cloud Developer & CTO',
    description:
      'Building AI-powered platforms and cloud infrastructure at scale.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0d1117',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased noise-bg">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
