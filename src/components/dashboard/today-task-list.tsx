import { getTodaysQuestion } from '@/actions/questions/get-today';
import TodayTaskListCard from './today-task-list-card';

export default async function TodayTaskList() {
  const todaysQuestion = await getTodaysQuestion();

  return (
    <div>
      {todaysQuestion ? (
        <TodayTaskListCard question={todaysQuestion} />
      ) : (
        <p>No task for today</p>
      )}
    </div>
  );
}
