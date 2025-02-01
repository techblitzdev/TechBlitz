"use client";

import { generateAnswerHelp } from "@/actions/ai/questions/answer-help";
import { answerRoadmapQuestion } from "@/actions/roadmap/questions/answer-roadmap-question";
import { answerHelpSchema } from "@/lib/zod/schemas/ai/answer-help";
import { RoadmapUserQuestions } from "@/types/Roadmap";
import { UserRecord } from "@/types/User";
import {
  RoadmapUserQuestionsAnswers,
  RoadmapUserQuestionsUserAnswers,
} from "@prisma/client";
import { createContext, useState, useContext } from "react";
import { toast } from "sonner";
import { z } from "zod";

type Layout = "questions" | "codeSnippet" | "answer";
type AnswerStatus = "correct" | "incorrect" | "init";

interface RoadmapQuestionContextType {
  roadmapQuestion: RoadmapUserQuestions;
  roadmapUid: string;
  user: UserRecord;
  currentLayout: Layout;
  setCurrentLayout: (layout: Layout) => void;
  handleAnswerRoadmapQuestion: (
    e: React.FormEvent<HTMLFormElement>,
  ) => Promise<void>;
  selectedAnswer: string | null;
  setSelectedAnswer: (answer: string | null) => void;
  newUserData: Omit<RoadmapUserQuestionsAnswers, "answers"> | null;
  setNewUserData: (
    userData: Omit<RoadmapUserQuestionsAnswers, "answers"> | null,
  ) => void;
  nextQuestion: Omit<RoadmapUserQuestions, "answers"> | null;
  setNextQuestion: (
    question: Omit<RoadmapUserQuestions, "answers"> | null,
  ) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  correctAnswer: AnswerStatus;
  setCorrectAnswer: (correctAnswer: AnswerStatus) => void;
  userAnswer: RoadmapUserQuestionsUserAnswers | null;
  setUserAnswer: (userAnswer: RoadmapUserQuestionsUserAnswers | null) => void;
  resetQuestionState: () => void;

  // hint
  showHint: boolean;
  setShowHint: (showHint: boolean) => void;

  // ai answer help
  generateAiAnswerHelp: (setCodeSnippetLayout?: boolean) => Promise<void>;
  answerHelp: z.infer<typeof answerHelpSchema> | null;
  setAnswerHelp: (answerHelp: z.infer<typeof answerHelpSchema> | null) => void;
}

const RoadmapQuestionContext = createContext<RoadmapQuestionContextType>(
  {} as RoadmapQuestionContextType,
);

export const useRoadmapQuestion = () => {
  const context = useContext(RoadmapQuestionContext);
  if (!context) {
    throw new Error(
      "useRoadmapQuestion must be used within a RoadmapQuestionContextProvider",
    );
  }
  return context;
};

interface ProviderProps {
  children: React.ReactNode;
  roadmapQuestion: RoadmapUserQuestions;
  roadmapUid: string;
  user: UserRecord;
}

export const RoadmapQuestionContextProvider = ({
  children,
  roadmapQuestion,
  roadmapUid,
  user,
}: ProviderProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentLayout, setCurrentLayout] = useState<Layout>("questions");
  const [loading, setLoading] = useState(false);
  const [newUserData, setNewUserData] = useState<Omit<
    RoadmapUserQuestionsAnswers,
    "answers"
  > | null>(null);
  const [nextQuestion, setNextQuestion] = useState<Omit<
    RoadmapUserQuestions,
    "answers"
  > | null>();
  const [correctAnswer, setCorrectAnswer] = useState<AnswerStatus>("init");
  const [userAnswer, setUserAnswer] =
    useState<RoadmapUserQuestionsUserAnswers | null>(null);

  const [showHint, setShowHint] = useState(false);

  const [answerHelp, setAnswerHelp] = useState<z.infer<
    typeof answerHelpSchema
  > | null>(null);

  /**
   * Method for generating answer help for a roadmap question
   *
   * @param setCodeSnippetLayout - optional boolean to set the current layout to 'codeSnippet'
   * @returns void
   */
  const generateAiAnswerHelp = async (setCodeSnippetLayout?: boolean) => {
    // if the user has asked for assistance for the answer, set the current layout to 'codeSnippet'
    // this is so mobile view switches to the code snippet view
    if (setCodeSnippetLayout) {
      setCurrentLayout("codeSnippet");
    }

    // we don't need to check if the user has enough tokens because the user is on a roadmap
    // and they have unlimited tokens
    const { content } = await generateAnswerHelp(
      roadmapQuestion.uid,
      userAnswer?.correct || false,
      "roadmap",
    );

    console.log("content", content);

    if (!content) {
      toast.error("Error generating answer help");
      return;
    }

    // set the answer help
    setAnswerHelp(content);
  };

  const handleAnswerRoadmapQuestion = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!user) {
      console.error("User is not logged in");
      return;
    }

    if (!selectedAnswer) {
      toast.error("Please select an answer");
      return;
    }

    setLoading(true);

    try {
      const selectedAnswerText = roadmapQuestion.answers.find(
        (a) => a.uid === selectedAnswer,
      )?.answer;

      if (!selectedAnswerText) {
        throw new Error("Selected answer not found");
      }

      const { userAnswer, nextQuestion } = await answerRoadmapQuestion({
        questionUid: roadmapQuestion.uid,
        answerUid: selectedAnswer,
        roadmapUid,
        userUid: user.uid,
        currentQuestionIndex: roadmapQuestion.order,
        answer: selectedAnswerText,
      });

      setUserAnswer(userAnswer);
      setNewUserData(userAnswer);
      setNextQuestion(nextQuestion);
      setCorrectAnswer(userAnswer?.correct ? "correct" : "incorrect");
      setCurrentLayout("answer");
    } catch (error) {
      console.error("Error submitting answer:", error);
      toast.error("Error submitting answer");
    } finally {
      setLoading(false);
    }
  };

  const resetQuestionState = () => {
    setSelectedAnswer(null);
    setCurrentLayout("questions");
    setNewUserData(null);
    setNextQuestion(null);
    setCorrectAnswer("init");
    setUserAnswer(null);
    setAnswerHelp(null);
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
        resetQuestionState,
        showHint,
        setShowHint,
        generateAiAnswerHelp,
        answerHelp,
        setAnswerHelp,
      }}
    >
      {children}
    </RoadmapQuestionContext.Provider>
  );
};
