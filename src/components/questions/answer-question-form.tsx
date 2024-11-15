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
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { Separator } from '../ui/separator';
import QuestionHintAccordion from './question-hint';

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
        className="font-satoshi flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleAnswerQuestion)}
      >
        <div className="grid grid-cols-12 gap-4 p-4">
          {question.answers.map((answer) => (
            <div key={answer.uid} className="col-span-full">
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormControl>
                    <Label
                      htmlFor={answer.uid}
                      className={cn(
                        'p-4 rounded-xl min-h-20 w-full h-full flex items-center gap-x-2 cursor-pointer transition-colors border border-black-50',
                        field.value === answer.uid
                          ? 'bg-black-50'
                          : 'bg-black hover:bg-black-75'
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
                          'size-5 rounded-md border border-black-50 flex items-center justify-center flex-shrink-0', // Fixed size and prevent shrinking
                          field.value === answer.uid
                            ? 'bg-accent text-white'
                            : ''
                        )}
                      >
                        {field.value === answer.uid && (
                          <Check className="h-3 w-3 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm">{answer.answer}</p>
                    </Label>
                  </FormControl>
                )}
              />
            </div>
          ))}
        </div>
        <Separator className="bg-black-50" />
        <div className="w-full space-y-4 px-4">
          {question.hint && <QuestionHintAccordion hint={question.hint} />}
          {/* <div className="flex items-center gap-4">
            <Button
              type="submit"
              size="lg"
              variant="secondary"
              disabled={!form.formState.isDirty}
              className="w-full"
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
                className="w-full"
              >
                (ADMIN ONLY) clear today&apos;s answer
              </Button>
            )}
          </div> */}
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
