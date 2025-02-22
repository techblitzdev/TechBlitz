'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createOrFetchUserRoadmap } from '@/actions/roadmap/create-or-fetch-user-roadmap';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import CreatingRoadmapModal from './creating-roadmap-modal';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { ROADMAP_QUESTION_COUNT } from '@/utils/constants/roadmap';

export default function CreateRoadmapButton({
  hasAnsweredEnoughQuestions,
  answeredQuestionsCount,
}: {
  hasAnsweredEnoughQuestions: boolean;
  answeredQuestionsCount: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateRoadmap = async () => {
    setIsLoading(true);
    try {
      const roadmap = await createOrFetchUserRoadmap();

      if ('code' in roadmap && roadmap.code === 'MAX_ROADMAPS_REACHED') {
        if ('error' in roadmap) {
          toast.error(roadmap.error);
        }
        setIsLoading(false);
        return;
      }

      if ('uid' in roadmap) {
        router.push(`/roadmap/${roadmap.uid}/onboarding/1`);
      }
    } catch (error) {
      console.error('Failed to create roadmap:', error);
      toast.error('Failed to create roadmap. Please try again.');
      setIsLoading(false);
    }
  };

  const remainingQuestions = Math.max(ROADMAP_QUESTION_COUNT - answeredQuestionsCount, 0);
  const progress = Math.min((answeredQuestionsCount / ROADMAP_QUESTION_COUNT) * 100, 100);

  return (
    <div className="space-y-4">
      {hasAnsweredEnoughQuestions ? (
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button disabled={isLoading} variant="accent" className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create new roadmap'
                )}
              </Button>
            </DialogTrigger>
            <CreatingRoadmapModal />
          </Dialog>
        </div>
      ) : (
        <div className="text-sm text-muted-foreground flex flex-col gap-y-5">
          <Button variant="default" href="/questions">
            Go to questions
          </Button>
          <div className="flex flex-col gap-y-2">
            <Progress value={progress} className="h-2 mb-2" />
            <p className="flex flex-col gap-y-2">
              Answer {remainingQuestions} more question{remainingQuestions !== 1 ? 's' : ''} to
              unlock roadmap creation.{' '}
              <span className="text-xs text-muted-foreground">
                In order for us to generate a roadmap that is tailored to you, we need to gauge your
                skill level. In order to do this, we need you to answer at least{' '}
                {ROADMAP_QUESTION_COUNT} questions.
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
