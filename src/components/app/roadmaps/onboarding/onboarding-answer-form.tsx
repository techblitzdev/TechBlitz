'use client';
import { useState, forwardRef, useImperativeHandle } from 'react';
// components
import { Form, FormControl, FormField } from '@/components/ui/form';
import QuestionAccordion from '@/components/app/questions/single/question-accordion';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Check } from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading';

// zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { answerQuestionSchema } from '@/lib/zod/schemas/answer-question-schema';

// types
import type { UserRecord } from '@/types/User';
import { DefaultRoadmapQuestions, RoadmapUserQuestions } from '@/types/Roadmap';

import { cn } from '@/lib/utils';
import { answerDefaultRoadmapQuestion } from '@/actions/roadmap/questions/default/answer-roadmap-question';
import AnswerSubmittedForm from '../answer-submitted-form';
import CodeDisplay from '../../questions/single/layout/code-snippet';

type SchemaProps = z.infer<typeof answerQuestionSchema>;
type AnswerQuestionFormProps = {
  userData: UserRecord;
  question: DefaultRoadmapQuestions | RoadmapUserQuestions;
  roadmapUid: string;
};

const OnboardingRoadmapAnswerQuestionForm = forwardRef(
  function AnswerQuestionForm(
    { userData, question, roadmapUid }: AnswerQuestionFormProps,
    ref: React.Ref<{ submitForm: () => void }>
  ) {
    const [loading, setLoading] = useState(false);
    const [newUserData, setNewUserData] = useState<{
      correct: boolean;
      message?: string;
    } | null>(null);
    const [nextQuestionIndex, setNextQuestionIndex] = useState<number | null>(
      null
    );

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

        const answer = await answerDefaultRoadmapQuestion(opts);

        // Set user data to show correct/incorrect state
        setNewUserData({
          correct: answer.correctAnswer || false,
        });

        // Set next question index or null if last question
        setNextQuestionIndex(
          answer.isLastQuestion ? null : (answer?.currentQuestionIndex || 0) + 1
        );
      } catch (error) {
        console.error('Error submitting answer:', error);
        toast.error('Error submitting answer');
      }

      setLoading(false);
    };

    return (
      <Form {...form}>
        <form
          className="flex flex-col relative"
          onSubmit={form.handleSubmit(handleAnswerQuestion)}
        >
          {loading && (
            <div className="h-[25rem] absolute flex justify-center items-center w-full z-50">
              <div className="gap-y-3 flex flex-col items-center">
                <LoadingSpinner />
                <p className="text-sm">Submitting</p>
              </div>
            </div>
          )}

          {newUserData && !loading ? (
            <AnswerSubmittedForm
              key={question.uid}
              newUserData={newUserData}
              nextQuestionIndex={nextQuestionIndex}
              roadmapUid={roadmapUid}
            />
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
                              'size-5 rounded-md border border-black-50 flex items-center justify-center flex-shrink-0',
                              field.value === answer.uid
                                ? 'bg-accent text-white'
                                : ''
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
                              hideIndex
                              backgroundColor="transparent"
                            />
                          ) : (
                            <p
                              className="text-sm"
                              dangerouslySetInnerHTML={{
                                __html: answer.answer,
                              }}
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
            {question.hint && (
              <QuestionAccordion hint={question.hint} showHint={showHint} />
            )}
          </div>
        </form>
      </Form>
    );
  }
);

export default OnboardingRoadmapAnswerQuestionForm;
