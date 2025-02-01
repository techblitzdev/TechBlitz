import ProfilePicture from '@/components/ui/profile-picture'
import { UserRecord } from '@/types/User'
import { shortenText } from '@/utils'
import { getUserDisplayName } from '@/utils/user'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { use } from 'react'

export default function LeaderboardMostAnsweredTable(opts: {
  topUsersByQuestionCount: (UserRecord & {
    _count: { answers: number }
  })[]
  userPromise: Promise<UserRecord | null>
  page?: number
  postsPerPage?: number
}) {
  const {
    topUsersByQuestionCount,
    userPromise,
    page = 1,
    postsPerPage = 15,
  } = opts

  const user = use(userPromise)

  return (
    <TableBody>
      {topUsersByQuestionCount?.map((userData, index) => (
        <TableRow
          key={userData.uid}
          className="border-white/10 hover:bg-white/5 transition-colors"
        >
          <TableCell className="font-medium text-white p-0">
            {page === 1 && index < 3 ? (
              <Badge
                variant={index === 0 ? 'default' : 'secondary'}
                className={`
                        ${index === 0 && 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30'}
                        ${index === 1 && 'bg-gray-400/20 text-gray-300 hover:bg-gray-400/30'}
                        ${index === 2 && 'bg-amber-700/20 text-amber-500 hover:bg-amber-700/30'}
                      `}
              >
                #{index + 1}
              </Badge>
            ) : (
              <span className="text-gray-400">
                #{(page - 1) * postsPerPage + index + 1}
              </span>
            )}
          </TableCell>
          <TableCell className="p-0">
            <div className="flex items-center gap-4">
              <ProfilePicture
                src={userData.userProfilePicture}
                alt={`${userData.username} profile picture`}
                className="text-white"
              />
              <div className="flex gap-2 items-center">
                <span className="text-white font-medium hidden md:block">
                  {shortenText(getUserDisplayName(userData as any), 25)}
                </span>
                <span className="text-white font-medium block md:hidden">
                  {shortenText(getUserDisplayName(userData as any), 10)}
                </span>
                {user?.uid === userData.uid && (
                  <span className="text-xs text-white">(You)</span>
                )}
                {userData?.userLevel === 'PREMIUM' && (
                  <div className="relative w-fit bg-accent text-xs flex items-center justify-center px-2 py-0.5 rounded-full text-white">
                    <span className="text-[10px]">PRO</span>
                  </div>
                )}
              </div>
            </div>
          </TableCell>
          <TableCell className="p-0">
            <div className="flex h-full w-full p-4 justify-end">
              <Badge variant="outline" className="border-white/10 text-white">
                {userData._count.answers}
              </Badge>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
