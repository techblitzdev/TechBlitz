import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Lightbulb } from 'lucide-react';
import { useQuestionSingle } from './layout/question-single-context';

export default function QuestionHintAccordion(opts: { hint: string }) {
  const { showHint } = useQuestionSingle();

  const { hint } = opts;
  if (!hint) return null;

  return (
    <Accordion type="single" collapsible value={showHint ? hint : ''}>
      <AccordionItem
        value={hint}
        className="border-black-50 duration-300 w-full"
      >
        <AccordionTrigger className="text-sm duration-300">
          <div className="flex items-center gap-x-1">
            <Lightbulb className="size-4" />
            <p>Hint</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-4">{hint}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
