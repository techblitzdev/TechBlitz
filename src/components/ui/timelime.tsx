'use client';
import { useScroll, useTransform, motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  slug: string;
  date?: string;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans md:px-10" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-60 overflow-hidden">
        {data.map((item, index) => (
          <Link
            key={index}
            href={`/changelog/${item.slug}`}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white/50 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-white border border-white/50 p-2" />
              </div>
              <div className="hidden md:block md:pl-20">
                <h3 className="text-sm md:text-xl font-bold">{item.title}</h3>
                {item.date && <p className="text-sm text-neutral-400">{item.date}</p>}
              </div>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <div className="md:hidden">
                <h3 className="block text-2xl mb-1 text-left font-bold text-neutral-500">
                  {item.title}
                </h3>
                {item.date && <p className="text-sm text-neutral-400 mb-3">{item.date}</p>}
              </div>
              <span className="line-clamp-3">{item.content} </span>
            </div>
          </Link>
        ))}
        <div
          style={{
            height: height + 'px',
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
