'use client';

import { useQuestionSingle } from '@/components/app/questions/single/layout/question-single-context';
import CodeDisplay from './code-snippet';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { use } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRight, CheckCircle, LinkIcon, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { formatSeconds } from '@/utils/time';
import { AnswerDifficulty } from '@prisma/client';
import { updateAnswerDifficulty } from '@/actions/answers/answer';
import { Answer } from '@/types/Answers';

export default function QuestionSubmitted() {
  const {
    question,
    userAnswer,
    correctAnswer,
    relatedQuestions,
    totalSeconds,
  } = useQuestionSingle();

  // resolve the related q's here
  const relatedQuestionData = use(relatedQuestions);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Question link copied to clipboard!');
  };

  const handleDifficultySelect = async (value: string) => {
    await updateAnswerDifficulty(
      userAnswer?.uid || '',
      value.toUpperCase() as AnswerDifficulty
    );
    toast.success(
      'Question difficulty updated, we will now serve more personalized questions to you.'
    );
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
          <h1 className="text-4xl font-bold">
            {correctAnswer === 'correct' ? (
              <div className="flex items-center gap-x-2">
                <CheckCircle className="size-7 text-green-500" />
                You answered correctly!
              </div>
            ) : (
              <div className="flex items-center gap-x-2">
                <XCircle className="size-7 text-red-500" />
                Your answer is incorrect.
              </div>
            )}
          </h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="default" onClick={() => copyLink()}>
                  <LinkIcon className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex flex-col gap-y-2">
          {userAnswer?.correctAnswer && (
            <p className="text-sm text-gray-400">
              in {formatSeconds(totalSeconds || 0)} seconds
            </p>
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
            {userAnswer && (
              <CodeDisplay
                content={
                  question?.answers.find(
                    (answer) => answer.uid === userAnswer?.userAnswerUid
                  )?.answer || ''
                }
              />
            )}
          </div>

          {/** if the user answered correctly, show the correct answer */}
          {correctAnswer === 'incorrect' && (
            <div className="flex flex-col gap-y-2">
              <h2 className="text-lg font-bold">Correct Answer</h2>
              <CodeDisplay
                content={
                  question?.answers.find(
                    (answer) => answer.uid === question.correctAnswer
                  )?.answer || ''
                }
              />
            </div>
          )}
        </div>
        {/** you answered faster than 90% of users */}

        <div className="flex flex-col gap-y-2">
          {/** ai explain answer (on button click) */}
          <h2 className="text-xl font-bold">Explain this answer</h2>
          <p className="text-sm text-gray-400">
            Don't understand this answer? Click the button below to get an
            explanation.
          </p>
          <Button variant="secondary">Explain Answer</Button>
        </div>

        {/** how difficult was this question? */}
        <div className="flex flex-col gap-y-2 mt-3">
          <h2 className="text-xl font-bold">
            How difficult was this question?
          </h2>
          <p className="text-sm text-gray-400">
            Rate this question based on how difficult it was to solve. This will
            help us improve the personalization of questions served to you.
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
                : 'Here are some questions that will help you understand this concept better.'}
            </p>
          </div>
          <motion.div
            className="flex flex-col divide-y divide-black-50 border border-black-50 rounded-xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {relatedQuestionData.map((question, index) => (
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
      </motion.div>
    </motion.div>
  );
}
