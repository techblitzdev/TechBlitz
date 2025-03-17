'use client';

import type React from 'react';
import { useState } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Button } from '@/components/ui/button';
import { sendInvite } from '@/actions/misc/send-invite';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { InputWithLabel } from '../ui/input-label';
import { toast } from 'sonner';

export default function ReferralModal({ children }: { children: React.ReactNode }) {
  const { setValue: setHasBeenShown } = useLocalStorage({
    key: 'referral-modal-shown',
    defaultValue: false,
  });

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('handleSubmit', email);
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendInvite(email);
      toast.success('Invitation sent successfully!');
      setHasBeenShown(true);
      setEmail('');
    } catch (error) {
      toast.error('Failed to send invitation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-hidden bg-black-75">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <DialogHeader>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <DialogTitle className="text-lg font-semibold">
                  TechBlitz is more fun with friends!
                </DialogTitle>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <DialogDescription>
                  Invite a friend and receive 10% off all paid plans once they sign up!
                </DialogDescription>
              </motion.div>
            </DialogHeader>
            <motion.div
              className="space-y-4 mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <InputWithLabel
                label="Friend's email address"
                type="email"
                placeholder="Friend's email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                disabled={isLoading}
              />
              <Button
                onClick={handleSubmit}
                className="w-full z-10"
                variant="premium"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Invite'}
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
