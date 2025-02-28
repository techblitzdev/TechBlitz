'use client';

import type React from 'react';
import { useState, useCallback, useRef, useEffect } from 'react';

interface ResizableLayoutProps {
  leftContent: React.ReactNode;
  rightTopContent: React.ReactNode;
  rightBottomContent: React.ReactNode;
  initialLeftWidth?: number;
  initialRightTopHeight?: number;
}

const ResizableLayout: React.FC<ResizableLayoutProps> = ({
  leftContent,
  rightTopContent,
  rightBottomContent,
  initialLeftWidth = 50,
  initialRightTopHeight = 50,
}) => {
  const [leftWidth, setLeftWidth] = useState(initialLeftWidth);
  const [rightTopHeight, setRightTopHeight] = useState(initialRightTopHeight);

  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalResizerRef = useRef<HTMLDivElement>(null);
  const verticalResizerRef = useRef<HTMLDivElement>(null);

  const handleHorizontalMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleHorizontalMouseMove);
    document.addEventListener('mouseup', handleHorizontalMouseUp);
  }, []);

  const handleHorizontalMouseMove = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      const clampedWidth = Math.min(Math.max(newLeftWidth, 30), 70);
      setLeftWidth(clampedWidth);
    }
  }, []);

  const handleHorizontalMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleHorizontalMouseMove);
    document.removeEventListener('mouseup', handleHorizontalMouseUp);
  }, [handleHorizontalMouseMove]);

  const handleVerticalMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleVerticalMouseMove);
    document.addEventListener('mouseup', handleVerticalMouseUp);
  }, []);

  const handleVerticalMouseMove = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      const rightSideRect = containerRef.current.lastElementChild?.getBoundingClientRect();
      if (rightSideRect) {
        const newTopHeight = ((e.clientY - rightSideRect.top) / rightSideRect.height) * 100;
        const clampedHeight = Math.min(Math.max(newTopHeight, 30), 70);
        setRightTopHeight(clampedHeight);
      }
    }
  }, []);

  const handleVerticalMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleVerticalMouseMove);
    document.removeEventListener('mouseup', handleVerticalMouseUp);
  }, [handleVerticalMouseMove]);

  useEffect(() => {
    const horizontalResizer = horizontalResizerRef.current;
    const verticalResizer = verticalResizerRef.current;

    horizontalResizer?.addEventListener('mousedown', handleHorizontalMouseDown as any);
    verticalResizer?.addEventListener('mousedown', handleVerticalMouseDown as any);

    return () => {
      horizontalResizer?.removeEventListener('mousedown', handleHorizontalMouseDown as any);
      verticalResizer?.removeEventListener('mousedown', handleVerticalMouseDown as any);
    };
  }, [handleHorizontalMouseDown, handleVerticalMouseDown]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col lg:flex-row w-full overflow-hidden lg:h-[calc(100vh-2rem)] bg-[#000000]"
    >
      <div
        className="w-full lg:w-[var(--left-width)] overflow-y-auto"
        style={
          {
            '--left-width': `${leftWidth}%`,
          } as React.CSSProperties
        }
      >
        {leftContent}
      </div>
      <div
        ref={horizontalResizerRef}
        className={`
          group relative w-full h-1 lg:h-auto lg:w-0 cursor-row-resize lg:cursor-col-resize 
          transition-all duration-150 hidden lg:block
          before:absolute before:inset-x-0 lg:before:inset-y-0 before:h-3 lg:before:h-auto 
          before:-top-1 lg:before:top-0 lg:before:-left-1 before:w-full lg:before:w-2
          before:cursor-row-resize lg:before:cursor-col-resize
          after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2
          after:w-24 lg:after:w-[1px] after:h-[3px] lg:after:h-24 
          after:rounded-full after:bg-black-50 after:transition-all
          hover:after:bg-accent hover:after:w-[90%] lg:hover:after:w-[3px] 
          hover:after:h-[3px] lg:hover:after:h-[90%]
          `}
      />
      <div
        className="w-full lg:w-[var(--right-width)] overflow-hidden flex flex-col"
        style={
          {
            '--right-width': `${100 - leftWidth}%`,
          } as React.CSSProperties
        }
      >
        <div
          className="h-[var(--right-top-height)] overflow-y-auto"
          style={
            {
              '--right-top-height': `${rightTopHeight}%`,
            } as React.CSSProperties
          }
        >
          {rightTopContent}
        </div>
        {rightBottomContent && (
          <>
            <div
              ref={verticalResizerRef}
              className={`
                group relative w-full h-[2px] cursor-row-resize
                transition-all duration-150
                before:absolute before:inset-x-0 before:h-3
                before:-top-1 before:w-full
                before:cursor-row-resize
                after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2
                after:w-24 after:h-[1px]
                after:rounded-full after:bg-black-50 after:transition-all
                hover:after:bg-accent hover:after:w-[90%]
                hover:after:h-[3px] hidden lg:block
              `}
            />
            <div
              className="h-[var(--right-bottom-height)] overflow-y-auto"
              style={
                {
                  '--right-bottom-height': `${100 - rightTopHeight}%`,
                } as React.CSSProperties
              }
            >
              {rightBottomContent}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResizableLayout;
