import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion';

interface FAQ {
  question: string;
  answer: string | React.ReactNode;
}

export default function FAQsBlock(opts: { faqs: FAQ[] }) {
  const { faqs } = opts;

  return (
    <section className="pb-32 flex flex-col items-center gap-10">
      <div className="text-center flex flex-col gap-y-2">
        <h2 className="text-2xl lg:text-4xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
          Frequently asked questions
        </h2>
      </div>
      <Accordion
        type="single"
        collapsible
        className="text-start max-w-3xl w-full"
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={faq.question}
            className="border-b border-black-50"
          >
            <AccordionTrigger className="text-xl duration-300">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              {typeof faq.answer === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
              ) : (
                <div>{faq.answer}</div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
