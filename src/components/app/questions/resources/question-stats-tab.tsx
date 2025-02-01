import { Check, User } from "lucide-react";

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
      <div className="flex flex-col items-start gap-2 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <User className="size-4" />
            <p className="text-lg">Total submissions:</p>
          </div>
          <p className="font-semibold text-lg">
            {totalSubmissions?.totalSubmissions}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Check className="size-4" />
            <p className="text-lg">Success rate:</p>
          </div>
          <p className="font-semibold text-lg">
            {totalSubmissions?.percentageCorrect}%
          </p>
        </div>
      </div>
    </div>
  );
}
