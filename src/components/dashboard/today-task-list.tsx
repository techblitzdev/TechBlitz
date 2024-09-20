import { getTodaysQuestion } from '@/actions/questions/get-today';

export default async function TodayTaskList() {
  const todaysQuestion = await getTodaysQuestion();

  return (
    <div className="">
      <h6>
        {todaysQuestion ? (
          todaysQuestion.question
        ) : (
          <span className="text-gray-500">No question found</span>
        )}
      </h6>
    </div>
  );
}
