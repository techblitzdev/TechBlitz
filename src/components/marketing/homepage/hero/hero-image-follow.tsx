'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function HeroImageFollow({ className }: { className?: string }) {
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
    <div className={className}>
      {/* 'Set a goal' card - floating top right */}
      <FloatingImage
        src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//Screenshot%202025-03-14%20at%2023.05.41-min.png"
        alt="Set a goal"
        width={400}
        height={200}
        className="rounded-lg border-2 border-primary/30 group-hover:blur-sm"
        position={{ top: '15%', right: '-5%' }}
        width_pct="20%"
        mouseX={mouseX}
        mouseY={mouseY}
      />

      {/* Daily missions card - floating bottom left */}
      <FloatingImage
        src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//Screenshot%202025-03-14%20at%2023.05.14-min.png"
        alt="Daily missions"
        width={350}
        height={175}
        className="rounded-lg border-2 border-primary/30 group-hover:blur-sm"
        position={{ bottom: '10%', left: '-8%' }}
        width_pct="20%"
        mouseX={mouseX}
        mouseY={mouseY}
      />

      {/** calendar card - floating bottom right */}
      <FloatingImage
        src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//Screenshot%202025-03-14%20at%2023.24.42-min.png"
        alt="A calendar showing the month of March 2025, with the users progress highlighted"
        width={380}
        height={190}
        className="rounded-lg border-2 border-primary/30 group-hover:blur-sm"
        position={{ bottom: '-5%', right: '-5%' }}
        width_pct="18%"
        mouseX={mouseX}
        mouseY={mouseY}
      />
    </div>
  );
}

interface FloatingImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
  position: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  width_pct: string;
  mouseX: any;
  mouseY: any;
}

const FloatingImage: React.FC<FloatingImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  position,
  width_pct,
  mouseX,
  mouseY,
}) => {
  const x = useSpring(useMotionValue(0), { stiffness: 40, damping: 30 });
  const y = useSpring(useMotionValue(0), { stiffness: 40, damping: 30 });

  useEffect(() => {
    const unsubscribeX = mouseX.onChange((latestX: number) => {
      const deltaX = latestX - window.innerWidth / 2;
      // adjust divisor to control sensitivity
      x.set(deltaX / 50);
    });

    const unsubscribeY = mouseY.onChange((latestY: number) => {
      const deltaY = latestY - window.innerHeight / 2;
      // adjust divisor to control sensitivity
      y.set(deltaY / 50);
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, x, y]);

  return (
    <motion.div
      className={`absolute shadow-xl z-10`}
      style={{
        ...position,
        width: width_pct,
        x,
        y,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <Image src={src} alt={alt} width={width} height={height} className={className} />
    </motion.div>
  );
};
