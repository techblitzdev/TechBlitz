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

export default function ClientPage({
  children,
  searchParams,
  userPromise,
}: {
  children: React.ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
  userPromise: Promise<UserRecord | null>;
}) {
  const router = useRouter();

  const user = use(userPromise);

  // if we do not have a user, or the username is not set, we need to redirect to onboarding
  if (!user || !user.username) {
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

    const onboardingRequired = localStorage.getItem('onboarding');
    console.log('Onboarding status:', onboardingRequired);

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
        <DialogContent className="sm:max-w-[425px] bg-black-100">
          <DialogHeader>
            <DialogTitle className="text-xl">Purchase Successful!</DialogTitle>
            <DialogDescription className="flex flex-col gap-y-2">
              <span>
                You now have access to all the features on techblitz, why not
                try one out now?
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" href="/roadmaps">
              Go to roadmaps
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div>
        {children}
        <ReferralToast />
      </div>
    </>
  );
}
