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
      <div className="text-center flex flex-col gap-y-2 items-center">
        <div className="group w-fit relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Questions & Answers
          </span>
        </div>
        <h1 className="text-2xl lg:text-4xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
          Frequently asked questions
        </h1>
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
