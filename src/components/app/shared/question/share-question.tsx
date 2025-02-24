'use client';

import { ShareIcon, CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function ShareQuestion({
  content,
  variant,
}: {
  content?: string;
  variant?: 'outline' | 'ghost' | 'default';
}) {
  const [shared, setShared] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
    setShared(true);
    setTimeout(() => setShared(false), 3000);
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button variant={variant || 'ghost'} size="sm" padding="none" onClick={copyLink}>
            <AnimatePresence mode="wait">
              {shared ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckIcon className="size-4 text-green-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="share"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ShareIcon className="size-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{content || 'Share this question!'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
