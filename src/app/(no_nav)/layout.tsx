import type { Metadata } from 'next';
import { InterFont, SatoshiFont, UbuntuFont } from '../styles/fonts/font';
import '../globals.css';
import { ReactQueryClientProvider } from '@/components/global/react-query-client-provider';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'techblitz',
  description: 'Improve your code knowledge, one day at a time.',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body
          className={`${InterFont.variable} ${SatoshiFont.variable} ${UbuntuFont.variable} antialiased`}
          suppressHydrationWarning={true}
        >
          {/* Scrollable content */}
          <main>{children}</main>
          <Toaster className="bg-black" />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
