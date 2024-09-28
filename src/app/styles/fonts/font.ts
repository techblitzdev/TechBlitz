import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

export const InterFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  style: 'normal',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const SatoshiFont = localFont({
  src: './satoshi/Satoshi-Variable.ttf',
  variable: '--font-satoshi',
  style: 'normal',
  weight: '100 200 300 400 500 600 700 800 900',
});
