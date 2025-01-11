'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';

interface ResizableLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  initialLeftWidth?: number;
}

const ResizableLayout: React.FC<ResizableLayoutProps> = ({
  leftContent,
  rightContent,
  initialLeftWidth = 50,
}) => {
  const [leftWidth, setLeftWidth] = useState(initialLeftWidth);

  const containerRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeftWidth =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;
      const clampedWidth = Math.min(Math.max(newLeftWidth, 30), 70);
      setLeftWidth(clampedWidth);
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  useEffect(() => {
    const resizer = resizerRef.current;
    resizer?.addEventListener('mousedown', handleMouseDown as any);

    return () => {
      resizer?.removeEventListener('mousedown', handleMouseDown as any);
    };
  }, [handleMouseDown]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col lg:flex-row w-full overflow-hidden lg:h-[calc(100vh-4rem)]"
    >
      <div
        className="w-full lg:w-[var(--left-width)] overflow-y-auto"
        style={
          {
            '--left-width': `${leftWidth}%`,
            '--left-height': '100%',
          } as React.CSSProperties
        }
      >
        {leftContent}
      </div>
      <div
        ref={resizerRef}
        className={`
          group relative w-full h-1 lg:h-auto lg:w-1 cursor-row-resize lg:cursor-col-resize 
          transition-all duration-150 hidden lg:block
          before:absolute before:inset-x-0 lg:before:inset-y-0 before:h-3 lg:before:h-auto 
          before:-top-1 lg:before:top-0 lg:before:-left-1 before:w-full lg:before:w-3 
          before:cursor-row-resize lg:before:cursor-col-resize
          after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2
          after:w-24 lg:after:w-[3px] after:h-[3px] lg:after:h-24 
          after:rounded-full after:bg-black-50 after:transition-all
          hover:after:bg-black-25 hover:after:w-32 lg:hover:after:w-[3px] 
          hover:after:h-[3px] lg:hover:after:h-32
        `}
      />
      <div
        className="w-full lg:w-[var(--right-width)] overflow-y-auto"
        style={
          {
            '--right-width': `${100 - leftWidth}%`,
            '--right-height': '100%',
          } as React.CSSProperties
        }
      >
        {rightContent}
      </div>
    </div>
  );
};

export default ResizableLayout;
