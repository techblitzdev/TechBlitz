import { Alert, AlertDescription } from '@/components/ui/alert';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface ResultProps {
  passed: boolean;
  // any as these can be anything (duh)
  input: any[];
  expected: any;
  received: any;
}

export default function ResultCard(opts: {
  result: ResultProps;
  index: number;
}) {
  const { result, index } = opts;

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Alert
        variant={result.passed ? 'default' : 'default'}
        className={`border-l-4 ${
          result.passed ? 'border-l-green-500' : 'border-l-red-500'
        }`}
      >
        <AlertDescription>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 mr-2" />
              <span className="font-medium">Test Case {index + 1}</span>
            </div>
            <div className="ml-6 space-y-1 text-sm">
              <p>Input: ({result.input.join(', ')})</p>
              <p>Expected: {result.expected}</p>
              <p>Received: {result.received}</p>
            </div>
          </div>
        </AlertDescription>
      </Alert>
    </motion.div>
  );
}
