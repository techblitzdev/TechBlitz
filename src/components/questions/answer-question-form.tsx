import { useState } from 'react';
// components
import { Form, FormControl, FormField } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import AnswerQuestionModal from '@/components/questions/answer-question-modal';
// actions
import { answerQuestion } from '@/actions/answers/answer';
// zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { answerQuestionSchema } from '@/lib/zod/schemas/answer-question-schema';
// types
import type { Question } from '@/types/Questions';
import type { UserRecord } from '@/types/User';
import type { Answer } from '@/types/Answers';
import { toast } from 'sonner';
import { clearQuestionsForAdmin } from '@/actions/questions/admin/clear';
import QuestionCard from './question-card';

type SchemaProps = z.infer<typeof answerQuestionSchema>;
type AnswerQuestionFormProps = {
  userData: UserRecord;
  uid: string;
  question: Question;
  time: number;
  stopwatchPause: () => void;
  resetStopwatch: () => void;
  onNext?: () => void;
};

export default function AnswerQuestionForm({
  userData,
  uid,
  question,
  time,
  stopwatchPause,
  resetStopwatch,
  onNext,
}: AnswerQuestionFormProps) {
  const [correctAnswer, setCorrectAnswer] = useState<
    'init' | 'incorrect' | 'correct'
  >('init');
  const [userAnswer, setUserAnswer] = useState<Answer | null>(null);
  const [newUserData, setNewUserData] = useState<UserRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<SchemaProps>({
    resolver: zodResolver(answerQuestionSchema),
    defaultValues: {
      answer: '',
    },
  });

  const handleAnswerQuestion = async (values: SchemaProps) => {
    if (!userData) {
      console.error('User is not logged in');
      return;
    }

    // pause the stopwatch
    stopwatchPause();

    try {
      // build the params
      const opts: any = {
        questionUid: uid,
        answerUid: values.answer,
        userUid: userData.uid,
      };

      // conditonally add the time taken if it exists
      if (time) {
        opts.timeTaken = time;
      }

      const {
        correctAnswer,
        userAnswer,
        userData: newUserData,
      } = await answerQuestion(opts);

      // set the data that we get bacl from the endpoint so we can pass it to the popup
      setCorrectAnswer(correctAnswer ? 'correct' : 'incorrect');
      setUserAnswer(userAnswer);
      setNewUserData(newUserData);
      // open the modal
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error submitting answer:', error);
      // Handle error appropriately
      toast.error('Error submitting answer');
    }
  };

  const adminClearAnswers = async () => {
    try {
      await clearQuestionsForAdmin(uid);
      toast.success('Successfully cleared all answers for this question');
    } catch (error) {
      console.error('Error clearing answers:', error);
      toast.error('Failed to clear answers. Please try again.');
    }
  };

  const handleRetry = () => {
    setCorrectAnswer('init');
    setUserAnswer(null);
    setIsModalOpen(false);
    resetStopwatch();
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="font-satoshi flex flex-col gap-y-4"
        onSubmit={form.handleSubmit(handleAnswerQuestion)}
      >
        <div className="flex flex-col gap-y-2">
          {question.answers.map((answer) => (
            <FormField
              control={form.control}
              name="answer"
              key={answer.uid}
              render={({ field }) => (
                <FormControl>
                  <QuestionCard answer={answer} field={field} />
                </FormControl>
              )}
            />
          ))}
        </div>
        <Button type="submit" disabled={!form.formState.isDirty}>
          Submit Answer
        </Button>
        {userData.userLevel === 'ADMIN' && (
          <Button type="button" variant="secondary" onClick={adminClearAnswers}>
            (ADMIN ONLY) clear today&apos;s answer
          </Button>
        )}
        {newUserData != null && (
          <AnswerQuestionModal
            question={question}
            user={newUserData}
            correct={correctAnswer}
            userAnswer={userAnswer || ({} as Answer)}
            isOpen={isModalOpen}
            onOpenChange={setIsModalOpen}
            onRetry={handleRetry}
            onNext={onNext}
          />
        )}
      </form>
    </Form>
  );
}
