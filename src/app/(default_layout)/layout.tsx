import type { Metadata } from 'next';
import { InterFont, SatoshiFont, UbuntuFont } from '../styles/fonts/font';
import '../globals.css';
import { ReactQueryClientProvider } from '@/components/react-query-client-provider';
import { Toaster } from '@/components/ui/sonner';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/global/navigation/sidebar';

export const metadata: Metadata = {
  title: 'meerge',
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
          <SidebarProvider>
            {/* Fixed background gradient */}
            {/* <div className="fixed inset-0 bg-gradient-to-t from-[#f0db4f]/5 via-transparent to-transparent pointer-events-none"></div> */}

            {/* Scrollable content */}
            <AppSidebar />
            <main className="w-full pr-6 py-6 lg:pt-8 lg:pb-3">
              <div className="lg:pl-4 h-full">
                {/* <SidebarTrigger className="size-4 h-full flex items-center my-auto -top-2.5 relative" /> */}
                {children}
              </div>
            </main>
            <Toaster className="bg-black" />
          </SidebarProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
