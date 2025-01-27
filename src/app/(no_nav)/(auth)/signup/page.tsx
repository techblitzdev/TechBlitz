import SignupForm from '@/components/auth/signup';
import { createMetadata } from '@/utils/seo';
import { RoadmapUserQuestions } from '@/types/Roadmap';
import RoadmapQuestionCard from '@/components/app/roadmaps/questions/[uid]/question-card';
import SocialProof from '@/components/marketing/global/social-proof';
import { fetchGithubStars } from '@/utils/data/misc/get-github-stars';
import { getUserCount } from '@/utils/data/user/get-user-count';
import { Suspense } from 'react';
import Link from 'next/link';

export async function generateMetadata() {
  return createMetadata({
    title: 'Sign Up | TechBlitz',
    description: 'Sign up for TechBlitz to get started.',
    image: {
      text: 'Sign Up | TechBlitz',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/signup',
  });
}

const dummyQuestions: Partial<RoadmapUserQuestions>[] = [
  {
    uid: 'question-1',
    question:
      'How can you use Array.filter() to filter out all the even numbers from an array?',
    difficulty: 'EASY',
    completed: true,
    userCorrect: true,
  },
  {
    uid: 'question-2',
    question: 'What is the purpose of the "useCallback" hook in React?',
    difficulty: 'MEDIUM',
    completed: true,
    userCorrect: false,
  },
  {
    uid: 'question-3',
    question: 'What does the keyword "async" do in JavaScript?',
    difficulty: 'EASY',
    completed: true,
    userCorrect: true,
  },
];

const dummyRoadmapUid = 'roadmap-12345';

const dummyTotalQuestions = dummyQuestions.length;

export default async function SignupPage() {
  const [githubStars, userCount] = await Promise.all([
    fetchGithubStars(),
    getUserCount().then((count) => Math.round(count / 10) * 10),
  ]);

  return (
    <div className="flex gap-10 min-h-screen items-center overflow-hidden">
      {/* left side - Sign up form */}
      <div className="w-full xl:w-1/2 flex flex-col gap-5 items-center justify-center lg:p-8">
        <div className="w-full space-y-6 max-w-md">
          <div className="flex flex-col gap-y-2">
            <h1 className="!text-start font-bold font-onest text-xl lg:text-3xl mb-2">
              Create your TechBlitz account
            </h1>
            <p className="text-sm text-gray-400">
              Start your journey to becoming a tech expert.
            </p>
          </div>
          <Suspense>
            <SignupForm prefilledEmail="" />
          </Suspense>
        </div>
        <span className="block text-sm text-gray-400 hover:text-white duration-300 text-center mt-4">
          Already have an account?{' '}
          <Link href="/login" prefetch className="underline">
            Sign in
          </Link>
        </span>
      </div>

      {/* right side - Hero/Marketing Content */}
      <div className="relative  hidden xl:flex xl:w-1/2 flex-col items-center justify-center overflow-hidden">
        <SocialProof
          userCount={userCount}
          githubStars={githubStars?.stargazers_count || 0}
          dailyQuestion={null}
          padding="pb-5 pl-24"
          showDescription={false}
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
