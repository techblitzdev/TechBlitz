import type { Metadata } from 'next';
import { InterFont, SatoshiFont } from './styles/fonts/font';
import './globals.css';
import { ReactQueryClientProvider } from '@/components/react-query-client-provider';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'DevDaily',
  description: 'Improve your code knowledge, one day at a time.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body
          className={`${InterFont.variable} ${SatoshiFont.variable} antialiased`}
        >
          <main>{children}</main>
          <Toaster className="bg-black" />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
