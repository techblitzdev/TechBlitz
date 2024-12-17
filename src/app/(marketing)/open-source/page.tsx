import CallToActionBlock from '@/components/marketing/global/call-to-action-block';
import MarketingContentGrid, {
  type MarketingContentGridProps
} from '@/components/marketing/global/content-grid';
import OpenSourceBlock from '@/components/marketing/global/open-source/open-source-block';
import ResourceOpenSourceHeroBlock from '@/components/marketing/resources/open-source/open-source-hero';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Building2Icon } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Open Source | TechBlitz',
  description:
    'TechBlitz is open-source and community-driven. Learn more about our mission and how you can contribute to our platform.'
};

const items: MarketingContentGridProps[] = [
  {
    icon: (
      <MagnifyingGlassIcon
        width={24}
        height={24}
      />
    ),
    title: 'Transparency',
    description:
      'At TechBlitz, transparency is key. We openly share our source code to foster trust and collaboration with the developer community.'
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 12 12"
      >
        <path
          fill="currentColor"
          d="M5 2.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0M6 7a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M3.55 5H2a1 1 0 0 0-1 1v.207c0 .596.343 1.086.797 1.407c.272.193.597.336.952.42c.269-.488.736-.85 1.292-.981A2.49 2.49 0 0 1 3.55 5m4.41 2.053a2 2 0 0 1 1.291.98c.355-.083.68-.226.952-.419c.454-.32.797-.811.797-1.407V6a1 1 0 0 0-1-1H8.45a2.51 2.51 0 0 1-.49 2.053M4.5 8a1 1 0 0 0-1 1v.167c0 .587.357 1.058.808 1.358C4.763 10.83 5.363 11 6 11s1.237-.171 1.692-.475c.45-.3.808-.771.808-1.358V9a1 1 0 0 0-1-1zM9 4a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
        />
      </svg>
    ),
    title: 'Community-driven',
    description:
      'Our thriving community shapes TechBlitz’s direction. Share your ideas and help us create tools and features that meet your needs.'
  },
  {
    icon: <Building2Icon size={24} />,
    title: 'Cutting-edge Education',
    description:
      'Stay ahead in tech with TechBlitz. Our innovative platform delivers targeted, AI-powered learning tools to enhance your skills effectively.'
  }
];

export default function OpenSourcePage() {
  return (
    <div className="container">
      <ResourceOpenSourceHeroBlock />
      <OpenSourceBlock linkToInternalPage={false} />
      <MarketingContentGrid
        title="For developers, built by developers"
        items={items}
      />
      <CallToActionBlock title="The smarter way to stay on top of tech" />
    </div>
  );
}
