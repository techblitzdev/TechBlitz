import { ReactQueryClientProvider } from '@/components/shared/react-query-client-provider';
import { OnestFont } from './styles/fonts/font';
import { UbuntuFont } from './styles/fonts/font';
import { SatoshiFont } from './styles/fonts/font';
import { InterFont } from './styles/fonts/font';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryClientProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${InterFont.variable} ${SatoshiFont.variable} ${UbuntuFont.variable} ${OnestFont.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
