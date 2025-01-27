'use client';

import { RoadmapUserQuestions } from '@/types/Roadmap';
import { Answers, RoadmapUserQuestionsUserAnswers } from '@prisma/client';
import { createContext, useState, useContext, useEffect } from 'react';

type RoadmapQuestionContextType = {
  roadmapQuestion: RoadmapUserQuestions & {
    userAnswers: RoadmapUserQuestionsUserAnswers[];
  };
  currentLayout: 'questions' | 'codeSnippet' | 'answer';
  setCurrentLayout: (layout: 'questions' | 'codeSnippet' | 'answer') => void;
};

export const RoadmapQuestionContext = createContext<RoadmapQuestionContextType>(
  {} as RoadmapQuestionContextType
);

export const useRoadmapQuestion = () => {
  const context = useContext(RoadmapQuestionContext);
  if (!context) {
    throw new Error(
      'useRoadmapQuestion must be used within a RoadmapQuestionContextProvider'
    );
  }
  return context;
};

export const RoadmapQuestionContextProvider = ({
  children,
  roadmapQuestion,
}: {
  children: React.ReactNode;
  roadmapQuestion: RoadmapUserQuestions & {
    userAnswers: RoadmapUserQuestionsUserAnswers[];
  };
}) => {
  // setting
  // the current layout of the page
  const [currentLayout, setCurrentLayout] = useState<
    'questions' | 'codeSnippet' | 'answer'
  >('questions');

  return (
    <RoadmapQuestionContext.Provider
      value={{ currentLayout, setCurrentLayout, roadmapQuestion }}
    >
      {children}
    </RoadmapQuestionContext.Provider>
  );
};
