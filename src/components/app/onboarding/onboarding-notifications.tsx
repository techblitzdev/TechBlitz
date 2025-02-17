import { updateUser } from '@/actions/user/authed/update-user';
import { CardHeader } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useOnboardingContext } from '@/contexts/onboarding-context';
import { motion } from 'framer-motion';

export default function OnboardingNotifications() {
  const { itemVariants, serverUser } = useOnboardingContext();

  return (
    <>
      <CardHeader className="flex flex-col gap-y-4 max-w-xl">
        <div className="flex flex-col gap-y-2 mb-3">
          <motion.h1
            className="text-2xl flex flex-col font-medium bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Enable push notifications
          </motion.h1>
          <motion.p className="text-sm text-gray-500" variants={itemVariants}>
            Learning to code is hard, but we're here to help. We'll send you a push notification
            every day to keep you motivated.
          </motion.p>
        </div>
        <motion.div
          variants={itemVariants}
          className="flex w-full justify-between gap-4 text-white"
        >
          <span className="font-onest text-xl">Receive daily reminders</span>
          <Switch
            checked={serverUser?.sendPushNotifications}
            onCheckedChange={() => {
              updateUser({
                userDetails: {
                  ...serverUser,
                  sendPushNotifications: !serverUser?.sendPushNotifications,
                },
              });
            }}
          />
        </motion.div>
      </CardHeader>
    </>
  );
}
