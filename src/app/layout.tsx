import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactQueryClientProvider } from '@/components/react-query-client-provider';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DevDaily",
  description: "Improve your code knowledge, one day at a time.",
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
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
          {children}
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
