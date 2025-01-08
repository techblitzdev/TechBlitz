'use client';

import { useState, useTransition } from 'react';
import { ChatBubbleIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { sendFeedback } from '@/actions/misc/send-feedback';
import { motion, AnimatePresence } from 'framer-motion';

export default function FeedbackButton({
  showText = true,
  reference,
}: {
  showText?: boolean;
  reference?: string;
}) {
  const [feedback, setFeedback] = useState('');
  const [isPending, startTransition] = useTransition();
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async () => {
    startTransition(async () => {
      await sendFeedback(feedback);
      setFeedback('');
      setIsSent(true);
      setTimeout(() => setIsSent(false), 2000);
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={showText ? 'default' : 'ghost'}
          className="flex items-center gap-2 p-2"
        >
          <ChatBubbleIcon className="size-4" />
          {showText && <p className="text-sm hidden md:block">Feedback</p>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 bg-black-75 text-white border border-black-50"
        align="end"
      >
        <form action={handleSubmit}>
          <h2 className="text-lg font-semibold mb-2">Send feedback</h2>
          <p className="text-sm text-muted-foreground mb-4">
            We value your feedback. Please let us know how we can improve our
            questions/product to better suit your needs.
          </p>
          {reference && (
            <p className="text-sm mb-2">
              Reference: <span className="font-bold">{reference}</span>
            </p>
          )}
          <Textarea
            placeholder="Enter your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="mb-4 text-white border border-black-50"
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
              <Button
                type="submit"
                variant="secondary"
                disabled={isPending || feedback.trim() === ''}
              >
                <AnimatePresence mode="wait">
                  {isPending ? (
                    <motion.div
                      key="loading"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
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
      </PopoverContent>
    </Popover>
  );
}
