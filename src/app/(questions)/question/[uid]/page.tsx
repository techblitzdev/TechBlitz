'use client';
import { useState } from 'react';
import { getQuestion } from '@/actions/questions/get';
import { answerQuestion } from '@/actions/answers/answer';
import { useQuery } from '@tanstack/react-query';

// components
import { Button } from '@/components/ui/button';

export default function TodaysQuestionPage({
  params,
}: {
  params: {
    uid: string;
  };
}) {
  const { uid } = params;
  // State to store the selected answer UID
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Fetch the question data
  const {
    data: question,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['question', uid],
    queryFn: async () => {
      const data = await getQuestion(uid);
      return data;
    },
  });

  if (!question) return <p>Loading...</p>;

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // Handle answer selection
  const handleSelectAnswer = (answerUid: string) => {
    setSelectedAnswer(answerUid);
  };

  // Handle form submission
  const handleAnswerQuestion = async () => {
    if (!selectedAnswer) {
      alert('Please select an answer.');
      return;
    }

    const isCorrect = await answerQuestion({
      questionUid: uid,
      answerUid: selectedAnswer,
    });

    console.log({
      isCorrect,
    });
  };

  return (
    <form
      className="font-inter flex flex-col gap-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleAnswerQuestion();
      }}
    >
      {/** Question title */}
      <h1 className="font-semibold font-inter text-3xl">
        {question?.question}
      </h1>

      {/** List of answers */}
      <div className="flex flex-col gap-y-2">
        {question?.answers.map((answer) => (
          <div key={answer.uid} className="flex items-center gap-x-2">
            <input
              type="radio"
              name="answer"
              value={answer.uid}
              checked={selectedAnswer === answer.uid}
              onChange={() => handleSelectAnswer(answer.uid)}
            />
            <span>{answer.answer}</span>
          </div>
        ))}
      </div>

      {/** Submit button */}
      <Button type="submit" variant="default">
        Submit
      </Button>
    </form>
  );
}
