'use client';

/**
 * wrapper to provide a context for the onboarding flow
 * this context will be used to store all user onboarding data
 * throughout the different steps of the onboarding flow
 */
import { createContext, useContext, useState } from 'react';
import type { UpdatableUserFields } from '@/types/User';

// context type
type OnboardingContextType = {
  user: Omit<
    UpdatableUserFields,
    'email' | 'userLevel' | 'lastLogin' | 'createdAt' | 'updatedAt'
  >;
  setUser: React.Dispatch<
    React.SetStateAction<
      Omit<
        UpdatableUserFields,
        'email' | 'userLevel' | 'lastLogin' | 'createdAt' | 'updatedAt'
      >
    >
  >;
};

// create the context
export const OnboardingContext = createContext<OnboardingContextType | null>(
  null
);

// provide the context to all the children components
export const UserOnboardingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // get the current user

  // user state
  const [user, setUser] = useState<
    Omit<
      UpdatableUserFields,
      'email' | 'userLevel' | 'lastLogin' | 'createdAt' | 'updatedAt'
    >
  >({
    username: '',
    firstName: '',
    lastName: '',
    userProfilePicture: '',
    correctDailyStreak: null,
    totalDailyStreak: null,
    showTimeTaken: false,
    sendPushNotifications: false,
  });

  return (
    <OnboardingContext.Provider value={{ user, setUser }}>
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
