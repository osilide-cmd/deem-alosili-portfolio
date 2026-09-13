import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = { title: 'Deem Alosili — Content Creator & Strategist', description: 'Story-led social content that moves people.' };
export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="en"><head><Script src="https://www.googletagmanager.com/gtag/js?id=G-5S5ZC9ENJV" strategy="afterInteractive" /><Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-5S5ZC9ENJV');`}</Script></head><body>{children}</body></html>;
}
