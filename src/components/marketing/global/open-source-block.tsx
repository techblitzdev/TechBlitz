import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function OpenSourceBlock() {
  return (
    <section className="pt-10 lg:pt-28 pb-10 md:pb-20 grid grid-cols-12">
      <div className="flex flex-col gap-y-3 col-span-5">
        <h1 className="text-2xl lg:text-5xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
          Secrets are for Magicians, Not Software
        </h1>
        <p>
          We believe in transparency and sharing knowledge. That’s why we
          open-sourced our platform and share our learnings with the community.
        </p>
        <a
          href="https://git.new/blitz"
          target="_blank"
          className="w-fit"
        >
          <Button
            variant="secondary"
            className="w-fit"
          >
            Source Code
            <ChevronRight className="size-4 ml-2" />
          </Button>
        </a>
      </div>
    </section>
  );
}
