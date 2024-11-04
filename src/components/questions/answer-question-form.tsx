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
import { Label } from '../ui/label';
import { cn } from '@/utils/cn';
import { ArrowRight, Check } from 'lucide-react';
import LoadingSpinner from '../ui/loading';

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
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);

    stopwatchPause();

    try {
      const opts: any = {
        questionUid: uid,
        answerUid: values.answer,
        userUid: userData.uid,
      };

      if (time) {
        opts.timeTaken = time;
      }

      const {
        correctAnswer,
        userAnswer,
        userData: newUserData,
      } = await answerQuestion(opts);

      setCorrectAnswer(correctAnswer ? 'correct' : 'incorrect');
      setUserAnswer(userAnswer);
      setNewUserData(newUserData);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast.error('Error submitting answer');
    }

    setIsLoading(false);
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
        className="font-satoshi flex flex-col gap-8"
        onSubmit={form.handleSubmit(handleAnswerQuestion)}
      >
        <div className="grid grid-cols-12 gap-8 mt-6">
          {question.answers.map((answer) => (
            <div key={answer.uid} className="col-span-full lg:col-span-6">
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormControl>
                    <Label
                      htmlFor={answer.uid}
                      className={cn(
                        'p-4 rounded-xl min-h-20 w-full flex items-center gap-x-2 cursor-pointer transition-colors',
                        field.value === answer.uid
                          ? 'bg-white text-black hover:bg-white/90'
                          : 'bg-black hover:bg-gray-900'
                      )}
                      onClick={() => field.onChange(answer.uid)}
                    >
                      <input
                        type="radio"
                        id={answer.uid}
                        className="hidden"
                        name="answer"
                        value={answer.uid}
                        checked={field.value === answer.uid}
                        onChange={() => {}}
                      />
                      <div
                        className={cn(
                          'h-5 w-5 rounded-md border border-black-50 flex items-center justify-center flex-shrink-0', // Fixed size and prevent shrinking
                          field.value === answer.uid
                            ? 'bg-black text-white'
                            : ''
                        )}
                      >
                        {field.value === answer.uid && (
                          <Check className="h-3 w-3 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-base">{answer.answer}</p>
                    </Label>
                  </FormControl>
                )}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Button
            type="submit"
            size="lg"
            variant="secondary"
            disabled={!form.formState.isDirty}
          >
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <div className="flex items-center gap-x-1">
                Submit
                <ArrowRight className="size-3" />
              </div>
            )}
          </Button>
          {userData.userLevel === 'ADMIN' && (
            <Button
              size="lg"
              type="button"
              variant="default"
              onClick={adminClearAnswers}
            >
              (ADMIN ONLY) clear today&apos;s answer
            </Button>
          )}
        </div>
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
