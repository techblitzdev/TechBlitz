import { getUserFromSession } from '@/actions/user/authed/get-user';
import { AnswerWithUser } from '@/types/Answers';
import { shortenText } from '@/utils';
import { formatSeconds } from '@/utils/time';
import { getUserDisplayName } from '@/utils/user';

export default async function DashboardLearderboardUserCard(opts: {
  entry: AnswerWithUser;
  index: number;
}) {
  const { entry, index } = opts;
  const { data: currentUser } = await getUserFromSession();

  const isCurrentUser = currentUser?.user?.id === entry.user.uid;
  const timeTaken = formatSeconds(entry.timeTaken || 0);
  const displayName = getUserDisplayName(entry.user);

  return (
    <div
      key={entry.user.uid}
      className={`py-2 px-4 flex items-center justify-between border-b border-black-50 ${
        index % 2 === 0 ? 'bg-black' : 'bg-black-75'
      }`}
    >
      <div className="flex items-center gap-x-4">
        <span className={`text-sm font-semibold font-satoshi`}>#{index + 1}</span>
        <div className="flex items-center gap-x-1">
          <span className={`text-sm font-semibold font-satoshi`}>
            {shortenText(displayName, 15)}
          </span>
          {isCurrentUser && <span className="text-xs text-gray-500">(You)</span>}
        </div>
      </div>
      <span className="text-xs bg-white text-black py-1 px-2 rounded-md">{timeTaken}</span>
    </div>
  );
}
