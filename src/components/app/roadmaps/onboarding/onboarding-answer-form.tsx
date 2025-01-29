'use client';
// components
import { Form, FormControl, FormField } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading';

// zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { answerQuestionSchema } from '@/lib/zod/schemas/answer-question-schema';

import { cn } from '@/lib/utils';
import AnswerSubmittedForm from '../answer-submitted-form';
import CodeDisplay from '../../questions/single/layout/code-snippet';
import { useRoadmapOnboardingContext } from './roadmap-onboarding-context';

type SchemaProps = z.infer<typeof answerQuestionSchema>;

export default function OnboardingRoadmapAnswerQuestionForm() {
  const {
    question,
    roadmapUid,
    answerRoadmapOnboardingQuestion,
    loading,
    newUserData,
    nextQuestionIndex,
  } = useRoadmapOnboardingContext();

  const form = useForm<SchemaProps>({
    resolver: zodResolver(answerQuestionSchema),
    defaultValues: {
      answer: '',
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col relative"
        onSubmit={form.handleSubmit(answerRoadmapOnboardingQuestion)}
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
      </form>
    </Form>
  );
}
