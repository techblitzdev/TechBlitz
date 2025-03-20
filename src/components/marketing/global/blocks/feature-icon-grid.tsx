import { cn } from '@/lib/utils';

interface FeatureIconGridProps {
  items: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
  paddingTop?: `pt-${number}`;
  paddingBottom?: `pb-${number}`;
  borderTop?: boolean;
}

export default function FeatureIconGrid({
  items,
  paddingTop = 'pt-16',
  paddingBottom = 'pb-16',
  borderTop = false,
}: FeatureIconGridProps) {
  return (
    <section
      className={cn(
        paddingTop,
        paddingBottom,
        'relative lg:container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-10'
      )}
    >
      {borderTop && (
        <div
          aria-hidden="true"
          className="block left-1/2 top-0 w-full center pointer-events-none absolute h-px max-w-full -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.0) 0%, rgba(143, 143, 143, 0.67) 50%, rgba(0, 0, 0, 0) 100%)',
          }}
        ></div>
      )}

      {items?.map((item) => (
        <div key={item.title} className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-2">{item.icon}</div>
            <h3 className="font-medium">{item.title}</h3>
          </div>
          <p className="text-sm text-gray-400">{item.description}</p>
        </div>
      ))}
    </section>
  );
}
