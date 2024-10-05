'use client';
import { useState } from 'react';
import { answerQuestion } from '@/actions/answers/answer';
// components
import { Form, FormControl, FormField } from '@/components/ui/form';
// zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { answerQuestionSchema } from '@/lib/zod/schemas/answer-question-schema';
// types
import type { Question } from '@/types/Questions';
import type { User } from '@supabase/supabase-js';
import AnswerQuestionModal from './answer-question-modal';
import { Answer } from '@/types/Answers';

type SchemaProps = z.infer<typeof answerQuestionSchema>;
type AnswerQuestionFormProps = {
  userData: User;
  uid: string;
  question: Question;
};

export default function AnswerQuestionForm({
  userData,
  uid,
  question,
}: AnswerQuestionFormProps) {
  const [correctAnswer, setCorrectAnswer] = useState<
    'init' | 'incorrect' | 'correct'
  >('init');
  const [userAnswer, setUserAnswer] = useState<Answer | null>(null);

  /** FORM */
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
    const { correctAnswer, userAnswer } = await answerQuestion({
      questionUid: uid,
      answerUid: values.answer,
      userUid: userData.id,
    });

    setCorrectAnswer(correctAnswer ? 'correct' : 'incorrect');
    setUserAnswer(userAnswer);
  };

  return (
    <>
      <Form {...form}>
        <form
          className="font-satoshi flex flex-col gap-y-4"
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
          <AnswerQuestionModal
            question={question}
            user={userData}
            correct={correctAnswer}
            userAnswer={userAnswer || ({} as Answer)}
          />
        </form>
      </Form>
    </>
  );
}
