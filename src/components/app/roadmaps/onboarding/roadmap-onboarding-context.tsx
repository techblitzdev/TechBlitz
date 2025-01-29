'use client';

import { UserRecord } from '@/types/User';
import { createContext, useState, useContext } from 'react';
import { SchemaProps } from '../../questions/single/answer-question-form';
import { answerDefaultRoadmapQuestion } from '@/actions/roadmap/questions/default/answer-roadmap-question';
import { DefaultRoadmapQuestions } from '@prisma/client';

export const OnboardingContext = createContext({});

export const useOnboardingContext = () => useContext(OnboardingContext);

export const RoadmapOnboardingContextProvider = ({
  children,
  user,
  roadmapUid,
  question,
}: {
  children: React.ReactNode;
  user: UserRecord;
  roadmapUid: string;
  question: DefaultRoadmapQuestions;
}) => {
  const [loading, setLoading] = useState(false);
  const [newUserData, setNewUserData] = useState<{
    correct: boolean;
    message?: string;
  } | null>(null);
  const [nextQuestionIndex, setNextQuestionIndex] = useState<number | null>(
    null
  );

  const answerRoadmapOnboardingQuestion = async (values: SchemaProps) => {
    if (!user || user.userLevel === 'FREE') {
      return;
    }

    setLoading(true);

    try {
      const opts: any = {
        questionUid: question?.uid,
        answerUid: values.answer,
        roadmapUid,
        userUid: user.uid,
        currentQuestionIndex: question?.order,
      };

      const answer = await answerDefaultRoadmapQuestion(opts);

      // Set user data to show correct/incorrect state
      setNewUserData({
        correct: answer.correctAnswer || false,
      });

      // Set next question index or null if last question
      setNextQuestionIndex(
        answer.isLastQuestion ? null : (answer?.currentQuestionIndex || 0) + 1
      );
    } catch (error) {
      console.error('Error answering roadmap onboarding question', error);
    }
  };

  return (
    <OnboardingContext.Provider value={{}}>
      {children}
    </OnboardingContext.Provider>
  );
};
