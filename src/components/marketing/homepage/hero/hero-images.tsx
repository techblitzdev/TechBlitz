import Image from 'next/image';
import DashboardImg from '../../../../public/images/dashboard-img.png';

export default function HomepageHeroImages() {
  return (
    <div className="relative h-full">
      <Image
        className="z-30 rounded-lg bg-[#000000] border border-black-50"
        src={DashboardImg}
        width={1600}
        height={1600}
        alt="Dashboard"
        priority={true}
      />
    </div>
  );
}
