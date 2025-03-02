import { ReactQueryClientProvider } from '@/components/shared/react-query-client-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { OnestFont } from './styles/fonts/font';
import { UbuntuFont } from './styles/fonts/font';
import { SatoshiFont } from './styles/fonts/font';
import { InterFont } from './styles/fonts/font';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryClientProvider>
      <html lang="en" className="dark">
        <body
          className={`${InterFont.variable} ${SatoshiFont.variable} ${UbuntuFont.variable} ${OnestFont.variable} antialiased bg-[#000000] text-foreground`}
          suppressHydrationWarning
        >
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
