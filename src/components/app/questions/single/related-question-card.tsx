import { ArrowRight, ShieldQuestionIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { getRelatedQuestions } from '@/utils/data/questions/get-related';
import { cn } from '@/lib/utils';
import { Tags } from '@/types/Tags';
import Link from 'next/link';

const RelatedQuestionsList = async ({ slug, tags }: { slug: string; tags: Tags[] }) => {
  const relatedQuestions = await getRelatedQuestions({
    questionSlug: slug,
    tags: tags || [],
  });

  return (
    <div className="divide-y-[1px] divide-black-50">
      {relatedQuestions.length > 0 ? (
        relatedQuestions.map((question, index) => (
          <Link
            key={question.uid}
            href={`/question/${question.slug}`}
            className={cn(
              'px-4 py-3 w-full flex justify-between items-center group hover:bg-black-75 transition-colors',
              index % 2 === 0 ? 'bg-black hover:bg-black-75' : 'bg-black-75 hover:bg-black-100'
            )}
          >
            <p className="text-sm text-white">{question.question}</p>
            <ArrowRight className="size-4 mr-1 group-hover:mr-0 duration-300 shrink-0" />
          </Link>
        ))
      ) : (
        <div className="p-4 text-sm">No related questions found</div>
      )}
    </div>
  );
};

export default function RelatedQuestions({ slug, tags }: { slug: string; tags: Tags[] }) {
  return (
    <>
      <div className="flex items-center bg-black-25 gap-x-1 p-4">
        <ShieldQuestionIcon className="size-4" />
        <div className="text-sm">Related Questions</div>
      </div>
      <Separator className="bg-black-50" />

      <RelatedQuestionsList slug={slug} tags={tags} />
    </>
  );
}
