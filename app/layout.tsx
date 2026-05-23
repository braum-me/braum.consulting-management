import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Umami from '@/components/Umami'
import { content } from '@/lib/content'
import './globals.css'

const akmorn = localFont({
  variable: '--font-akmorn',
  display: 'swap',
  src: [
    { path: '../public/fonts/akmorn/AkmornGrotesque-Light.woff2',     weight: '300', style: 'normal' },
    { path: '../public/fonts/akmorn/AkmornGrotesque-Regular.woff2',   weight: '400', style: 'normal' },
    { path: '../public/fonts/akmorn/AkmornGrotesque-Medium.woff2',    weight: '500', style: 'normal' },
    { path: '../public/fonts/akmorn/AkmornGrotesque-SemiBold.woff2',  weight: '600', style: 'normal' },
    { path: '../public/fonts/akmorn/AkmornGrotesque-ExtraBold.woff2', weight: '700', style: 'normal' },
    { path: '../public/fonts/akmorn/AkmornGrotesque-ExtraBold.woff2', weight: '800', style: 'normal' },
  ],
})

const instrumentSerif = localFont({
  variable: '--font-instrument-serif',
  display: 'swap',
  src: [
    { path: '../public/fonts/instrument-serif/InstrumentSerif-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/instrument-serif/InstrumentSerif-Italic.woff2',  weight: '400', style: 'italic'  },
  ],
})

const SITE_URL = 'https://braum.consulting'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: content.metaTitle,
    template: '%s · Braum Consulting',
  },
  description: content.metaDesc,
  applicationName: 'Braum Consulting',
  authors: [{ name: 'Stefan Braum' }],
  openGraph: {
    title: 'Braum Consulting',
    description: content.metaDesc,
    url: SITE_URL,
    siteName: 'Braum Consulting',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Braum Consulting',
    description: content.metaDesc,
  },
  // Übergangsseite ist crawl- und indexierbar — beim v2-Launch ersetzt
  // Google den Index-Eintrag beim nächsten Crawl automatisch. Cleaner
  // als kurzzeitiges noindex, das die Domain aus den Snippets nimmt.
}

export const viewport: Viewport = {
  themeColor: '#0F0E0C',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="de"
      className={[
        akmorn.variable,
        instrumentSerif.variable,
        GeistSans.variable,
        GeistMono.variable,
      ].join(' ')}
    >
      <body>
        {children}
        <Umami />
      </body>
    </html>
  )
}
