import React from 'react';
import { Timeline } from '@/components/ui/timelime';
import Link from 'next/link';

export default function ChangelogTimeline() {
  const data = [
    {
      title: 'Roadmaps redesigned, daily missions & more',
      content: (
        <div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//08-02-25-roadmap-redesign.png"
              alt="Study paths redesign"
            />
            <img
              src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//08-02-25-referral.png"
              alt="Referral program"
            />
          </div>
          <div className="text-white font-normal mt-12">
            <p>
              We were getting a lot of feedback that our roadmaps we quite... boring. So we have
              redesigned them to be more engaging and easier to use.
            </p>
            <br />
            <p>
              You can now easily see your next question in your study path, your progress and easily
              enroll in a new study path.
            </p>
            <br />
            <p>
              This is just the first step of many to come. We are constantly looking for feedback
              and will be adding more features and improvements to the platform.
            </p>
            <br />
            <p>
              We also decided as a part of this update to add daily missions. These are a set of
              daily challenges that you can complete to earn rewards and improve your skills.
            </p>
            <br />
            <p>We will be adding more missions over time, so stay tuned!</p>
            <br />
            <p>
              You can also now sign up and sign in with Google. This is a much faster and easier way
              to sign up for TechBlitz.
            </p>
            <br />
            <p>
              We also added a new referral program. When you refer a friend to TechBlitz, you will
              earn 10% off all paid plans once they sign up!
            </p>
            <br />
            <p>
              If you have any feedback, or any suggestions for new features, please let us know at{' '}
              <Link href="mailto:team@techblitz.dev" className="text-accent">
                team@techblitz.dev
              </Link>
              .
            </p>
            <br />
            <p>Happy coding! 🚀</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Free roadmaps, test cases, personalized challenges emails & more',
      content: (
        <div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//study-path-overview.png"
              alt="Study paths redesign"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/test-case-showcase.png"
              alt="Test case showcase"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
          <div className="text-white font-normal mt-12">
            <p>
              We listened to feedback, and added roadmaps, free to all users. Roadmaps give you a
              structured way to learn and improve your skills, ranging from fundamentals to more
              advanced topics.
            </p>
            <br />
            <p>
              We are adding new roadmaps regularly, and are always looking for feedback to improve
              them. So if you have any suggestions, please let us know at{' '}
              <Link href="mailto:team@techblitz.dev" className="text-accent">
                team@techblitz.dev
              </Link>
              .
            </p>
            <br />
            <p>
              We also added test cases to our code editor questions. This gives you an easy way to
              view what the expected output is, and compare it to your output.
            </p>
            <br />
            <p>
              We also made the decision to remove the daily challenge being sent out to users who
              opted in to receive them. (You can opt in to receive them again in your settings,{' '}
              <Link href="/settings/profile" className="text-accent">
                here
              </Link>
              ) . From now on, all users will receive a suggested question in their inbox every
              weekday. This allows for a more personalized experience, and allows you to choose when
              you want to complete your daily challenge.
            </p>
            <br />
            <p>
              These new features are only a few of the many we have added. We are constantly working
              to improve the platform and make learning more enjoyable for you!
            </p>
            <br />
            <p>
              If you have any feedback, or any suggestions for new features, please let us know at{' '}
              <Link href="mailto:team@techblitz.dev" className="text-accent">
                team@techblitz.dev
              </Link>
              .
            </p>
            <br />
            <p>Happy coding! 🚀</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Question answer redesign, quick question access, upgraded filters & more  ',
      content: (
        <div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/question-single-page-redesign-23-01-25.png"
              alt="New question single page redesign"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/filters-redesign.png"
              alt="Filters redesign"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/continue-journey-cta.png"
              alt="Continue coding journey cta"
              className="rounded-lg object-contain h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/leaderboard-pagination.png"
              alt="Leaderboard pagination"
              className="rounded-lg object-scale-down h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
          <br />
          <div className="text-white font-normal mt-12">
            <p>
              It's been a busy few days for us. We have redesigned the question single page -
              allowing you to easily view if you have answered a question in the past and making
              answering questions a much more enjoyable experience.
            </p>
            <br />
            <p>
              We heard your feedback and added a quick question access button to your dashboard.
              Allowing you to access your next question in instantly.
            </p>
            <br />
            <p>
              We also decided to redesign our filters to make it easier to find the questions you
              want. Going from multiple dropdowns to a single dropdown with a search bar.
            </p>
            <br />
            <p>
              Like a particular question? We have added a bookmark button to your question page.
              Allowing you to bookmark any question you want to come back to later - easily access
              it from the filters.
            </p>
            <br />
            <p>
              Finally, as TechBlitz is growing, we have added pagination to the leaderboard page.
              Allowing you to view your position in the leaderboard, no matter what place you are!
            </p>
            <br />
            <p>
              <Link href="/signup" className="text-accent">
                Try out the new features
              </Link>{' '}
              and let us know what you think! If you have any feedback, please let us know at{' '}
              <Link href="mailto:team@techblitz.dev" className="text-accent">
                team@techblitz.dev
              </Link>
              .
            </p>
            <br />
            <p>Happy coding! 🚀</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Code editor questions - complete by code',
      content: (
        <div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/code-editor-autocomplete-showcase.png"
              alt="code editor question feature showcase"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/code-editor-test-case-fail.png"
              alt="code editor question feature showcase"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/code-editor-ai-help.png"
              alt="code editor question feature showcase"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/code-editor-ai-assistance.png"
              alt="code editor question feature showcase"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
          <p className="text-white font-normal mt-8">
            Multiple choice questions can be difficult for some people to fully grasp concepts and
            understand the material. We have added complete-by-code questions to our platform. You
            can now write code to solve the problem directly in the browser. Receive helpful hints.
            ai-assistance & more.{` `}
            <Link href="/question/sum-all-numbers-in-array" className="text-accent">
              Try it out now!
            </Link>{' '}
          </p>
        </div>
      ),
    },
    {
      title: 'Daily Challenge reminders added',
      content: (
        <div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/send-daily-reminder-toggle.png"
              alt="Daily challenge email notification showcase"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/daily-challenge-email.png"
              alt="Daily challenge email notification showcase"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
          <p className="text-white font-normal mt-8">
            Want to stay on top of your daily challenges? We have added daily challenge reminders to
            our platform. You can opt-in to receive a notification every day to complete your daily
            challenge. Opt-in via your settings page
          </p>
        </div>
      ),
    },
    {
      title: 'Leaderboard Redesign',
      content: (
        <div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/leaderboard-hero-redesign.png"
              alt="Leaderboard redesign showcase"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/leaderboard-redesign-table.png"
              alt="Leaderboard redesign showcase"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
          <p className="text-white font-normal mt-8">
            We have revamped our existing leaderboard to make it more engaging and interactive. Now
            you can see your progress in real-time and compete with your friends. <br />
            View the leaderboard{' '}
            <Link href="/leaderboard" className="text-accent">
              here
            </Link>
          </p>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
