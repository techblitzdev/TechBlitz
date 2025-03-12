'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOnboardingContext } from '@/contexts/onboarding-context';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

/**
 * This component presents simple multiple choice questions to gauge user skill level
 * and provides immediate feedback on correctness.
 */
export default function OnboardingInitialQuestions() {
  const { itemVariants, setCanContinue } = useOnboardingContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<boolean[]>([]);

  // Questions data with correct answers
  const questions = [
    {
      question: 'What is a function in programming?',
      options: [
        'A type of variable',
        'A programming language',
        'A block of code designed to perform a particular task',
        "I'm not sure",
      ],
      correctAnswerIndex: 2,
    },
    {
      question: 'What does HTML stand for?',
      options: [
        'High Tech Modern Language',
        'Hyper Text Markup Language',
        'Hyper Transfer Medium Link',
        "I'm not sure",
      ],
      correctAnswerIndex: 1,
    },
    {
      question: 'Which of these is a programming loop?',
      options: ['For loop', 'Around loop', 'Circle loop', "I'm not sure"],
      correctAnswerIndex: 0,
    },
  ];

  // Disable continue button when component mounts
  useEffect(() => {
    setCanContinue(false);
  }, [setCanContinue]);

  // Enable continue button when all questions are answered
  useEffect(() => {
    if (answers.length === questions.length) {
      setCanContinue(true);
    }
  }, [answers, questions.length, setCanContinue]);

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

  const getScoreSummary = () => {
    const answeredQuestions = correctAnswers.filter(
      (_, index) => questions[index].correctAnswerIndex !== null
    ).length;
    const correctCount = correctAnswers.filter((isCorrect) => isCorrect === true).length;

    const xpToAwardToUser = calculateXpToAwardToUser();

    return `You answered ${correctCount} out of ${answeredQuestions} knowledge questions correct.`;
  };

  const handlePrevious = () => {
    setCurrentQuestion(Math.max(0, currentQuestion - 1));
  };

  const isLastQuestion = currentQuestion === questions.length - 1;
  const hasAnsweredAllQuestions = answers.length === questions.length;

  /**
   * Each question is worth 10 XP
   * Incorrect answers are worth 2 XP
   *
   * @returns
   */
  const calculateXpToAwardToUser = () => {
    const answeredQuestions = correctAnswers.filter(
      (_, index) => questions[index].correctAnswerIndex !== null
    ).length;
    const incorrectAnswers = questions.length - answeredQuestions;
    return answeredQuestions * 10 + incorrectAnswers * 2;
  };

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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {hasAnsweredAllQuestions && isLastQuestion ? (
        <motion.div variants={itemVariants} className="mb-6 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4">All Done!</h2>
          <p className="text-gray-200 mb-2">{getScoreSummary()}</p>
          <div className="mt-4 space-y-4">
            {questions.map((q, index) => (
              <div key={index} className="p-4 rounded-lg bg-primary">
                <p className="text-white font-medium mb-2">{q.question}</p>
                <p className="text-gray-300">Your answer: {answers[index]}</p>
                {q.correctAnswerIndex !== null && (
                  <p
                    className={`mt-2 ${correctAnswers[index] ? 'text-green-400' : 'text-red-400'}`}
                  >
                    {correctAnswers[index]
                      ? '✓ Correct'
                      : `✗ Incorrect. The correct answer was: ${q.options[q.correctAnswerIndex]}`}
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="text-gray-200 mt-4">
            Based on your answers, we'll customize your learning path.
          </p>
        </motion.div>
      ) : (
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">{questions[currentQuestion].question}</h2>
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
                  className={`justify-start w-full py-6 px-3 rounded-lg text-left flex items-center ${
                    answers[currentQuestion] === option ? 'border border-accent bg-primary' : ''
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
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="flex justify-between">
        {currentQuestion > 0 && !hasAnsweredAllQuestions && (
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-4 py-2 rounded-md ${
              currentQuestion === 0
                ? 'opacity-50 cursor-not-allowed bg-gray-700'
                : 'bg-gray-700 hover:bg-gray-600'
            } text-white`}
          >
            Previous
          </Button>
        )}
      </motion.div>
    </div>
  );
}
