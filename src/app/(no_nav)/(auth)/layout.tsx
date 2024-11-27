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
    <div className="relative">
      <StarsBackground className="-z-10" />
      <div className="top-4 left-4 absolute z-30">
        <Logo />
      </div>
      <div className="container text-white h-screen flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
