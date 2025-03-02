import CodeComparison from '@/components/ui/code-comparison';

// Example before/after code for the comparison component
const beforeCode = `// this is a challenge to learn JavaScript

function mysteryFunction(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i] * (Math.random() * 10));
  }
  console.log('Wow, so random:', result);
  return result;
}

function reverseString(str) {
  return str.split('').reverse().join('') + '✨';
}

console.log(mysteryFunction([1, 2, 3]));
console.log(reverseString('TechBlitz'));
`;

const afterCode = `// this is a challenge to learn JavaScript,
// perfect for beginners

export const fetchLatestData = async () => {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();

  // transform the data
  const transformedData = data.map(item => ({
    ...item,
    formattedDate: new Date(item.date).toLocaleDateString()
  }));

  return transformedData;
}

fetchLatestData();
`;

export default function CodeComparisonDemo() {
  return (
    <div className="relative w-full">
      <CodeComparison
        beforeCode={beforeCode}
        afterCode={afterCode}
        language="javascript"
        filename="index.js"
        lightTheme="one-dark-pro"
        darkTheme="one-dark-pro"
      />
      <div className="absolute inset-x-0 bottom-0 h-20 md:h-40 lg:h-80 bg-linear-to-t from-[#000] to-transparent pointer-events-none z-30"></div>
    </div>
  );
}
