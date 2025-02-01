import Chip from '@/components/ui/chip'
import DashboardQuestionCard from './dashboard-question-card'
import { ArrowRight } from 'lucide-react'

const questions = [
  {
    label: 'spread-operator',
    name: 'What does the spread operator do?',
    correct: false,
  },
  {
    label: 'equality-operators',
    name: "What's the difference between '==' and '==='?",
    correct: true,
  },
  {
    label: 'code-analysis',
    name: 'What will be the outcome of the following JavaScript snippet?',
    correct: false,
  },
  {
    label: 'data-structures',
    name: 'What are the differences objects and arrays?',
    correct: true,
  },
  {
    label: 'array-methods',
    name: 'What is the difference between .map and .forEach?',
    correct: false,
  },
  {
    label: 'component-lifecycle',
    name: 'Explain component lifecycle',
    correct: true,
  },
]

// Triple the questions to ensure smooth infinite scroll
const allQuestions = [...questions, ...questions, ...questions]

export default function AllQuestionsDashboardBentoBox() {
  return (
    <section className="flex flex-col gap-y-5 group p-4 relative overflow-hidden h-[350px] lg:h-fit">
      <div className="space-y-3 z-10 relative">
        <Chip
          color="bg-white"
          text="Questions"
          textColor="text-black"
          border="border-black-50"
        />
        <h6 className="text-lg lg:text-xl flex items-center">
          View all Questions
          <ArrowRight className="size-4 inline-block ml-1 group-hover:ml-2 duration-300" />
        </h6>
      </div>

      <div className="relative overflow-hidden mt-3 md:h-64 xl:h-[20rem]">
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#000] to-transparent z-10" />

        {/* Scrolling content */}
        <div
          className="animate-scroll hover:pause-animation relative z-0"
          style={
            { '--question-count': questions.length } as React.CSSProperties
          }
        >
          {allQuestions.map((question, index) => (
            <DashboardQuestionCard
              key={`${question.label}-${index}`}
              question={question}
            />
          ))}
        </div>

        {/* Bottom fade effect */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#000] to-transparent z-10" />
      </div>
    </section>
  )
}
