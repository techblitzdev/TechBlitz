export default function DashboardQuestionCard({
  question,
}: {
  question: string;
}) {
  return (
    <div className="bg-black-100 border border-black-50 rounded-md p-4 mb-4">
      <div className="flex items-center">
        <div className="size-4 border rounded-sm border-black-50 mr-3"></div>
        <span className="text-sm font-ubuntu">{question}</span>
      </div>
    </div>
  );
}
