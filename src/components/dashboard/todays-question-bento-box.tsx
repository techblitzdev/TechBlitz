import { Question } from '@/types/Questions';

export default function TodaysQuestionBentoBox(opts: { question: Question }) {
  const { question } = opts;

  // get the question tags from the question
  //const tags = question?.tags.map((tag) => tag.tag.name);

  return <div className="h-full">{JSON.stringify(question)}</div>;
}
