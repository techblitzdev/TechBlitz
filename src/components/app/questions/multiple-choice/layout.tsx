import type { Question, QuestionMock } from '@/types';
import MultipleChoiceLayoutClient from './layout.client';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Define navigation interface to match the data from getNextAndPreviousQuestion
interface NavigationData {
  previousQuestion: string | null | undefined;
  nextQuestion: string | null | undefined;
}

export default function MultipleChoiceLayout({
  question,
  nextAndPreviousQuestion,
}: {
  question: Question | QuestionMock;
  nextAndPreviousQuestion: NavigationData | null;
}) {
  return (
    <MultipleChoiceLayoutClient
      question={question}
      nextAndPreviousQuestion={nextAndPreviousQuestion}
    >
      <div className="flex flex-col gap-2 justify-center mb-4 self-center max-w-3xl text-center">
        {question.description ? (
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => {
                return (
                  <p className="text-gray-400 text-center text-lg font-onest leading-relaxed py-2">
                    {children}
                  </p>
                );
              },
              code: ({ children }) => {
                return (
                  <span className="bg-gray-700 rounded-md px-1 italic font-onest">{children}</span>
                );
              },
            }}
          >
            {question.description}
          </Markdown>
        ) : (
          <h2 className="text-3xl font-bold text-white text-center">{question.question}</h2>
        )}
      </div>
    </MultipleChoiceLayoutClient>
  );
}
