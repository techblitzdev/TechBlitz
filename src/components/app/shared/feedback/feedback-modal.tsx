'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import type React from 'react';
import { sendFeedback } from '@/actions/misc/send-feedback';

interface FeedbackModalProps {
  title?: string;
  description?: string;
  reference?: string;
  children?: React.ReactNode;
}

export function FeedbackModal({
  title = 'Send feedback',
  description = 'We value your feedback. Please let us know how we can improve our questions/product to better suit your needs.',
  reference,
  children,
}: FeedbackModalProps) {
  const [feedback, setFeedback] = useState('');
  const [isPending, startTransition] = useTransition();
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await sendFeedback({ feedback });
      setFeedback('');
      setIsSent(true);
      setTimeout(() => setIsSent(false), 2000);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      {reference && (
        <p className="text-sm mb-2">
          Reference: <span className="font-bold">{reference}</span>
        </p>
      )}
      {children}
      <Textarea
        placeholder="Enter your feedback here..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="mb-4 text-black dark:text-white border border-secondary dark:border-black-50"
        disabled={isPending}
      />
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="destructive"
          onClick={() => setFeedback('')}
          disabled={isPending}
        >
          Cancel
        </Button>
        <AnimatePresence mode="wait">
          <Button type="submit" variant="secondary" disabled={isPending || feedback.trim() === ''}>
            <AnimatePresence mode="wait">
              {isPending ? (
                <motion.div
                  key="loading"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'linear',
                  }}
                  className="size-5 border-2 border-black dark:border-white border-t-transparent rounded-full"
                />
              ) : (
                <motion.span
                  key={isSent ? 'sent' : 'submit'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {isSent ? 'Sent!' : 'Submit'}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </AnimatePresence>
      </div>
    </form>
  );
}
