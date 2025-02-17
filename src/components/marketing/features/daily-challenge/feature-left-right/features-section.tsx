import FeatureLeftRightSectionOne from './section-one';
import FeatureLeftRightSectionThree from './section-three';

export default function FeatureLeftRightSection(opts: {
  leftHeader?: string;
  leftSubheader?: string;
  learnMoreLink?: boolean;
  leftCta?: {
    title: string;
    href: string;
  } | null;
  rightHeader?: string;
  rightSubheader?: string;
}) {
  const {
    leftHeader,
    leftSubheader,
    learnMoreLink = false,
    rightHeader,
    rightSubheader,
    leftCta,
  } = opts;

  return (
    <div className="flex flex-col gap-24 pt-32 lg:pt-16 pb-8 lg:pb-36">
      <FeatureLeftRightSectionOne
        leftHeader={leftHeader}
        leftSubheader={leftSubheader}
        learnMoreLink={learnMoreLink}
        leftCta={{
          title: leftCta?.title ?? '',
          href: leftCta?.href ?? '',
        }}
      />
      <FeatureLeftRightSectionThree rightHeader={rightHeader} rightSubheader={rightSubheader} />
    </div>
  );
}
