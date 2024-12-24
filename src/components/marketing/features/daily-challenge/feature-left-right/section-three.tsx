import dynamic from 'next/dynamic';

const CodeSnippet = dynamic(
  () => import('@/components/marketing/global/code-snippet'),
  {
    ssr: false,
  }
);

import LeftRightBlock from '@/components/marketing/global/left-right-block';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/ui/loading';

const codeSnippet1 = `// Challenge: Implement a smart caching system for API responses
// Difficulty: Intermediate 🌟

interface CacheConfig {
  maxAge: number;    // Maximum age in seconds
  maxSize: number;   // Maximum cache size in items
}

class SmartCache {
  private cache: Map<string, {data: any, timestamp: number}>;
  private config: CacheConfig;

  constructor(config: CacheConfig) {
    this.cache = new Map();
    this.config = config;
  }

  async get(key: string, fetchFn: () => Promise<any>) {
    const cached = this.cache.get(key);
    const now = Date.now();

    // Check if we have a valid cached value
    if (cached && (now - cached.timestamp) / 1000 < this.config.maxAge) {
      console.log('Cache hit!');
      return cached.data;
    }

    // Fetch fresh data
    const freshData = await fetchFn();
    
    // Implement cache eviction if we're at capacity
    if (this.cache.size >= this.config.maxSize) {
      // TODO: Implement LRU eviction strategy
      // Hint: Consider tracking access patterns
    }

    // Store in cache
    this.cache.set(key, {
      data: freshData,
      timestamp: now
    });

    return freshData;
  }
}

// Example usage:
const cache = new SmartCache({ maxAge: 300, maxSize: 100 });
`;

/**
 * The first section with the text on the left
 * and the illustration on the right
 */
export default function FeatureLeftRightSectionOne() {
  return (
    <LeftRightBlock
      left={
        <div className="flex flex-col gap-y-6 relative overflow-hidden">
          <Suspense fallback={<LoadingSpinner />}>
            <CodeSnippet
              code={codeSnippet1}
              language="typescript"
              filename="smart-cache.ts"
              lightTheme="one-dark-pro"
              darkTheme="one-dark-pro"
            />
          </Suspense>
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#000] to-transparent pointer-events-none z-30"></div>
        </div>
      }
      right={
        <div className="flex flex-col gap-y-6">
          <h2 className="text-2xl lg:text-4xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
            Master complex concepts, one step at a time.
          </h2>
          <p className="text-white/70 max-w-xl text-base font-onest">
            Whether you're tackling intermediate challenges or exploring
            advanced topics, TechBlitz transforms learning into a stress-free
            experience. Spend just 15-20 minutes a day solving real-world coding
            problems designed to enhance your skills and confidence.
          </p>
          <p className="text-white/70 max-w-xl text-base font-onest">
            Our structured, bite-sized tasks ensure you're always moving forward
            without the overwhelm of lengthy tutorials. Perfect for busy
            developers seeking steady growth and tangible results.
          </p>
        </div>
      }
    />
  );
}
