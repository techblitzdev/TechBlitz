import { getRandomQuestion } from '@/utils/data/questions/get-random';
import { Button } from '@/components/ui/button';
import { ShuffleIcon } from 'lucide-react';
import { redirect } from 'next/navigation';

/**
 * Component for redirecting the user to a random question.
 *
 * @returns
 */
export default async function RandomQuestion(opts: {
  currentQuestionSlug: string;
}) {
  const { currentQuestionSlug } = opts;

  // get random question
  const randomQuestion = await getRandomQuestion({
    currentQuestionSlug,
  });

  return (
    <form
      action={async () => {
        'use server';
        redirect(`/question/${randomQuestion}`); // Fixed - randomQuestion is just the slug string
      }}
    >
      <Button variant="default" size="icon">
        <ShuffleIcon size={16} />
      </Button>
    </form>
  );
}
