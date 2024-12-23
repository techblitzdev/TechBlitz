import LeftRightBlock from '@/components/marketing/global/left-right-block';
import {
  LeftSectionOne,
  RightSectionOne,
} from '@/components/marketing/features/daily-challenge/feature-left-right/section-one';
import {
  LeftSectionTwo,
  RightSectionTwo,
} from '@/components/marketing/features/daily-challenge/feature-left-right/section-two';
import {
  LeftSectionThree,
  RightSectionThree,
} from '@/components/marketing/features/daily-challenge/feature-left-right/section-three';

export default function FeatureLeftRightSection() {
  return (
    <div className="flex flex-col gap-24 pt-32 lg:pt-52 pb-36">
      <LeftRightBlock left={<LeftSectionOne />} right={<RightSectionOne />} />
      <LeftRightBlock left={<LeftSectionTwo />} right={<RightSectionTwo />} />
      <LeftRightBlock
        left={<LeftSectionThree />}
        right={<RightSectionThree />}
      />
    </div>
  );
}
