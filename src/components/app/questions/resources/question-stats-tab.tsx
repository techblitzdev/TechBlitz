import { Check, User } from 'lucide-react';

export default function QuestionStatsTab(opts: {
  totalSubmissions?: {
    totalSubmissions: number;
    percentageCorrect: number;
  };
}) {
  const { totalSubmissions } = opts;

  return (
    <div className="flex flex-col gap-y-4">
      <h3 className="font-inter font-light text-base md:text-xl">
        Stats for this question
      </h3>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            <User className="size-4" />
            <p>Total submissions:</p>
          </div>
          <p className="font-semibold">{totalSubmissions?.totalSubmissions}</p>
        </div>
        {totalSubmissions?.percentageCorrect &&
          totalSubmissions?.percentageCorrect > 0 && (
            <div className="flex items-center gap-0.5 md:ml-4">
              <Check className="size-4" />
              <p>Success rate:</p>
              <p className="font-semibold">
                {totalSubmissions?.percentageCorrect}%
              </p>
            </div>
          )}
      </div>
    </div>
  );
}
