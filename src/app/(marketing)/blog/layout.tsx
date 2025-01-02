import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | techblitz',
  description:
    'Stay up to date with the latest news and insights from TechBlitz. Gather insights on how to level up your skills, beyond our coding challenges.',
  keywords: [
    'coding blog',
    'software engineering',
    'programming tutorials',
    'tech insights',
    'coding tips',
    'developer blog',
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full justify-center items-center">
      {children}
    </div>
  );
}
