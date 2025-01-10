'use client';

/**
 * wrapper to provide a context for the onboarding flow
 * this context will be used to store all user onboarding data
 * throughout the different steps of the onboarding flow
 */
import { createContext, useContext, useState } from 'react';
import type { UpdatableUserFields } from '@/types/User';
import { QuestionWithTags } from '@/types/Questions';
import { getOnboardingQuestions } from '@/utils/data/questions/get-onboarding';
import { getTodaysQuestion } from '@/utils/data/questions/get-today';
import { useRouter } from 'next/navigation';
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
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  currentStep: 'stepOne' | 'stepTwo' | 'stepThree';
  setCurrentStep: React.Dispatch<
    React.SetStateAction<'stepOne' | 'stepTwo' | 'stepThree'>
  >;
  onboardingQuestions: QuestionWithTags[];
  handleGetOnboardingQuestions: () => Promise<void>;
  handleGetDailyQuestion: () => Promise<void>;
};

// create the context
const OnboardingContext = createContext<OnboardingContextType | null>(null);

// provide the context to all the children components
export const UserOnboardingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
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

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [currentStep, setCurrentStep] = useState<
    'stepOne' | 'stepTwo' | 'stepThree'
  >('stepOne');

  const [onboardingQuestions, setOnboardingQuestions] = useState<any[]>([]);

  const handleGetOnboardingQuestions = async () => {
    const questions = await getOnboardingQuestions(selectedTags);
    setOnboardingQuestions(questions);

    console.log(questions);
  };

  const handleGetDailyQuestion = async () => {
    const question = await getTodaysQuestion();

    // redirect to the question page
    router.push(`/question/${question?.slug}`);
  };

  return (
    <OnboardingContext.Provider
      value={{
        user,
        setUser,
        selectedTags,
        setSelectedTags,
        currentStep,
        setCurrentStep,
        onboardingQuestions,
        handleGetOnboardingQuestions,
        handleGetDailyQuestion,
      }}
    >
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
