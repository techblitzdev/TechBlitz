import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Check, GitCommitHorizontal, X } from 'lucide-react';
import { useMemo } from 'react';

export default function CommitCard(opts: {
  commitMessage: string;
  buildSuccess?: boolean;
}) {
  const { commitMessage, buildSuccess } = opts;

  // generate a random commit hash
  const commitHash = useMemo(() => {
    return Math.random().toString(36).substring(2, 8);
  }, []);

  return (
    <div className="relative left-px -my-6 flex justify-between">
      <div className="flex items-center gap-x-3">
        <GitCommitHorizontal className="w-8 h-6 text-gray-500 bg-[#000000]" />
        <div className="flex items-center gap-x-2">
          <Avatar className="size-5">
            <AvatarFallback className="text-white text-[10px] font-onest bg-black">
              A
            </AvatarFallback>
          </Avatar>
          <code className="flex items-center gap-x-2">
            <span className="text-[#9198a1] text-[12px] font-mono">
              {/** trim if on mobile */}
              <span className="block md:hidden">
                {commitMessage.length > 7
                  ? `${commitMessage.slice(0, 7)}...`
                  : commitMessage}
              </span>
              {/** show full commit message on desktop */}
              <span className="hidden md:block">{commitMessage}</span>
            </span>
          </code>
        </div>
      </div>
      <div className="flex items-center gap-x-1">
        {/** verified badge */}
        <Badge
          variant="outline"
          className="rounded-full border border-[#3d444d] text-[#3fb950] text-[12px] py-px px-2"
        >
          Verified
        </Badge>
        {/** build success or not icon */}
        {buildSuccess ? (
          <Check className="w-3 h-3 text-[#00FF00]" />
        ) : (
          <X className="w-3 h-3 text-[#FF0000]" />
        )}
        <div className="text-sm text-[#9198a1] text-[12px] font-mono">
          {commitHash}
        </div>
      </div>
    </div>
  );
}
