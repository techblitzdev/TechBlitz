import Link from 'next/link';

export interface ChangelogEntry {
  slug: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  content: React.ReactNode;
}

export const changelogEntries: ChangelogEntry[] = [
  {
    slug: 'faster-than-ai-game-mode',
    title: 'Faster than AI game mode',
    date: '29/03/25',
    description: "We've added our first game mode to TechBlitz. Faster than AI.",
    image:
      'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//Screenshot%202025-03-29%20at%2016.23.08.png',
    content: (
      <div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//Screenshot%202025-03-29%20at%2016.23.08.png"
            alt="Faster than AI game mode"
          />
          <img
            src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//Screenshot%202025-03-29%20at%2016.23.55.png"
            alt="Faster than AI game mode completed question"
          />
        </div>
        <h5 className="text-white font-normal mt-8 text-xl">Faster than AI game mode</h5>
        <p className="text-gray-400 font-normal mt-4">
          We've added our first game mode to TechBlitz. Faster than AI. This is a fun way to
          challenge yourself and see how much faster you can solve a question than widely available
          AI models.
        </p>
        <br />
        <p className="text-gray-400">
          To enable this game mode, simply go to your{' '}
          <Link href="/settings/profile" className="text-accent">
            settings page
          </Link>{' '}
          and toggle the Faster than AI game mode.
        </p>
        <br />
        <p className="text-gray-400">
          We added this game mode as a nice little extra to the platform, giving you a fun way to
          challenge yourself and see how much faster you can solve a question than widely available
          AI models.
        </p>
      </div>
    ),
  },
  {
    slug: 'new-question-type',
    title: 'New question type',
    date: '10/03/25',
    description:
      "We've added a new question type that allows you to gain new coding knowledge in a fun and engaging way.",
    image:
      'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//Screenshot%202025-03-29%20at%2016.41.28.png',
    content: (
      <div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//Screenshot%202025-03-29%20at%2016.41.28.png"
            alt="Simple multiple choice question"
          />
        </div>
        <h5 className="text-white font-normal mt-8 text-xl">New question type</h5>
        <p className="text-gray-400 font-normal mt-4">
          Sometimes you don't have time to answer our longer-form questions. So we've added a new
          question type that allows you to gain new coding knowledge in a fun and engaging way, in a
          matter of minutes.
        </p>
        <br />
        <p className="text-gray-400">
          These questions will pop up during your learning journey with TechBlitz, and more are
          being added to the platform regularly.
        </p>
        <br />
        <p className="text-gray-400">
          We are always looking for feedback and suggestions for new features. If you have any
          feedback, please let us know at{' '}
          <Link href="mailto:team@techblitz.dev" className="text-accent">
            team@techblitz.dev
          </Link>
          .
        </p>
      </div>
    ),
  },
  {
    slug: 'roadmaps-redesigned',
    title: 'Roadmaps redesigned, daily missions & more',
    date: '08/02/25',
    description: 'We have redesigned our roadmaps to be more engaging and easier to use.',
    image:
      'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//08-02-25-roadmap-redesign.png',
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
        <h5 className="text-white font-normal mt-8 text-xl">
          Roadmaps redesigned, daily missions & more
        </h5>
        <p className="text-gray-400 font-normal mt-4">
          We were getting a lot of feedback that our roadmaps we quite... boring. So we have
          redesigned them to be more engaging and easier to use.
        </p>
        <br />
        <p className="text-gray-400">
          You can now easily see your next question in your study path, your progress and easily
          enroll in a new study path.
        </p>
        <br />
        <p className="text-gray-400">
          This is just the first step of many to come. We are constantly looking for feedback and
          will be adding more features and improvements to the platform.
        </p>
        <br />
        <p className="text-gray-400">
          We also decided as a part of this update to add daily missions. These are a set of daily
          challenges that you can complete to earn rewards and improve your skills.
        </p>
        <br />
        <p className="text-gray-400">We will be adding more missions over time, so stay tuned!</p>
        <br />
        <p className="text-gray-400">
          You can also now sign up and sign in with Google. This is a much faster and easier way to
          sign up for TechBlitz.
        </p>
        <br />
        <p className="text-gray-400">
          We also added a new referral program. When you refer a friend to TechBlitz, you will earn
          10% off all paid plans once they sign up!
        </p>
        <br />
        <p className="text-gray-400">
          If you have any feedback, or any suggestions for new features, please let us know at{' '}
          <Link href="mailto:team@techblitz.dev" className="text-accent">
            team@techblitz.dev
          </Link>
          .
        </p>
        <br />
        <p className="text-gray-400">Happy coding! 🚀</p>
      </div>
    ),
  },
  {
    slug: 'free-roadmaps',
    title: 'Free roadmaps, test cases, personalized challenges emails & more',
    date: '02/02/25',
    description: 'We listened to feedback, and added roadmaps, free to all users.',
    image:
      'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//study-path-overview.png',
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
        <h5 className="text-white font-normal mt-8 text-xl">
          Free roadmaps, test cases, personalized challenges emails & more
        </h5>
        <p className="text-gray-400 font-normal mt-4">
          We listened to feedback, and added roadmaps, free to all users. Roadmaps give you a
          structured way to learn and improve your skills, ranging from fundamentals to more
          advanced topics.
        </p>
        <br />
        <p className="text-gray-400">
          We are adding new roadmaps regularly, and are always looking for feedback to improve them.
          So if you have any suggestions, please let us know at{' '}
          <Link href="mailto:team@techblitz.dev" className="text-accent">
            team@techblitz.dev
          </Link>
          .
        </p>
        <br />
        <p className="text-gray-400">
          We also added test cases to our code editor questions. This gives you an easy way to view
          what the expected output is, and compare it to your output.
        </p>
        <br />
        <p className="text-gray-400">
          We also made the decision to remove the daily challenge being sent out to users who opted
          in to receive them. (You can opt in to receive them again in your settings,{' '}
          <Link href="/settings/profile" className="text-accent">
            here
          </Link>
          ) . From now on, all users will receive a suggested question in their inbox every weekday.
          This allows for a more personalized experience, and allows you to choose when you want to
          complete your daily challenge.
        </p>
        <br />
        <p className="text-gray-400">
          These new features are only a few of the many we have added. We are constantly working to
          improve the platform and make learning more enjoyable for you!
        </p>
        <br />
        <p className="text-gray-400">
          If you have any feedback, or any suggestions for new features, please let us know at{' '}
          <Link href="mailto:team@techblitz.dev" className="text-accent">
            team@techblitz.dev
          </Link>
          .
        </p>
        <br />
        <p className="text-gray-400">Happy coding! 🚀</p>
      </div>
    ),
  },
  {
    slug: 'question-redesign',
    title: 'Question answer redesign, quick question access, upgraded filters & more',
    date: '23/01/25',
    description:
      'We have redesigned the question single page - allowing you to easily view if you have answered a question in the past.',
    image:
      'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/question-single-page-redesign-23-01-25.png',
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
        <div className="text-gray-400 font-normal mt-12">
          <h5 className="text-white font-normal mt-8 text-xl">
            Question answer redesign, quick question access, upgraded filters & more
          </h5>
          <p className="text-gray-400 font-normal mt-4">
            It's been a busy few days for us. We have redesigned the question single page - allowing
            you to easily view if you have answered a question in the past and making answering
            questions a much more enjoyable experience.
          </p>
          <br />
          <p className="text-gray-400">
            We heard your feedback and added a quick question access button to your dashboard.
            Allowing you to access your next question in instantly.
          </p>
          <br />
          <p className="text-gray-400">
            We also decided to redesign our filters to make it easier to find the questions you
            want. Going from multiple dropdowns to a single dropdown with a search bar.
          </p>
          <br />
          <p className="text-gray-400">
            Like a particular question? We have added a bookmark button to your question page.
            Allowing you to bookmark any question you want to come back to later - easily access it
            from the filters.
          </p>
          <br />
          <p className="text-gray-400">
            Finally, as TechBlitz is growing, we have added pagination to the leaderboard page.
            Allowing you to view your position in the leaderboard, no matter what place you are!
          </p>
          <br />
          <p className="text-gray-400">
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
          <p className="text-gray-400">Happy coding! 🚀</p>
        </div>
      </div>
    ),
  },
  {
    slug: 'code-editor-questions',
    title: 'Code editor questions - complete by code',
    date: '19/01/25',
    description: 'You can now write code to solve problems directly in the browser.',
    image:
      'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/code-editor-autocomplete-showcase.png',
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
        <h5 className="text-white font-normal mt-8 text-xl">
          Code editor questions - complete by code
        </h5>
        <p className="text-gray-400 font-normal mt-4">
          Multiple choice questions can be difficult for some people to fully grasp concepts and
          understand the material. We have added complete-by-code questions to our platform. You can
          now write code to solve the problem directly in the browser. Receive helpful hints.
          ai-assistance & more.{` `}
          <Link href="/question/sum-all-numbers-in-array" className="text-accent">
            Try it out now!
          </Link>{' '}
        </p>
      </div>
    ),
  },
  {
    slug: 'daily-challenge-reminders',
    title: 'Daily Challenge Reminders',
    date: '16/01/25',
    description:
      'Want to stay on top of your daily challenges? We have added daily challenge reminders to our platform.',
    image:
      'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/send-daily-reminder-toggle.png',
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
        <h5 className="text-white font-normal mt-8 text-xl">Daily Challenge Reminders</h5>
        <p className="text-gray-400 font-normal mt-4">
          Want to stay on top of your daily challenges? We have added daily challenge reminders to
          our platform. You can opt-in to receive a notification every day to complete your daily
          challenge. Opt-in via your settings page
        </p>
      </div>
    ),
  },
  {
    slug: 'leaderboard-redesign',
    title: 'Leaderboard Redesign',
    date: '11/01/25',
    description:
      'We have revamped our existing leaderboard to make it more engaging and interactive.',
    image:
      'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/leaderboard-hero-redesign.png',
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
        <h5 className="text-white font-normal mt-8 text-xl">Leaderboard Redesign</h5>
        <p className="text-gray-400 font-normal mt-4">
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
