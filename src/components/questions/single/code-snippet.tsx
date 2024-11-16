'use client';
import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeDisplayProps {
  content: string;
  language?: string;
}

interface HighlightProps {
  className: string;
  style: React.CSSProperties;
  tokens: Token[][];
  getLineProps: (input: { line: Token[] }) => React.HTMLProps<HTMLDivElement>;
  getTokenProps: (input: { token: Token }) => React.HTMLProps<HTMLSpanElement>;
}

interface Token {
  types: string[];
  content: string;
  empty?: boolean;
}

export default function CodeDisplay({ content, language }: CodeDisplayProps) {
  // Clean the content by removing pre and code tags
  const cleanContent = content
    .replace(/<pre><code[^>]*>/g, '')
    .replace(/<\/code><\/pre>/g, '')
    .replace(/=&gt;/g, '=>')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();

  return (
    <Highlight
      theme={themes.vsDark}
      code={cleanContent}
      language={language || 'js'}
    >
      {({
        className,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }: HighlightProps) => (
        <pre
          className="overflow-x-auto p-4 h-full"
          style={{ ...style, background: '#111111' }}
        >
          {tokens.map((line, lineIndex) => (
            <div
              key={lineIndex}
              {...getLineProps({ line })}
              className="table-row"
            >
              <span className="table-cell text-gray-500 pr-4 select-none text-right text-sm">
                {lineIndex + 1}
              </span>
              <span className="table-cell text-sm">
                {line.map((token, tokenIndex) => (
                  <span key={tokenIndex} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
