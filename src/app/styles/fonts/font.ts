import { Inter, Ubuntu, Onest } from 'next/font/google'
import localFont from 'next/font/local'

export const InterFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  style: 'normal',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const SatoshiFont = localFont({
  src: './satoshi/Satoshi-Variable.ttf',
  variable: '--font-satoshi',
  style: 'normal',
  weight: '100 200 300 400 500 600 700 800 900',
})

export const UbuntuFont = Ubuntu({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ubuntu',
  style: 'normal',
  weight: ['300', '400', '500', '700'],
})

export const OnestFont = Onest({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-onest',
  style: 'normal',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})
