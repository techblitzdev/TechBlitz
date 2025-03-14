'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboardingContext } from '@/contexts/onboarding-context';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const COMPLETED_QUESTIONS_TO_TITLE = {
  0: 'Great start.',
  1: 'Good job!',
  2: 'You know your stuff!',
  3: 'Excellent work!',
};

/**
 * This component presents simple multiple choice questions to gauge user skill level
 * and provides immediate feedback on correctness.
 */
export default function OnboardingInitialQuestions() {
  const {
    itemVariants,
    setCanContinue,
    setTotalXp,
    user,
    questions,
    answerUserOnboardingQuestions,
  } = useOnboardingContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<boolean[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [resultsProcessed, setResultsProcessed] = useState(false);

  // Disable continue button when component mounts
  useEffect(() => {
    setCanContinue(false);
  }, [setCanContinue]);

  /**
   * Calculate XP to award to the user based on their answers
   * - Correct answers are worth 10 XP each
   * - Incorrect answers are worth 2 XP each
   *
   * @returns {number} Total XP to award to the user
   */
  const calculateXpToAwardToUser = useCallback(() => {
    const correctCount = correctAnswers.filter((isCorrect) => isCorrect === true).length;
    const knowledgeQuestions = correctAnswers.filter(
      (_, index) => questions[index].correctAnswerIndex !== null
    ).length;
    const incorrectCount = knowledgeQuestions - correctCount;
    const opinionQuestions = questions.length - knowledgeQuestions;

    return correctCount * 10 + incorrectCount * 2 + opinionQuestions * 5;
  }, [correctAnswers, questions]);

  // Process results only once when all questions are answered
  useEffect(() => {
    if (answers.length === questions.length && !resultsProcessed) {
      setCanContinue(true);

      // Calculate and set XP only once when all questions are answered
      const xpToAwardToUser = calculateXpToAwardToUser();
      // @ts-ignore - this is added on a separate branch. https://github.com/techblitzdev/TechBlitz/pull/526/files
      setTotalXp((prevXp) => prevXp + xpToAwardToUser);

      // Mark results as processed to prevent multiple executions
      setResultsProcessed(true);

      // Add a slight delay before showing results for a smoother transition
      setTimeout(() => {
        setShowResults(true);
        answerUserOnboardingQuestions(
          questions.map((question) => question.uid),
          correctAnswers
        );
      }, 500);
    }
  }, [
    answers,
    questions.length,
    setCanContinue,
    setTotalXp,
    calculateXpToAwardToUser,
    resultsProcessed,
  ]);

  const handleSelectAnswer = (answer: string, optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    // Check if answer is correct and update correctAnswers array
    const currentQuestionData = questions[currentQuestion];
    const isCorrect =
      currentQuestionData.correctAnswerIndex === null ||
      optionIndex === currentQuestionData.correctAnswerIndex;

    const newCorrectAnswers = [...correctAnswers];
    newCorrectAnswers[currentQuestion] = isCorrect;
    setCorrectAnswers(newCorrectAnswers);

    // Move to next question immediately
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const getScoreSummary = useCallback(() => {
    const answeredQuestions = correctAnswers.filter(
      (_, index) => questions[index].correctAnswerIndex !== null
    ).length;
    const correctCount = correctAnswers.filter((isCorrect) => isCorrect === true).length;

    return `You answered ${correctCount} out of ${answeredQuestions} knowledge questions correct. You've earned ${calculateXpToAwardToUser()} XP.`;
  }, [correctAnswers, questions, calculateXpToAwardToUser]);

  // Update final screen title when all questions are answered
  useEffect(() => {
    if (answers.length === questions.length) {
      getScoreSummary();
    }
  }, [answers.length, questions.length, getScoreSummary]);

  const handlePrevious = () => {
    setCurrentQuestion(Math.max(0, currentQuestion - 1));
  };

  const hasAnsweredAllQuestions = answers.length === questions.length;

  // Handle keyboard number key presses
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only process if not on the summary screen
      const isLastQuestionCurrent = currentQuestion === questions.length - 1;
      const hasAnsweredAllQuestionsCurrent = answers.length === questions.length;

      if (!(hasAnsweredAllQuestionsCurrent && isLastQuestionCurrent)) {
        const key = event.key;
        // Check if the key is a number between 1 and the number of options
        if (/^[1-9]$/.test(key)) {
          const optionIndex = parseInt(key) - 1;
          if (optionIndex < questions[currentQuestion].options.length) {
            const selectedOption = questions[currentQuestion].options[optionIndex];
            handleSelectAnswer(selectedOption, optionIndex);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentQuestion, answers, questions]);

  // Pagination dots component
  const PaginationDots = () => (
    <div className="flex justify-center items-center space-x-2 mt-6 mb-4">
      {questions.map((_, index) => (
        <motion.div
          key={index}
          className={`h-2 rounded-full transition-all duration-300 ${
            index === currentQuestion
              ? 'w-6 bg-accent'
              : index < answers.length
                ? 'w-2 bg-gray-300'
                : 'w-2 bg-gray-600'
          }`}
          initial={{ opacity: 0.6 }}
          animate={{
            opacity: index === currentQuestion ? 1 : 0.6,
            scale: index === currentQuestion ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  );

  return (
    <div className="p-6 w-[300px] sm:w-[400px] md:w-[550px] lg:w-[750px] mx-auto">
      <AnimatePresence mode="wait">
        {hasAnsweredAllQuestions && showResults ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="mb-6 rounded-lg"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              {
                COMPLETED_QUESTIONS_TO_TITLE[
                  Math.min(
                    correctAnswers.filter((isCorrect) => isCorrect === true).length,
                    Object.keys(COMPLETED_QUESTIONS_TO_TITLE).length - 1
                  ) as keyof typeof COMPLETED_QUESTIONS_TO_TITLE
                ]
              }
            </h2>
            <p className="text-gray-400 mb-2 text-sm">{getScoreSummary()}</p>
            <div className="mt-4 space-y-4">
              {questions.map((q, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-lg border border-black-50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <p className="text-gray-400 font-medium mb-2 text-xs">{q.question}</p>
                  <p className="text-white">Your answer: {answers[index]}</p>
                  {q.correctAnswerIndex !== null && (
                    <p
                      className={`mt-2 ${correctAnswers[index] ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {correctAnswers[index]
                        ? '✓ Correct'
                        : `✗ Incorrect. The correct answer was: ${q.options[q.correctAnswerIndex]}`}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
            <p className="text-gray-400 mt-4 text-sm">
              Based on your answers, we'll customize your learning journey.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="questions"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 p-20"
          >
            <motion.div variants={itemVariants} className="flex justify-between">
              <AnimatePresence>
                {currentQuestion > 0 && !hasAnsweredAllQuestions && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <Button
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      className="text-white flex items-center gap-2 mb-3"
                      padding="none"
                      variant="ghost"
                    >
                      <motion.div
                        initial={{ x: 0 }}
                        whileHover={{ x: -3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowLeft className="size-4" />
                      </motion.div>
                      Previous
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">
                {questions[currentQuestion].question}
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => handleSelectAnswer(option, index)}
                    className={`justify-start w-full py-6 px-3 rounded-lg text-left flex items-center bg-transparent border border-black-50 ${
                      answers[currentQuestion] === option ? 'border border-accent' : ''
                    }`}
                    variant="default"
                  >
                    <span className="mr-2 text-sm opacity-70 border border-black-50 rounded-md px-2 py-1">
                      {index + 1}
                    </span>
                    <span className="flex-1">{option}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
            {/* Question progress indicator */}
            <PaginationDots />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
