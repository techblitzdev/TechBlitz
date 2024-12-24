import { Tags } from '@/types/Tags';
import { Separator } from '@/components/ui/separator';
import TagDisplay from '@/components/questions/previous/tag-display';
import { Button } from '@/components/ui/button';

export default function QuestionCardFooter(opts: {
  questionTags?: Tags[];
  answerFormRef: React.RefObject<{
    submitForm: () => void;
    resetForm: () => void;
  }>;
}) {
  const { questionTags, answerFormRef } = opts;

  return (
    <>
      {questionTags && (
        <>
          <Separator className="bg-black-100 w-full" />
          <div className="p-4 w-full flex justify-between items-center">
            <TagDisplay tags={questionTags} variant="secondary" />
            <div className="flex items-center gap-4 self-end">
              <Button
                variant="destructive"
                onClick={() => answerFormRef.current?.resetForm()}
              >
                Reset
              </Button>
              <Button
                variant="accent"
                onClick={() => answerFormRef.current?.submitForm()}
              >
                Submit
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
