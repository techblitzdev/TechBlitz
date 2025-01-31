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
    // Validate the code
    if (code.includes('eval')) {
      throw new Error('Invalid code: Dangerous patterns detected');
    }

    // Send code to Piston API for execution
    const response = await fetch(process.env.EXECUTE_CODE_URL || '', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language,
        version: '18.15.0',
        files: [
          {
            // Wrap code in a function and add test case execution
            content: `
            ${code}
            
            // Execute test cases
            const fn = ${code};
            
            ${testCases
              .map(
                (test, i) => `
              try {
                const result${i} = fn(...${JSON.stringify(test.input)});
                console.log(JSON.stringify({
                  input: ${JSON.stringify(test.input)},
                  expected: ${JSON.stringify(test.expected)},
                  received: result${i},
                  passed: JSON.stringify(result${i}) == JSON.stringify(${JSON.stringify(
                    test.expected
                  )}),
                }));
              } catch (e) {
                console.log(JSON.stringify({
                  input: ${JSON.stringify(test.input)},
                  expected: ${JSON.stringify(test.expected)},
                  error: e.message,
                  passed: false,
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

    // Parse results from stdout
    const executionResults = data.run.stdout
      .trim()
      .split('\n')
      .map((line: string) => JSON.parse(line));

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
    throw new Error(
      error instanceof Error ? error.message : 'Failed to execute code'
    );
  }
};
