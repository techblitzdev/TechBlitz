'use client';

import { useEffect, useState, memo } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { sendInvite } from '@/actions/misc/send-invite';

const ReferralToast = memo(function ReferralToast() {
  const { value: hasBeenShown, setValue: setHasBeenShown } = useLocalStorage({
    key: 'referral-toast-shown',
    defaultValue: false,
  });

  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!hasBeenShown) {
      setIsVisible(true);
    }
  }, [hasBeenShown]);

  if (hasBeenShown || !isVisible) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendInvite(email);
    setHasBeenShown(true);
    setIsVisible(false);
  };

  const handleClose = () => {
    setHasBeenShown(true);
    setIsVisible(false);
  };

  return (
    <motion.div
      className="fixed bottom-4 right-4 w-72 md:w-80 bg-black shadow-lg rounded-lg overflow-hidden border border-white/10 z-50"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 h-fit w-fit"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <h3 className="font-semibold text-lg text-white mb-2">
          TechBlitz is more fun with friends!
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Invite a friend and receive 10% off all paid plans once they sign up!
        </p>
        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
            type="email"
            placeholder="Friend's email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-black-50"
          />
          <Button type="submit" className="w-full" variant="secondary">
            Send Invite
          </Button>
        </form>
      </div>
    </motion.div>
  );
});

export default ReferralToast;
