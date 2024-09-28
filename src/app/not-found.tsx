'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const goBack = () => router.push('/dashboard');
  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-dot-white/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="flex flex-col text-center gap-x-5 items-center font-inter">
        <h2 className="text-8xl font-semibold">404</h2>
        <div className="flex flex-col max-w-96">
          <p className="text-sm">
            Sorry, it look's like the page you have requested could not be
            found.
          </p>
          <Button variant="secondary" className="mt-4" onClick={goBack}>
            Back to dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
