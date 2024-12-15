'use client';
import { FileIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

interface CodeComparisonProps {
  beforeCode: string;
  afterCode: string;
  language: string;
  filename: string;
  lightTheme: string;
  darkTheme: string;
}

export default function CodeComparison({
  beforeCode,
  afterCode,
  language,
  filename,
  lightTheme,
  darkTheme
}: CodeComparisonProps) {
  const { theme, systemTheme } = useTheme();
  const [highlightedBefore, setHighlightedBefore] = useState('');
  const [highlightedAfter, setHighlightedAfter] = useState('');

  useEffect(() => {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const selectedTheme = currentTheme === 'dark' ? darkTheme : lightTheme;

    async function highlightCode() {
      const before = await codeToHtml(beforeCode, {
        lang: language,
        theme: selectedTheme
      });
      const after = await codeToHtml(afterCode, {
        lang: language,
        theme: selectedTheme
      });
      setHighlightedBefore(before);
      setHighlightedAfter(after);
    }

    highlightCode();
  }, [
    theme,
    systemTheme,
    beforeCode,
    afterCode,
    language,
    lightTheme,
    darkTheme
  ]);

  const renderCode = (code: string, highlighted: string) => {
    if (highlighted) {
      return (
        <div
          className="max-h-64 md:max-h-96 md:h-full overflow-auto bg-background font-inter text-[10px] sm:text-xs [&>pre]:h-full [&>pre]:!bg-transparent [&>pre]:p-4 [&_code]:break-all"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      );
    } else {
      return (
        <pre className="h-full overflow-auto break-all bg-background p-4 font-inter text-xs">
          {code}
        </pre>
      );
    }
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
                  'radial-gradient(128% 107% at 50% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)'
              }}
            >
              <FileIcon className="mr-2 h-4 w-4" />
              <span className="font-medium font-onest">Other platforms</span>
            </div>
            {renderCode(beforeCode, highlightedBefore)}
          </div>
          <div>
            <div
              className="flex items-center border-t border-black-50 md:border-none p-3 text-sm text-foreground"
              style={{
                background:
                  'radial-gradient(128% 107% at 50% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)'
              }}
            >
              <FileIcon className="mr-2 h-4 w-4" />
              <span className="font-medium font-onest">techblitz</span>
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
