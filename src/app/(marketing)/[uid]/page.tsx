import { getTotalSubmissions } from '@/actions/demo/get-total-submissions';
import { getTodaysQuestion } from '@/actions/questions/get-today';
import QuestionCard from '@/components/marketing/question/question-card';
import ExpandedCodeModal from '@/components/questions/expanded-code-modal';
import { Separator } from '@/components/ui/separator';
import { ChartColumn, User } from 'lucide-react';
import QuestionDisplay from '@/components/questions/single/code-snippet';

export default async function MarketingQuestionPage({
  params
}: {
  params: { uid: string };
}) {
  const { uid } = params;

  // get the question
  const question = await getTodaysQuestion();

  if (!question) {
    return null;
  }

  // get the total submissions for the question
  const { totalSubmissions } = await getTotalSubmissions({
    questionUid: question.uid
  });

  return (
    <div className="container mx-auto px-4 py-20 md:py-28">
      <div className="flex flex-col md:flex-row gap-6 mt-3">
        {/* Left Section - Question and Stats */}
        <div className="w-full md:w-1/2 flex flex-col gap-y-4">
          {/* Question Card */}
          <QuestionCard question={question} />

          {/* Stats Card */}
          <div className="hidden md:block bg-black-75 border border-black-50 rounded-xl overflow-hidden">
            <div className="flex items-center gap-x-1 p-4 bg-black-25">
              <ChartColumn className="size-4" />
              <div className="text-sm">Stats</div>
            </div>
            <Separator className="bg-black-50" />
            <div className="p-4 flex items-center">
              <div className="flex items-start gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    <User className="size-4" />
                    <p>Total submissions:</p>
                  </div>
                  <p>{totalSubmissions}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Section */}
        <div className="w-full md:w-1/2">
          <div className="h-auto md:h-[45rem] bg-black-75 border border-black-50 rounded-xl relative overflow-hidden">
            <div className="p-4 text-sm flex w-full items-center justify-between bg-black-25">
              <p>Code</p>
              {question.codeSnippet && (
                <ExpandedCodeModal code={question.codeSnippet} />
              )}
            </div>
            <Separator className="bg-black-50" />
            {question?.codeSnippet && (
              <QuestionDisplay
                content={question.codeSnippet}
                language=""
              />
            )}
          </div>
        </div>
        {/* Stats Card */}
        <div className="block md:hidden bg-black-75 border border-black-50 rounded-xl overflow-hidden">
          <div className="flex items-center gap-x-1 p-4 bg-black-25">
            <ChartColumn className="size-4" />
            <div className="text-sm">Stats</div>
          </div>
          <Separator className="bg-black-50" />
          <div className="p-4 flex items-center">
            <div className="flex items-start gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  <User className="size-4" />
                  <p>Total submissions:</p>
                </div>
                <p>{totalSubmissions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
