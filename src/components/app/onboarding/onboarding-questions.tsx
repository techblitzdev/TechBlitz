'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { useOnboardingContext } from '@/contexts/onboarding-context';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function OnboardingStepThree() {
  const { onboardingQuestions } = useOnboardingContext();

  return (
    <>
      <CardHeader>
        <div className="flex flex-col lg:flex-row w-full justify-between lg:items-center gap-5">
          <motion.h1
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-xl lg:text-3xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            Here's some questions to get you started
          </motion.h1>
        </div>
        <CardDescription>
          <motion.span
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-gray-300"
          >
            Based on your interests, we've prepared some questions for you.
          </motion.span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          className="grid gap-4 sm:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {onboardingQuestions.map((question) => (
            <motion.div key={question.slug} variants={itemVariants}>
              <Link
                href={`/question/${question.slug}?tutorial=true`}
                className="block h-full group"
              >
                <Card className="h-full  transition-colors duration-300 border border-black-50 hover:border-accent">
                  <CardContent className="p-4 flex flex-col justify-between h-full">
                    <h3 className="text-lg font-semibold text-gray-200 mb-2 line-clamp-2">
                      {question.question}
                    </h3>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-400">View question</span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </>
  );
}
