'use client'
import React from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { UserRecord } from '@/types/User'

interface CodeDisplayProps {
  content: string
  language?: string
  backgroundColor?: string
  hideIndex?: boolean
  user?: UserRecord | null
}

interface HighlightProps {
  className: string
  style: React.CSSProperties
  tokens: Token[][]
  getLineProps: (input: { line: Token[] }) => React.HTMLProps<HTMLDivElement>
  getTokenProps: (input: { token: Token }) => React.HTMLProps<HTMLSpanElement>
}

interface Token {
  types: string[]
  content: string
  empty?: boolean
}

export default function CodeDisplay({
  content,
  language,
  backgroundColor = '#111111',
  hideIndex = false,
  user,
}: CodeDisplayProps) {
  // Clean the content by removing pre and code tags
  const cleanContent = content
    ?.replace(/<pre><code[^>]*>/g, '')
    ?.replace(/<\/code><\/pre>/g, '')
    ?.replace(/=&gt;/g, '=>')
    ?.replace(/&lt;/g, '<')
    ?.replace(/&gt;/g, '>')
    ?.trim()

  if (!cleanContent) {
    return null
  }

  return (
    <Highlight
      theme={
        themes[user?.codeEditorTheme as keyof typeof themes] || themes.vsDark
      }
      code={cleanContent}
      language={language || 'javascript'}
    >
      {({ style, tokens, getLineProps, getTokenProps }: HighlightProps) => (
        <pre
          className="overflow-x-auto p-4 h-full text-wrap"
          style={{ ...style, background: backgroundColor }}
        >
          {tokens.map((line, lineIndex) => (
            <div
              key={lineIndex}
              {...getLineProps({ line })}
              className="table-row"
            >
              {!hideIndex && (
                <span className="table-cell text-gray-500 pr-4 select-none text-right text-sm">
                  {lineIndex + 1}
                </span>
              )}
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
  )
}
