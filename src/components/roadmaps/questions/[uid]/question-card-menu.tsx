'use client';
import { generateNewRoadmapQuestion } from '@/actions/ai/roadmap/questions/generate-new';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, StarsIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function RoadmapQuestionCardMenu(opts: {
  questionUid: string;
  questionAnswered: boolean;
  onRegenerateStart: () => void;
  onRegenerateEnd: () => void;
}) {
  const { questionAnswered, questionUid, onRegenerateStart, onRegenerateEnd } =
    opts;
  const [isRegenerating, setIsRegenerating] = useState(false);

  const regenerateQuestion = async () => {
    setIsRegenerating(true);
    onRegenerateStart();
    try {
      await generateNewRoadmapQuestion({
        questionUid
      });
    } finally {
      setIsRegenerating(false);
      onRegenerateEnd();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          padding="none"
          className="hover:bg-black-50 h-fit p-0.5"
        >
          <MoreHorizontal className="size-4 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        className="bg-black-75 border border-black-50 text-white hover:text-white"
      >
        {!questionAnswered && (
          <DropdownMenuItem
            className="font-onest"
            disabled={isRegenerating}
          >
            <button
              className="flex items-center gap-2"
              onClick={regenerateQuestion}
            >
              <StarsIcon className="size-4 text-yellow-400 fill-yellow-500" />
              {isRegenerating ? 'Regenerating...' : 'Regenerate'}
            </button>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <Trash2 className="size-4 text-destructive" />
            Delete
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
