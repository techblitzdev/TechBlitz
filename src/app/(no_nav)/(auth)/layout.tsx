import Logo from '@/components/global/logo';
import { redirect } from 'next/navigation';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (process.env.NODE_ENV !== 'development') {
    redirect('/');
  }

  return (
    <div className="relative bg-dot-white/[0.2]">
      <div className="top-4 left-4 absolute z-30">
        <Logo />
      </div>
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="container text-white h-screen flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
