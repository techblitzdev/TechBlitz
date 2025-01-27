'use client';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { useRoadmapQuestion } from './roadmap-question-context';
import LoadingSpinner from '@/components/ui/loading';
import CodeDisplay from '@/components/app/questions/single/layout/code-snippet';
import { Button } from '@/components/ui/button';

export default function RoadmapQuestionSubmitted() {
  const { correctAnswer, userAnswer, roadmapQuestion, nextQuestion } =
    useRoadmapQuestion();

  return (
    <motion.div
      className="container mx-auto px-4 py-8 flex flex-col gap-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col gap-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex w-full justify-between items-center">
          <h1 className="text-4xl font-bold">
            {correctAnswer === 'correct' ? (
              <div className="flex items-center gap-x-2">
                <CheckCircle className="size-7 text-green-500" />
                You answered correctly!
              </div>
            ) : correctAnswer === 'incorrect' ? (
              <div className="flex items-center gap-x-2">
                <XCircle className="size-7 text-red-500" />
                That was incorrect, try again!
              </div>
            ) : (
              <LoadingSpinner />
            )}
          </h1>
        </div>
      </motion.div>
      <motion.div
        className="flex flex-col gap-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <h2 className="text-xl font-bold">Your Answer</h2>
            {userAnswer && (
              <CodeDisplay
                content={
                  roadmapQuestion?.answers.find(
                    (answer) => answer.uid === userAnswer?.answerUid
                  )?.answer || ''
                }
                hideIndex={true}
              />
            )}
          </div>
          {/** if the user answered correctly, show the correct answer */}
          {correctAnswer === 'incorrect' && (
            <div className="flex flex-col gap-y-2">
              <h2 className="text-lg font-bold">Correct Answer</h2>
              <CodeDisplay
                content={
                  roadmapQuestion?.answers.find(
                    (answer) => answer.uid === roadmapQuestion.correctAnswerUid
                  )?.answer || ''
                }
                hideIndex={true}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-2 mt-5">
          {/** ai explain answer (on button click) */}
          <h2 className="text-xl font-bold">Explain this answer</h2>
          <p className="text-sm text-gray-400">
            Don't understand this answer? Click the button below to get an
            explanation.
          </p>
          <Button variant="default">Explain Answer</Button>
        </div>
        {/** if the next question slug is not null, show a button to go to the next question */}
        {nextQuestion?.uid && (
          <div className="flex flex-col gap-y-2">
            <h2 className="text-xl font-bold">
              Ready for your next challenge?
            </h2>
            <p className="text-sm text-gray-400">
              Your next roadmap question is:
            </p>
            <Button
              variant="secondary"
              href={`/roadmap/${roadmapQuestion?.roadmapUid}/${nextQuestion.uid}`}
              className="w-fit"
            >
              Next Question
            </Button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
