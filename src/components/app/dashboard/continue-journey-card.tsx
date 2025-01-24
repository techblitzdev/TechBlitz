import { getSuggestions } from '@/utils/data/questions/get-suggestions';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default async function ContinueJourneyCard() {
  const suggestions = await getSuggestions({
    limit: 1,
  });

  const suggestion = suggestions?.[0];

  // no need to render anything if there is no suggestion
  if (!suggestion) return null;

  return (
    <Link
      href={`/question/${suggestion?.slug}`}
      className="mt-2 group flex flex-col md:flex-row justify-between h-full overflow-hidden rounded-xl border border-black-50 p-4 transition-all "
      style={{
        background:
          'radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
      }}
    >
      <div className="space-y-2 w-full">
        <p className="text-sm font-medium text-gray-400">Your next question:</p>
        <div className="flex w-full items-center gap-x-2 justify-between">
          {suggestion && (
            <h2 className="text-xl text-white line-clamp-1">
              {suggestion.title}
            </h2>
          )}
          <div className="flex items-center gap-x-2">
            <span className="text-sm text-gray-400">Answer now</span>
            <ArrowRight className="size-4 text-gray-300 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
