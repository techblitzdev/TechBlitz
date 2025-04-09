'use client';

import { useQuestionSingle } from '@/contexts/question-single-context';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { use, useTransition } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRight, CheckCircle, LinkIcon, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { formatSeconds } from '@/utils/time';
import { AnswerDifficulty } from '@prisma/client';
import { updateAnswerDifficultyByQuestionUid } from '@/actions/answers/answer';
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
    relatedQuestions,
    totalSeconds,
    generateAiAnswerHelp,
    user,
    question,
    nextQuestion,
    studyPath,
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

  // resolve the related q's here - only if they are not null
  const relatedQuestionData = relatedQuestions ? use(relatedQuestions).slice(0, 3) : [];

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Question link copied to clipboard!');
  };

  const handleDifficultySelect = async (value: string) => {
    await updateAnswerDifficultyByQuestionUid(
      question?.uid || '',
      value.toUpperCase() as AnswerDifficulty
    );
    toast.success(
      'Question difficulty updated, we will now serve more personalized questions to you.'
    );
  };

  // Generate URL for next question based on whether this is a study path lesson or regular question
  const getNextQuestionUrl = () => {
    if (isStudyPathLesson && studyPathSlug) {
      // If it's a study path lesson, use the lesson index format
      const nextLessonIndex = currentLessonIndex ? parseInt(currentLessonIndex) + 1 : 1;
      return `/roadmap/learn/${studyPathSlug}/lesson?lesson=${nextLessonIndex}`;
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
          <div className="flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="ghost" onClick={() => copyLink()}>
                    <LinkIcon className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy link</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <FeedbackButton
              reference={question?.slug || question?.uid}
              title="Report Question"
              description="Something wrong with this question? Report it and we will fix it."
              showText={false}
              icon={<FlagIcon width="16px" height="16px" />}
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          {result?.passed && totalSeconds > 0 && (
            <p className="text-sm text-gray-400">in {formatSeconds(totalSeconds || 0)} seconds</p>
          )}
        </div>
      </motion.div>
      {/** if the next question slug is not null, show a button to go to the next question */}
      {nextQuestion && (
        <div className="flex flex-col gap-y-2 bg-[#111111] border border-black-50 p-4 rounded-lg">
          <h2 className="text-xl font-bold">Next Question</h2>
          <p className="text-sm text-gray-400">
            Want to continue the flow? Click the button below to go to the next question.
          </p>
          <Button
            variant="secondary"
            href={isStudyPathLesson ? getNextQuestionUrl() : `/question/${nextQuestion}`}
            className="w-fit"
          >
            Next Question
          </Button>
        </div>
      )}
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

        {/** how difficult was this question? */}
        <div className="flex flex-col gap-y-2 bg-[#111111] border border-black-50 p-4 rounded-lg">
          <h2 className="text-xl font-bold">How difficult was this question?</h2>
          <p className="text-sm text-gray-400">
            Rate this question based on how difficult it was to solve. This will help us improve the
            personalization of questions served to you.
          </p>
          <div className="flex flex-col gap-y-2">
            <Select onValueChange={handleDifficultySelect}>
              <SelectTrigger className="w-40 border border-black-50">
                <SelectValue placeholder="Select Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/** show related questions */}
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2">
            <h2 className="text-xl font-bold">Related Questions</h2>
            <p className="text-sm text-gray-400">
              {correctAnswer === 'correct' && relatedQuestionData.length > 0
                ? 'Here are some questions that are similar to this one.'
                : relatedQuestionData.length === 0
                ? 'No related questions found.'
                : 'Here are some questions that will help you understand this concept better.'}
            </p>
          </div>
          {relatedQuestionData.length > 0 && (
            <motion.div
              className="flex flex-col divide-y divide-black-50 border border-black-50 rounded-xl overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {relatedQuestionData.map((question) => (
                <Link
                  key={question.slug}
                  href={`/question/${question.slug}`}
                  className={cn(
                    'px-4 py-3 w-full flex justify-between items-center group bg-black-75 transition-colors'
                  )}
                >
                  <p className="text-sm text-white">{question.question}</p>
                  <ArrowRight className="size-4 mr-1 group-hover:mr-0 duration-300 flex-shrink-0" />
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
