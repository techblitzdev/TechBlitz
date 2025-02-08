'use client';

import { useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CardContent, CardDescription, CardHeader, CardFooter } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { capitalise } from '@/utils';
import { useOnboardingContext } from '../../../contexts/onboarding-context';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const tagCategories = [
  {
    name: 'JavaScript',
    tags: [
      'javascript',
      'arrays',
      'objects',
      'JSON',
      'generators',
      'higher-order-functions',
      'async',
      'event-handling',
      'promises',
    ],
  },
  {
    name: 'General Web Development',
    tags: [
      'rate-limiting',
      'caching',
      'garbage-collection',
      'DOM',
      'regex',
      'animation',
      'websockets',
      'security',
    ],
  },
  {
    name: 'React',
    tags: ['React', 'react-hooks', 'useCallback', 'useEffect', 'useMemo', 'useState'],
  },
];

export default function OnboardingStepTwo() {
  const { selectedTags, setSelectedTags, user, handleGetDailyQuestion } = useOnboardingContext();

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : prev.length < 5 ? [...prev, tag] : prev
    );
  };

  useEffect(() => {
    // set the selected in the context
    setSelectedTags(selectedTags);
  }, [selectedTags]);

  const progress = (selectedTags.length / 5) * 100;

  return (
    <>
      <CardHeader>
        <div className="flex flex-col lg:flex-row w-full justify-between lg:items-center gap-5">
          <motion.h1
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            Hey {user?.username || 'there'}! What would you like to learn?
          </motion.h1>
          <motion.button
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="bg-secondary px-4 py-2 rounded-lg text-sm font-medium font-onest order-first lg:order-last"
            onClick={handleGetDailyQuestion}
          >
            Or answer the daily question!
          </motion.button>
        </div>
        <CardDescription>
          <motion.span
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-gray-300 text-sm lg:text-base"
          >
            Select up to 5 topics to get started!
          </motion.span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          className="space-y-6"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          {tagCategories.map((category) => (
            <div key={category.name} className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-200">{category.name}</h2>
              <div className="flex flex-wrap gap-2">
                {category.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="default"
                    className={`px-3 py-2 text-sm cursor-pointer transition-all border border-black-50 font-light font-onest ${
                      selectedTags.includes(tag)
                        ? 'bg-accent hover:bg-accent/90'
                        : 'hover:bg-gray-700'
                    } ${selectedTags.length === 5 && !selectedTags.includes(tag) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => toggleTag(tag)}
                  >
                    {capitalise(tag)}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-4">
        <div className="w-full max-w-md">
          <Progress value={progress} className="h-2" />
        </div>
      </CardFooter>
    </>
  );
}
