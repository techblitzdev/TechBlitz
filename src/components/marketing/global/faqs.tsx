import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function FAQsBlock() {
  return (
    <section className="pb-32 grid grid-cols-12 gap-10">
      <div className="col-span-4 text-start flex flex-col gap-y-2">
        <h3 className="text-xl lg:text-3xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
          A collection of frequently asked questions.
        </h3>
        <p className="text-gray-400"></p>
        <Button
          href="/faqs"
          variant="accent"
        >
          View all FAQs
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
      <Accordion
        type="single"
        collapsible
        className="col-span-8 text-start"
      >
        <AccordionItem value="What is techblitz?">
          <AccordionTrigger className="text-lg duration-300">
            What is techblitz?
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            techblitz is a software development company that specializes in
            creating software solutions for businesses.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="How do I get started?">
          <AccordionTrigger className="text-lg duration-300">
            How do I get started?
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            You can get started by signing up for an account on our website.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="What are the benefits of using techblitz?">
          <AccordionTrigger className="text-lg duration-300">
            What are the benefits of using techblitz?
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            There are many benefits to using techblitz, including increased
            productivity and efficiency.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
