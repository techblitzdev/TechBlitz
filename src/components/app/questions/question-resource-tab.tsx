import { Button } from '@/components/ui/button';
import { QuestionResources } from '@prisma/client';

export default function QuestionResourceTab(opts: {
  resources: QuestionResources[] | undefined;
}) {
  const { resources } = opts;

  if (!resources) {
    return (
      <div className="flex flex-col gap-y-2 mt-2">
        <p className="text-sm text-gray-400">
          No resources found for this question.
        </p>
        <Button>Suggest a resource</Button>
      </div>
    );
  }

  return (
    <ul className="list-disc list-inside mt-2">
      {resources?.map((resource) => (
        <li key={resource.uid}>
          <a
            href={resource.resource}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            {resource.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
