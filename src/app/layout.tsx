import { ReactQueryClientProvider } from '@/components/global/react-query-client-provider';
import { OnestFont } from './styles/fonts/font';
import { UbuntuFont } from './styles/fonts/font';
import { SatoshiFont } from './styles/fonts/font';
import { InterFont } from './styles/fonts/font';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body
          className={`${InterFont.variable} ${SatoshiFont.variable} ${UbuntuFont.variable} ${OnestFont.variable} antialiased`}
          suppressHydrationWarning={true}
        >
          {children}
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
