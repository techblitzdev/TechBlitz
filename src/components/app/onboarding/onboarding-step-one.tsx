'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CardContent } from '@/components/ui/card';
import { InputWithLabel } from '@/components/ui/input-label';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { useOnboardingContext } from './onboarding-context';
import { onboardingStepOneSchema } from '@/lib/zod/schemas/onboarding/step-one';
import type { UpdatableUserFields } from '@/types/User';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function OnboardingStepOne() {
  const { user, setUser } = useOnboardingContext();

  const form = useForm<UpdatableUserFields>({
    resolver: zodResolver(onboardingStepOneSchema),
    defaultValues: {
      username: user.username || '',
      showTimeTaken: user.showTimeTaken || false,
      sendPushNotifications: user.sendPushNotifications || false,
    },
  });

  // Watch all form values
  const watchedValues = form.watch();

  // Automatically update context when form values change
  useEffect(() => {
    // Only update if values have actually changed
    const hasChanges =
      watchedValues.username !== user.username ||
      watchedValues.showTimeTaken !== user.showTimeTaken ||
      watchedValues.sendPushNotifications !== user.sendPushNotifications;

    if (hasChanges) {
      setUser((prev) => ({
        ...prev,
        username: watchedValues.username ?? '',
        showTimeTaken: watchedValues.showTimeTaken,
        sendPushNotifications: watchedValues.sendPushNotifications,
      }));
    }
  }, [watchedValues, setUser, user]);

  return (
    <CardContent>
      <Form {...form}>
        <form className="space-y-5">
          <motion.div
            initial="hidden"
            animate="visible"
            className="space-y-2 text-white"
            variants={itemVariants}
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputWithLabel
                      label="Username"
                      type="text"
                      autoComplete="username"
                      placeholder="Username"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <FormField
                    control={form.control}
                    name="showTimeTaken"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="showTimeTaken" className="text-white">
                            Appear on leaderboards
                          </Label>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="bg-black-50"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your progress will be visible to others</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <FormField
                    control={form.control}
                    name="sendPushNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <Label
                            htmlFor="sendPushNotifications"
                            className="text-white"
                          >
                            Send daily reminders to complete tasks
                          </Label>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="bg-black-50"
                            // disable for now
                            disabled={true}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Receive notifications to stay on track</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        </form>
      </Form>
      {JSON.stringify(user)}
    </CardContent>
  );
}
