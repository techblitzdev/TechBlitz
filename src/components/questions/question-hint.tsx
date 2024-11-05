import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AccordionContent } from '@radix-ui/react-accordion';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';

export default function QuestionHintAccordion(opts: { hint: string }) {
  const { hint } = opts;
  if (!hint) return null;

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={hint} className="border-black-50 duration-300">
        <AccordionTrigger className="text-lg">
          <div className="flex items-center gap-x-1">
            <QuestionMarkCircledIcon className="size-5" />
            <p>Hint</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-4">{hint}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
