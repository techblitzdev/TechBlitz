import type { Question } from '@/types/Questions';
import Link from 'next/link';

export default function AdminQuestionCard({
  question,
}: {
  question: Question;
}) {
  if (!question) return null;
  return (
    <Link
      key={question.uid}
      href={`/admin/questions/${question.uid}`}
      className="p-2 border border-black-50 bg-black-75 rounded-sm font-inter hover:bg-black-50 duration-300 w-full"
    >
      <p>
        <span className="font-semibold">Question:</span> {question.question}
      </p>
      <p>
        <span className="font-semibold">Question date:</span>{' '}
        {new Date(question.questionDate).toLocaleDateString()}
      </p>
      <div>
        <span className="font-semibold">Question answers:</span>{' '}
        {question?.answers.map((a, index) => (
          <p key={index}>
            {index + 1}. {a.answer}
          </p>
        ))}
      </div>
    </Link>
  );
}
