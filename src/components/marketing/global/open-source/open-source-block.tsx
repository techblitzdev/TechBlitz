import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

// import these dynamically for performance reasons
// they do not need to be in the main bundle
import OpenSourceCard from './open-source-card';
import CommitCard from './commit-card';
import Link from 'next/link';

type cardStyle = 'comment' | 'issue' | 'pr';
type ActionType = 'contributor' | 'comment' | 'owner' | 'issue' | 'author';
type GithubCard = {
  contributorName?: string;
  actionType: ActionType;
  component: 'OpenSourceCard' | 'CommitCard';
  cardStyle: cardStyle;
  content: string;
};

type CommitCardType = {
  component: 'CommitCard';
  commitMessage: string;
  buildSuccess?: boolean;
};

type GithubCardType = GithubCard | CommitCardType;

export default function OpenSourceBlock(opts: { linkToInternalPage?: boolean }) {
  const { linkToInternalPage = false } = opts;

  const githubCards: GithubCardType[] = [
    {
      contributorName: 'Anonymous Contributor (you)',
      actionType: 'contributor',
      component: 'OpenSourceCard',
      cardStyle: 'pr',
      content: 'This pull request address the issue with z-indexing on the questions page',
    },
    {
      component: 'CommitCard',
      commitMessage: 'fix(dashboard/questions): fix z-indexing on questions page',
      buildSuccess: true,
    },
    {
      contributorName: 'techblitz',
      actionType: 'owner',
      component: 'OpenSourceCard',
      cardStyle: 'comment',
      content: 'Great work! Thanks for the contribution. Could you add a test for this as well?',
    },
    {
      contributorName: 'Anonymous Contributor (you)',
      actionType: 'author',
      component: 'OpenSourceCard',
      cardStyle: 'comment',
      content: 'Yes, I can add a test for this. I will update the PR shortly.',
    },
  ];

  return (
    <section className="pb-20 md:pb-52 grid grid-cols-12 gap-4 lg:gap-16 relative">
      <div className="flex flex-col gap-y-3 col-span-full lg:col-span-5 self-center">
        <h1 className="text-2xl lg:text-5xl font-sans! leading-[normal]! text-gradient from-white to-white/55">
          Secrets are for Magicians, Not Software
        </h1>
        <p className="text-gray-400">
          We believe in transparency and sharing knowledge. That’s why we are an open-source coding
          platform. Giving you insights into how we build our platform.
        </p>
        <div className="flex gap-4">
          {linkToInternalPage && (
            <Button href="/open-source" variant="default">
              Learn More
            </Button>
          )}
          <Link href="https://git.new/blitz" target="_blank" className="w-fit">
            <Button variant="secondary" className="w-fit flex gap-x-1">
              <Star className="size-5 text-yellow-400 fill-yellow-300" />
              on GitHub!
            </Button>
          </Link>
        </div>
      </div>
      {/** illustration / GH card area */}
      <div className="col-span-full lg:col-span-7 relative overflow-y-clip h-80 lg:h-auto lg:max-h-[450px] lg:[transform:perspective(4101px)_rotateX(47deg)_rotateY(-13deg)_rotateZ(31deg)] top-8 duration-700">
        <div className="absolute inset-x-0 w-full top-0 h-20 bg-linear-to-b from-[#000000] to-transparent pointer-events-none"></div>
        {/** 'timeline' line */}
        <div className="absolute inset-y-0 w-[2px] h-full left-4 bg-[#3d444db3] -z-10" />
        <div
          className="flex flex-col gap-10 z-10"
          style={
            {
              '--question-count': githubCards.length,
            } as React.CSSProperties
          }
        >
          {githubCards.map((card, idx) => (
            <>
              {card.component === 'OpenSourceCard' && <OpenSourceCard key={idx} {...card} />}
              {card.component === 'CommitCard' && (
                <CommitCard
                  key={idx}
                  commitMessage={'commitMessage' in card ? card.commitMessage : ''}
                  buildSuccess={'buildSuccess' in card ? card.buildSuccess : undefined}
                />
              )}
            </>
          ))}
        </div>
        <div className="absolute inset-x-0 w-full bottom-0 h-20 bg-linear-to-t from-[#000000] to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
}
