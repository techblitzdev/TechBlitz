'use client';
import SignupForm from '@/components/auth/signup';
import { ERROR_CODES } from '@/utils/constants/error-codes';
import { useGetQueryParams } from '@/hooks/use-get-query-params';
import { Suspense, useRef, useState } from 'react';
import { toast } from 'sonner';
import type { ErrorCodes } from '@/types/Constants';
import SocialProof from '@/components/marketing/global/social-proof';
import { useQuery } from '@tanstack/react-query';
import { fetchGithubStars } from '@/actions/misc/get-github-stars';
import { getUserCount } from '@/actions/user/get-user-count';
import { RoadmapUserQuestions } from '@/types/Roadmap';
import RoadmapQuestionCard from '@/components/app/roadmaps/questions/[uid]/question-card';

const dummyQuestions: Partial<RoadmapUserQuestions>[] = [
  {
    uid: 'question-1',
    question:
      'How could you use a hash table to improve the performance of a search algorithm?',
    difficulty: 'HARD',
    completed: true,
    userCorrect: true,
  },
  {
    uid: 'question-2',
    question: 'Why GRAPHQL works better that REST in this example?',
    difficulty: 'MEDIUM',
    completed: true,
    userCorrect: false,
  },
  {
    uid: 'question-3',
    question: 'In React, what is the purpose of the "useCallback" hook?',
    difficulty: 'EASY',
    completed: true,
    userCorrect: true,
  },
];

const dummyRoadmapUid = 'roadmap-12345';

const dummyTotalQuestions = dummyQuestions.length;

export default function SignupPage() {
  const ranToast = useRef(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setUrlParams] = useState({});

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupContent ranToast={ranToast.current} setUrlParams={setUrlParams} />
    </Suspense>
  );
}

function SignupContent({
  ranToast,
  setUrlParams,
}: {
  ranToast: boolean;
  setUrlParams: any;
}) {
  // check if we have any query parameters
  const urlParams = useGetQueryParams({
    keys: ['r', 'email'],
  });

  // if we have a query parameter, we can use it to display a toast message
  if (
    Object.keys(urlParams).length > 0 &&
    urlParams.r === 'no-user' &&
    !ranToast
  ) {
    ranToast = true;

    // Cast the query parameter to one of the valid keys in ErrorCodes
    const firstError = urlParams.r as keyof ErrorCodes;

    // set the params to the first error
    setUrlParams(urlParams);

    // Now TypeScript knows that firstError is a valid key of ERROR_CODES
    const errorDetail = ERROR_CODES[firstError];

    if (typeof errorDetail === 'string') {
      toast.error(errorDetail, {
        duration: 5000,
        position: 'bottom-right',
      });
    } else {
      toast.error(errorDetail.title, {
        description: errorDetail.description,
        duration: 5000,
        position: 'bottom-right',
      });
    }
  }

  const { data: githubStars } = useQuery({
    queryKey: ['github-stars'],
    queryFn: () => fetchGithubStars(),
    staleTime: 3600,
  });

  const { data: userCount } = useQuery({
    queryKey: ['user-count'],
    queryFn: async () => {
      const count = await getUserCount();

      // round to nearest 10
      return Math.round(count / 10) * 10;
    },
    staleTime: 3600,
  });

  return (
    <div className="flex min-h-screen items-center overflow-hidden">
      {/* left side - Sign up form */}
      <div className="w-full xl:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-lg space-y-6 bg-black/50 backdrop-blur-sm border border-black-50 rounded-xl p-8 shadow-xl place-items-center">
          <div className="text-center">
            <h1 className="font-bold text-3xl mb-2">Get started for free</h1>
          </div>
          <SignupForm prefilledEmail={urlParams?.email || ''} />
        </div>
      </div>

      {/* right side - Hero/Marketing Content */}
      <div className="relative hidden xl:flex xl:w-1/2 flex-col items-center justify-center overflow-hidden">
        <SocialProof
          userCount={userCount || 0}
          githubStars={githubStars?.stargazers_count || 0}
          dailyQuestion={null}
          padding="pb-5"
        />
        <div className="max-h-[26rem] relative -right-12">
          {dummyQuestions.map((question, index) => (
            <RoadmapQuestionCard
              key={question.uid}
              question={question}
              roadmapUid={dummyRoadmapUid}
              index={index}
              totalQuestions={dummyTotalQuestions}
              prevQuestionCorrect={
                index > 0 ? dummyQuestions[index - 1]?.userCorrect : undefined
              }
              prevQuestionAnswered={
                index > 0 ? dummyQuestions[index - 1]?.completed : undefined
              }
            />
          ))}
          <div className="z-10 absolute inset-x-0 -left-8 bottom-0 h-36 bg-gradient-to-t from-[#000] to-transparent pointer-events-none"></div>
          <div className="z-10 absolute inset-y-0 right-0 h-full w-44 bg-gradient-to-l from-[#000] to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
