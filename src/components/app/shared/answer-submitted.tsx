'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import CodeDisplay from '@/components/app/questions/single/layout/code-snippet';
import LoadingSpinner from '@/components/ui/loading';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { formatSeconds } from '@/utils/time';
import { useTransition } from 'react';
import { updateAnswerDifficulty } from '@/actions/answers/answer';
import { AnswerDifficulty } from '@prisma/client';

interface QuestionResultProps {
  correctAnswer: 'correct' | 'incorrect' | 'init';
  userAnswer?: any;
  result?: any;
  question: any;
  nextQuestion?: { uid?: string; slug?: string } | null;
  totalSeconds?: number;
  generateAiAnswerHelp: (isMobile?: boolean) => void;
  user?: { userLevel: string };
  tokensUsed?: number;
  relatedQuestions?: any[];
  isRoadmapQuestion?: boolean;
  isCodeEditorQuestion?: boolean;
  roadmapUid?: string;
  showQuestionDifficulty?: boolean;
  showCorrectAnswer?: boolean;
  nextQuestionHref?: string;
  isOnboardingQuestion?: boolean;
  isLastQuestion?: boolean;
}

/**
 * A component that displays the result of a question and provides a way to
 * explain the answer, select the difficulty of the question, and navigate to
 * the next question.
 *
 * Used in:
 * - Single question page
 * - Roadmap question page
 * - Code editor question page
 * - Onboarding question page
 *
 * @param props
 * @returns
 */
export default function QuestionResult({
  correctAnswer,
  userAnswer,
  result,
  question,
  totalSeconds,
  generateAiAnswerHelp,
  user,
  tokensUsed,
  relatedQuestions,
  isRoadmapQuestion = false,
  isCodeEditorQuestion = false,
  showQuestionDifficulty = true,
  showCorrectAnswer = true,
  nextQuestionHref,
  isOnboardingQuestion = false,
  isLastQuestion = false,
}: QuestionResultProps) {
  const [isPending, startTransition] = useTransition();

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Question link copied to clipboard!');
  };

  const getResultMessage = () => {
    if (isCodeEditorQuestion) {
      return correctAnswer === 'correct'
        ? 'All test cases passed.'
        : "Some test cases failed, let's review:";
    }
    return correctAnswer === 'correct'
      ? 'You answered correctly!'
      : 'That was incorrect, try again!';
  };

  const handleDifficultySelect = async (value: AnswerDifficulty) => {
    try {
      if (!userAnswer?.uid) {
        toast.error('No answer found to update difficulty');
        return;
      }

      await updateAnswerDifficulty(
        userAnswer.uid,
        value.toUpperCase() as AnswerDifficulty,
        isRoadmapQuestion
      );

      toast.success('Question difficulty updated successfully');
    } catch (error) {
      console.error('Error updating difficulty:', error);
      toast.error('Failed to update question difficulty');
    }
  };

  const isCode = /<pre><code/.test(userAnswer);

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
                {getResultMessage()}
              </div>
            ) : correctAnswer === 'incorrect' ? (
              <div className="flex items-center gap-x-2">
                <XCircle className="size-7 text-red-500" />
                {getResultMessage()}
              </div>
            ) : (
              <div className="flex items-center gap-x-2">
                <LoadingSpinner />
                Loading...
              </div>
            )}
          </h1>
          {!isRoadmapQuestion && !question?.customQuestion && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="ghost" onClick={copyLink}>
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
        {((userAnswer?.correctAnswer && totalSeconds) || (result?.passed && totalSeconds)) && (
          <p className="text-sm text-gray-400">in {formatSeconds(totalSeconds)} seconds</p>
        )}
      </motion.div>
      <motion.div
        className="flex flex-col gap-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {!isCodeEditorQuestion && (
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-2">
              <h2 className="text-xl font-bold">Your Answer</h2>
              {/** test if userAnswer */}
              {isOnboardingQuestion && !isCode ? (
                <p>{userAnswer}</p>
              ) : (
                <CodeDisplay
                  content={
                    isOnboardingQuestion
                      ? userAnswer
                      : isRoadmapQuestion
                        ? question?.answers.find(
                            (answer: any) => answer.uid === userAnswer?.answerUid
                          )?.answer || ''
                        : question?.answers.find(
                            (answer: any) => answer.uid === userAnswer?.userAnswerUid
                          )?.answer || ''
                  }
                  hideIndex={isRoadmapQuestion}
                />
              )}
            </div>
            {correctAnswer === 'incorrect' && showCorrectAnswer && (
              <div className="flex flex-col gap-y-2">
                <h2 className="text-lg font-bold">Correct Answer</h2>
                <CodeDisplay
                  content={
                    isRoadmapQuestion
                      ? question?.answers.find(
                          (answer: any) => answer.uid === question.correctAnswerUid
                        )?.answer || ''
                      : question?.answers.find(
                          (answer: any) => answer.uid === question.correctAnswer
                        )?.answer || ''
                  }
                  hideIndex={isRoadmapQuestion}
                />
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col gap-y-2 mt-5 bg-[#111111] border border-black-50 p-4 rounded-lg">
          <h2 className="text-xl font-bold">Explain this answer</h2>
          <p className="text-sm text-gray-400">
            Don't understand this answer? Click the button below to get an explanation.
          </p>
          {/** roadmap users get unlimited tokens - no need to show token count */}
          {!isRoadmapQuestion && (
            <p className="text-sm text-white">
              You have {user?.userLevel === 'PREMIUM' ? 'unlimited' : tokensUsed} tokens remaining{' '}
              <br />
              {user?.userLevel === 'FREE' && (
                <span className="text-xs text-gray-400">
                  (Free users get 20 tokens,{' '}
                  <Link href="https://dub.sh/upgrade-techblitz" className="text-accent underline">
                    upgrade to Premium
                  </Link>{' '}
                  to get unlimited tokens!)
                </span>
              )}
            </p>
          )}
          <Button
            variant="default"
            onClick={() => {
              startTransition(() => {
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
              startTransition(() => {
                generateAiAnswerHelp(true);
              });
            }}
            className="flex lg:hidden"
          >
            {isPending ? 'Generating...' : 'Explain Answer'}
          </Button>
        </div>
        {showQuestionDifficulty && (
          <div className="flex flex-col gap-y-2 mt-3 bg-[#111111] border border-black-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold">How difficult was this question?</h2>
            <p className="text-sm text-gray-400">
              Rate this question based on how difficult it was to solve. This will help us improve
              the personalization of questions served to you.
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
        )}
        {nextQuestionHref && !isLastQuestion && (
          <div className="flex flex-col gap-y-2 bg-[#111111] border border-black-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold">Ready for your next challenge?</h2>
            <p className="text-sm text-gray-400">
              {isRoadmapQuestion
                ? 'Your next roadmap question is:'
                : 'Want to continue the flow? Click the button below to go to the next question.'}
            </p>
            <Button variant="secondary" href={nextQuestionHref} className="w-fit">
              Next Question
            </Button>
          </div>
        )}
        {isLastQuestion && (
          <div className="flex flex-col gap-y-2 bg-[#111111] border border-black-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold">You've answered all questions!</h2>
            <p className="text-sm text-gray-400">
              Click the button below to generate your roadmap.
            </p>
            <Button variant="accent" href={nextQuestionHref}>
              Generate Roadmap
            </Button>
          </div>
        )}
        {!isRoadmapQuestion && relatedQuestions && relatedQuestions.length > 0 && (
          <div className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2">
              <h2 className="text-xl font-bold">Related Questions</h2>
              <p className="text-sm text-gray-400">
                {correctAnswer === 'correct'
                  ? 'Here are some questions that are similar to this one.'
                  : 'Here are some questions that will help you understand this concept better.'}
              </p>
            </div>
            <motion.div
              className="flex flex-col divide-y divide-black-50 border border-black-50 rounded-xl overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {relatedQuestions.map((question: any) => (
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
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
