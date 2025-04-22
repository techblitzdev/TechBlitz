'use server';

interface TestCase {
  input: any[];
  expected: any;
}

interface ExecutionResult {
  input: any[];
  expected: any;
  passed: boolean;
  error?: string;
  received?: any;
}

export const executeQuestionCode = async ({
  code,
  language,
  testCases,
}: {
  code: string;
  language: string;
  testCases: TestCase[];
}): Promise<ExecutionResult[]> => {
  // Validate environment variable
  if (!process.env.EXECUTE_CODE_URL) {
    throw new Error('EXECUTE_CODE_URL is not set');
  }

  // Validate inputs
  if (!code || typeof code !== 'string') {
    throw new Error('Invalid code: must be a non-empty string');
  }

  if (!language || typeof language !== 'string') {
    throw new Error('Invalid language: must be a non-empty string');
  }

  if (!Array.isArray(testCases)) {
    throw new Error('Test cases must be an array');
  }

  testCases.forEach((testCase, index) => {
    if (!testCase || typeof testCase !== 'object') {
      throw new Error(`Test case at index ${index} must be an object`);
    }
    if (!('input' in testCase)) {
      throw new Error(`Test case at index ${index} is missing 'input' property`);
    }
    if (!('expected' in testCase)) {
      throw new Error(`Test case at index ${index} is missing 'expected' property`);
    }
  });

  try {
    const functionName = extractFunctionName(code);
    const TIMEOUT_MS = 5000;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(process.env.EXECUTE_CODE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          version: '18.15.0',
          files: [
            {
              content: generateExecutionCode(code, functionName, testCases),
            },
          ],
          limits: {
            timeout: TIMEOUT_MS,
            memory: 256,
            cpu: 1,
          },
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      clearTimeout(timeoutId);

      return processExecutionResults(data);
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Code execution timed out (5 seconds)');
      }
      throw error;
    }
  } catch (error) {
    console.error('Code execution failed:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to execute code');
  }
};

// Helper functions
function extractFunctionName(code: string): string {
  // Check for traditional function declaration
  const functionMatch = code.match(/function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/);
  if (functionMatch) return functionMatch[1];

  // Check for arrow function with explicit name
  const arrowFunctionMatch = code.match(
    /(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(?:\(.*\)|[a-zA-Z_$][a-zA-Z0-9_$]*)\s*=>/
  );
  if (arrowFunctionMatch) return arrowFunctionMatch[1];

  // Check for class method
  const methodMatch = code.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(.*\)\s*\{/);
  if (methodMatch) return methodMatch[1];

  // Default fallback
  return 'solution';
}

function generateExecutionCode(code: string, functionName: string, testCases: TestCase[]): string {
  return `
    // Sandbox protection
    const originalSetTimeout = setTimeout;
    const originalSetInterval = setInterval;
    const originalProcess = process;
    const originalRequire = require;
    
    setTimeout = undefined;
    setInterval = undefined;
    process = undefined;
    require = undefined;
    
    try {
      ${getDeepEqualFunction()}
      ${code}
      
      // Restore safe globals for our test execution
      setTimeout = originalSetTimeout;
      setInterval = originalSetInterval;
      process = originalProcess;
      require = originalRequire;
      
      ${testCases.map((test, i) => generateTestCaseCode(functionName, test, i)).join('\n')}
    } catch (e) {
      console.error('Sandbox error:', e.message);
    }
  `;
}

function getDeepEqualFunction(): string {
  return `
    function deepEqual(a, b) {
      if (a === b) return true;
      if (Number.isNaN(a) && Number.isNaN(b)) return true;
      
      if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      }
      
      if (Array.isArray(a)) {
        if (!Array.isArray(b) || a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
          if (!deepEqual(a[i], b[i])) return false;
        }
        return true;
      }
      
      if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        
        if (keysA.length !== keysB.length) return false;
        
        for (const key of keysA) {
          if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
            return false;
          }
        }
        return true;
      }
      
      return false;
    }
  `;
}

function generateTestCaseCode(functionName: string, testCase: TestCase, index: number): string {
  return `
    try {
      const result${index} = ${functionName}(...${JSON.stringify(testCase.input)});
      const expected${index} = ${JSON.stringify(testCase.expected)};
      const passed${index} = deepEqual(result${index}, expected${index});
      
      console.log(JSON.stringify({
        input: ${JSON.stringify(testCase.input)},
        expected: expected${index},
        received: result${index},
        passed: passed${index}
      }));
    } catch (e) {
      console.log(JSON.stringify({
        input: ${JSON.stringify(testCase.input)},
        expected: ${JSON.stringify(testCase.expected)},
        error: e.message,
        passed: false
      }));
    }
  `;
}

function processExecutionResults(data: any): ExecutionResult[] {
  if (data.run.stderr) {
    throw new Error(data.run.stderr);
  }

  return data.run.stdout
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
    })
    .map((result: any) => ({
      input: result.input,
      expected: result.expected,
      passed: result.passed ?? false,
      error: result.error,
      received: result.received,
    }));
}
