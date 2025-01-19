import { Alert, AlertDescription } from '@/components/ui/alert';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { useQuestionSingle } from '../questions/single/layout/question-single-context';
import ResultCard from './result-card';

interface ResultProps {
  passed: boolean;
  // any as these can be anything (duh)
  input: any[];
  expected: any;
  received: any;
}

export default function TestCaseDisplay() {
  const { result } = useQuestionSingle();

  return (
    <AnimatePresence>
      <div className="space-y-6 p-6 overflow-y-auto">
        {result && (
          <div className="space-y-6">
            <Alert
              variant="default"
              className={`border border-black-50 bg-black`}
            >
              <AlertDescription className="flex items-center gap-3 py-2">
                {result.passed ? (
                  <>
                    <div className="flex items-center justify-center rounded-full">
                      <CheckCircle className="size-7 text-green-500" />
                    </div>
                    <span className="text-lg font-semibold text-white font-onest">
                      All tests passed!
                    </span>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center rounded-full">
                      <XCircle className="size-7 text-red-500" />
                    </div>
                    <span className="text-lg font-semibold text-white">
                      Some tests failed. Let's review:
                    </span>
                  </>
                )}
              </AlertDescription>
            </Alert>

            {result.details ? (
              <div className="space-y-4">
                {result.details.map((detail: ResultProps, index: number) => (
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    key={`test-case-${index}`}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <ResultCard result={detail} index={index} />
                  </motion.div>
                ))}
              </div>
            ) : (
              result.error && (
                <div className="space-y-4">
                  <span className="text-red-700">Error: {result.error}</span>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </AnimatePresence>
  );
}
