'use client';
import { useState, forwardRef, useImperativeHandle } from 'react';

// components
import { Form, FormControl, FormField } from '@/components/ui/form';
import AnswerQuestionModal from '@/components/app/questions/single/answer-question-modal';
import LoadingSpinner from '@/components/ui/loading';
import { toast } from 'sonner';
import { cn } from '@/utils/cn';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import CodeDisplay from '@/components/app/questions/single/code-snippet';

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

type SchemaProps = z.infer<typeof answerQuestionSchema>;
type AnswerQuestionFormProps = {
  userData: UserRecord;
  question: Question;
  time: number;
  stopwatchPause: () => void;
  resetStopwatch: () => void;
  onNext?: () => void;
  nextQuestion?: string;
  isRoadmapQuestion?: boolean;
};

const AnswerQuestionForm = forwardRef(function AnswerQuestionForm(
  {
    userData,
    question,
    time,
    stopwatchPause,
    nextQuestion,
    resetStopwatch,
  }: AnswerQuestionFormProps,
  ref: React.Ref<{ submitForm: () => void }>
) {
  const [correctAnswer, setCorrectAnswer] = useState<
    'init' | 'incorrect' | 'correct'
  >('init');
  const [userAnswer, setUserAnswer] = useState<Answer | null>(null);
  const [newUserData, setNewUserData] = useState<UserRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SchemaProps>({
    resolver: zodResolver(answerQuestionSchema),
    defaultValues: {
      answer: '',
    },
  });

  // Expose the `submitForm` method to the parent via ref
  useImperativeHandle(ref, () => ({
    submitForm: () => {
      form.handleSubmit(async (values) => {
        console.log('Submitting form with values:', values);
        await handleAnswerQuestion(values);
      })();
    },
    resetForm: () => {
      form.reset();
    },
  }));

  const handleAnswerQuestion = async (values: SchemaProps) => {
    if (!userData) {
      console.error('User is not logged in');
      return;
    }

    // Disable multiple submissions and show loading state
    if (isSubmitting) return;
    setIsSubmitting(true);

    stopwatchPause();

    try {
      const opts: {
        questionUid: string;
        answerUid: string;
        userUid: string;
        timeTaken?: number;
      } = {
        questionUid: question?.uid,
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
    } finally {
      // Always reset submitting state
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    // reset the form
    form.reset();

    // reset the stopwatch
    stopwatchPause();
    resetStopwatch();
    setCorrectAnswer('init');
    setUserAnswer(null);
    setIsModalOpen(false);
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form
        className="font-inter flex flex-col relative"
        onSubmit={form.handleSubmit(handleAnswerQuestion)}
      >
        {/* Loading overlay */}
        {isSubmitting && (
          <div className="h-[25rem] absolute flex justify-center items-center w-full z-50">
            <div className="gap-y-3 flex flex-col items-center">
              <LoadingSpinner />
              <p className="text-sm">Submitting</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-12 gap-4 p-4 pt-0">
          {question?.answers?.map((answer) => (
            <div key={answer.uid} className="col-span-full">
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormControl>
                    <Label
                      htmlFor={answer.uid}
                      className={cn(
                        'px-4 rounded-lg min-h-16 w-full h-full flex items-center gap-x-2 cursor-pointer transition-colors border border-black-50',
                        field.value === answer.uid
                          ? 'bg-black-25'
                          : 'bg-black hover:border-accent',
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      )}
                      onClick={() =>
                        !isSubmitting && field.onChange(answer.uid)
                      }
                    >
                      <input
                        type="radio"
                        id={answer.uid}
                        className="hidden"
                        name="answer"
                        value={answer.uid}
                        checked={field.value === answer.uid}
                        onChange={() => {}}
                        disabled={isSubmitting}
                      />
                      <div
                        className={cn(
                          'size-5 rounded-md border border-black-50 flex items-center justify-center flex-shrink-0',
                          field.value === answer.uid
                            ? 'bg-accent text-white'
                            : '',
                          isSubmitting ? 'opacity-50' : ''
                        )}
                      >
                        {field.value === answer.uid && (
                          <Check className="size-3 flex-shrink-0" />
                        )}
                      </div>
                      {/<pre><code/.test(answer.answer) ? (
                        <CodeDisplay
                          content={answer.answer}
                          language="javascript"
                          hideIndex={true}
                          backgroundColor="transparent"
                        />
                      ) : (
                        <p
                          className="text-sm"
                          dangerouslySetInnerHTML={{ __html: answer.answer }}
                        />
                      )}
                    </Label>
                  </FormControl>
                )}
              />
            </div>
          ))}
        </div>
        {newUserData != null && (
          <AnswerQuestionModal
            user={newUserData}
            correct={correctAnswer}
            userAnswer={userAnswer || ({} as Answer)}
            isOpen={isModalOpen}
            onOpenChange={setIsModalOpen}
            onRetry={handleRetry}
            nextQuestion={nextQuestion}
            isDailyQuestion={question?.dailyQuestion || false}
          />
        )}
      </form>
    </Form>
  );
});

export default AnswerQuestionForm;
