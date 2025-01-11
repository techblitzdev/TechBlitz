'use client';

import { useEffect, useState } from 'react';
import { generateQuestionHelp } from '@/actions/ai/questions/question-help';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Question } from '@/types/Questions';
import { StarsIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { UserRecord } from '@/types/User';

export default function AiQuestionHelp(opts: {
  question: Question;
  user: UserRecord | null;
}) {
  const { question, user } = opts;
  const [aiHelp, setAiHelp] = useState<string | null>(null);
  const [tokensUsed, setTokensUsed] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTokensUsed(user?.aiQuestionHelpTokens || 0);
  }, [user]);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    const userContent = formData.get('userContent') as string;
    const questionHelp = await generateQuestionHelp(question.uid, userContent);

    if (questionHelp) {
      setAiHelp(questionHelp.content);
      setTokensUsed(questionHelp.tokens);
    }
    setIsLoading(false);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <StarsIcon className="size-4 text-yellow-400 fill-yellow-500" />
        </motion.div>
      </PopoverTrigger>
      <PopoverContent
        className={`${
          aiHelp ? 'w-72 lg:w-[500px]' : 'w-80'
        } bg-black-100 text-white border border-black-50`}
        align="end"
      >
        <AnimatePresence mode="wait">
          {aiHelp ? (
            <motion.div
              key="ai-help"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-y-2"
            >
              <h5 className="text-lg font-semibold mb-2">AI Assistance</h5>
              <motion.div
                className="bg-black-100 border border-black-50 p-3 rounded-md text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {aiHelp.split(' ').map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.02 }}
                    className="inline-block mr-1"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm text-white">
                  Tokens remaining: {tokensUsed}
                </p>
                <Button
                  onClick={() => setAiHelp(null)}
                  variant="default"
                  className="mt-2"
                >
                  Ask Another Question
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.form
              key="question-form"
              action={handleSubmit}
              className="flex flex-col gap-y-2"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleSubmit(formData);
              }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h5 className="text-lg font-semibold mb-2">
                Need assistance with this question? Let AI help you!
              </h5>
              <p className="text-sm text-white">
                You have{' '}
                {user?.userLevel === 'PREMIUM' ? 'unlimited' : tokensUsed}{' '}
                tokens remaining <br />
                {user?.userLevel === 'FREE' && (
                  <span className="text-xs text-gray-400">
                    (Free users get 20 tokens,{' '}
                    <Link href="/pricing" className="text-accent underline">
                      upgrade to Premium
                    </Link>{' '}
                    to get unlimited tokens!)
                  </span>
                )}
              </p>
              <Textarea
                name="userContent"
                placeholder="What specific part of this question would you like help with?"
                className="mb-4 text-white border border-black-50"
              />
              {user ? (
                <TooltipProvider>
                  <Tooltip
                    disableHoverableContent={Boolean(
                      user.aiQuestionHelpTokens && user.aiQuestionHelpTokens > 0
                    )}
                  >
                    <TooltipTrigger asChild>
                      <Button
                        type="submit"
                        variant="secondary"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Generating...' : 'Request AI Assistance'}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      You must have at least 1 token to request AI assistance
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <Button
                  variant="secondary"
                  disabled
                  className="w-full"
                  href={`/login?redirectUrl=question/${question.slug}`}
                >
                  Login to request AI assistance
                </Button>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  );
}
