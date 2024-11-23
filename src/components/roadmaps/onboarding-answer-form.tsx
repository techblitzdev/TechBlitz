'use client';
import { useState, forwardRef, useImperativeHandle } from 'react';
// components
import { Form, FormControl, FormField } from '@/components/ui/form';
import QuestionHintAccordion from '../questions/single/question-hint';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';
import { Check } from 'lucide-react';

// zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { answerQuestionSchema } from '@/lib/zod/schemas/answer-question-schema';

// types
import type { UserRecord } from '@/types/User';
import { DefaultRoadmapQuestions } from '@/types/Roadmap';

import { cn } from '@/utils/cn';
import { answerDefaultRoadmapQuestion } from '@/actions/roadmap/questions/default/answer-roadmap-question';
import { useRouter } from 'next/navigation';

type SchemaProps = z.infer<typeof answerQuestionSchema>;
type AnswerQuestionFormProps = {
  userData: UserRecord;
  question: DefaultRoadmapQuestions;
  roadmapUid: string;
};

const RoadmapAnswerQuestionForm = forwardRef(function AnswerQuestionForm(
  { userData, question, roadmapUid }: AnswerQuestionFormProps,
  ref: React.Ref<{ submitForm: () => void }>
) {
  const router = useRouter();

  const [newUserData, setNewUserData] = useState<UserRecord | null>(null);

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
  }));

  const handleAnswerQuestion = async (values: SchemaProps) => {
    if (!userData) {
      console.error('User is not logged in');
      return;
    }

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
      const answer = await answerDefaultRoadmapQuestion(opts);

      if (answer?.isLastQuestion) {
        // redirect to the page
        router.push(`/roadmap/${roadmapUid}`);
        return;
      }

      // redirect to the page
      router.push(
        `/roadmap/${roadmapUid}/onboarding/${answer?.currentQuestionIndex + 1}`
      );

      setNewUserData(newUserData);
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast.error('Error submitting answer');
    }
  };

  return (
    <Form {...form}>
      <form
        className="font-satoshi flex flex-col"
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
        </div>
      </form>
    </Form>
  );
});

export default RoadmapAnswerQuestionForm;
