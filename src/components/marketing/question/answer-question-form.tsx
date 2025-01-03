'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { answerQuestionSchema } from '@/lib/zod/schemas/answer-question-schema';

import { forwardRef, useImperativeHandle, useState } from 'react';
import { Form, FormControl, FormField } from '@/components/ui/form';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { cn } from '@/utils/cn';
import { Check, CheckCircle2Icon, XCircleIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import QuestionHintAccordion from '@/components/app/questions/single/question-hint';
import LoadingSpinner from '@/components/ui/loading';
import { answerDailyQuestionDemo } from '@/actions/demo/answer-question-demo';
import { Question } from '@/types/Questions';
import WaitlistSignup from './waitlist-sign-up';
import CodeDisplay from '@/components/app/questions/single/code-snippet';
import BackToDashboard from '@/components/ui/back-to-dashboard';

type SchemaProps = z.infer<typeof answerQuestionSchema>;

type AnswerQuestionFormProps = {
  question: Question;
  seconds: number;
};

const MarketingAnswerForm = forwardRef(function MarketingAnswerForm(
  { question, seconds }: AnswerQuestionFormProps,
  ref: React.Ref<{ submitForm: () => void }>
) {
  const [loading, setLoading] = useState(false);
  const [correct, setCorrect] = useState<boolean | null>(null);

  const form = useForm<SchemaProps>({
    resolver: zodResolver(answerQuestionSchema),
    defaultValues: {
      answer: '',
    },
  });

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      form.handleSubmit(async (values) => {
        console.log('Submitting form with values:', values);
        await handleAnswerQuestion(values);
      })();
    },
  }));

  const handleAnswerQuestion = async (values: SchemaProps) => {
    setLoading(true);
    try {
      const opts = {
        questionUid: question?.uid,
        userAnswerUid: values.answer,
        timeTaken: seconds,
      };

      const correct = await answerDailyQuestionDemo(opts);
      setCorrect(correct);
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast.error('Error submitting answer');
    } finally {
      setLoading(false);
    }
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

        {correct !== null && !loading ? (
          <div className="flex flex-col items-center justify-center h-[25rem] p-6 text-center">
            <div className="bg-black border border-black-50 rounded-xl p-8 shadow-lg text-center max-w-md w-full">
              {correct ? (
                <div className="flex flex-col gap-y-2 relative">
                  <div className="md:absolute">
                    <BackToDashboard href="/" />
                  </div>
                  <div className="flex gap-2 items-center justify-center">
                    <CheckCircle2Icon className="text-green-500 size-6" />
                    <h3 className="text-lg font-semibold text-green-600">
                      Correct!
                    </h3>
                  </div>
                  <WaitlistSignup />
                </div>
              ) : (
                <div className="flex flex-col gap-y-4 relative items-center">
                  <div className="w-full md:absolute md:left-0 md:top-0">
                    <BackToDashboard href="/" />
                  </div>
                  <div className="flex flex-col items-center gap-y-4 w-full max-w-md">
                    <div className="flex gap-x-2 items-center justify-center">
                      <XCircleIcon className="text-red-500 size-6" />
                      <h3 className="text-lg font-semibold text-red-600">
                        Incorrect
                      </h3>
                    </div>
                    <WaitlistSignup />
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
                          'px-4 py-4 rounded-lg min-h-16 w-full h-full flex items-center gap-x-2 cursor-pointer transition-colors border border-black-50',
                          field.value === answer.uid
                            ? 'bg-black-25'
                            : 'bg-black-100 hover:border-accent'
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
                            <Check className="h-3 w-3 flex-shrink-0" />
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
        )}
        <Separator className="bg-black-50" />
        <div className="w-full space-y-4 px-4">
          {question.hint && <QuestionHintAccordion hint={question.hint} />}
        </div>
      </form>
    </Form>
  );
});

export default MarketingAnswerForm;
