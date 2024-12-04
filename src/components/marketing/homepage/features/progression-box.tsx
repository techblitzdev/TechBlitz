'use client';

import { motion } from 'framer-motion';
import ProgressChart from './progression-chart';

export default function ProgressionBentoBox() {
  return (
    <>
      {/* Top Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden absolute z-10 top-28 flex flex-col gap-4 w-full rounded-lg group-hover:!skew-y-2 group-hover:!top-[120px] group-hover:!-left-2 transition-all duration-300"
      >
        <ProgressChart />
      </motion.div>

      {/* Bottom Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden absolute z-0 top-28 flex flex-col gap-4 w-full rounded-lg group-hover:!skew-y-2 transition-all duration-300"
        style={{
          background:
            'radial-gradient(128% 107% at 100% 100%, #212121 0%, rgb(0,0,0) 77.61%)',
          transformOrigin: 'center center'
        }}
      >
        <ProgressChart />
      </motion.div>
    </>
  );
}
