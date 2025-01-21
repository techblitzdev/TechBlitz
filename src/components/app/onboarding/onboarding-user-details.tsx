'use client';
import { useEffect, useState } from 'react';
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
  FormLabel,
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
import { toast } from 'sonner';
import { checkUsername } from '@/actions/user/authed/check-username';

const whereDidYouHearAboutTechBlitz = [
  'Reddit',
  'Google',
  'Twitter',
  'LinkedIn',
  'Daily.dev',
  'Github',
  'Friend',
  'Other',
];

export default function OnboardingStepOne() {
  const { user, setUser, itemVariants, setCanContinue } =
    useOnboardingContext();
  const [username, setUsername] = useState(user.username || '');
  const [isUsernameValid, setIsUsernameValid] = useState(true);

  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const form = useForm<UpdatableUserFields>({
    resolver: zodResolver(onboardingStepOneSchema),
    defaultValues: {
      username: user.username || '',
      showTimeTaken: user.showTimeTaken || false,
      sendPushNotifications: user.sendPushNotifications || false,
      experienceLevel: user.experienceLevel || 'BEGINNER',
      howDidYouHearAboutTechBlitz: user.howDidYouHearAboutTechBlitz || '',
    },
  });

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    form.setValue('username', newUsername);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(async () => {
      const isUnique = await checkUsername(newUsername);
      setIsUsernameValid(Boolean(isUnique));

      if (isUnique) {
        toast.success('Username is available');
      } else {
        toast.error('Username is already taken. Please choose another one.');
      }
      setCanContinue(Boolean(isUnique));
    }, 1000);

    setDebounceTimeout(timeout);
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      console.log('Form values changed:', value);
      setUser((prev) => {
        // Filter out any undefined values from arrays to ensure type safety
        const sanitizedValue = {
          ...value,
          stripeEmails: value.stripeEmails?.filter(
            (email): email is string => email !== undefined
          ),
        };
        return {
          ...prev,
          ...sanitizedValue,
        };
      });
    });
    return () => subscription.unsubscribe();
  }, [form, setUser]);

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
          <form
            onSubmit={form.handleSubmit((data) => {
              console.log('Form submitted with data:', data);
              setUser((prev) => ({
                ...prev,
                ...data,
              }));
            })}
            className="space-y-5"
          >
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
                        value={username}
                        onChange={handleUsernameChange}
                        className={`input ${!isUsernameValid && 'border-red-500'}`}
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
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                setUser((prev) => {
                                  console.log(
                                    'showTimeTaken changed:',
                                    checked
                                  );
                                  return { ...prev, [field.name]: checked };
                                });
                              }}
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
                          onValueChange={(
                            value:
                              | 'BEGINNER'
                              | 'INTERMEDIATE'
                              | 'ADVANCED'
                              | 'MASTER'
                          ) => {
                            field.onChange(value);
                            setUser((prev) => {
                              return { ...prev, [field.name]: value };
                            });
                          }}
                        >
                          <SelectTrigger className="w-40 border border-black-50">
                            <SelectValue
                              className="text-white placeholder:text-white [&:not(:placeholder-shown)]:text-white"
                              placeholder="Select experience level"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              className="hover:text-white"
                              value="BEGINNER"
                            >
                              Beginner
                            </SelectItem>
                            <SelectItem
                              className="hover:text-white"
                              value="INTERMEDIATE"
                            >
                              Intermediate
                            </SelectItem>
                            <SelectItem
                              className="hover:text-white"
                              value="ADVANCED"
                            >
                              Advanced
                            </SelectItem>
                            <SelectItem
                              className="hover:text-white"
                              value="MASTER"
                            >
                              Master
                            </SelectItem>
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
                              Send daily challenge reminders
                            </Label>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                setUser((prev) => {
                                  console.log(
                                    'sendPushNotifications changed:',
                                    checked
                                  );
                                  return { ...prev, [field.name]: checked };
                                });
                              }}
                              className="bg-black-50"
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
            <motion.div
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className="space-y-2 text-white"
            >
              <FormField
                control={form.control}
                name="howDidYouHearAboutTechBlitz"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How did you hear about TechBlitz?</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value ?? ''}
                        onValueChange={(value) => {
                          field.onChange(value);
                          setUser((prev) => {
                            console.log(
                              'howDidYouHearAboutTechBlitz changed:',
                              value
                            );
                            return { ...prev, [field.name]: value };
                          });
                        }}
                      >
                        <SelectTrigger className="w-full border border-black-50">
                          {field.value ? field.value : 'Select an option'}
                        </SelectTrigger>
                        <SelectContent>
                          {whereDidYouHearAboutTechBlitz.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            <button type="submit" className="hidden">
              Submit
            </button>
          </form>
        </Form>
      </CardContent>
    </>
  );
}
