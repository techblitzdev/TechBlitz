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
      <div className="absolute inset-x-0 w-full bottom-0 h-20 lg:h-80 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none"></div>
    </div>
  );
}
