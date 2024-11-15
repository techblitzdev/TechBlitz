'use client';
import { Tags } from '@/types/Tags';
import { useRef } from 'react';
import { Separator } from '../../ui/separator';
import TagDisplay from '../previous/tag-display';
import { Button } from '../../ui/button';

export default function QuestionCardFooter(opts: { questionTags: Tags[] }) {
  const { questionTags } = opts;

  const answerFormRef = useRef<{ submitForm: () => void }>(null);

  return (
    <>
      {questionTags && (
        <>
          <Separator className="bg-black-100 w-full" />
          <div className="p-4 w-full flex justify-between items-center">
            <TagDisplay tags={questionTags} variant="secondary" />
            <div className="flex items-center gap-4 self-end">
              <Button variant="destructive">Reset</Button>
              <Button variant="accent">Submit</Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
