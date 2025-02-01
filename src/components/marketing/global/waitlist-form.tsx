import { Button } from '@/components/ui/button';

export default function SignupForm() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-lg justify-center">
        <Button variant="accent" size="lg" href="/signup" className="flex-1 px-5">
          Start for free
        </Button>
      </div>
    </div>
  );
}
