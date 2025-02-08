'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function ScrollToStartButton() {
  const [showButton, setShowButton] = useState(false);
  const [isAbove, setIsAbove] = useState(false);

  useEffect(() => {
    const checkStartVisibility = () => {
      const startElement = document.getElementById('roadmap-start');
      if (startElement) {
        const rect = startElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Show button if element is out of viewport
        const isOutOfView = rect.top < 0 || rect.bottom > viewportHeight;
        setShowButton(isOutOfView);
        setIsAbove(rect.top < 0);
      }
    };

    window.addEventListener('scroll', checkStartVisibility);
    checkStartVisibility(); // Initial check

    return () => window.removeEventListener('scroll', checkStartVisibility);
  }, []);

  const scrollToStart = () => {
    const startElement = document.getElementById('roadmap-start');
    startElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  if (!showButton) return null;

  return (
    <Button
      onClick={scrollToStart}
      className="absolute top-0 right-0 rounded-full p-2 z-50"
      size="icon"
      variant="default"
    >
      {isAbove ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
    </Button>
  );
}
