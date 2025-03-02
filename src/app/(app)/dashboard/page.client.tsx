'use client';
import { use, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { UserRecord } from '@/types/User';
import { useRouter } from 'next/navigation';
import ReferralToast from '@/components/shared/referral-toast';
import { getUserDisplayName } from '@/utils/user';
import { CheckIcon } from 'lucide-react';
import TestimonialModal from '@/components/shared/testimonial-modal';

export default function ClientPage({
  children,
  searchParams,
  userPromise,
  hasAnsweredAnyQuestionPromise,
}: {
  children: React.ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
  userPromise: Promise<UserRecord | null>;
  hasAnsweredAnyQuestionPromise: Promise<{
    hasAnsweredEnoughQuestions: boolean;
    answeredQuestionsCount: number;
  }>;
}) {
  const router = useRouter();

  const user = use(userPromise);
  const { hasAnsweredEnoughQuestions } = use(hasAnsweredAnyQuestionPromise);

  // if we do not have a user, or the username is not set, or it's not a custom username, we need to redirect to onboarding
  if (!user || !user.username || !user.isCustomUsername) {
    router.push('/onboarding');
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Handle purchase success modal
  useEffect(() => {
    if (searchParams.purchase === 'success') {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  // First effect to check onboarding status
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // if the user has no username or who not specified where they heard about techblitz, redirect them to onboarding
    if (!user?.username || !user?.howDidYouHearAboutTechBlitz) {
      router.push('/onboarding');
    }

    // if the user has not answered a question, redirect them back to onboarding#first-question-selection
    // we want the user to answer a question before explore their dashboard.
    // this will also give the user a 'tour' of how questions work. (TODO: add a tour of the question)
    if (!hasAnsweredEnoughQuestions) {
      router.push('/onboarding#first-question-selection');
    }

    const onboardingRequired = localStorage.getItem('onboarding');

    if (onboardingRequired === 'true') {
      setShouldRedirect(true);
    }
  }, []);

  // Second effect to handle the actual redirect
  useEffect(() => {
    if (shouldRedirect) {
      window.location.href = '/onboarding';
    }
  }, [shouldRedirect]);

  // Clean up query params when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [isModalOpen]);

  // Prevent flash of content during redirect
  if (shouldRedirect) {
    return null;
  }

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-3xl bg-linear-to-b shadow-xl bg-black">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl font-bold text-gradient from-white/55 to-white">
              Welcome to your personalized coding experience!
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-y-4 text-gray-200">
              <p>
                <span className="font-semibold">{getUserDisplayName(user)}</span>, thank you for
                purchasing the
                <span className="font-bold"> TechBlitz Premium </span>
                plan!
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <li className="flex items-center space-x-3">
                  <CheckIcon className="size-6 text-accent" />
                  <span className="text-lg font-onest">
                    Personalized roadmaps tailored to your learning journey
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckIcon className="size-6 text-accent" />
                  <span className="text-lg font-onest">
                    Detailed progress tracking and performance analytics
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckIcon className="size-6 text-accent" />
                  <span className="text-lg font-onest">
                    Custom practice questions and challenges
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckIcon className="size-6 text-accent" />
                  <span className="text-lg font-onest">Unlimited AI-assistant support</span>
                </li>
              </ul>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex w-full justify-end space-x-3 mt-6">
            <Button
              variant="default"
              onClick={() => router.push('/dashboard')}
              className="hover:bg-gray-700 transition-colors"
            >
              Go to dashboard
            </Button>
            <Button variant="accent" onClick={() => router.push('/roadmaps')}>
              Explore roadmaps
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="h-full">
        {children}
        <ReferralToast />
        <TestimonialModal userHasAnsweredAnyQuestion={hasAnsweredEnoughQuestions} />
      </div>
    </>
  );
}
