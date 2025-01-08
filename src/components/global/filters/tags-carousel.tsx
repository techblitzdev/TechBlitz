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
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface Tag {
  uid: string;
  name: string;
}

interface FilterTagsCarouselProps {
  tags: Tag[];
  searchQuery: string;
}

export default function FilterTagsCarousel({
  tags,
  searchQuery,
}: FilterTagsCarouselProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filteredTags, setFilteredTags] = useState<Tag[]>(tags);

  // keep track of the tags that are currently selected in the query
  // this is used to highlight the tags that are currently selected
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Watch for changes in search params and update selected tags accordingly
  useEffect(() => {
    const currentTags = searchParams.get('tags')?.split(',') || [];
    setSelectedTags(currentTags);
  }, [searchParams]);

  // Filter tags based on search query
  useEffect(() => {
    const filtered = tags.filter((tag) =>
      tag.name.toLowerCase().includes(searchQuery?.toLowerCase() || '')
    );
    setFilteredTags(filtered);
  }, [searchQuery, tags]);

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
    <div className="space-y-4">
      {filteredTags.length === 0 ? (
        <div className="flex flex-col gap-y-3 items-center">
          <p className="text-gray-400 text-center">No tags found</p>
          <Button
            variant="default"
            onClick={() => {
              updateTagsInQuery('');
              setFilteredTags(tags);
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <Carousel
          opts={{
            loop: false,
            dragFree: true,
            align: 'start',
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {filteredTags.map((tag) => (
              <CarouselItem key={tag.uid} className="pl-2 basis-auto">
                <Button
                  onClick={() => updateTagsInQuery(tag.name)}
                  variant="outline"
                  className={cn(
                    'text-white hover:text-white border border-black-50',
                    selectedTags.includes(tag.name) && 'bg-accent'
                  )}
                >
                  {capitalise(tag.name)}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="border-none text-white z-30 -left-12"
            variant="ghost"
          />
          <CarouselNext
            className="border-none text-white z-10 -right-12"
            variant="ghost"
          />
        </Carousel>
      )}
    </div>
  );
}
