'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Placeholder device components (you'll replace these with actual device mockups)
const DesktopView = () => (
  <div className="bg-black-50 w-full h-96 flex items-center justify-center">
    Desktop View
  </div>
);

const TabletView = () => (
  <div className="bg-black-50 w-3/4 h-72 flex items-center justify-center">
    Tablet View
  </div>
);

const MobileView = () => (
  <div className="bg-black-50 w-1/2 h-72 flex items-center justify-center">
    Mobile View
  </div>
);

export default function ComparisonDeviceShowcase() {
  const [currentDevice, setCurrentDevice] = useState('desktop');

  const deviceComponents = {
    desktop: DesktopView,
    tablet: TabletView,
    mobile: MobileView
  };

  const deviceOrder = ['desktop', 'tablet', 'mobile'];

  useEffect(() => {
    // Set up an interval to automatically change devices every 5 seconds
    const deviceCycleInterval = setInterval(() => {
      setCurrentDevice((prevDevice) => {
        const currentIndex = deviceOrder.indexOf(prevDevice);
        const nextIndex = (currentIndex + 1) % deviceOrder.length;
        return deviceOrder[nextIndex];
      });
    }, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(deviceCycleInterval);
  }, []); // Empty dependency array means this effect runs once on mount

  const CurrentDeviceComponent = deviceComponents[currentDevice];

  return (
    <div className="border-r border-black-50 p-20 pl-0">
      <motion.div
        key={currentDevice}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <CurrentDeviceComponent />
      </motion.div>
    </div>
  );
}
