'use client'

import { UserRecord } from '@/types/User'
import { createContext, useState, useContext } from 'react'
import { answerDefaultRoadmapQuestion } from '@/actions/roadmap/questions/default/answer-roadmap-question'
import {
  DefaultRoadmapQuestions,
  DefaultRoadmapQuestionsAnswers,
} from '@prisma/client'
import { answerHelpSchema } from '@/lib/zod/schemas/ai/answer-help'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { generateAnswerHelp } from '@/actions/ai/questions/answer-help'
import { toast } from 'sonner'

export const OnboardingContext = createContext<OnboardingContextType>(
  {} as OnboardingContextType,
)

type Layout = 'questions' | 'codeSnippet' | 'answer'
export type AnswerStatus = 'correct' | 'incorrect' | 'init'

interface OnboardingContextType {
  question: DefaultRoadmapQuestions & {
    answers: DefaultRoadmapQuestionsAnswers[]
  }
  user: UserRecord
  roadmapUid: string
  currentLayout: Layout
  setCurrentLayout: (layout: Layout) => void

  // user answer
  userAnswer: string | null
  setUserAnswer: (userAnswer: string | null) => void

  // generating answer help for the onboarding question
  answerHelp: z.infer<typeof answerHelpSchema> | null
  setAnswerHelp: (answerHelp: z.infer<typeof answerHelpSchema>) => void

  // loading state
  loading: boolean
  setLoading: (loading: boolean) => void

  // keeping track of the user data once they answer the onboarding question
  newUserData: {
    correct: boolean
    message?: string
  } | null
  setNewUserData: (newUserData: { correct: boolean; message?: string }) => void

  // keeping track of the next question index
  nextQuestionIndex: number | null
  setNextQuestionIndex: (nextQuestionIndex: number | null) => void

  // answer roadmap onboarding question
  answerRoadmapOnboardingQuestion: () => void

  // reset the question state
  resetQuestionState: () => void

  // the correct answer to the onboarding question
  correctAnswer: AnswerStatus
  setCorrectAnswer: (correctAnswer: AnswerStatus) => void

  // is the last question
  isLastQuestion: boolean
  setIsLastQuestion: (isLastQuestion: boolean) => void

  // hint
  showHint: boolean
  setShowHint: (showHint: boolean) => void

  // generate answer help for the onboarding question
  generateAiAnswerHelp: (setCodeSnippetLayout?: boolean) => void
}

export const useRoadmapOnboardingContext = () => {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error(
      'useOnboardingContext must be used within a OnboardingContextProvider',
    )
  }
  return context
}

export const RoadmapOnboardingContextProvider = ({
  children,
  user,
  roadmapUid,
  question,
  isCorrectQuestion,
}: {
  children: React.ReactNode
  user: UserRecord
  roadmapUid: string
  question: DefaultRoadmapQuestions & {
    answers: DefaultRoadmapQuestionsAnswers[]
  }
  // is the current question the correct question
  isCorrectQuestion: boolean | number
}) => {
  const router = useRouter()

  const [showHint, setShowHint] = useState<boolean>(false)

  // loading state
  const [loading, setLoading] = useState(false)

  // the users answer to the question
  const [userAnswer, setUserAnswer] = useState<string | null>(null)

  // keeping track of the user data once they answer the onboarding question
  const [newUserData, setNewUserData] = useState<{
    correct: boolean
    message?: string
  } | null>(null)

  // keeping track of the next question index
  const [nextQuestionIndex, setNextQuestionIndex] = useState<number | null>(
    null,
  )

  const [isLastQuestion, setIsLastQuestion] = useState(false)

  // setting the current layout through the onboarding question
  const [currentLayout, setCurrentLayout] = useState<Layout>('questions')

  // generating answer help for the onboarding question
  const [answerHelp, setAnswerHelp] = useState<z.infer<
    typeof answerHelpSchema
  > | null>(null)

  // the correct answer to the onboarding question
  const [correctAnswer, setCorrectAnswer] = useState<AnswerStatus>('init')

  // Check if we should redirect - only if not on correct question and not showing answer
  if (isCorrectQuestion !== true && currentLayout !== 'answer') {
    router.push(`/roadmap/${roadmapUid}/onboarding/${isCorrectQuestion}`)
  }

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
      setCurrentLayout('codeSnippet')
    }

    // we don't need to check if the user has enough tokens because the user is on a roadmap
    // and they have unlimited tokens
    const { content } = await generateAnswerHelp(
      question.uid,
      correctAnswer === 'correct',
      'onboarding',
    )

    console.log('content', content)

    if (!content) {
      toast.error('Error generating answer help')
      return
    }

    // set the answer help
    setAnswerHelp(content)
  }

  const answerRoadmapOnboardingQuestion = async () => {
    if (!user || user.userLevel === 'FREE') {
      return
    }

    setLoading(true)

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
      }

      const {
        correctAnswer,
        isLastQuestion,
        userAnswerContent,
        currentQuestionIndex,
      } = await answerDefaultRoadmapQuestion(opts)

      // set the correct answer
      setCorrectAnswer(correctAnswer ? 'correct' : 'incorrect')

      setUserAnswer(userAnswerContent)

      setIsLastQuestion(isLastQuestion)
      setNextQuestionIndex(currentQuestionIndex + 1)

      // change the layout to the next question
      setCurrentLayout('answer')
    } catch (error) {
      console.error('Error answering roadmap onboarding question', error)
    }
  }

  // reset the question state
  const resetQuestionState = () => {
    // put the layout back to the question
    setCorrectAnswer('init')
    setUserAnswer(null)
    setNewUserData(null)
    setCurrentLayout('questions')
    setAnswerHelp(null)
    setNextQuestionIndex(null)
  }

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
        correctAnswer,
        setCorrectAnswer,
        isLastQuestion,
        setIsLastQuestion,
        showHint,
        setShowHint,
        generateAiAnswerHelp,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}
