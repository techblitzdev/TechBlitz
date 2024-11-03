import DOMPurify from 'dompurify';

interface QuestionDisplayProps {
  content: string;
}

export const QuestionDisplay = ({ content }: QuestionDisplayProps) => {
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div
      className="prose dark:prose-invert max-w-none bg-black p-4 rounded-xl"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};
