import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useOnboardingContext } from './onboarding-context';
import { CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export default function OnboardingShare() {
  const { serverUser, itemVariants } = useOnboardingContext();
  const [isCopied, setIsCopied] = useState(false);

  const shareUrl = `https://techblitz.dev/signup?ref=${serverUser?.uid}`;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000); // Reset after 3 seconds
    } catch (error) {
      console.error('Error copying link:', error);
      toast.error('Failed to copy link. Please try again.');
    }
  };

  return (
    <>
      <CardHeader className="space-y-2 flex flex-col items-center justify-center">
        <motion.h1
          className="text-3xl font-medium bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          TechBlitz is more fun with friends!
        </motion.h1>
        <motion.p className="text-gray-400 max-w-xl text-center" variants={itemVariants}>
          TechBlitz thrives on community. Share TechBlitz with your friends, and receive 10% off a
          premium plan!
        </motion.p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-4">
          <Button
            onClick={handleShare}
            className={`flex items-center space-x-2 transition-colors duration-300 ${
              isCopied ? 'bg-green-500' : 'bg-blue-500'
            }`}
          >
            <Copy className="w-4 h-4" />
            <span>{isCopied ? 'Link Copied!' : 'Copy Invite Link'}</span>
          </Button>
        </div>
      </CardContent>
    </>
  );
}
