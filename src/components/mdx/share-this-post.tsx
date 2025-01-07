'use client';

import { Facebook, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ShareThisPost({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) {
  return (
    <div className="mt-10">
      <h3 className="text-2xl font-medium">Share this article</h3>
      <div className="flex flex-wrap items-center gap-4 mt-4">
        <Button
          onClick={() => {
            window.open(
              `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                title
              )}&url=${encodeURIComponent(
                `https://techblitz.dev/blog/${slug}`
              )}`,
              '_blank'
            );
          }}
          variant="default"
          className="flex items-center gap-x-2"
        >
          <Twitter size={16} />
          Share on Twitter
        </Button>
        <Button
          onClick={() => {
            window.open(
              `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                `https://techblitz.dev/blog/${slug}`
              )}`,
              '_blank'
            );
          }}
          variant="default"
          className="flex items-center gap-x-2"
        >
          <Linkedin size={16} />
          Share on LinkedIn
        </Button>
        <Button
          onClick={() => {
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                `https://techblitz.dev/blog/${slug}`
              )}`,
              '_blank'
            );
          }}
          variant="default"
          className="flex items-center gap-x-2"
        >
          <Facebook size={16} />
          Share on Facebook
        </Button>
      </div>
    </div>
  );
}
