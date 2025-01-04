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
import { cn } from '@/utils/cn';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

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
  const [searchQuery, setSearchQuery] = useState('');
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
      tag.name.toLowerCase().includes(searchQuery.toLowerCase())
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
      <div className="relative">
        <Input
          type="search"
          placeholder="Search tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs bg-transparent text-white placeholder:text-gray-400 border border-black-50 pl-8"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      {filteredTags.length === 0 ? (
        <div className="flex flex-col gap-y-3 items-center">
          <p className="text-gray-400 text-center">No tags found</p>
          <Button
            variant="default"
            onClick={() => {
              setSearchQuery('');
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
