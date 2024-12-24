import FeatureLeftRightSectionOne from './section-one';
import FeatureLeftRightSectionTwo from './section-two';
import FeatureLeftRightSectionThree from './section-three';

export default function FeatureLeftRightSection() {
  return (
    <div className="flex flex-col gap-24 pt-32 lg:pt-44 pb-36">
      <FeatureLeftRightSectionOne />
      <FeatureLeftRightSectionTwo />
      <FeatureLeftRightSectionThree />
    </div>
  );
}
