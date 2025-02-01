import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { useQuestionSingle } from './layout/question-single-context';

// markdown to render the hint
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { use } from 'react';
import { ListBulletIcon } from '@radix-ui/react-icons';

export default function QuestionAccordion(opts: {
  hint: string;
  showHint: boolean;
  showRelatedQuestions: boolean;
}) {
  const { relatedQuestions } = useQuestionSingle();

  const { hint, showHint, showRelatedQuestions = true } = opts;
  if (!hint) return null;

  const relatedQuestionsData = relatedQuestions ? use(relatedQuestions) : null;

  return (
    <Accordion
      type="single"
      collapsible
      value={showHint ? 'hint' : undefined}
      className="divide-y divide-black-50"
    >
      <AccordionItem value="hint" className="border-black-50 duration-300 w-full px-4">
        <AccordionTrigger className="text-sm duration-300">
          <div className="flex items-center gap-x-1">
            <Lightbulb className="size-4" />
            <p>Hint</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-4 px-4">
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              ul: ({ children }) => {
                return <ul className="list-disc px-4 flex flex-col gap-3">{children}</ul>;
              },
              ol: ({ children }) => {
                return <ol className="list-decimal px-4 flex flex-col gap-3">{children}</ol>;
              },
            }}
          >
            {hint}
          </Markdown>
        </AccordionContent>
      </AccordionItem>
      {showRelatedQuestions && (
        <AccordionItem value="related-questions">
          <AccordionTrigger className="text-sm duration-300 px-4">
            <div className="flex items-center gap-x-1">
              <ListBulletIcon className="size-4" />
              <p>Related Questions</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 px-2">
            <div className="flex flex-col gap-y-2">
              {relatedQuestionsData && relatedQuestionsData.length > 0 ? (
                relatedQuestionsData.map((question) => (
                  <Link
                    href={`/question/${question.slug}`}
                    key={question.slug}
                    className="w-full flex items-center justify-between duration-300 hover:underline gap-3"
                  >
                    <p className="line-clamp-1">{question.title || question.question}</p>
                    <ArrowRight className="size-4 flex-shrink-0" />
                  </Link>
                ))
              ) : (
                <p className="text-sm text-gray-400">No related questions found</p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
}
