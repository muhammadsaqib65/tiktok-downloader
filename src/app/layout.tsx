import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { PWAInstaller } from './components/PWAInstaller';

export const metadata: Metadata = {
  title: "TikTok Video Downloader - No Watermark",
  description: "Download TikTok videos without watermark in HD quality. Free, fast, and easy to use.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TikDL",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#9333EA",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon-192.png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="bg-slate-100 text-slate-900 antialiased">
        {children}
        <PWAInstaller />
      </body>
    </html>
  );
}
