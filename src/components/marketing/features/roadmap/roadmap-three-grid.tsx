import Link from 'next/link';
import FeaturesContentHeader from '../global/content-header';
import RoadmapGridItemOne from './grid/roadmap-grid-item-one';

const description = () => {
  return (
    <span>
      It's a secret! (Just kidding, the source code is{' '}
      <Link
        href="https://github.com/Logannford/TechBlitz/tree/main/src/actions/ai"
        className="text-accent underline"
        target="_blank"
      >
        here
      </Link>
      ).
    </span>
  );
};

export default function FeatureRoadmapThreeGridBlock() {
  return (
    <section className="py-16 px-4 md:pt-24 md:pb-32 flex flex-col gap-y-10">
      <FeaturesContentHeader
        title="How roadmaps works"
        description={description()}
      />
      <RoadmapGridItemOne />
    </section>
  );
}
