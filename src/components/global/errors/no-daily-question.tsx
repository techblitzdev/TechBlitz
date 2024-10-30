import { Button } from '@/components/ui/button';

export default function NoDailyQuestion() {
  return (
    <div className="font-satoshi w-full flex flex-col gap-y-1 justify-center">
      <p className="text-lg font-semibold">
        The issue is on our end, not yours!
      </p>
      <p>
        It seems there's no question available for today. Please reach out to
        <br />
        our support team to help resolve this.
      </p>
      <Button variant="secondary" href="/contact" className="mt-2">
        Contact Support
      </Button>
    </div>
  );
}
