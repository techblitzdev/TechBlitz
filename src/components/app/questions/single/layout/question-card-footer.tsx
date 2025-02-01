import { Tags } from '@/types/Tags';
import { Separator } from '@/components/ui/separator';
import TagDisplay from '@/components/app/questions/tag-display';
import { UserRecord } from '@/types/User';

export default function QuestionCardFooter(opts: {
  questionTags?: Tags[];
  answerFormRef: React.RefObject<{
    submitForm: () => void;
    resetForm: () => void;
  }>;
  user: UserRecord | null;
  redirectUrl?: string;
}) {
  const { questionTags } = opts;

  return (
    <>
      {questionTags && (
        <>
          <Separator className="bg-black w-full" />
          <div
            id="question-card-footer"
            className="p-4 w-full flex flex-col md:flex-row gap-3 justify-between md:items-center bg-black"
          >
            <TagDisplay tags={questionTags} variant="secondary" numberOfTags={6} />
          </div>
        </>
      )}
    </>
  );
}
