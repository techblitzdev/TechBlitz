'use client';

import { Question } from '@/types/Questions';
import MultipleChoiceCard from './card';
import { useState } from 'react';
import MultipleChoiceFooter from './footer';
import { toast } from 'sonner';
import { answerQuestion } from '@/actions/answers/answer';
import { QuestionAnswer } from '@/types/QuestionAnswers';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuestionMock {
  uid: string;
  question: string;
  questionDate: string;
  correctAnswer: string;
  answers: QuestionAnswer[];
  [key: string]: any;
}

export default function MultipleChoiceLayoutClient({
  children,
  question,
}: {
  children: React.ReactNode;
  question: Question | QuestionMock;
}) {
  // Track the selected answer UID and text
  const [selectedAnswerData, setSelectedAnswerData] = useState<{
    uid: string;
    text: string;
  } | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track time spent
  const [startTime] = useState<number>(Date.now());

  // Ensure answers is an array of QuestionAnswer objects
  const answers = Array.isArray(question.answers) ? question.answers : [];

  // Handle answer selection
  const handleSelectAnswer = (answer: string, index: number) => {
    // Prevent changing answer after submission
    if (isSubmitted) return;

    // Get the answer UID from the answers array at this index
    const answerObj = answers[index];

    if (answerObj) {
      setSelectedAnswerData({
        uid: answerObj.uid,
        text: answer,
      });
      // Reset the result when a new answer is selected
      setIsCorrect(null);
    }
  };

  // Handle clearing the selected answer
  const handleClear = () => {
    if (isSubmitted) return;
    setSelectedAnswerData(null);
    setIsCorrect(null);
  };

  const resetQuestion = () => {
    setIsSubmitted(false);
    setIsCorrect(null);
    setSelectedAnswerData(null);
  };

  // Handle submitting the answer
  const handleSubmit = async () => {
    if (!selectedAnswerData || isSubmitting) return;

    setIsSubmitting(true);

    // provides instant feedback without waiting for the server to respond
    if (question.correctAnswer === selectedAnswerData.uid) {
      setIsCorrect(true);
      setIsSubmitted(true);
    } else {
      setIsCorrect(false);
      setIsSubmitted(true);
    }

    setIsSubmitting(false);

    try {
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);

      await answerQuestion({
        questionUid: question.uid,
        answerUid: selectedAnswerData.uid,
        timeTaken,
      });
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast.error('Error submitting answer');
    }
  };

  // Find the correct answer UID for highlighting
  const correctAnswerUid = question.correctAnswer;

  // Get the feedback messages
  const getFeedbackMessage = () => {
    if (!isSubmitted) return null;

    if (isCorrect) {
      const messages = [
        'Excellent!',
        'Perfect!',
        'Great job!',
        'You got it!',
        'Brilliant!',
        'Nicely done!',
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    } else {
      const messages = [
        'Try again!',
        'Almost there!',
        "You'll get it next time!",
        'We all make mistakes',
        'Practice makes perfect!',
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    }
  };

  const feedbackMessage = getFeedbackMessage();

  return (
    <div className="container min-h-screen flex flex-col justify-center items-center max-w-xs md:max-w-xl lg:max-w-2xl">
      <div className="flex flex-col gap-4 mb-6 relative w-full">
        {/* Feedback banner that slides in from top when submitted */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={`w-full p-4 rounded-lg mb-4 flex items-center justify-between ${
                isCorrect ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
              }`}
            >
              <div className="flex items-center">
                {isCorrect ? (
                  <CheckCircle2 className="mr-2" size={20} />
                ) : (
                  <XCircle className="mr-2" size={20} />
                )}
                <span className="font-medium font-onest">{feedbackMessage}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {children}

        {/* Answer cards that stay visible and transform when submitted */}
        <div className="flex flex-col gap-4 w-full">
          {answers.map((answerObj, index) => {
            const isCurrentAnswer = selectedAnswerData?.uid === answerObj.uid;
            const isCorrectAnswer = answerObj.uid === correctAnswerUid;

            return (
              <MultipleChoiceCard
                key={answerObj.uid}
                index={index}
                answer={answerObj.answer}
                handleSelectAnswer={handleSelectAnswer}
                selectedAnswer={selectedAnswerData?.text}
                isCorrect={isSubmitted && isCurrentAnswer ? isCorrect : undefined}
                isSubmitted={isSubmitted}
                correctAnswer={isSubmitted && isCorrectAnswer ? answerObj.answer : undefined}
              />
            );
          })}
        </div>

        {/* After question info that appears after submission */}
        <AnimatePresence>
          {isSubmitted && question.afterQuestionInfo && (
            <motion.div
              className="mt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h4 className="text-lg font-medium mb-2">Learn More</h4>
              <div
                className="text-muted-foreground text-sm"
                dangerouslySetInnerHTML={{ __html: question.afterQuestionInfo }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <MultipleChoiceFooter
        selectedAnswer={selectedAnswerData?.text}
        onClear={handleClear}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        hasSubmitted={isSubmitted}
        onReset={resetQuestion}
      />
    </div>
  );
}
