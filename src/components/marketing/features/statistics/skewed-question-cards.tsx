import Chip from '@/components/ui/chip'
import { QuestionDifficulty } from '@/types/Questions'
import { getQuestionDifficultyColor } from '@/utils'
import { capitalise } from '@/utils'

interface QuestionCard {
  id: number
  question: string
  difficulty: QuestionDifficulty
}

const questions: QuestionCard[] = [
  {
    id: 1,
    question: 'What is the difference between Array.reduce() and Array.map()?',
    difficulty: 'MEDIUM',
  },
  {
    id: 2,
    question: 'Explain the concept of dynamic programming.',
    difficulty: 'HARD',
  },
  {
    id: 3,
    question: 'What does Object.freeze() do?',
    difficulty: 'EASY',
  },
]

export default function SkewedQuestionCards() {
  return (
    <div className="relative h-[320px] md:h-[215px] w-full max-w-md mx-auto">
      {questions.map((card, index) => (
        <div
          key={card.id}
          className={`top-1/4 absolute inset-0 bg-black-100 border border-black-50 rounded-lg shadow-lg p-6 transition-all duration-300 ease-in-out hover:z-10 hover:scale-105 h-2/3`}
          style={{
            transform: `translateX(${index * -20}px) translateY(${index * -20}px) rotateX(10deg) rotateY(-20deg) skewY(4deg)`,
            zIndex: questions.length - index,
            backdropFilter: 'blur(5px)',
          }}
        >
          <h3 className="text-xl font-semibold mb-3">{card.question}</h3>
          <div className="flex w-full justify-between gap-x-2">
            <Chip
              color={getQuestionDifficultyColor(card.difficulty).bg}
              text={capitalise(card.difficulty)}
              textColor={getQuestionDifficultyColor(card.difficulty).text}
              border={getQuestionDifficultyColor(card.difficulty).border}
            />
            <Chip
              color="bg-black-100"
              text="Custom"
              textColor="text-white"
              border="border-black-50"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
