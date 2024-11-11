import { Button } from '@/components/ui/button';

export default function NoDailyQuestion(opts: {
  variant?: 'default' | 'secondary' | 'accent';
  textSize?: 'sm' | 'base' | 'lg';
}) {
  const { variant = 'secondary', textSize = 'base' } = opts;

  return (
    <div className="font-satoshi w-full flex flex-col gap-y-1 justify-center">
      <p className="text-lg font-semibold">
        The issue is on our end, not yours!
      </p>
      <p className={`text-${textSize}`}>
        It seems there's no question available for today. Please reach out to
        <br />
        our support team to help resolve this.
      </p>
      <Button variant={variant} href="/contact" className="mt-2">
        Contact Support
      </Button>
    </div>
  );
}
