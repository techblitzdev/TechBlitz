import { Question } from '@/types/Questions';
import { Highlight, themes } from 'prism-react-renderer';

// markdown to render the question description
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useQuestionSingle } from '../questions/single/layout/question-single-context';
import { use } from 'react';
import HasAnswered from '../questions/single/has-answered';
import BookmarkQuestion from '../questions/single/bookmark';
import ShareQuestion from '@/components/global/share-question';
import Chip from '@/components/ui/chip';
import { capitalise, getQuestionDifficultyColor } from '@/utils';
import QuestionHintTrigger from '../questions/question-hint-trigger';

export default function CodingChallengeDescription(opts: {
  question: Question;
}) {
  const { question } = opts;

  const { userAnswered } = useQuestionSingle();

  const hasUserAnswered = use(userAnswered);

  return (
    <div className="p-4 pt-0 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex w-full justify-between gap-5 mb-5">
          <div className="flex w-full gap-2 items-center">
            <Chip
              color={getQuestionDifficultyColor(question.difficulty).bg}
              text={capitalise(question.difficulty)}
              textColor={getQuestionDifficultyColor(question.difficulty).text}
              border={getQuestionDifficultyColor(question.difficulty).border}
            />
            <HasAnswered userAnswered={hasUserAnswered} />
          </div>
          <div className="flex items-center">
            <QuestionHintTrigger />
            <ShareQuestion />
            <BookmarkQuestion question={question} />
          </div>
        </div>
        {question?.question && (
          <div className="flex w-full gap-10 justify-between">
            <h3 className="font-onest font-light text-lg md:text-2xl">
              {question.question}
            </h3>
          </div>
        )}
      </div>
      <div className="prose prose-sm prose-invert [&>p+h1]:mt-6 [&>p+h2]:mt-6 [&>p+h3]:mt-6 [&>p+h4]:mt-6 [&>p+h5]:mt-6 [&>p+h6]:mt-6">
        <span className="underline">Description</span>
        <Markdown
          remarkPlugins={[remarkGfm]}
          className="flex flex-col gap-4"
          components={{
            code: ({ ...props }) => {
              return (
                <Highlight
                  theme={themes.vsDark}
                  code={
                    typeof props.children === 'string' ? props.children : ''
                  }
                  language="javascript"
                >
                  {({
                    className,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps,
                  }) => (
                    <pre
                      className={className}
                      style={{
                        ...style,
                        padding: '1rem',
                        fontSize: '0.875rem',
                        overflow: 'auto',
                      }}
                    >
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line, key: i })}>
                          {line.map((token, key) => (
                            <span
                              key={key}
                              {...getTokenProps({ token, key })}
                            />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              );
            },
            ul: ({ children }) => {
              return (
                <ul className="list-disc px-4 flex flex-col gap-3">
                  {children}
                </ul>
              );
            },
            ol: ({ children }) => {
              return (
                <ol className="list-decimal px-4 flex flex-col gap-3">
                  {children}
                </ol>
              );
            },
            h1: ({ children }) => {
              return (
                <h1 className="text-2xl font-bold underline">{children}</h1>
              );
            },
            h2: ({ children }) => {
              return (
                <h2 className="text-xl font-bold underline">{children}</h2>
              );
            },
            h3: ({ children }) => {
              return (
                <h3 className="text-lg font-bold underline">{children}</h3>
              );
            },
            h4: ({ children }) => {
              return (
                <h4 className="text-base font-bold underline">{children}</h4>
              );
            },
            h5: ({ children }) => {
              return (
                <h5 className="text-sm font-bold underline">{children}</h5>
              );
            },
            h6: ({ children }) => {
              return (
                <h6 className="text-xs font-bold underline">{children}</h6>
              );
            },
            hr: () => {
              return <hr className="border-b border-black-50 my-4" />;
            },
          }}
        >
          {question.description}
        </Markdown>
      </div>
    </div>
  );
}
