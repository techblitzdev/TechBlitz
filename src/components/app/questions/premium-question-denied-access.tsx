'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Sparkles, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getUpgradeUrl } from '@/utils';

export default function PremiumQuestionDeniedAccess() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Card className="w-full max-w-md border border-black-50 text-white relative bg-black-75">
          {/** x button to go back */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => router.back()}
          >
            <X className="size-4" />
          </Button>
          <CardHeader>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CardTitle className="flex items-center gap-2 text-2xl font-bold text-white">
                <Sparkles className="h-6 w-6 text-yellow-500 fill-yellow-400" />
                Premium Question
              </CardTitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <CardDescription className="text-white">
                This question is only available to premium users.
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white"
            >
              Looking to level up your coding skills? Upgrade to Premium to access premium
              questions, personalized learning paths, reports, and more!
            </motion.p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="premium"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => window.open(getUpgradeUrl(), '_blank')}
              >
                Upgrade to Premium
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}
