import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeDisplayProps {
  content: string;
  language?: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({
  content,
  language = 'javascript',
}) => {
  return (
    <Highlight
      theme={themes.nightOwl}
      code={content.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className="overflow-x-auto rounded-lg p-4"
          style={{ ...style, background: '#011627' }}
        >
          {tokens.map((line, lineIndex) => {
            // Don't render empty line at the end
            if (lineIndex === tokens.length - 1 && line[0].content === '') {
              return null;
            }

            return (
              <div
                key={lineIndex}
                {...getLineProps({ line })}
                className="table-row"
              >
                <span className="table-cell text-gray-500 pr-4 select-none text-right">
                  {lineIndex + 1}.
                </span>
                <span className="table-cell">
                  {line.map((token, tokenIndex) => (
                    <span key={tokenIndex} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeDisplay;
