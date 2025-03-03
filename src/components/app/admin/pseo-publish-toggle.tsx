'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { togglePseoPublish } from '@/actions/misc/toggle-pseo-publish';

interface PseoPublishToggleProps {
  uid: string;
  isPublished: boolean;
}

export default function PseoPublishToggle({ uid, isPublished }: PseoPublishToggleProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const result = await togglePseoPublish(uid);
      if (!result.success) {
        console.error('Failed to toggle publish status:', result.message);
      }
    } catch (error) {
      console.error('Error toggling publish status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleToggle}
      disabled={isLoading}
      variant="outline"
      size="sm"
      className={`${
        isPublished
          ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
          : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
      }`}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Updating...
        </span>
      ) : isPublished ? (
        'Unpublish'
      ) : (
        'Publish'
      )}
    </Button>
  );
}
