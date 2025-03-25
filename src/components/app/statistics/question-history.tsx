import { prisma } from '@/lib/prisma';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { getUser } from '@/actions/user/authed/get-user';

interface QuestionHistoryProps {
  className?: string;
}

export default async function QuestionHistory({ className }: QuestionHistoryProps) {
  const user = await getUser();

  // Initialize with empty array as default
  let recentAnswers: any[] = [];

  if (user) {
    // Fetch the 10 most recent answers
    recentAnswers = await prisma.answers.findMany({
      where: {
        userUid: user.uid,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
      include: {
        question: {
          include: {
            tags: {
              include: {
                tag: true,
              },
            },
          },
        },
      },
    });
  }

  return (
    <Card className={cn('border-black-50 bg-card-dark', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium text-white">Recent Questions</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {recentAnswers.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            <p>No recent questions found.</p>
            <p className="mt-1">
              <Link href="/questions" className="text-primary hover:underline">
                Start answering questions
              </Link>
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-black-50">
            {recentAnswers.map((answer) => (
              <li key={answer.uid} className="hover:bg-black-50/30 transition-colors">
                <Link href={`/questions/${answer.question.slug}`} className="block p-3 space-y-1.5">
                  <div className="flex items-start gap-2">
                    {answer.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex items-center justify-between w-full">
                      <h3 className="text-sm font-medium line-clamp-2 text-white">
                        {answer.question.title || answer.question.question.substring(0, 50)}
                      </h3>
                      <span className="text-gray-400">
                        {formatDistanceToNow(new Date(answer.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
