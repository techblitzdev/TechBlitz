'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import LoadingSpinner from '@/components/ui/loading';
import { InputWithLabel } from '@/components/ui/input-label';
import { useOnboardingContext } from './onboarding-context';
import { motion } from 'motion/react';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingStepOneSchema } from '@/lib/zod/schemas/onboarding/step-one';

export default function OnboardingForm() {
  // grab the onboarding context
  const { user } = useOnboardingContext();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(onboardingStepOneSchema),
    defaultValues: {
      username: user?.username || '',
      showTimeTaken: user?.showTimeTaken || false,
      sendPushNotifications: user?.sendPushNotifications || false
    }
  });

  // loading state for skipping
  const skipping = useRef(false);
  const handleSkip = () => {
    // Set skipping to true
    skipping.current = true;

    // Remove the onboarding item from local storage
    localStorage.removeItem('onboarding');

    // Navigate to the dashboard
    router.push('/dashboard');
  };

  const handleSubmit = (e: React.FormEvent) => {
    skipping.current = true;

    e.preventDefault();
    // Here you would typically handle form submission,
    // validate inputs, and potentially send data to backend
    localStorage.removeItem('onboarding');
    router.push('/dashboard');
  };

  return (
    <div className="container min-h-screen flex items-center justify-center p-4">
      <Card
        className="w-full max-w-md border border-black-50 rounded-lg shadow-xl"
        style={{
          background:
            'radial-gradient(128% 107% at 0% 0%, #212121 0%, rgb(0,0,0) 77.61%)'
        }}
      >
        <CardHeader className="space-y-1">
          <motion.h1
            className="text-3xl font-medium bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Welcome!
          </motion.h1>
          <CardDescription className="text-gray-400">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Let's get started by setting up your account.
            </motion.span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="space-y-2 text-white">
                <InputWithLabel
                  label="Username"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Username"
                />
              </div>
              <div className="">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-x-1">
                        <Switch
                          id="showTimeTaken"
                          className="bg-black-50"
                        />
                        <Label
                          htmlFor="showTimeTaken"
                          className="text-white"
                        >
                          Appear on leaderboards
                        </Label>
                      </div>
                    </TooltipTrigger>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <CardFooter className="flex items-center gap-3 justify-end p-0">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleSkip}
                >
                  {skipping.current ? <LoadingSpinner /> : 'Skip'}
                </Button>
                <Button
                  type="submit"
                  variant="accent"
                  className="text-xs sm:text-sm font-onest !bg-gradient-to-r !from-accent !via-white/20 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
