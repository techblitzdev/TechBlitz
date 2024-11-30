'use client';
import { UserRoadmaps } from '@/types/Roadmap';
import { Button } from '../../ui/button';
import { roadmapGenerate } from '@/actions/roadmap/ai/generate';
import { forwardRef, useState } from 'react';

const GenerateMoreQuestionsButton = forwardRef(
  function GenerateMoreQuestionsButton(opts: {
    roadmap: Omit<UserRoadmaps, 'DefaultRoadmapQuestionsUsersAnswers'>;
  }) {
    const { roadmap } = opts;

    const [loading, setLoading] = useState(false);

    const generateMoreQuestions = async () => {
      setLoading(true);
      try {
        await roadmapGenerate({
          roadmapUid: roadmap.uid,
          userUid: roadmap.userUid,
          generateMore: true
        });
      } catch (error) {
        console.error('Failed to generate more questions:', error);
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
  }
);

export default GenerateMoreQuestionsButton;
