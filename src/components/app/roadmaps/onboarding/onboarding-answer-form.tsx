'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';

import { Form, FormControl, FormField } from '@/components/ui/form';
import LoadingSpinner from '@/components/ui/loading';
import { cn } from '@/lib/utils';
import { answerQuestionSchema } from '@/lib/zod/schemas/answer-question-schema';
import AnswerSubmittedForm from '../answer-submitted-form';
import { useRoadmapOnboardingContext } from './roadmap-onboarding-context';
import AnswerOption from './onboarding-answer-option';

type SchemaProps = z.infer<typeof answerQuestionSchema>;

export default function OnboardingRoadmapAnswerQuestionForm() {
  const { question, roadmapUid, loading, newUserData, nextQuestionIndex } =
    useRoadmapOnboardingContext();

  const form = useForm<SchemaProps>({
    resolver: zodResolver(answerQuestionSchema),
    defaultValues: { answer: '' },
  });

  if (newUserData && !loading) {
    return (
      <AnswerSubmittedForm
        key={question.uid}
        newUserData={newUserData}
        nextQuestionIndex={nextQuestionIndex}
        roadmapUid={roadmapUid}
      />
    );
  }

  return (
    <Form {...form}>
      <form className="flex flex-col relative">
        {loading && (
          <div className="h-[25rem] absolute flex justify-center items-center w-full z-50">
            <div className="gap-y-3 flex flex-col items-center">
              <LoadingSpinner />
              <p className="text-sm">Submitting</p>
            </div>
          </div>
        )}

        <p className="text-sm text-gray-400 font-light font-onest mt-3">
          Choose an option below
        </p>

        <div
          className={cn(
            'grid grid-cols-12 gap-4 pt-2',
            loading ? 'opacity-10 pointer-events-none' : ''
          )}
        >
          {question?.answers?.map((answer) => (
            <div key={answer.uid} className="col-span-full">
              <FormField
                name="answer"
                render={({ field }) => (
                  <FormControl>
                    <AnswerOption answer={answer} field={field} />
                  </FormControl>
                )}
              />
            </div>
          ))}
        </div>
      </form>
    </Form>
  );
}
