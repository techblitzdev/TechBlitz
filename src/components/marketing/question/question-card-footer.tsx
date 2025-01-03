import { Tags } from '@/types/Tags';
import { Separator } from '@/components/ui/separator';
import TagDisplay from '@/components/app/questions/previous/tag-display';
import { Button } from '@/components/ui/button';

export default function QuestionCardFooter(opts: {
  questionTags?: Tags[];
  answerFormRef: React.RefObject<{ submitForm: () => void }>;
}) {
  const { questionTags, answerFormRef } = opts;

  return (
    <>
      {questionTags && (
        <>
          <Separator className="bg-black-100 w-full" />
          <div className="bg-black-100 p-4 w-full flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="w-full md:w-auto">
              <TagDisplay tags={questionTags} variant="secondary" />
            </div>
            <div className="flex flex-row items-center gap-4 w-full md:w-auto justify-staer md:justify-end">
              <Button
                variant="accent"
                className="w-full md:w-auto"
                onClick={() => answerFormRef.current?.submitForm()} // Trigger form submission
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
