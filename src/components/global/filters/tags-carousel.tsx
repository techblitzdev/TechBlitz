'use client';

import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { capitalise } from '@/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface Tag {
  uid: string;
  name: string;
}

interface FilterTagsCarouselProps {
  tags: Tag[];
}

export default function FilterTagsCarousel({ tags }: FilterTagsCarouselProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateTagsInQuery = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentTags = params.get('tags')?.split(',') || [];

    if (currentTags.includes(tag)) {
      // Remove tag if it already exists
      const updatedTags = currentTags.filter((t) => t !== tag);
      if (updatedTags.length > 0) {
        params.set('tags', updatedTags.join(','));
      } else {
        params.delete('tags');
      }
    } else {
      // Add tag if it doesn't exist
      currentTags.push(tag);
      params.set('tags', currentTags.join(','));
    }

    // Reset the page to 1 whenever tags are updated
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  return (
    <Carousel
      opts={{
        loop: false,
      }}
    >
      <CarouselContent>
        {tags.map((tag) => (
          <CarouselItem key={tag.uid} className="basis-[1/8]">
            <Button
              onClick={() => updateTagsInQuery(tag.name)}
              variant="outline"
              className="text-white border border-black-50"
            >
              {capitalise(tag.name)}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="border-none text-white" />
      <CarouselNext className="border-none text-white" />
    </Carousel>
  );
}
