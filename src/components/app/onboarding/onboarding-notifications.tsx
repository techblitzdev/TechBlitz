import { useState, useTransition } from 'react';
import { motion } from 'framer-motion';
import { updateUser } from '@/actions/user/authed/update-user';
import { CardHeader } from '@/components/ui/card';
import LoadingSpinner from '@/components/ui/loading';
import { Switch } from '@/components/ui/switch';
import { useOnboardingContext } from '@/contexts/onboarding-context';

export default function OnboardingNotifications() {
  const { user, setUser, itemVariants } = useOnboardingContext();
  const [isPending, startTransition] = useTransition();
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(0);

  const handleUpdateUser = () => {
    const now = Date.now();
    if (now - lastUpdateTime < 2000) {
      return;
    }

    const newEnabledState = !user.sendPushNotifications;
    setLastUpdateTime(now);

    startTransition(async () => {
      try {
        await updateUser({
          userDetails: {
            ...user,
            sendPushNotifications: newEnabledState,
          },
        });
        // Update the context state after successful DB update
        setUser((prev) => ({
          ...prev,
          sendPushNotifications: newEnabledState,
        }));
      } catch (error) {
        console.error('Error updating user:', error);
      }
    });
  };

  return (
    <CardHeader className="flex flex-col gap-y-4 max-w-xl relative">
      <div className="flex flex-col gap-y-2 mb-3">
        <div className="flex items-center justify-between">
          <motion.h1
            className="text-2xl flex items-center gap-x-2 font-medium text-gradient from-white/55 to-white"
            variants={itemVariants}
          >
            Receive daily reminders
            {isPending && <LoadingSpinner className="size-4" />}
          </motion.h1>
          <Switch checked={user.sendPushNotifications} onCheckedChange={handleUpdateUser} />
        </div>
        <motion.p className="text-sm text-gray-500" variants={itemVariants}>
          Learning to code is hard, but we're here to help. We'll send you a push notification every
          day to keep you motivated.
        </motion.p>
        {!user.sendPushNotifications && (
          <motion.p className="text-sm text-red-500" variants={itemVariants}>
            We recommend you enable push notifications to get the most out of your learning. You can
            always change this in your settings later.
          </motion.p>
        )}
      </div>
    </CardHeader>
  );
}
