import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function FAQsBlock() {
  return (
    <section className="pb-32 flex flex-col items-center gap-10">
      <div className="text-center flex flex-col gap-y-2">
        <h3 className="text-2xl lg:text-4xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
          Frequently asked questions
        </h3>
      </div>
      <Accordion
        type="single"
        collapsible
        className="text-start max-w-3xl w-full"
      >
        <AccordionItem
          value="What is techblitz?"
          className="border-b border-black-50"
        >
          <AccordionTrigger className="text-lg duration-300">
            What is techblitz?
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            techblitz in a online platform that helps developers of all
            abilities to learn and grow. We offer a range of tools and resources
            to help you become a better developer, including questions,
            roadmaps, tutorials, and more.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="How do I get started?"
          className="border-b border-black-50"
        >
          <AccordionTrigger className="text-lg duration-300">
            Is techblitz open source?
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            Yes! techblitz is open source. You can find our source{' '}
            <Link
              href="https://git.new/blitz"
              target="_blank"
              className="text-accent"
            >
              here
            </Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="Is techblitz free to use?"
          className="border-b border-black-50"
        >
          <AccordionTrigger className="text-lg duration-300">
            Is techblitz free to use?
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            Yes, techblitz is free to use. You can sign up for a free account
            and start using our software right away.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="What are the benefits of using techblitz?"
          className="border-b border-black-50"
        >
          <AccordionTrigger className="text-lg duration-300">
            What are the benefits of using techblitz?
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            We offer short-form questions on
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="What will you be adding to techblitz in the future?"
          className="border-b border-black-50"
        >
          <AccordionTrigger className="text-lg duration-300">
            What will you be adding to techblitz in the future?
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            We are always working on new features and improvements to techblitz.
            You can find our roadmap{' '}
            <Link
              href="/roadmap"
              className="text-accent"
            >
              here.{' '}
            </Link>
            Feel free to reach out to us with any feature requests or
            suggestions you may have.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
