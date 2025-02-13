import { getQuestionsByTag } from '@/utils/data/questions/get-questions-by-tag';
import QuestionCard from '../app/questions/layout/question-card';
import { QuestionDifficulty } from '@/types/Questions';

export default async function MdxQuestionDisplay(opts: {
  tag: string;
  take: number;
  difficulty?: QuestionDifficulty;
}) {
  const { tag, take, difficulty } = opts;

  const question = await getQuestionsByTag(tag, difficulty, take);

  const questions = question.flatMap((q) => q.questions.map((question) => question.question));

  return (
    <section className="flex flex-col gap-y-4">
      {questions.map((question) => (
        <QuestionCard key={question.uid} questionData={question} identifier="slug" user={null} />
      ))}
    </section>
  );
}
