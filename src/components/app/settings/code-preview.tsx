import React from 'react'
import { Highlight, themes } from 'prism-react-renderer'

interface CodeEditorPreviewProps {
  theme: keyof typeof themes
}

const sampleCode = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');`

export default function CodeEditorPreview({ theme }: CodeEditorPreviewProps) {
  return (
    <div className="w-full max-w-md rounded-md overflow-hidden">
      <Highlight theme={themes[theme]} code={sampleCode} language="javascript">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{ ...style, padding: '1rem', fontSize: '0.875rem' }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
