import { Question } from '@/types/Questions';
import TodayTaskListCard from './today-task-list-card';

export default async function TodayTaskList({
  todaysQuestion,
}: {
  todaysQuestion: Question;
}) {
  return (
    <div className="h-full">
      {todaysQuestion ? (
        <TodayTaskListCard className="h-full" question={todaysQuestion} />
      ) : (
        <p>No task for today</p>
      )}
    </div>
  );
}
