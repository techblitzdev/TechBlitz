import Logo from '@/components/global/logo';
import { StarsBackground } from '@/components/ui/stars-background';
import { redirect } from 'next/navigation';

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (process.env.NODE_ENV !== 'development') {
    redirect('/');
  }

  return (
    <div className="relative container">
      <StarsBackground className="-z-10" />
      <div className="absolute top-8 left-0 lg:left-8">
        <Logo />
      </div>
      <div className="container text-white h-screen flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
