'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardImg from '../../../../public/images/dashboard-img.png';

export default function HomepageHeroImages() {
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
      iframeRef.current.src =
        'https://customer-8s5ov2shcw99ezk2.cloudflarestream.com/340defc1b25f5c2605e6533e8a015f2a/iframe?poster=https%3A%2F%2Fcustomer-8s5ov2shcw99ezk2.cloudflarestream.com%2F340defc1b25f5c2605e6533e8a015f2a%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&autoplay=true';
    }

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [isVideoPlaying]);

  return (
    <div className="relative h-full overflow-hidden rounded-lg shadow-2xl px-0 md:px-20">
      {/* Static Image */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isVideoPlaying ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-10"
      >
        <Image
          className="rounded-lg bg-black border border-black/50"
          src={DashboardImg}
          fill
          alt="Dashboard preview"
          priority={true}
          style={{ objectFit: 'cover' }}
        />
      </motion.div>

      {/* Play Button */}
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

      {/* Video */}
      <div
        className={`absolute inset-0 z-15 ${
          isVideoPlaying ? 'visible' : 'invisible'
        }`}
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
            width: '100%'
          }}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen={true}
        ></iframe>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-20 md:h-40 lg:h-80 bg-gradient-to-t from-[#000] to-transparent pointer-events-none z-30"></div>
    </div>
  );
}
