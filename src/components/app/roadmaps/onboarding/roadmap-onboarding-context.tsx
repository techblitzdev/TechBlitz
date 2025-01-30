'use client';

import { UserRecord } from '@/types/User';
import { createContext, useState, useContext } from 'react';
import { answerDefaultRoadmapQuestion } from '@/actions/roadmap/questions/default/answer-roadmap-question';
import {
  DefaultRoadmapQuestions,
  DefaultRoadmapQuestionsAnswers,
} from '@prisma/client';
import { answerHelpSchema } from '@/lib/zod/schemas/ai/answer-help';
import { z } from 'zod';

export const OnboardingContext = createContext<OnboardingContextType>(
  {} as OnboardingContextType
);

type Layout = 'questions' | 'codeSnippet' | 'answer';
export type AnswerStatus = 'correct' | 'incorrect' | 'init';

interface OnboardingContextType {
  question: DefaultRoadmapQuestions & {
    answers: DefaultRoadmapQuestionsAnswers[];
  };
  user: UserRecord;
  roadmapUid: string;
  currentLayout: Layout;
  setCurrentLayout: (layout: Layout) => void;

  // user answer
  userAnswer: string | null;
  setUserAnswer: (userAnswer: string | null) => void;

  // generating answer help for the onboarding question
  answerHelp: z.infer<typeof answerHelpSchema> | null;
  setAnswerHelp: (answerHelp: z.infer<typeof answerHelpSchema>) => void;

  // loading state
  loading: boolean;
  setLoading: (loading: boolean) => void;

  // keeping track of the user data once they answer the onboarding question
  newUserData: {
    correct: boolean;
    message?: string;
  } | null;
  setNewUserData: (newUserData: { correct: boolean; message?: string }) => void;

  // keeping track of the next question index
  nextQuestionIndex: number | null;
  setNextQuestionIndex: (nextQuestionIndex: number | null) => void;

  // answer roadmap onboarding question
  answerRoadmapOnboardingQuestion: () => void;

  // reset the question state
  resetQuestionState: () => void;
}

export const useRoadmapOnboardingContext = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error(
      'useOnboardingContext must be used within a OnboardingContextProvider'
    );
  }
  return context;
};

export const RoadmapOnboardingContextProvider = ({
  children,
  user,
  roadmapUid,
  question,
}: {
  children: React.ReactNode;
  user: UserRecord;
  roadmapUid: string;
  question: DefaultRoadmapQuestions & {
    answers: DefaultRoadmapQuestionsAnswers[];
  };
}) => {
  // loading state
  const [loading, setLoading] = useState(false);

  const [userAnswer, setUserAnswer] = useState<string | null>(null);

  // keeping track of the user data once they answer the onboarding question
  const [newUserData, setNewUserData] = useState<{
    correct: boolean;
    message?: string;
  } | null>(null);

  // keeping track of the next question index
  const [nextQuestionIndex, setNextQuestionIndex] = useState<number | null>(
    null
  );

  // setting the current layout through the onboarding question
  const [currentLayout, setCurrentLayout] = useState<Layout>('questions');

  // generating answer help for the onboarding question
  const [answerHelp, setAnswerHelp] = useState<z.infer<
    typeof answerHelpSchema
  > | null>(null);

  const answerRoadmapOnboardingQuestion = async () => {
    if (!user || user.userLevel === 'FREE') {
      return;
    }

    setLoading(true);

    try {
      const opts: any = {
        // the question being answered
        questionUid: question?.uid,
        // the answer the user has selected and is being submitted
        answerUid: userAnswer,
        // the roadmap the user is on
        roadmapUid,
        // the question index the user is on
        currentQuestionIndex: question?.order,
      };

      const answer = await answerDefaultRoadmapQuestion(opts);

      // Set user data to show correct/incorrect state
      setNewUserData({
        correct: answer.correctAnswer || false,
      });

      // change the layout to the next question
      setCurrentLayout('answer');
    } catch (error) {
      console.error('Error answering roadmap onboarding question', error);
    }
  };

  const resetQuestionState = () => {
    setNewUserData(null);
    setAnswerHelp(null);
    setLoading(false);
  };

  return (
    <OnboardingContext.Provider
      value={{
        question,
        user,
        roadmapUid,
        currentLayout,
        setCurrentLayout,
        answerHelp,
        setAnswerHelp,
        loading,
        setLoading,
        newUserData,
        setNewUserData,
        nextQuestionIndex,
        setNextQuestionIndex,
        answerRoadmapOnboardingQuestion,
        resetQuestionState,
        userAnswer,
        setUserAnswer,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
