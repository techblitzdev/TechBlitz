import { Tags } from '@/types/Tags';
import { Separator } from '@/components/ui/separator';
import TagDisplay from '@/components/app/questions/previous/tag-display';
import { Button } from '@/components/ui/button';
import { UserRecord } from '@/types/User';

export default function QuestionCardFooter(opts: {
  questionTags?: Tags[];
  answerFormRef: React.RefObject<{
    submitForm: () => void;
    resetForm: () => void;
  }>;
  user: UserRecord | null;
}) {
  const { questionTags, answerFormRef, user } = opts;

  return (
    <>
      {questionTags && (
        <>
          <Separator className="bg-black w-full" />
          <div className="p-4 w-full flex flex-col md:flex-row gap-3 justify-between md:items-center bg-black-100">
            <TagDisplay tags={questionTags} variant="secondary" />
            <div className="flex items-center gap-4 md:self-end">
              <Button
                variant="destructive"
                onClick={() => answerFormRef.current?.resetForm()}
              >
                Reset
              </Button>
              {/** only allow submit if user is logged in */}
              {user ? (
                <Button
                  variant="accent"
                  onClick={() => answerFormRef.current?.submitForm()}
                >
                  Submit
                </Button>
              ) : (
                <Button variant="accent" href="/login">
                  Login to Submit
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
