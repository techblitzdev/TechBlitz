'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { Check, Copy, File } from 'lucide-react';
import JavascriptIcon from './icons/javascript';
import TypescriptIcon from './icons/typescript';
import CssIcon from './icons/css';
import HtmlIcon from './icons/html';

const Icons = {
  check: Check,
  copy: Copy,
  file: File,
  javascript: JavascriptIcon,
  typescript: TypescriptIcon,
  css: CssIcon,
  html: HtmlIcon,
};

interface FileBlock {
  title: string;
  code: string;
  language?: string;
}

interface CodeBlockProps {
  files: FileBlock[];
  defaultTitle?: string;
  className?: string;
}

const lightTheme = {
  ...nightOwl,
  'pre[class*="language-"]': {
    ...nightOwl['pre[class*="language-"]'],
    background: 'transparent',
  },
  'code[class*="language-"]': {
    ...nightOwl['code[class*="language-"]'],
    color: 'hsl(var(--foreground))',
  },
  comment: {
    color: 'hsl(var(--muted-foreground))',
    fontStyle: 'italic',
  },
  punctuation: {
    color: 'hsl(var(--foreground))',
  },
  property: {
    color: '#0550FF',
  },
  string: {
    color: '#14532D',
  },
  keyword: {
    color: '#9333EA',
  },
  function: {
    color: '#E45C3A',
  },
  boolean: {
    color: '#9333EA',
  },
  number: {
    color: '#9333EA',
  },
  operator: {
    color: 'hsl(var(--foreground))',
  },
};

const darkTheme = {
  ...nightOwl,
  'pre[class*="language-"]': {
    ...nightOwl['pre[class*="language-"]'],
    background: 'transparent',
  },
};

export function CodeBlock({ files, defaultTitle, className }: CodeBlockProps) {
  const [activeTitle, setActiveTitle] = useState(defaultTitle || files[0]?.title);
  const [copied, setCopied] = useState(false);

  const activeFile = files.find((file) => file.title === activeTitle);
  const code = activeFile?.code || '';
  const language = activeFile?.language || getLanguageFromFileName(activeTitle || '');

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div
      className={cn(
        'relative rounded-lg border border-black-50 bg-card text-card-foreground',
        'backdrop-blur-md',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-black-50 px-4 py-2">
        <div className="flex gap-2 bg-black">
          {files.map(({ title }) => (
            <Button
              key={title}
              variant={title === activeTitle ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTitle(title)}
              className="gap-2"
            >
              <FileIcon fileName={title} />
              <span className="text-white">{title}</span>
            </Button>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => copyToClipboard(code)}
          className="size-8"
        >
          {copied ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Icons.check className="size-4 text-white" />
            </motion.div>
          ) : (
            <Icons.copy className="size-4 text-white" />
          )}
        </Button>
      </div>
      <div className="h-full overflow-auto">
        <SyntaxHighlighter
          language={language}
          style={document.documentElement.classList.contains('dark') ? darkTheme : lightTheme}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
            fontSize: '0.9rem',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

function getLanguageFromFileName(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase();
  const languageMap: Record<string, string> = {
    js: 'javascript',
    jsx: 'jsx',
    ts: 'typescript',
    tsx: 'typescript',
    html: 'html',
    css: 'css',
    json: 'json',
  };
  return languageMap[ext || ''] || 'javascript';
}

function FileIcon({ fileName }: { fileName: string }) {
  const ext = fileName.split('.').pop()?.toLowerCase();

  const size = 'size-4';

  switch (ext) {
    case 'js':
    case 'jsx':
      return <Icons.javascript className={size} />;
    case 'ts':
    case 'tsx':
      return <Icons.typescript className={size} />;
    case 'css':
      return <Icons.css className={size} />;
    case 'html':
      return <Icons.html className={size} />;
    default:
      return <Icons.file className={size} />;
  }
}
