import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily Challenge | JavaScript Questions | techblitz',
  description: 'Daily coding challenge to improve your coding skills.',
  keywords: [
    'coding',
    'learn to code',
    'programming',
    'daily challenge',
    'coding challenge',
    'web development',
    'tech skills assessment'
  ],
  robots: {
    index: true,
    follow: true
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col h-full">{children}</div>;
}
