import { Alert, AlertDescription } from '@/components/ui/alert';

import { AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useQuestionSingle } from '../questions/single/layout/question-single-context';
import ResultCard from './result-card';

interface ResultProps {
  passed: boolean;
  // any as these can be anything (duh)
  input: any[];
  expected: any;
  received: any;
}

const TestCaseDisplay = () => {
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
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-lg font-semibold text-white font-onest">
                      All tests passed! Great job!
                    </span>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                      <X className="h-5 w-5 text-red-600" />
                    </div>
                    <span className="text-lg font-semibold text-red-700">
                      Some tests failed. Let's review:
                    </span>
                  </>
                )}
              </AlertDescription>
            </Alert>

            {result.details ? (
              <div className="space-y-4">
                {result.details.map((detail: ResultProps, index: number) => (
                  <ResultCard
                    key={`test-case-${index}`}
                    result={detail}
                    index={index}
                  />
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
};

export default TestCaseDisplay;
