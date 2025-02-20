'use client';

import type React from 'react';
import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, type MotionValue } from 'framer-motion';
import { QUESTIONS_COUNT } from '@/utils/constants';
import { use } from 'react';
import JavascriptIcon from '@/components/ui/icons/javascript';
import GitIcon from '@/components/ui/icons/git';
import ReactIcon from '@/components/ui/icons/react';
import GlobeIcon from '@/components/ui/icons/globe';
import ArrayIcon from '@/components/ui/icons/array';

interface HomepageUserStatsProps {
  userCountPromise: Promise<number>;
}

export default function HomepageUserStats({ userCountPromise }: HomepageUserStatsProps) {
  const userCount = Math.round(use(userCountPromise) / 10) * 10;

  return (
    <section className="pt-40 pb-24 lg:pb-52 relative overflow-hidden">
      <div className="flex flex-col gap-y-4 justify-center items-center relative z-10">
        <h6 className="text-lg text-gradient from-white to-white/55">A growing community with</h6>
        <div className="flex flex-col items-center justify-center [&>*]:text-5xl [&>*]:py-1 [&>*]:text-gradient [&>*]:from-white [&>*]:to-white/55">
          <h6 className="text-center">Over {QUESTIONS_COUNT} challenges</h6>
          <h6 className="text-center">Over {userCount} users</h6>
          <h6 className="text-center">Unlimited practice</h6>
        </div>
      </div>
      <div className="absolute inset-0 top-[50px] md:top-0 opacity-20 sm:opacity-100">
        <FloatingChips />
      </div>
    </section>
  );
}

const FloatingChips = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <FloatingChip
        href="/roadmaps/javascript-fundamentals"
        Icon={JavascriptIcon}
        top="10%"
        left="10%"
        mouseX={mouseX}
        mouseY={mouseY}
      />
      <FloatingChip Icon={GitIcon} top="20%" right="15%" mouseX={mouseX} mouseY={mouseY} />
      <FloatingChip
        href="/roadmaps/react-hooks-fundamentals"
        Icon={ReactIcon}
        bottom="15%"
        left="20%"
        mouseX={mouseX}
        mouseY={mouseY}
      />
      <FloatingChip Icon={GlobeIcon} bottom="25%" right="10%" mouseX={mouseX} mouseY={mouseY} />
      <FloatingChip
        href="/roadmaps/arrays"
        Icon={ArrayIcon}
        top="5%"
        left="50%"
        mouseX={mouseX}
        mouseY={mouseY}
      />
    </>
  );
};

interface FloatingChipProps {
  Icon: React.ElementType;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  href?: string;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

const FloatingChip: React.FC<FloatingChipProps> = ({ Icon, href, mouseX, mouseY, ...position }) => {
  const x = useSpring(useMotionValue(0), { stiffness: 50, damping: 30 });
  const y = useSpring(useMotionValue(0), { stiffness: 50, damping: 30 });

  useEffect(() => {
    const unsubscribeX = mouseX.onChange((latestX) => {
      const deltaX = latestX - window.innerWidth / 2;
      // adjust divisor to control sensitivity
      x.set(deltaX / 20);
    });

    const unsubscribeY = mouseY.onChange((latestY) => {
      const deltaY = latestY - window.innerHeight / 2;
      // adjust divisor to control sensitivity
      y.set(deltaY / 20);
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, x, y]);

  return (
    <motion.a
      href={href}
      className="absolute bg-black border border-black-50 backdrop-blur-sm rounded p-4 flex items-center gap-2 text-sm text-white"
      style={{
        ...position,
        x,
        y,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon size={28} />
    </motion.a>
  );
};
