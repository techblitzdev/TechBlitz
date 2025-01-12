import { Trophy } from 'lucide-react';
import { getMostQuestionsAnswered } from '@/utils/data/leaderboard/get-most-questions-answered';
import ProfilePicture from '@/components/ui/profile-picture';
import { UserRecord } from '@/types/User';
import { shortenText } from '@/utils';
import { getUserDisplayName } from '@/utils/user';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ShowTimeTakenToggle from './show-time-taken';

export default async function LeaderboardMostQuestionsAnswered({
  userUid,
}: {
  userUid?: string;
}) {
  const topUsersByQuestionCount = await getMostQuestionsAnswered();

  return (
    <Card className="border-none">
      <CardHeader className="p-0 md:p-6 w-full flex gap-2 justify-between">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-x-2">
            <Trophy className="size-5 text-accent" />
            <div>
              <CardTitle className="text-white">
                Top Users Leaderboard
              </CardTitle>
              <CardDescription className="text-gray-400">
                Battle your way to the top of TechBlitz!
              </CardDescription>
            </div>
          </div>
          <ShowTimeTakenToggle />
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-6 md:p-6 md:pt-0">
        <Table>
          <TableHeader className="bg-transparent">
            <TableRow className="bg-transparent">
              <TableHead className="!border-t-0 w-12 md:w-[100px] text-white bg-transparent">
                Rank
              </TableHead>
              <TableHead className="!border-t-0 text-white bg-transparent">
                User
              </TableHead>
              <TableHead className="!border-t-0 text-right text-white bg-transparent">
                Questions Solved
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topUsersByQuestionCount.map((user, index) => (
              <TableRow
                key={user.uid}
                className="border-white/10 hover:bg-white/5 transition-colors"
              >
                <TableCell className="font-medium text-white">
                  {index < 3 ? (
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
                    <span className="text-gray-400">#{index + 1}</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <ProfilePicture
                      src={user.userProfilePicture}
                      alt={`${user.username} profile picture`}
                      className="text-white"
                    />
                    <div className="flex gap-2">
                      <span className="text-white font-medium">
                        {shortenText(
                          getUserDisplayName(user as unknown as UserRecord),
                          25
                        )}
                      </span>
                      {userUid === user.uid && (
                        <span className="text-xs text-white">(You)</span>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant="outline"
                    className="border-white/10 text-white"
                  >
                    {user._count.answers}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
