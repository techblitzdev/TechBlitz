'use client';

import { UserRoadmaps } from '@/types/Roadmap';
import Link from 'next/link';
import Chip from '@/components/ui/chip';
import { capitalise, shortenText } from '@/utils';
import RoadmapCardMenu from '@/components/app/roadmaps/[uid]/roadmap-card-menu';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function RoadmapsCard(opts: { roadmap: UserRoadmaps }) {
  const { roadmap: initialRoadmap } = opts;

  const [isLoading, setIsLoading] = useState(false);
  const roadmapRef = useRef(initialRoadmap);

  useEffect(() => {
    if (!isLoading) {
      roadmapRef.current = initialRoadmap;
    }
  }, [initialRoadmap, isLoading]);

  const handleDeleteStart = () => {
    setIsLoading(true);
  };

  const handleDeleteEnd = () => {
    setIsLoading(false);
  };

  const href =
    roadmapRef.current.status === 'ACTIVE' ||
    roadmapRef.current.status === 'COMPLETED'
      ? `/roadmap/${roadmapRef.current.uid}`
      : `/roadmap/${roadmapRef.current.uid}/onboarding/${roadmapRef.current.currentQuestionIndex}`;

  const correctCount = roadmapRef.current.questions.filter(
    (f) => f.userCorrect
  ).length;
  const correctPercentage = Math.round(
    (correctCount / roadmapRef.current.questions.length) * 100
  );

  // determine the roadmap title and description via the status
  // if the roadmap is 'creating' then we output 'Creation in progress'
  const roadmapTitle =
    roadmapRef.current.status === 'CREATING'
      ? 'Creation in progress'
      : roadmapRef.current.title || 'Untitled Roadmap';

  const roadmapDescription =
    roadmapRef.current.status === 'CREATING'
      ? 'You are in the process of creating your roadmap. Resume it now!'
      : roadmapRef.current.description || 'No description';

  return (
    <Link
      href={href}
      className="py-6 mb-6 space-y-5 items-start border border-black-50 hover:border-accent duration-300 p-5 rounded-lg group w-full h-auto flex flex-col relative overflow-hidden"
    >
      <div className="flex w-full justify-between gap-3">
        <div className="flex flex-col gap-y-3 font-ubuntu w-full">
          <AnimatePresence mode="wait">
            <motion.h6
              key={isLoading ? 'loading' : 'content'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-base text-wrap text-start"
            >
              {isLoading ? <Skeleton className="h-6 w-3/4" /> : roadmapTitle}
            </motion.h6>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={isLoading ? 'loading' : 'content'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isLoading ? (
                <>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </>
              ) : (
                roadmapRef.current.description && (
                  <p className="text-sm">
                    {shortenText(roadmapDescription, 100)}
                  </p>
                )
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <RoadmapCardMenu
          roadmapUid={roadmapRef.current.uid}
          onDeleteStart={handleDeleteStart}
          onDeleteEnd={handleDeleteEnd}
        />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={isLoading ? 'loading' : 'content'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-5 w-full flex justify-between items-end relative z-10"
        >
          {isLoading ? (
            <>
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-20" />
            </>
          ) : (
            <>
              <Chip
                text={
                  roadmapRef.current.questions.length.toString() +
                  ' ' +
                  'Questions'
                }
                color="bg-white"
                textColor="text-black"
                border="border-black-50"
              />
              <div className="flex items-center gap-x-3">
                {roadmapRef.current.status && (
                  <Chip
                    text={capitalise(roadmapRef.current.status)}
                    color="bg-black-100"
                    border="border-black-50"
                  />
                )}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={isLoading ? 'loading' : 'content'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-2 w-full"
        >
          <p className="text-xs font-ubuntu">Roadmap progress</p>
          <div className="h-2 w-full rounded-full bg-black-50">
            <div
              className="h-2 rounded-full bg-green-500"
              style={{ width: `${correctPercentage}%` }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </Link>
  );
}
