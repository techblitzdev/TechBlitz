'use client';

import { UserRecord } from '@/types/User';
import { createContext, useState, useContext } from 'react';

export const OnboardingContext = createContext({});

export const useOnboardingContext = () => useContext(OnboardingContext);

export const RoadmapOnboardingContextProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserRecord;
}) => {
  return (
    <OnboardingContext.Provider value={{}}>
      {children}
    </OnboardingContext.Provider>
  );
};
