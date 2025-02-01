import { AnimatePresence, motion } from 'framer-motion';
import { useQuestionSingle } from '@/components/app/questions/single/layout/question-single-context';
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
            <div className="flex items-center gap-3 py-2">
              {result.passed ? (
                <span className="text-xl font-semibold text-green-500 font-onest">Accepted</span>
              ) : (
                <span className="text-xl font-semibold text-red-500 font-onest">Rejected</span>
              )}
            </div>

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
