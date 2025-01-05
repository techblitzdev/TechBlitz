'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface ResizerProps {
  onResize: (newLeftWidth: number) => void;
}

export default function Resizer({ onResize }: ResizerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const resizerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const newLeftWidth = e.clientX;
      onResize(newLeftWidth);
    },
    [isDragging, onResize]
  );

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={resizerRef}
      className={`
        group relative w-1 cursor-col-resize transition-all duration-150
        before:absolute before:inset-y-0 before:-left-1 before:w-3 before:cursor-col-resize
        after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2
        after:h-8 after:w-[2px] after:rounded-full after:bg-black-50 after:transition-all
        hover:after:bg-black-25 hover:after:h-12
        ${isDragging ? 'after:bg-black-25 after:h-12' : ''}
      `}
      onMouseDown={handleMouseDown}
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize sections"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft' && resizerRef.current) {
          onResize(Math.max(resizerRef.current.offsetLeft - 10, 0));
        }
        if (e.key === 'ArrowRight' && resizerRef.current) {
          onResize(
            Math.min(resizerRef.current.offsetLeft + 10, window.innerWidth)
          );
        }
      }}
    />
  );
}
