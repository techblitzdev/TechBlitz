import { Check } from "lucide-react";
import { X } from "lucide-react";

type DashboardQuestionCardProps = {
  question: {
    name: string;
    correct: boolean;
    label: string;
  };
};

export default function DashboardQuestionCard(
  opts: DashboardQuestionCardProps,
) {
  const { name, correct } = opts.question;

  return (
    <div className="bg-black-100 border border-black-50 rounded-md p-4 mb-4">
      <div className="flex items-center">
        <div className="flex items-center justify-center size-4 border rounded-sm border-black-50 mr-3">
          {correct ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <X className="w-4 h-4 text-red-500" />
          )}
        </div>
        <span className={`text-sm font-ubuntu`}>{name}</span>
      </div>
    </div>
  );
}
