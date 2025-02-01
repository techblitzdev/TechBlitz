"use client";

/**
 * wrapper to provide a context for the onboarding flow
 * this context will be used to store all user onboarding data
 * throughout the different steps of the onboarding flow
 */
import { createContext, useContext, useState } from "react";
import type { UpdatableUserFields, UserRecord } from "@/types/User";
import { Question, QuestionWithTags } from "@/types/Questions";
import { getOnboardingQuestions } from "@/utils/data/questions/get-onboarding";
import { useRouter } from "next/navigation";
// context type
type OnboardingContextType = {
  user: Omit<
    UpdatableUserFields,
    "email" | "userLevel" | "lastLogin" | "createdAt" | "updatedAt"
  >;
  setUser: React.Dispatch<
    React.SetStateAction<
      Omit<
        UpdatableUserFields,
        "email" | "userLevel" | "lastLogin" | "createdAt" | "updatedAt"
      >
    >
  >;
  serverUser: UserRecord | null;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  currentStep: "stepOne" | "stepTwo" | "stepThree" | "stepFour" | "stepFive";
  setCurrentStep: React.Dispatch<
    React.SetStateAction<
      "stepOne" | "stepTwo" | "stepThree" | "stepFour" | "stepFive"
    >
  >;
  onboardingQuestions: QuestionWithTags[];
  handleGetOnboardingQuestions: () => Promise<void>;
  handleGetDailyQuestion: () => Promise<void>;
  itemVariants: any;
  canContinue: boolean;
  setCanContinue: React.Dispatch<React.SetStateAction<boolean>>;
};

// create the context
const OnboardingContext = createContext<OnboardingContextType | null>(null);

// provide the context to all the children components
export const UserOnboardingContextProvider = ({
  children,
  dailyQuestion,
  serverUser,
}: {
  children: React.ReactNode;
  dailyQuestion: Question | null;
  serverUser: UserRecord | null;
}) => {
  const router = useRouter();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // user state
  const [user, setUser] = useState<
    Omit<
      UpdatableUserFields,
      "email" | "userLevel" | "lastLogin" | "createdAt" | "updatedAt"
    >
  >(
    serverUser as Omit<
      UpdatableUserFields,
      "email" | "userLevel" | "lastLogin" | "createdAt" | "updatedAt"
    >,
  );

  const [canContinue, setCanContinue] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [currentStep, setCurrentStep] = useState<
    "stepOne" | "stepTwo" | "stepThree" | "stepFour" | "stepFive"
  >("stepOne");

  const [onboardingQuestions, setOnboardingQuestions] = useState<any[]>([]);

  const handleGetOnboardingQuestions = async () => {
    const questions = await getOnboardingQuestions(selectedTags);
    setOnboardingQuestions(questions);

    console.log(questions);
  };

  const handleGetDailyQuestion = async () => {
    // redirect to the question page
    router.push(`/question/${dailyQuestion?.slug}`);
  };

  return (
    <OnboardingContext.Provider
      value={{
        user,
        setUser,
        serverUser,
        selectedTags,
        setSelectedTags,
        currentStep,
        setCurrentStep,
        onboardingQuestions,
        handleGetOnboardingQuestions,
        handleGetDailyQuestion,
        itemVariants,
        setCanContinue,
        canContinue,
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
      "useOnboardingContext must be used within a UserContextProvider",
    );
  }
  return context;
};
