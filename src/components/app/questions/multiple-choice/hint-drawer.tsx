'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface HintDrawerProps {
  hint: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function HintDrawer({ hint, isOpen, onClose }: HintDrawerProps) {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="relative z-50">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-gradient-to-br from-black-75 to-black-100 rounded-t-2xl border border-b-0 border-black-50 p-6 pb-20 max-h-[70vh] overflow-y-auto scroll-smooth"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header with close button */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-accent/20 p-2 rounded-full">
                  <Lightbulb className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-medium">Hint</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Hint content with staggered animation */}
            <div className="prose prose-invert max-w-none">
              <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => <motion.p variants={itemVariants}>{children}</motion.p>,
                  ul: ({ children }) => (
                    <motion.ul
                      variants={itemVariants}
                      className="list-disc px-4 flex flex-col gap-2"
                    >
                      {children}
                    </motion.ul>
                  ),
                  ol: ({ children }) => (
                    <motion.ol
                      variants={itemVariants}
                      className="list-decimal px-4 flex flex-col gap-2"
                    >
                      {children}
                    </motion.ol>
                  ),
                  li: ({ children }) => <motion.li variants={itemVariants}>{children}</motion.li>,
                  code: ({ children, className }) => (
                    <motion.code
                      variants={itemVariants}
                      className={`${className || ''} bg-black-100 rounded px-1.5 py-0.5 text-sm`}
                    >
                      {children}
                    </motion.code>
                  ),
                  h1: ({ children }) => <motion.h1 variants={itemVariants}>{children}</motion.h1>,
                  h2: ({ children }) => <motion.h2 variants={itemVariants}>{children}</motion.h2>,
                  h3: ({ children }) => <motion.h3 variants={itemVariants}>{children}</motion.h3>,
                }}
              >
                {hint}
              </Markdown>
            </div>

            {/* Pulltab indicator */}
            <div className="absolute top-2 left-0 right-0 flex justify-center">
              <div className="w-12 h-1 rounded-full bg-gray-500/50"></div>
            </div>

            {/* Got it button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black-100 to-transparent">
              <Button onClick={onClose} className="w-full" variant="default">
                Got it!
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
