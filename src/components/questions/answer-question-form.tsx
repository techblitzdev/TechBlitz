import { useState } from 'react';
// components
import { Form, FormControl, FormField } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import AnswerQuestionModal from '@/components/questions/answer-question-modal';
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
  uid: string;
  question: Question;
  onNext?: () => void;
};

export default function AnswerQuestionForm({
  userData,
  uid,
  question,
  onNext,
}: AnswerQuestionFormProps) {
  const [correctAnswer, setCorrectAnswer] = useState<
    'init' | 'incorrect' | 'correct'
  >('init');
  const [userAnswer, setUserAnswer] = useState<Answer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    try {
      const { correctAnswer, userAnswer } = await answerQuestion({
        questionUid: uid,
        answerUid: values.answer,
        userUid: userData.uid,
      });

      setCorrectAnswer(correctAnswer ? 'correct' : 'incorrect');
      setUserAnswer(userAnswer);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error submitting answer:', error);
      // Handle error appropriately
    }
  };

  const handleRetry = () => {
    setCorrectAnswer('init');
    setUserAnswer(null);
    setIsModalOpen(false);
    form.reset();
  };

  return (
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
                      onChange={() => field.onChange(answer.uid)}
                    />
                    <span>{answer.answer}</span>
                  </label>
                </FormControl>
              )}
            />
          ))}
        </div>

        <Button type="submit" disabled={!form.formState.isDirty}>
          Submit Answer
        </Button>

        <AnswerQuestionModal
          question={question}
          user={userData}
          correct={correctAnswer}
          userAnswer={userAnswer || ({} as Answer)}
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          onRetry={handleRetry}
          onNext={onNext}
        />
      </form>
    </Form>
  );
}
