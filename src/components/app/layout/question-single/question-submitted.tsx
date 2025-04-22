'use client';

import { useQuestionSingle } from '@/contexts/question-single-context';
import CodeDisplay from './code-snippet';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import Link from 'next/link';
import { CheckCircle, LinkIcon, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { formatSeconds } from '@/utils/time';
import LoadingSpinner from '@/components/ui/loading';
import { copyLinkToClipboard, getUpgradeUrl } from '@/utils';
import { userIsPremium } from '@/utils/user';
import { useSearchParams, usePathname } from 'next/navigation';

export default function QuestionSubmitted() {
  const {
    question,
    userAnswer,
    correctAnswer,
    totalSeconds,
    generateAiAnswerHelp,
    user,
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
    // URL pattern: /roadmap/learn/[slug]/[subSection]/lesson
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
      // URL pattern: /roadmap/learn/[slug]/[subSection]/lesson
      // Extract the subsection from the path (which should be the sectionSlug)
      const subSection = pathname.split('/')[4] || 'main';

      // If we have a nextQuestion URL from context, use that (this will handle the end of a section)
      if (nextQuestion) {
        return nextQuestion;
      }

      // If there's no next question but we're in a roadmap lesson,
      // return to the roadmap overview
      if (!question.nextQuestionSlug) {
        return `/roadmaps/${studyPathSlug}`;
      }

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
        <div className="flex w-full justify-between items-center gap-5">
          <h1 className="text-4xl font-bold">
            {correctAnswer === 'correct' ? (
              <div className="flex items-center gap-x-2">
                <CheckCircle className="size-7 text-green-500" />
                You answered correctly!
              </div>
            ) : correctAnswer === 'incorrect' ? (
              <div className="flex items-center gap-x-2">
                <XCircle className="size-7 text-red-500" />
                That was incorrect, try again!
              </div>
            ) : (
              <div className="flex items-center gap-x-2">
                <LoadingSpinner />
              </div>
            )}
          </h1>
          {/** Do not show on custom questions - they are not meant to be shared */}
          {!question?.customQuestion && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="ghost" onClick={() => copyLinkToClipboard(window.location.href)}>
                    <LinkIcon className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy link</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          {userAnswer?.correctAnswer && (
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
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <h2 className="text-xl font-bold">Your Answer</h2>
            {/** test if this is a code question */}
            {userAnswer &&
            /<pre><code/.test(
              question?.answers.find((answer) => answer.uid === userAnswer?.userAnswerUid)
                ?.answer || ''
            ) ? (
              <CodeDisplay
                content={
                  question?.answers.find((answer) => answer.uid === userAnswer?.userAnswerUid)
                    ?.answer || ''
                }
              />
            ) : (
              <div className="p-3 bg-black-75">
                <p
                  className="text-sm"
                  dangerouslySetInnerHTML={{
                    __html:
                      question?.answers.find((answer) => answer.uid === userAnswer?.userAnswerUid)
                        ?.answer || '',
                  }}
                />
              </div>
            )}
          </div>

          {/** if the user answered correctly, show the correct answer */}
          {correctAnswer === 'incorrect' && (
            <div className="flex flex-col gap-y-2">
              <h2 className="text-lg font-bold">Correct Answer</h2>
              <CodeDisplay
                content={
                  question?.answers.find((answer) => answer.uid === question.correctAnswer)
                    ?.answer || ''
                }
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          {/** ai explain answer (on button click) */}
          <h2 className="text-xl font-bold">Explain this answer</h2>
          <p className="text-sm text-gray-400">
            Don't understand this answer? Click the button below to get an explanation.
          </p>
          <p className="text-sm text-white">
            {userIsPremium(user) ? (
              <>
                You have {user?.userLevel === 'LIFETIME' ? user?.aiQuestionHelpTokens : 'unlimited'}{' '}
                tokens remaining
              </>
            ) : (
              <span className="text-xs text-gray-400">
                <Link href={getUpgradeUrl()} className="text-accent underline">
                  Upgrade to Premium
                </Link>{' '}
                to access AI-powered explanations!
              </span>
            )}
          </p>
          <Button
            variant="secondary"
            onClick={() => {
              setTransition(() => {
                generateAiAnswerHelp();
              });
            }}
            disabled={isPending || user?.userLevel === 'FREE'}
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

        {/** how difficult was this question? 
        <div className="flex flex-col gap-y-2 mt-3">
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
        */}
        {/** if the next question slug is not null, show a button to go to the next question */}
        {(question?.nextQuestionSlug || nextQuestion) && (
          <div className="flex flex-col gap-y-2">
            <p className="text-sm text-gray-400">
              Want to continue the flow? Click the button below to go to the next question.
            </p>
            <Button variant="secondary" href={getNextQuestionUrl()}>
              {isStudyPathLesson
                ? nextQuestion
                  ? 'Next Lesson'
                  : question.nextQuestionSlug
                  ? 'Next Lesson'
                  : 'Back to Roadmap'
                : 'Next Question'}
            </Button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
