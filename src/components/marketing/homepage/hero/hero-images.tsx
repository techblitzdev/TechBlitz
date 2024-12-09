'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardImg from '../../../../public/images/dashboard-img.png';

export default function HomepageHeroImages() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative h-full overflow-hidden rounded-lg shadow-2xl px-0 md:px-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10"
      >
        <Image
          className="rounded-lg bg-black border border-black/50"
          src={DashboardImg}
          width={1600}
          height={1600}
          alt="Dashboard preview"
          priority={true}
        />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="bg-accent hover:bg-accent/90 rounded-full p-4 flex items-center justify-center cursor-pointer shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play className="w-8 h-8 text-white fill-white" />
        </motion.div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-20 md:h-40 lg:h-80 bg-gradient-to-t from-[#000] to-transparent pointer-events-none z-30"></div>
    </div>
  );
}
