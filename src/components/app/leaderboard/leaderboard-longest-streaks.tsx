import { getUserDisplayName } from '@/utils/user'
import Card from '@/components/shared/Card'
import { FlameIcon } from 'lucide-react'
import { getLongestStreaks } from '@/utils/data/leaderboard/get-longest-streaks'
import { shortenText } from '@/utils'
import ProfilePicture from '@/components/ui/profile-picture'

const header = () => {
  return (
    <div className="flex items-center w-full justify-between">
      <div className="flex gap-x-2 items-center">
        <FlameIcon className="fill-red-500 text-orange-500 hidden md:block" />
        <h3 className="text-lg">Longest streaks</h3>
      </div>
    </div>
  )
}

export default async function LeaderboardLongestStreaks(opts: {
  userUid?: string
}) {
  const { userUid } = opts

  const longestStreaks = await getLongestStreaks()

  return (
    <Card header={header()}>
      <div className="flex flex-col divide-y-[1px] divide-black-50">
        {/* Headings Row */}
        <div className="flex items-center justify-between px-4 py-2 bg-black-75 font-bold font-ubuntu text-xs">
          <span className="flex-1">Position</span>
          <span className="flex-1">User</span>
          <span className="flex-1 text-right">Streak</span>
        </div>

        {longestStreaks.map((streak, i) => (
          <div
            key={streak.user.uid}
            className={`flex items-center justify-between px-4 py-3 ${
              i % 2 === 0 ? 'bg-black' : 'bg-[#000]'
            }`}
          >
            {/* Position */}
            <span className="flex-1">#{i + 1}</span>

            {/* User */}
            <div className="flex-1 flex items-center gap-4">
              <ProfilePicture
                src={streak.user.userProfilePicture}
                alt={streak.user.username}
              />
              <span>{shortenText(getUserDisplayName(streak.user), 15)}</span>
              {userUid === streak.user.uid && (
                <span className="text-xs text-gray-500">(You)</span>
              )}
            </div>

            {/* Streak */}
            <span className="justify-end flex-1 flex items-end gap-1">
              {streak.streak}{' '}
              <FlameIcon className="fill-red-500 text-orange-500" />
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
