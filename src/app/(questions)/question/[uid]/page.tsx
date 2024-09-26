'use client';

import { useQuery } from '@tanstack/react-query';
import { getQuestion } from '@/actions/questions/get';
import { answerQuestion } from '@/actions/answers/answer';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import LoadingSpinner from '@/components/ui/loading';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { answerQuestionSchema } from '@/lib/zod/schemas/answer-question-schema';
import { z } from 'zod';
import { useUser } from '@/hooks/useUser';

type SchemaProps = z.infer<typeof answerQuestionSchema>;

export default function TodaysQuestionPage({
  params,
}: {
  params: { uid: string };
}) {
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useUser();
  const { uid } = params;

  const {
    data: question,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['question', uid],
    queryFn: () => getQuestion(uid),
  });

  const form = useForm<SchemaProps>({
    resolver: zodResolver(answerQuestionSchema),
    defaultValues: {
      answer: '',
    },
  });

  const handleAnswerQuestion = async (values: SchemaProps) => {
    if (!userData?.user) {
      console.error('User is not logged in');
      return;
    }
    const isCorrect = await answerQuestion({
      questionUid: uid,
      answerUid: values.answer,
      userId: userData.user.id,
    });

    console.log({
      isCorrect,
    });
  };

  if (userLoading || isPending || !question) {
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (userError) {
    return <span>Error loading user: {userError.message}</span>;
  }

  if (isError) {
    return <span>Error loading question: {error.message}</span>;
  }

  return (
    <Form {...form}>
      <form
        className="font-inter flex flex-col gap-y-4"
        onSubmit={form.handleSubmit(handleAnswerQuestion)}
      >
        <h1 className="font-semibold font-inter text-3xl">
          {question.question}
        </h1>
        <div className="flex flex-col gap-y-2">
          {question.answers.map((answer) => (
            <FormField
              control={form.control}
              name="answer"
              key={answer.uid}
              render={({ field }) => (
                <FormControl>
                  <label className="flex items-center gap-x-2">
                    <input
                      {...field}
                      type="radio"
                      name="answer"
                      value={answer.uid}
                      checked={field.value === answer.uid}
                      onChange={() => {
                        field.onChange(answer.uid);
                      }}
                    />
                    <span>{answer.answer}</span>
                  </label>
                </FormControl>
              )}
            />
          ))}
        </div>
        <Button type="submit" variant="default">
          Submit
        </Button>
      </form>
    </Form>
  );
}
