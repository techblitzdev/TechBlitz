'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { InputWithLabel } from '@/components/ui/input-label';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { useOnboardingContext } from './onboarding-context';
import { onboardingStepOneSchema } from '@/lib/zod/schemas/onboarding/step-one';
import type { UpdatableUserFields } from '@/types/User';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function OnboardingStepOne() {
  const { user, setUser } = useOnboardingContext();

  const form = useForm<UpdatableUserFields>({
    resolver: zodResolver(onboardingStepOneSchema),
    defaultValues: {
      username: user.username || '',
      showTimeTaken: user.showTimeTaken || false,
      sendPushNotifications: user.sendPushNotifications || false,
      experienceLevel: user.experienceLevel || 'BEGINNER',
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
      watchedValues.sendPushNotifications !== user.sendPushNotifications ||
      watchedValues.experienceLevel !== user.experienceLevel;
    if (hasChanges) {
      setUser((prev) => ({
        ...prev,
        username: watchedValues.username ?? '',
        showTimeTaken: watchedValues.showTimeTaken,
        sendPushNotifications: watchedValues.sendPushNotifications,
        experienceLevel: watchedValues.experienceLevel?.toUpperCase() as
          | 'BEGINNER'
          | 'INTERMEDIATE'
          | 'ADVANCED'
          | 'MASTER'
          | undefined,
      }));
    }
  }, [watchedValues, setUser, user]);

  return (
    <>
      <CardHeader className="space-y-1">
        <motion.h1
          className="text-3xl font-medium bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          Welcome!
        </motion.h1>
        <CardDescription className="text-gray-400">
          <motion.span variants={itemVariants}>
            Let's get started by setting up your account.
          </motion.span>
        </CardDescription>
      </CardHeader>
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
                    <FormMessage className="mt-0.5 text-start">
                      {form.formState?.errors?.username?.message}
                    </FormMessage>
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
                            <Label
                              htmlFor="showTimeTaken"
                              className="text-white"
                            >
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
                          <FormMessage className="mt-0.5 text-start">
                            {form.formState?.errors?.showTimeTaken?.message}
                          </FormMessage>
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
              <FormField
                control={form.control}
                name="experienceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-row items-center justify-between">
                        <div className="text-white placeholder:text-white">
                          Experience Level
                        </div>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-40 border border-black-50">
                            <SelectValue
                              className="text-white placeholder:text-white [&:not(:placeholder-shown)]:text-white"
                              placeholder="Select experience level"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BEGINNER">Beginner</SelectItem>
                            <SelectItem value="INTERMEDIATE">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="ADVANCED">Advanced</SelectItem>
                            <SelectItem value="MASTER">Master</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
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
                      name="sendPushNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <Label
                              htmlFor="sendPushNotifications"
                              className="text-white"
                            >
                              Send promotional emails
                            </Label>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="bg-black-50"
                              // disable for now
                              disabled
                            />
                          </FormControl>
                          <FormMessage className="mt-0.5 text-start">
                            {
                              form.formState?.errors?.sendPushNotifications
                                ?.message
                            }
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Receive promotional emails on offers, new features and
                      more
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          </form>
        </Form>
      </CardContent>
    </>
  );
}
