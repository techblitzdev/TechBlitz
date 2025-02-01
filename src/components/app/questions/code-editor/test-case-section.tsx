'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WindowCode2 from '@/components/ui/icons/window-code';
import { useQuestionSingle } from '../single/layout/question-single-context';
import TestCaseDisplay from './test-case-display';

export default function TestCaseSection() {
  const { question, currentLayout } = useQuestionSingle();

  if (currentLayout === 'answer') {
    return (
      <div className="h-full p-3 lg:pl-1.5 lg:pt-1.5 lg:pb-3 lg:pr-3">
        <div className="bg-black-75 border border-black-50 rounded-xl h-full overflow-scroll">
          <div className="bg-black-25 px-4 py-2 border-b border-black-50 flex items-center justify-between">
            <h2 className="font-semibold flex items-center gap-x-1">
              <WindowCode2 width="1em" height="1em" />
              Test Cases
            </h2>
          </div>
          <TestCaseDisplay />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-3 lg:pl-1.5 lg:pt-1.5 lg:pb-3 lg:pr-3">
      <div className="bg-black-75 border border-black-50 rounded-xl h-full overflow-scroll">
        <div className="bg-black-25 px-4 py-2 border-b border-black-50 flex items-center justify-between">
          <h2 className="font-semibold flex items-center gap-x-1">
            <WindowCode2 width="1em" height="1em" />
            Test Cases
          </h2>
        </div>
        <Tabs defaultValue="test-1">
          <TabsList className="text-white rounded-lg bg-transparent flex gap-3 flex-wrap w-full justify-start px-4 py-2">
            {question.testCases.map((_: any, index: number) => (
              <TabsTrigger
                key={index}
                value={`test-${index}`}
                className="flex items-center justify-center text-sm font-medium transition-colors rounded-md text-gray-400 data-[state=active]:text-white data-[state=active]:bg-black-25 border-0 w-fit p-1"
              >
                Test {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>
          {question.testCases.map((testCase: any, index: number) => (
            <TabsContent key={index} value={`test-${index}`} className="overflow-y-auto">
              <div className="p-4">
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Input:</h3>
                  <pre className="bg-[#1e1e1e] p-3 rounded overflow-x-auto">
                    {JSON.stringify(testCase.input[0], null, 2)}
                  </pre>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Expected Output:</h3>
                  <pre className="bg-[#1e1e1e] p-3 rounded overflow-x-auto">
                    {JSON.stringify(testCase.expected, null, 2)}
                  </pre>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
