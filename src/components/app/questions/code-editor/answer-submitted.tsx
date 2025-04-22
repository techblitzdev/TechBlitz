'use client';

import { useQuestionSingle } from '@/contexts/question-single-context';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import Link from 'next/link';
import { CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatSeconds } from '@/utils/time';
import LoadingSpinner from '@/components/ui/loading';
import FlagIcon from '@/components/ui/icons/flag';
import FeedbackButton from '@/components/app/shared/feedback/feedback-button';
import { getUpgradeUrl } from '@/utils';
import { userIsPremium } from '@/utils/user';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function CodeEditorQuestionSubmitted() {
  const {
    result,
    correctAnswer,
    totalSeconds,
    generateAiAnswerHelp,
    user,
    question,
    nextQuestion,
  } = useQuestionSingle();

  const [isPending, setTransition] = useTransition();
  const searchParams = useSearchParams();
  const currentLessonIndex = searchParams?.get('lesson');

  // Use the full path to determine if we're in a study path
  const pathname = usePathname(); // Correctly use the pathname hook
  const isRoadmapLearn = pathname.includes('/roadmap/learn/');

  // Extract study path slug from the pathname if we're in a roadmap/learn path
  let studyPathSlug = '';
  if (isRoadmapLearn) {
    // URL pattern: /roadmap/learn/[slug]/lesson
    const pathParts = pathname.split('/');
    // The slug is the part after "learn"
    const learnIndex = pathParts.indexOf('learn');
    if (learnIndex >= 0 && pathParts.length > learnIndex + 1) {
      studyPathSlug = pathParts[learnIndex + 1];
    }
  }

  const isStudyPathLesson = isRoadmapLearn && !!studyPathSlug;

  // Generate URL for next question based on whether this is a study path lesson or regular question
  const getNextQuestionUrl = () => {
    if (isStudyPathLesson && studyPathSlug) {
      // If we have a nextQuestion URL from context, use that (this will handle the end of a section)
      if (nextQuestion) {
        return nextQuestion;
      }

      // URL pattern: /roadmap/learn/[slug]/[subSection]/lesson
      // Extract the subsection from the path (which should be the sectionSlug)
      const subSection = pathname.split('/')[4] || 'main';

      // Calculate the next lesson index
      const nextLessonIndex = currentLessonIndex ? parseInt(currentLessonIndex) + 1 : 1;

      return `/roadmap/learn/${studyPathSlug}/${subSection}/lesson?lesson=${nextLessonIndex}`;
    } else {
      // For regular questions, use the question slug format
      return `/question/${question.nextQuestionSlug}`;
    }
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8 flex flex-col gap-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col gap-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex w-full justify-between items-center">
          <h1 className="text-3xl font-bold">
            {correctAnswer === 'correct' ? (
              <div className="flex items-center gap-x-2">
                <CheckCircle className="size-7 text-green-500" />
                All test cases passed.
              </div>
            ) : correctAnswer === 'incorrect' ? (
              <div className="flex items-center gap-x-2">
                <XCircle className="size-7 text-red-500" />
                Some test cases failed, let's review:
              </div>
            ) : (
              <div className="flex items-center gap-x-2">
                <LoadingSpinner />
                Loading...
              </div>
            )}
          </h1>
          <FeedbackButton
            reference={question?.slug || question?.uid}
            description="Something wrong with this question? Report it and we will fix it."
            showText={false}
            icon={<FlagIcon width="16px" height="16px" />}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          {result?.passed && totalSeconds > 0 && (
            <p className="text-sm text-gray-400">in {formatSeconds(totalSeconds || 0)} seconds</p>
          )}
        </div>
      </motion.div>
      <motion.div
        className="flex flex-col gap-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="flex flex-col gap-y-2 bg-[#111111] border border-black-50 p-4 rounded-lg">
          {/** ai explain answer (on button click) */}
          <h2 className="text-xl font-bold">Explain this answer</h2>
          <p className="text-sm text-gray-400">
            Don't understand this answer? Click the button below to get an explanation.
          </p>
          <p className="text-sm text-white">
            {userIsPremium(user) ? (
              <>You have unlimited tokens remaining</>
            ) : (
              <p className="text-sm text-white">
                <span className="text-xs text-gray-400">
                  <Link href={getUpgradeUrl()} className="text-accent underline">
                    Upgrade to Premium
                  </Link>{' '}
                  to access AI-powered explanations!
                </span>
              </p>
            )}
          </p>
          <Button
            variant="default"
            onClick={() => {
              setTransition(() => {
                generateAiAnswerHelp();
              });
            }}
            disabled={isPending}
            className="hidden lg:flex"
            wrapperClassName="w-fit"
          >
            {isPending ? 'Generating...' : 'Explain Answer'}
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setTransition(() => {
                generateAiAnswerHelp(true);
              });
            }}
            className="flex lg:hidden"
          >
            {isPending ? 'Generating...' : 'Explain Answer'}
          </Button>
        </div>

        {/** if the next question slug is not null, show a button to go to the next question */}
        <div className="flex flex-col gap-y-2">
          <Button variant="secondary" href={getNextQuestionUrl()} className="w-fit">
            {isStudyPathLesson ? 'Next Lesson' : 'Next Question'}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
