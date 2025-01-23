import { getQuestionsByTag } from '@/utils/data/questions/get-questions-by-tag';
import QuestionCard from '../app/questions/layout/question-card';

export default async function MdxQuestionDisplay(opts: {
  tag: string;
  take: number;
}) {
  const { tag, take } = opts;

  const question = await getQuestionsByTag(tag, undefined, take);

  const questions = question.flatMap((q) =>
    q.questions.map((question) => question.question)
  );

  return (
    <section className="flex flex-col gap-y-4">
      {questions.map((question) => (
        <QuestionCard
          key={question.uid}
          questionData={question}
          identifier="slug"
          user={null}
        />
      ))}
    </section>
  );
}
