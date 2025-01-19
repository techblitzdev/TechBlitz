import { Question } from '@/types/Questions';

// markdown to render the question description
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function CodingChallengeDescription(opts: {
  question: Question;
}) {
  const { question } = opts;

  return (
    <div className="p-4 flex flex-col gap-6">
      <h3 className="font-onest font-light text-base md:text-2xl">
        {question.question}
      </h3>
      <div className="prose prose-sm prose-invert">
        <span className="underline">Description</span>
        <Markdown remarkPlugins={[remarkGfm]} className="whitespace-pre-wrap">
          {question.description}
        </Markdown>
      </div>
    </div>
  );
}
