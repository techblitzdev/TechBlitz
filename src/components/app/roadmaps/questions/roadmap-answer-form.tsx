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
import LoadingSpinner from '@/components/ui/loading';
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

        <p className="text-sm text-gray-400 font-light font-onest mt-3">
          Choose an option below
        </p>
        <div className="grid grid-cols-12 gap-4 pt-2">
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
                        'px-2 lg:px-4 lg:py-2 rounded-lg min-h-16 w-full h-full flex items-center gap-x-2 cursor-pointer transition-colors border border-black-50',
                        field.value === answer.uid
                          ? 'bg-black-25'
                          : 'bg-black hover:border-accent'
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
      </form>
    </Form>
  );
});

export default RoadmapAnswerQuestionForm;
