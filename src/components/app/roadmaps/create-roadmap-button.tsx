'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { createOrFetchUserRoadmap } from '@/actions/roadmap/create-or-fetch-user-roadmap';
import { Loader2 } from 'lucide-react';

export default function CreateRoadmapButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateRoadmap = async () => {
    setIsLoading(true);
    try {
      const roadmap = await createOrFetchUserRoadmap();

      // Navigate programmatically instead of using redirect
      router.push(`/roadmap/${roadmap.uid}/onboarding/1`);
    } catch (error) {
      console.error('Failed to create roadmap:', error);
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleCreateRoadmap} disabled={isLoading} variant="accent">
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating...
        </>
      ) : (
        'Create new roadmap'
      )}
    </Button>
  );
}
