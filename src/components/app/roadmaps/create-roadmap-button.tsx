'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import CreatingRoadmapModal from './creating-roadmap-modal';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { ROADMAP_QUESTION_COUNT } from '@/utils/constants/misc';
import { roadmapGenerate } from '@/actions/ai/roadmap/generate';
import { supabase } from '@/lib/supabase';
import type { RoadmapGenerationProgress } from '@prisma/client'; // either: 'FETCHING_DATA', 'FIRST_PASS', 'SECOND_PASS', 'GENERATING_QUESTIONS', 'GENERATED'

export default function CreateRoadmapButton({
  hasAnsweredEnoughQuestions,
  answeredQuestionsCount,
}: {
  hasAnsweredEnoughQuestions: boolean;
  answeredQuestionsCount: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<RoadmapGenerationProgress | null>(
    null
  );
  const [generationRecordUid, setGenerationRecordUid] = useState<string | null>(null);
  const [roadmapUid, setRoadmapUid] = useState<string>('');

  const remainingQuestions = Math.max(ROADMAP_QUESTION_COUNT - answeredQuestionsCount, 0);
  const progress = Math.min((answeredQuestionsCount / ROADMAP_QUESTION_COUNT) * 100, 100);

  useEffect(() => {
    let channel: any;

    if (generationRecordUid) {
      channel = supabase
        .channel('roadmap-generation-progress')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'RoadmapGenerationProgress',
            filter: `uid=eq.${generationRecordUid}`,
          },
          (payload) => {
            if (payload.new) {
              setGenerationProgress(payload.new as RoadmapGenerationProgress);
            }
          }
        )
        .subscribe();
    }

    return () => {
      if (channel) {
        console.log('Removing channel');
        supabase.removeChannel(channel);
      }
    };
  }, [generationRecordUid]);

  const handleGenerateRoadmap = async () => {
    setIsLoading(true);
    setGenerationRecordUid(null);
    setRoadmapUid('');
    setGenerationProgress(null);

    try {
      const newGenerationRecordUid =
        Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

      setGenerationRecordUid(newGenerationRecordUid);

      const generationResult = await roadmapGenerate({
        generationRecordUid: newGenerationRecordUid,
      });

      setRoadmapUid(generationResult.roadmapUid);
    } catch (error) {
      console.error('Failed to generate roadmap:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {hasAnsweredEnoughQuestions ? (
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={handleGenerateRoadmap}
                disabled={isLoading}
                variant="accent"
                className="w-full"
              >
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
            <CreatingRoadmapModal generationProgress={generationProgress} roadmapUid={roadmapUid} />
          </Dialog>
        </div>
      ) : (
        <div className="text-sm text-muted-foreground flex flex-col gap-y-5">
          <Button variant="default" href="/questions">
            Go to questions
          </Button>
          <div className="flex flex-col gap-y-2">
            <Progress value={progress} className="h-2 mb-2" />
            <div className="flex flex-col gap-y-2">
              Answer {remainingQuestions} more question{remainingQuestions !== 1 ? 's' : ''} to
              unlock roadmap creation.{' '}
              <span className="text-xs text-muted-foreground">
                In order for us to generate a roadmap that is tailored to you, we need to gauge your
                skill level. In order to do this, we need you to answer at least{' '}
                {ROADMAP_QUESTION_COUNT} questions.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
