import { FileIcon } from 'lucide-react';
import { codeToHtml } from 'shiki';

import CopyCode from './copy-code';

interface CodeComparisonProps {
  beforeCode: string;
  afterCode: string;
  language: string;
  filename: string;
  lightTheme: string;
  darkTheme: string;
}

export default async function CodeComparison({
  beforeCode,
  afterCode,
  language,
  darkTheme,
}: CodeComparisonProps) {
  // Pre-render the highlighted code on the server
  const [highlightedBefore, highlightedAfter] = await Promise.all([
    codeToHtml(beforeCode, {
      lang: language,
      theme: darkTheme, // Default to dark theme
    }),
    codeToHtml(afterCode, {
      lang: language,
      theme: darkTheme,
    }),
  ]);

  const renderCode = (code: string, highlighted: string) => {
    return (
      <div
        className="max-h-64 md:max-h-96 md:h-full max-w-[31rem] overflow-hidden bg-background font-inter text-[10px] sm:text-xs [&>pre]:h-full [&>pre]:!bg-transparent [&>pre]:p-4 [&_code]:break-all"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    );
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="relative w-full overflow-hidden rounded-xl border border-black-50">
        <div className="relative grid md:grid-cols-2 md:divide-x md:divide-border !divide-black-50">
          <div>
            <div
              className="flex items-center p-3 text-sm text-foreground"
              style={{
                background:
                  'radial-gradient(128% 107% at 50% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
              }}
            >
              <FileIcon className="mr-2 h-4 w-4" />
              <span className="font-medium font-onest">Other platforms</span>
            </div>
            {renderCode(beforeCode, highlightedBefore)}
          </div>
          <div>
            <div
              className="flex items-center border-t border-black-50 md:border-none p-3 text-sm text-foreground justify-between"
              style={{
                background:
                  'radial-gradient(128% 107% at 50% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
              }}
            >
              <div className="flex items-center">
                <FileIcon className="mr-2 h-4 w-4" />
                <span className="font-medium font-onest">techblitz</span>
              </div>
              {/* Move CopyCode outside of Suspense since dynamic import already handles loading */}
              <CopyCode text={afterCode} />
            </div>
            {renderCode(afterCode, highlightedAfter)}
          </div>
        </div>
        <div className="font-semibold font-onest hidden md:flex absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md bg-accent text-xs text-white">
          VS
        </div>
      </div>
    </div>
  );
}
