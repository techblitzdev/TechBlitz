import { Button } from '@/components/ui/button';

export default function MultipleChoiceFooter() {
  return (
    <section className="flex items-center justify-between w-full">
      <Button variant="destructive">Clear</Button>
      <Button variant="accent">Submit</Button>
    </section>
  );
}
