import CallToActionBlock from '@/components/marketing/global/call-to-action-block';
import OpenSourceBlock from '@/components/marketing/global/open-source/open-source-block';
import ResourceOpenSourceHeroBlock from '@/components/marketing/resources/open-source/open-source-hero';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roadmap | techblitz',
  description:
    'View our upcoming features and determine what you would like to see next.'
};

export default function RoadmapPage() {
  return (
    <div className="container">
      <ResourceOpenSourceHeroBlock />
      <OpenSourceBlock />
      <CallToActionBlock title="The smarter way to stay on top of tech" />
    </div>
  );
}
