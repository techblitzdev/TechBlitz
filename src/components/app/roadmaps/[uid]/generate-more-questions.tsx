'use client';
import type { RoadmapUserQuestions, UserRoadmaps } from '@/types';
import { Button } from '@/components/ui/button';
import { roadmapGenerate } from '@/actions/ai/roadmap/generate';
import { forwardRef, useState } from 'react';
import { toast } from 'sonner';

const GenerateMoreQuestionsButton = forwardRef(function GenerateMoreQuestionsButton(opts: {
  roadmap: Omit<UserRoadmaps, 'DefaultRoadmapQuestionsUsersAnswers'> & {
    questions: RoadmapUserQuestions[];
  };
}) {
  const { roadmap } = opts;

  const [loading, setLoading] = useState(false);

  const generateMoreQuestions = async () => {
    setLoading(true);
    try {
      await roadmapGenerate({
        generateMore: true,
      });
    } catch (error) {
      console.error('Failed to generate more questions:', error);
      toast.error('Failed to generate more questions');
    }
    setLoading(false);
  };

  return (
    <Button
      variant="accent"
      disabled={roadmap?.status !== 'COMPLETED'}
      onClick={() => generateMoreQuestions()}
    >
      {loading ? 'Generating...' : 'Generate more questions'}
    </Button>
  );
});

export default GenerateMoreQuestionsButton;
