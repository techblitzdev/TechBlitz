'use client';

import { useState, useRef, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

import { FC } from 'react';
import { cn } from '@/lib/utils';

interface HomepageHeroImagesProps {
  imageSrc: StaticImageData;
  videoSrc: string;
  videoPoster: string;
  fadeDirection?: 'top' | 'bottom';
}

const HomepageHeroImages: FC<HomepageHeroImagesProps> = ({
  imageSrc,
  videoSrc,
  videoPoster,
  fadeDirection = 'bottom',
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handlePlayClick = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
    if (iframeRef.current) {
      iframeRef.current.src = 'about:blank';
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'video-end') {
        handleVideoEnd();
      }
    };

    window.addEventListener('message', handleMessage);

    if (isVideoPlaying && iframeRef.current) {
      iframeRef.current.src = `${videoSrc}?poster=${encodeURIComponent(videoPoster)}&autoplay=true`;
    }

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [isVideoPlaying, videoSrc, videoPoster]);

  return (
    <div className="relative h-full overflow-hidden rounded-lg shadow-2xl px-0 md:px-20">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isVideoPlaying ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="md:absolute inset-0 z-10"
      >
        <Image
          className="rounded-lg bg-black border border-black/50"
          src={imageSrc}
          fill
          alt="Dashboard preview"
          priority
          style={{ objectFit: 'cover' }}
          loading="eager"
        />
      </motion.div>

      {!isVideoPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.div
            className="bg-accent hover:bg-accent/90 rounded-full p-4 flex items-center justify-center cursor-pointer shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayClick}
          >
            <Play className="w-8 h-8 text-white fill-white" />
          </motion.div>
        </div>
      )}

      <div
        className={`absolute inset-0 z-15 ${isVideoPlaying ? 'visible' : 'invisible'}`}
        style={{ position: 'relative', paddingTop: '61.64383561643836%' }}
      >
        <iframe
          ref={iframeRef}
          src="about:blank"
          loading="lazy"
          style={{
            border: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
          }}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
        ></iframe>
      </div>

      {!isVideoPlaying && (
        <div
          className={cn(
            'absolute inset-x-0  h-20 md:h-40 lg:h-80  from-[#000] to-transparent pointer-events-none z-30',
            fadeDirection === 'top' ? 'top-0 bg-linear-to-b' : 'bottom-0 bg-linear-to-t'
          )}
        />
      )}
    </div>
  );
};

export default HomepageHeroImages;
