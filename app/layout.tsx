import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'Deem Alosili — Content Creator & Strategist', description: 'Story-led social content that moves people.' };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="en"><body>{children}</body></html>;
}
