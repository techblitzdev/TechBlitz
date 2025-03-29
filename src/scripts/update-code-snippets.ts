#!/usr/bin/env node

/**
 * Script to update CodeSnippet components in MDX files
 *
 * This script converts:
 * 1. Old import: import CodeSnippet from '@/components/app/questions/single/layout/code-snippet';
 *    To new import: import CodeSnippet from '@/components/marketing/global/code-snippet';
 *
 * 2. Old usage: <CodeSnippet language="javascript" content={`...`} />
 *    To new usage: <CodeSnippet code={`...`} language="javascript" filename="example.js" />
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

const BLOG_POSTS_DIR = path.join(__dirname, '../src/app/(marketing)/blog/posts');

// File extension map to generate filenames
const FILE_EXTENSIONS = {
  javascript: 'js',
  js: 'js',
  typescript: 'ts',
  ts: 'ts',
  jsx: 'jsx',
  tsx: 'tsx',
  html: 'html',
  css: 'css',
  bash: 'sh',
  shell: 'sh',
  python: 'py',
  java: 'java',
  cpp: 'cpp',
  csharp: 'cs',
  ruby: 'rb',
  go: 'go',
  rust: 'rs',
  php: 'php',
  text: 'txt',
};

// Get a suitable filename based on the language
function getFilename(language: string, index: number) {
  const ext = FILE_EXTENSIONS[language as keyof typeof FILE_EXTENSIONS] || language || 'txt';
  const baseName = language || 'example';
  return index ? `${baseName}-${index}.${ext}` : `${baseName}.${ext}`;
}

// Process a single MDX file
function processFile(filePath: string) {
  console.log(`Processing: ${filePath}`);

  // Read the file content
  let content = fs.readFileSync(filePath, 'utf8');

  // Update the import statement
  content = content.replace(
    /import CodeSnippet from '@\/components\/app\/questions\/single\/layout\/code-snippet';/g,
    "import CodeSnippet from '@/components/marketing/global/code-snippet';"
  );

  // Track the number of replacements for each language to generate unique filenames
  const languageCounts: Record<string, number> = {};

  // Update the CodeSnippet usage
  content = content.replace(
    /<CodeSnippet language="([^"]+)" content={\`([\s\S]*?)\`} \/>/g,
    (match: string, language: string, codeContent: string) => {
      // Track language to generate unique filenames
      languageCounts[language] = (languageCounts[language] || 0) + 1;
      const filename = getFilename(language, languageCounts[language]);

      // Return the new format
      return `<CodeSnippet code={\`${codeContent}\`} language="${language}" filename="${filename}" />`;
    }
  );

  // Write the updated content back to the file
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated: ${filePath}`);
}

// Main function to process all files
async function main() {
  try {
    // Find all MDX files in the blog posts directory
    const files = await glob(`${BLOG_POSTS_DIR}/**/*.mdx`);

    console.log(`Found ${files.length} MDX files to process`);

    // Process each file
    for (const file of files) {
      try {
        processFile(file);
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
      }
    }

    console.log('Done!');
  } catch (err) {
    console.error('Error finding files:', err);
  }
}

// Run the main function
main();
