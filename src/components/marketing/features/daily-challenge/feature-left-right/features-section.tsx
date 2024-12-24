import FeatureLeftRightSectionOne from './section-one';
import FeatureLeftRightSectionThree from './section-three';

export default function FeatureLeftRightSection() {
  return (
    <div className="flex flex-col gap-24 pt-32 lg:pt-16 pb-8 lg:pb-36">
      <FeatureLeftRightSectionOne />
      <FeatureLeftRightSectionThree />
    </div>
  );
}
