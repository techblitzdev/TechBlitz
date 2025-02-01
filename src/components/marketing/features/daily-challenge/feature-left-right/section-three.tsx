import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import LeftRightBlock from '@/components/marketing/global/blocks/left-right-block'

const CodeSnippet = dynamic(
  () => import('@/components/marketing/global/code-snippet'),
  {
    ssr: false,
  },
)

const codeSnippet1 = `// JavaScript Daily Challenge: Build a Smart Cache
// Difficulty: Intermediate 🌟

class SmartCache {
  constructor(config) {
    this.cache = new Map();
    this.config = config;
  }

  async get(key, fetchFn) {
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
const cache = new SmartCache({ maxAge: 300, maxSize: 100 });`

export default function FeatureLeftRightSectionOne() {
  return (
    <LeftRightBlock
      left={
        <div className="flex flex-col gap-y-6 relative overflow-hidden">
          <Suspense
            fallback={
              <div className="min-h-[430px] w-full animate-pulse"></div>
            }
          >
            <CodeSnippet
              code={codeSnippet1}
              language="javascript"
              filename="daily-challenge.js"
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
            Learn to Code for Free with Daily JavaScript Challenges
          </h2>
          <p className="text-white/70 max-w-xl text-base font-onest">
            Master web development through hands-on practice with our free daily
            coding challenges. Perfect for learning JavaScript and essential
            tech skills, our platform works seamlessly on both desktop and phone
            – making it easy to learn to code anywhere, anytime.
          </p>
          <p className="text-white/70 max-w-xl text-base font-onest">
            Each challenge includes a built-in tech skills assessment to track
            your progress as you grow from beginner to professional developer.
            Start your coding journey today with practical exercises that take
            just 5-10 minutes to complete.
          </p>
        </div>
      }
    />
  )
}
