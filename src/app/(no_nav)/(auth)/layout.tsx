import Logo from '@/components/ui/logo';
import StarsBackground from '@/components/ui/stars-background';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative container">
      <StarsBackground className="-z-10" />
      <Link href="/" className="absolute top-8 left-8">
        <Logo />
      </Link>
      <div className="md:container text-white h-screen flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
