import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import AnimatedSpan from '@/components/ui/animated-span'

interface FAQ {
  question: string
  answer: string | React.ReactNode
}

export default function FAQsBlock(opts: {
  faqs: FAQ[]
  title?: string
  description?: string
  showSpan?: boolean
}) {
  const { faqs, title, description, showSpan = true } = opts

  return (
    <section className="pb-32 flex flex-col items-center gap-10">
      <div className="text-center flex flex-col gap-y-2 items-center">
        {showSpan && <AnimatedSpan content="Frequently asked questions" />}
        <h1 className="text-2xl lg:text-4xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
          {title || 'Frequently asked questions'}
        </h1>
        {description && <p className="text-sm text-gray-400">{description}</p>}
      </div>
      <Accordion
        type="single"
        collapsible
        className="text-start max-w-3xl w-[85%] lg:w-full"
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
  )
}
