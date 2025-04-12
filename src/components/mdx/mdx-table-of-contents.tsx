'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import TableOfContentsIcon from '@/components/ui/icons/contents';

interface Heading {
  title: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

const generateHeadingId = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/(\d+)\.(\s|$)/g, '$1-') // Replace "1." with "1-"
    .replace(/[^\w\s-]/g, '') // Remove special chars (except hyphens)
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Trim hyphens from start and end
};

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    // Set initial active ID to the first heading if available
    if (headings.length > 0 && !activeId) {
      const firstId = generateHeadingId(headings[0].title);
      setActiveId(firstId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible heading
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-100px 0px -86%',
        threshold: 0.1, // Lower threshold to detect headings more easily
      }
    );

    // Observe all section headings
    headings.forEach((heading) => {
      const id = generateHeadingId(heading.title);
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const id = generateHeadingId(heading.title);
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings, activeId]);

  const handleClick = (id: string) => {
    setActiveId(id);
    // Smooth scroll to the heading
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <Card className="border border-black-50 bg-black-75 text-white shadow-lg">
      <CardHeader className="pb-2 pt-8">
        <CardTitle className="font-onest flex items-center gap-2">
          <TableOfContentsIcon className="w-4 h-4" />
          What's in this article?
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <nav className="space-y-1">
          {headings.map((heading, index) => {
            const id = generateHeadingId(heading.title);
            const isActive = activeId === id;

            return (
              <button
                key={index}
                onClick={() => handleClick(id)}
                className={`
                  group w-full text-left py-2 px-3 rounded-md transition-all duration-200 relative
                  ${heading.level === 2 ? 'font-medium' : 'font-normal'}
                  ${heading.level === 3 ? 'pl-4 text-xs text-gray-400 !py-1' : ''}
                  ${
                    isActive
                      ? 'bg-black-100 text-white'
                      : 'hover:bg-black-100/50 text-gray-400 hover:text-gray-200'
                  }
                `}
              >
                <div className="flex items-center justify-between gap-2">
                  {/* Left border indicator for active state */}
                  {isActive && (
                    <div className="absolute left-0 top-0 h-full w-1 bg-accent rounded-l-md animate-in fade-in duration-300" />
                  )}

                  <span
                    className={`transition-transform duration-200 ${
                      isActive ? 'translate-x-1' : ''
                    }`}
                  >
                    {heading.title}
                  </span>

                  <ChevronRight
                    size={20}
                    className={`flex-shrink-0 transition-all duration-200 
                      ${
                        isActive
                          ? 'text-primary-500 translate-x-0'
                          : 'text-gray-500 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                      }
                    `}
                  />
                </div>

                {/* Bottom indicator line */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500 to-transparent animate-in slide-in-from-left duration-300 ease-in-out" />
                )}
              </button>
            );
          })}
        </nav>
      </CardContent>
    </Card>
  );
}
