import MultipleChoiceCard from '@/components/app/questions/multiple-choice/card';
import { QuestionAnswer } from '@/types/QuestionAnswers';

const mockAnswers: QuestionAnswer[] = [
  {
    uid: 'answer-1',
    questionUid: '123',
    answer: 'The Array.map() allows you to transform each element of the array.',
    answerType: 'STANDARD',
    isCodeSnippet: false,
  },
  {
    uid: 'answer-2',
    questionUid: '123',
    answer: 'The Array.map() allows you to iterate over each element of the array.',
    answerType: 'STANDARD',
    isCodeSnippet: false,
  },
  {
    uid: 'answer-3',
    questionUid: '123',
    answer: 'The Array.filter() allows you to filter elements of the array.',
    answerType: 'STANDARD',
    isCodeSnippet: false,
  },
  {
    uid: 'answer-4',
    questionUid: '123',
    answer: 'The Array.reduce() allows you to reduce the array to a single value.',
    answerType: 'STANDARD',
    isCodeSnippet: false,
  },
];

export default function DailyQuestionBox() {
  return (
    <div className="flex flex-col gap-y-2 relative">
      <div className="flex flex-col gap-y-2">
        <h3 className="text-xs text-gray-400">What is the definition of Array.map()?</h3>
      </div>
      {mockAnswers.map((answerObj, index) => {
        return (
          <MultipleChoiceCard
            key={answerObj.uid}
            index={index}
            answer={answerObj.answer}
            handleSelectAnswer={undefined}
            selectedAnswer={undefined}
            isCorrect={undefined}
            isSubmitted={false}
            correctAnswer={undefined}
          />
        );
      })}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000000] bottom-0 pointer-events-none" />
    </div>
  );
}
