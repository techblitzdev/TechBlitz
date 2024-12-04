'use client';
import Image from 'next/image';
import RoadmapDashboardImg from '@/public/images/roadmap-dashboard-img.png';
import DashboardImg from '@/public/images/dashboard-img.png';
import { motion } from 'motion/react';

export default function HomepageHeroImages() {
  return (
    <div className="relative h-full">
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
      >
        <Image
          className="hidden lg:block lg:absolute lg:top-12 lg:-right-20 rounded-lg bg-[#000000] border border-black-50 lg:scale-[1.25] aspect-video"
          src={RoadmapDashboardImg}
          width={1600}
          height={1600}
          alt="Roadmap Dashboard"
        />
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.1,
            duration: 0.3
          }
        }}
      >
        <Image
          className="z-30 lg:absolute lg:-right-56 lg:scale-[1.30] rounded-lg bg-[#000000] border border-black-50"
          src={DashboardImg}
          width={1600}
          height={1600}
          alt="Dashboard"
        />
      </motion.div>
    </div>
  );
}
