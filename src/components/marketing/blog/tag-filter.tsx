'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  className?: string;
}

export default function TagFilter({ tags, selectedTags, className }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    const currentTags = params.get('tags')?.split(',') || [];

    if (currentTags.includes(tag)) {
      const newTags = currentTags.filter((t) => t !== tag);
      if (newTags.length) {
        params.set('tags', newTags.join(','));
      } else {
        params.delete('tags');
      }
    } else {
      params.set('tags', [...currentTags, tag].join(','));
    }

    router.push(`/blog?${params.toString()}`);
  };

  return (
    <div className={cn('flex flex-wrap gap-2 mb-6 justify-center', className)}>
      {tags.map((tag) => (
        <Button
          key={tag}
          onClick={() => handleTagClick(tag)}
          variant="default"
          size="sm"
          className={cn(selectedTags.includes(tag) ? 'bg-accent text-white' : 'hover:bg-accent')}
        >
          {tag}
        </Button>
      ))}
    </div>
  );
}
