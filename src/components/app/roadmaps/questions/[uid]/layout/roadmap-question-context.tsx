'use client';

import { answerRoadmapQuestion } from '@/actions/roadmap/questions/answer-roadmap-question';
import { RoadmapUserQuestions } from '@/types/Roadmap';
import { UserRecord } from '@/types/User';
import {
  Answers,
  RoadmapUserQuestionsAnswers,
  RoadmapUserQuestionsUserAnswers,
} from '@prisma/client';
import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

type RoadmapQuestionContextType = {
  roadmapQuestion: RoadmapUserQuestions & {
    userAnswers: RoadmapUserQuestionsUserAnswers[];
  };
  roadmapUid: string;
  user: UserRecord;
  currentLayout: 'questions' | 'codeSnippet' | 'answer';
  setCurrentLayout: (layout: 'questions' | 'codeSnippet' | 'answer') => void;
  handleAnswerRoadmapQuestion: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  selectedAnswer: string | null;
  setSelectedAnswer: (answer: string | null) => void;
  newUserData: Omit<RoadmapUserQuestionsAnswers, 'answers'> | null;
  setNewUserData: (
    userData: Omit<RoadmapUserQuestionsAnswers, 'answers'> | null
  ) => void;
  nextQuestion: Omit<RoadmapUserQuestions, 'answers'> | null;
  setNextQuestion: (
    question: Omit<RoadmapUserQuestions, 'answers'> | null
  ) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  correctAnswer: 'correct' | 'incorrect' | 'init';
  setCorrectAnswer: (correctAnswer: 'correct' | 'incorrect' | 'init') => void;
  userAnswer: RoadmapUserQuestionsAnswers | null;
  setUserAnswer: (userAnswer: RoadmapUserQuestionsAnswers | null) => void;
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
  roadmapUid,
  user,
}: {
  children: React.ReactNode;
  roadmapQuestion: RoadmapUserQuestions & {
    userAnswers: RoadmapUserQuestionsUserAnswers[];
  };
  roadmapUid: string;
  user: UserRecord;
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // the current layout of the page
  const [currentLayout, setCurrentLayout] = useState<
    'questions' | 'codeSnippet' | 'answer'
  >('questions');

  // loading state
  const [loading, setLoading] = useState(false);

  // the new user data
  const [newUserData, setNewUserData] = useState<Omit<
    RoadmapUserQuestionsAnswers,
    'answers'
  > | null>(null);

  // handling the next question
  const [nextQuestion, setNextQuestion] = useState<Omit<
    RoadmapUserQuestions,
    'answers'
  > | null>();

  // the correct answer
  const [correctAnswer, setCorrectAnswer] = useState<
    'correct' | 'incorrect' | 'init'
  >('init');

  // the users answer
  const [userAnswer, setUserAnswer] =
    useState<RoadmapUserQuestionsAnswers | null>(null);

  // answering a roadmap question
  const handleAnswerRoadmapQuestion = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!user) {
      console.error('User is not logged in');
      return;
    }

    setLoading(true);
    try {
      // Find the selected answer's text from the roadmapQuestion answers
      const selectedAnswerText = roadmapQuestion.answers.find(
        (a) => a.uid === selectedAnswer
      )?.answer;

      if (!selectedAnswerText) {
        throw new Error('Selected answer not found');
      }

      const opts = {
        questionUid: roadmapQuestion.uid,
        answerUid: selectedAnswer, // This is the UID of the selected answer
        roadmapUid,
        userUid: user.uid,
        currentQuestionIndex: roadmapQuestion.order,
        answer: selectedAnswerText, // This is the actual answer text
      };

      const { userAnswer, nextQuestion } = await answerRoadmapQuestion(opts);

      setUserAnswer(userAnswer);
      setNewUserData(userAnswer);
      setNextQuestion(nextQuestion);

      setCorrectAnswer(userAnswer?.correct ? 'correct' : 'incorrect');
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast.error('Error submitting answer');
    }
    setLoading(false);
    setCurrentLayout('answer');
  };

  return (
    <RoadmapQuestionContext.Provider
      value={{
        currentLayout,
        setCurrentLayout,
        roadmapQuestion,
        roadmapUid,
        user,
        handleAnswerRoadmapQuestion,
        selectedAnswer,
        setSelectedAnswer,
        newUserData,
        setNewUserData,
        nextQuestion: nextQuestion ?? null,
        setNextQuestion,
        loading,
        setLoading,
        userAnswer,
        setUserAnswer,
        correctAnswer,
        setCorrectAnswer,
      }}
    >
      {children}
    </RoadmapQuestionContext.Provider>
  );
};
