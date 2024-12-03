'use client';
import { motion, useInView } from 'motion/react';
import CodeDisplay from '@/components/questions/single/code-snippet';
import { useRef } from 'react';

const codeSnippet = `let numbers = [5, 3, 7];
let sum = numbers.reduce((acc, num) => acc + num);
// Missing line here
// another missing line
// and another!
// Missing line here
// another missing line
// and another!
// Missing line here
// another missing line
// and another!console.log(result);`;

export default function DailyQuestionBox() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="relative top-3 border border-black-50 rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
    >
      <CodeDisplay
        content={codeSnippet}
        backgroundColor="#0a0a0a"
      />
    </motion.div>
  );
}
