'use server';

export const executeQuestionCode = async ({
  code,
  language,
  testCases,
}: {
  code: string;
  language: string;
  testCases: { input: any[]; expected: any }[];
}) => {
  try {
    // Helper functions for string comparison
    const helperFunctions = `
      function deepEqual(a, b) {
        // Handle array comparison with sorting
        if (Array.isArray(a) && Array.isArray(b)) {
          if (a.length !== b.length) return false;
          
          // Sort arrays if they contain strings
          if (a.every(item => typeof item === 'string') && b.every(item => typeof item === 'string')) {
            const sortedA = [...a].sort();
            const sortedB = [...b].sort();
            return sortedA.every((item, index) => item === sortedB[index]);
          }
          
          // For non-string arrays, compare each element
          return a.every((item, index) => deepEqual(item, b[index]));
        }
        
        if (a === b) return true;
        
        if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
          if (Number.isNaN(a) && Number.isNaN(b)) return true;
          return a === b;
        }
        
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        
        if (keysA.length !== keysB.length) return false;
        
        return keysA.every(key => 
          keysB.includes(key) && deepEqual(a[key], b[key])
        );
      }
    `;

    // Extract function name if it exists
    const functionMatch = code.match(/function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/);
    const functionName = functionMatch ? functionMatch[1] : 'solution';

    const response = await fetch(process.env.EXECUTE_CODE_URL || '', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language,
        version: '18.15.0',
        files: [
          {
            content: `
            ${helperFunctions}
            ${code}
            
            ${testCases
              .map(
                (test, i) => `
              try {
                const result${i} = ${functionName}(...${JSON.stringify(test.input)});
                const expected${i} = ${JSON.stringify(test.expected)};
                const passed${i} = deepEqual(result${i}, expected${i});
                
                console.log(JSON.stringify({
                  input: ${JSON.stringify(test.input)},
                  expected: expected${i},
                  received: result${i},
                  passed: passed${i}
                }));
              } catch (e) {
                console.log(JSON.stringify({
                  input: ${JSON.stringify(test.input)},
                  expected: ${JSON.stringify(test.expected)},
                  error: e.message,
                  passed: false
                }));
              }
            `
              )
              .join('\n')}
          `,
          },
        ],
      }),
    });

    const data = await response.json();

    if (data.run.stderr) {
      throw new Error(data.run.stderr);
    }

    const executionResults = data.run.stdout
      .trim()
      .split('\n')
      .filter((line: string) => line.trim())
      .map((line: string) => {
        try {
          return JSON.parse(line);
        } catch (e) {
          console.error('Failed to parse result line:', line);
          return {
            error: 'Failed to parse execution result',
            passed: false,
          };
        }
      });

    return executionResults.map(
      (result: {
        input: any[];
        expected: any;
        passed: boolean;
        error?: string;
        received?: any;
      }) => ({
        input: result.input,
        expected: result.expected,
        passed: result.passed,
        error: result.error,
        received: result.received,
      })
    );
  } catch (error) {
    console.error('Code execution failed:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to execute code');
  }
};
