import React, { useState, useTransition } from 'react';
import { motion } from 'framer-motion';
import { useOnboardingContext } from '../../../contexts/onboarding-context';
import { CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { sendInvite } from '@/actions/misc/send-invite';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function OnboardingShare() {
  const { itemVariants } = useOnboardingContext();
  const [email, setEmail] = useState('');
  const [pending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await sendInvite(email);

      toast.success('Invitation sent successfully!');
    });
  };

  return (
    <>
      <CardHeader className="space-y-2 flex flex-col items-center justify-center">
        <motion.h1
          className="text-3xl font-medium bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent"
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
        <form onSubmit={handleSubmit} className="space-y-2 w-1/2 justify-self-center">
          <Input
            type="email"
            placeholder="Friend's email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-black-50 text-white"
          />
          <Button type="submit" className="w-full" variant="default" disabled={pending}>
            {pending ? 'Sending...' : 'Send Invite'}
          </Button>
        </form>
      </CardContent>
    </>
  );
}
