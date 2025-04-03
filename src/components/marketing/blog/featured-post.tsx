import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface FeaturedPostProps {
  title: string;
  description: string;
  image: string;
  link: string;
  className?: string;
}

export default function FeaturedPost({
  title,
  description,
  image,
  link,
  className,
}: FeaturedPostProps) {
  return (
    <div
      className={cn(
        'rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out',
        className
      )}
    >
      <Link href={link} className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 md:p-6 flex flex-col justify-center">
          <h2 className="text-xl sm:text-3xl mb-2 line-clamp-2 text-gradient from-white/75 to-white">
            {title}
          </h2>
          <p className="text-gray-400 mb-4 line-clamp-3">{description}</p>
          <Button variant="secondary">Read more</Button>
        </div>
        <div className="relative w-full md:w-1/2 h-64 md:h-auto order-first md:order-last">
          <Image
            src={image || '/placeholder.svg'}
            alt={title}
            fill
            className="object-contain border border-black-50 rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </Link>
    </div>
  );
}
