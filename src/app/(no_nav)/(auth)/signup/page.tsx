import SignupForm from '@/components/auth/signup';
import { createMetadata } from '@/utils/seo';
import { RoadmapUserQuestions } from '@/types/Roadmap';
import RoadmapQuestionCard from '@/components/app/roadmaps/questions/[uid]/question-card';
import SocialProof from '@/components/marketing/global/social-proof';
import { fetchGithubStars } from '@/utils/data/misc/get-github-stars';
import { getUserCount } from '@/utils/data/user/get-user-count';

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

export default async function SignupPage() {
  const [githubStars, userCount] = await Promise.all([
    fetchGithubStars(),
    getUserCount().then((count) => Math.round(count / 10) * 10),
  ]);

  return (
    <div className="flex min-h-screen items-center overflow-hidden">
      {/* left side - Sign up form */}
      <div className="w-full xl:w-1/2 flex items-center justify-center lg:p-8">
        <div className="w-full max-w-lg space-y-6 bg-black/50 backdrop-blur-sm border border-black-50 rounded-xl p-8 shadow-xl place-items-center">
          <div className="text-center">
            <h1 className="font-bold text-3xl mb-2">Get started for free</h1>
          </div>
          <SignupForm prefilledEmail="" />
        </div>
      </div>

      {/* right side - Hero/Marketing Content */}
      <div className="relative hidden xl:flex xl:w-1/2 flex-col items-center justify-center overflow-hidden">
        <SocialProof
          userCount={userCount}
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
