import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import OpenSourceCard from './open-source-card';

export default function OpenSourceBlock() {
  return (
    <section className="pt-10 lg:pt-20 pb-10 md:pb-32 grid grid-cols-12 gap-16">
      <div className="flex flex-col gap-y-3 col-span-5 self-center">
        <h1 className="text-2xl lg:text-5xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
          Secrets are for Magicians, Not Software
        </h1>
        <p className="text-gray-400">
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
      {/** illustration / GH card area */}
      <div className="col-span-7 relative">
        <div className="absolute inset-x-0 w-full top-0 h-20 bg-gradient-to-b from-[#000000] to-transparent pointer-events-none"></div>
        {/** 'timeline' line */}
        <div className="absolute inset-y-0 w-[2px] h-full left-10 bg-[#3d444db3] -z-10" />
        <div className="flex flex-col gap-16 z-10">
          <OpenSourceCard />
          <OpenSourceCard />
          <OpenSourceCard />
        </div>
        <div className="absolute inset-x-0 w-full bottom-0 h-20 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
}
