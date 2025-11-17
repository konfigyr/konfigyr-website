import type { ReactNode } from 'react';
import type { Metadata } from "next/types";

import { RootProvider } from 'fumadocs-ui/provider/next';
import { siteConfig } from '@/lib/config';
import { Header } from '@/components/layout/header';
import './global.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: ['Spring Cloud Config', 'Spring Boot', 'Konfigyr'],
  authors: [
    {
      name: 'konfigyr',
      url: 'https://konfigyr.com',
    },
  ],
  creator: 'konfigyr',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image.png`],
    creator: '@konfigyr',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className="flex flex-col min-h-screen bg-white">
      <Header />

      <RootProvider>
        <main>{children}</main>
      </RootProvider>
    </body>
    </html>
  )
}
