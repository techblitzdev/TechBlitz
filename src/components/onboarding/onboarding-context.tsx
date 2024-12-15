'use client';

// wrapper to provide a context for the onboarding flow
// this context will be used to store all user onboarding data
// throughout the different steps of the onboarding flow
import { createContext, useContext, useState } from 'react';
import type { UserUpdatePayload } from '@/types/User';
import { useUser } from '@/hooks/useUser';

// context type
type OnboardingContextType = {
  user: UserUpdatePayload;
};

// create the context
export const OnboardingContext = createContext<OnboardingContextType | null>(
  null
);

// provide the context to all the children components
export const UserOnboardingContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  // get the current user

  // user state
  const [user, setUser] = useState<UserUpdatePayload>({
    uid: '',
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    userProfilePicture: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLogin: null,
    userLevel: 'STANDARD',
    correctDailyStreak: null,
    totalDailyStreak: null,
    showTimeTaken: false,
    sendPushNotifications: false
  });

  return (
    <OnboardingContext.Provider value={{ user }}>
      {children}
    </OnboardingContext.Provider>
  );
};

// custom hook to use the context
export const useOnboardingContext = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error(
      'useOnboardingContext must be used within a UserContextProvider'
    );
  }
  return context;
};
