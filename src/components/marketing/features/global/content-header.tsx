import { cn } from '@/utils/cn';

export default function FeaturesContentHeader(opts: {
  title: string;
  description?: string | JSX.Element;
}) {
  return (
    <div className={cn('container mx-auto flex flex-col gap-y-3 items-center')}>
      <h2 className="text-3xl lg:text-5xl text-center text-gradient from-white to-white/75 !font-onest !font-medium tracking-tight">
        {opts.title}
      </h2>
      <p className="text-gray-400 max-w-2xl text-center">{opts.description}</p>
    </div>
  );
}
