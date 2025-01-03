import StatsHero from '@/components/marketing/features/statistics/stats-hero';
import CallToActionBlock from '@/components/marketing/global/call-to-action-block';
import MarketingContentGrid from '@/components/marketing/global/content-grid';
import { MobileIcon } from '@radix-ui/react-icons';
import { BarChart, Code, FileBadge2, LaptopIcon } from 'lucide-react';

const featureShowcaseItems = [
  {
    title: 'Build Unbreakable Coding Habits',
    description:
      'Stay motivated with daily coding streaks and achievement milestones that reinforce consistent learning habits.',
    icon: <Code />,
  },
  {
    title: 'Comprehensive Skill Analytics',
    description:
      'Monitor your mastery across programming languages, algorithms, and system design with detailed performance metrics.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 14 14"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="7" cy="7" r="6.5" />
          <path d="M7 .5V7l4.6 4.6" />
        </g>
      </svg>
    ),
  },
  {
    title: 'Personalized Learning Insights',
    description:
      'Receive data-driven recommendations and personalized learning paths based on your unique strengths and areas for improvement.',
    icon: <FileBadge2 />,
  },
  {
    title: 'Adaptive Learning Technology',
    description:
      'Experience dynamic question generation that evolves with your skill level, ensuring optimal learning progression.',
    icon: <LaptopIcon />,
  },
  {
    title: 'Interactive Progress Dashboard',
    description:
      'Transform your learning data into actionable insights with beautiful, interactive charts and progress visualizations.',
    icon: <BarChart />,
  },
  {
    title: 'Learn Anywhere, Anytime',
    description:
      'Track your coding journey seamlessly across all devices with our responsive, mobile-first statistics dashboard.',
    icon: <MobileIcon />,
  },
];

export default function StatisticsPage() {
  return (
    <div className="container">
      <StatsHero />
      <MarketingContentGrid
        title="Tracking your coding journey made simple."
        items={featureShowcaseItems}
      />
      <CallToActionBlock
        title="The simplest way to track your progress."
        leftCta={{
          title: 'Get Started',
          href: '/signup',
        }}
      />
    </div>
  );
}
