'use client';
// zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { answerQuestionSchema } from '@/lib/zod/schemas/answer-question-schema';

import { UserRecord } from '@/types/User';

import { forwardRef, useImperativeHandle, useState } from 'react';
import { Form, FormControl, FormField } from '@/components/ui/form';
import {
  RoadmapUserQuestions,
  RoadmapUserQuestionsAnswers,
} from '@/types/Roadmap';
import { answerRoadmapQuestion } from '@/actions/roadmap/questions/answer-roadmap-question';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Check, CheckCircle2Icon, XCircleIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import QuestionHintAccordion from '@/components/app/questions/single/question-hint';
import LoadingSpinner from '@/components/ui/loading';
import { Button } from '@/components/ui/button';
import CodeDisplay from '../../questions/single/layout/code-snippet';

type SchemaProps = z.infer<typeof answerQuestionSchema>;

type AnswerQuestionFormProps = {
  userData: UserRecord;
  question: RoadmapUserQuestions;
  roadmapUid: string;
};

const RoadmapAnswerQuestionForm = forwardRef(function RoadmapAnswerQuestionForm(
  { userData, question, roadmapUid }: AnswerQuestionFormProps,
  ref: React.Ref<{ submitForm: () => void }>
) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [nextQuestion, setNextQuestion] = useState<Omit<
    RoadmapUserQuestions,
    'answers'
  > | null>();
  const [newUserData, setNewUserData] = useState<Omit<
    RoadmapUserQuestionsAnswers,
    'answers'
  > | null>(null);
  const [redirecting, setRedirecting] = useState(false);

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

    setLoading(true);
    try {
      const opts: any = {
        questionUid: question?.uid,
        answerUid: values.answer,
        roadmapUid,
        userUid: userData.uid,
        currentQuestionIndex: question?.order,
      };

      // there is a chance nothing get's returned as we perform a redirect
      // if this is the last question to answer
      const { userAnswer, nextQuestion } = await answerRoadmapQuestion(opts);

      setNewUserData(userAnswer);
      setNextQuestion(nextQuestion);
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast.error('Error submitting answer');
    }
    setLoading(false);
  };

  const handleNextQuestion = () => {
    if (redirecting) return;
    setRedirecting(true);
    // if there is no next question, redirect to the roadmap page
    // TODO: show a completion message
    if (!nextQuestion) {
      router.push(`/roadmap/${roadmapUid}`);
      return;
    }

    // redirect to the page
    router.push(`/roadmap/${roadmapUid}/${nextQuestion?.uid}`);

    setRedirecting(false);
  };

  const handleRetry = () => {
    form.reset();
    setNewUserData(null);
  };

  return (
    <Form {...form}>
      <form
        className="font-satoshi flex flex-col relative"
        onSubmit={form.handleSubmit(handleAnswerQuestion)}
      >
        {loading && (
          <div className="h-[25rem] absolute flex justify-center items-center w-full">
            <div className="gap-y-3 flex flex-col items-center">
              <LoadingSpinner />
              <p className="text-sm">Submitting</p>
            </div>
          </div>
        )}

        {newUserData && !loading ? (
          <div className="flex flex-col items-center justify-center h-[25rem] p-6 text-center">
            <div className="bg-black-25 border border-black-50 rounded-xl p-8 shadow-lg text-center max-w-md w-full">
              {newUserData?.correct ? (
                <div className="flex flex-col gap-y-4 items-center">
                  <CheckCircle2Icon className="mx-auto text-green-500 size-16" />
                  <h3 className="text-2xl font-semibold text-green-600">
                    Correct!
                  </h3>
                  <p className="text-sm">
                    Great job! You've answered the question correctly.
                  </p>

                  <div className="flex items-center gap-x-3">
                    <Button href="/dashboard" variant="secondary">
                      Dashboard
                    </Button>
                    <Button
                      variant="accent"
                      onClick={() => handleNextQuestion()}
                      type="button"
                    >
                      {redirecting ? <LoadingSpinner /> : 'Next Question'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-y-4 items-center">
                  <XCircleIcon className="mx-auto text-red-500 size-16" />
                  <h3 className="text-2xl font-semibold text-red-600">
                    Incorrect
                  </h3>
                  <p className="text-sm">
                    Don't worry, learning is a process. Keep trying!
                  </p>
                  <div className="flex items-center gap-x-3">
                    <Button href="/dashboard" variant="secondary">
                      Dashboard
                    </Button>
                    <Button
                      variant="accent"
                      onClick={() => handleRetry()}
                      type="button"
                    >
                      Retry
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            className={cn(
              'grid grid-cols-12 gap-4 p-4',
              loading ? 'opacity-10 pointer-events-none' : ''
            )}
          >
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
                          'p-4 rounded-xl min-h-20 w-full h-full flex items-center gap-x-2 cursor-pointer transition-colors border border-black-50  hover:border-accent',
                          field.value === answer.uid
                            ? ''
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
                        {/<pre><code/.test(answer.answer) ? (
                          <CodeDisplay
                            content={answer.answer}
                            language="javascript"
                            hideIndex
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
        )}
        <Separator className="bg-black-50" />
        <div className="w-full space-y-4 px-4">
          {question.hint && <QuestionHintAccordion hint={question.hint} />}
        </div>
      </form>
    </Form>
  );
});

export default RoadmapAnswerQuestionForm;
