'use client';

import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CodeChallenge = () => {
  const [code, setCode] = useState('');
  const [result, setResult] = useState<{
    passed: boolean;
    details?: Array<{
      passed: boolean;
      input: number[];
      expected: number;
      received: number;
    }>;
    error?: string;
  } | null>(null);

  // Example challenge - Sum two numbers
  const challenge = {
    title: 'Sum Two Numbers',
    description:
      "Write a function called 'sum' that takes two parameters and returns their sum.",
    testCases: [
      { input: [1, 2], expected: 3 },
      { input: [0, 0], expected: 0 },
      { input: [-1, 1], expected: 0 },
      { input: [10, 20], expected: 30 },
    ],
  };

  const validateCode = () => {
    try {
      // Create a new function from the user's code
      const userFunction = eval(`(${code})`);

      if (typeof userFunction !== 'function') {
        throw new Error('Provided code does not define a function.');
      }

      // Run test cases
      const results = challenge.testCases.map((test) => {
        const result = userFunction(...test.input);
        return {
          passed: result === test.expected,
          input: test.input,
          expected: test.expected,
          received: result,
        };
      });

      const allPassed = results.every((r) => r.passed);
      setResult({ passed: allPassed, details: results });
    } catch (error: any) {
      setResult({
        passed: false,
        error: error.message,
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">
          {challenge.title}
        </CardTitle>
        <CardDescription>{challenge.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-64 border rounded-md overflow-hidden">
          {/* Monaco editor would be mounted here */}
          <Editor
            height="80vh"
            defaultLanguage="javascript"
            defaultValue="// some comment"
            onChange={(value) => setCode(value || '')}
          />
        </div>

        <Button onClick={validateCode} className="w-full">
          Test Solution
        </Button>

        {result && (
          <div className="space-y-2">
            {result.error ? (
              <Alert variant="destructive">
                <AlertDescription>Error: {result.error}</AlertDescription>
              </Alert>
            ) : (
              <>
                <Alert variant={result.passed ? 'default' : 'destructive'}>
                  <AlertDescription className="flex items-center gap-2">
                    {result.passed ? (
                      <>
                        <Check className="h-4 w-4" />
                        All tests passed!
                      </>
                    ) : (
                      <>
                        <X className="h-4 w-4" />
                        Some tests failed
                      </>
                    )}
                  </AlertDescription>
                </Alert>

                {!result.passed && result.details && (
                  <div className="space-y-2">
                    {result.details.map((detail, index) => (
                      <Alert
                        key={index}
                        variant={detail.passed ? 'default' : 'destructive'}
                      >
                        <AlertDescription>
                          <div className="flex justify-between items-center">
                            <span>Input: ({detail.input.join(', ')})</span>
                            <span>
                              Expected: {detail.expected}, Got:{' '}
                              {detail.received}
                            </span>
                          </div>
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CodeChallenge;
