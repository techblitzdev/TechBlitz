'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface Heading {
  title: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 1.0,
      }
    );

    // Observe all section headings
    headings.forEach((heading) => {
      const id = heading.title.toLowerCase().replace(/\s+/g, '-');
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const id = heading.title.toLowerCase().replace(/\s+/g, '-');
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

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
      <CardHeader className="pb-2">
        <CardTitle className="font-onest text-2xl">Table of Contents</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <nav className="space-y-1">
          {headings.map((heading, index) => {
            const id = heading.title.toLowerCase().replace(/\s+/g, '-');
            return (
              <button
                key={index}
                onClick={() => handleClick(id)}
                className={`
                  w-full text-left py-1 pl-1 rounded-md transition-colors duration-200
                  ${heading.level === 2 ? 'font-medium' : 'text-sm text-gray-400 pl-3'}
                  ${activeId === id ? 'bg-black-50 text-white' : 'hover:bg-black-50 hover:text-white'}
                `}
              >
                <div className="flex items-center justify-between gap-2">
                  <span>{heading.title}</span>
                  <ChevronRight size={14} className="text-gray-500" />
                </div>
              </button>
            );
          })}
        </nav>
      </CardContent>
    </Card>
  );
}
