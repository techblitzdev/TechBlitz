'use client';
import CodeComparison from '@/components/ui/code-comparison';

// Example before/after code for the comparison component
const beforeCode = `function mysteryFunction(arr) {
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

const afterCode = `import { prisma } from '@/lib/prisma';

export const fetchAndTransformUsers = async() => {
  try {
    // Fetch users from the database
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

    // how can we transform the users data?
    const transformedUsers = /* missing code here */;
      const signupDuration = Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24));
      return {
        ...user,
        signupDurationInDays: signupDuration
      };
    });

    console.log('Transformed Users:', transformedUsers);
    return transformedUsers;
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fetchAndTransformUsers();
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
      <div className="absolute inset-x-0 bottom-0 h-20 md:h-40 lg:h-80 bg-gradient-to-t from-[#000] to-transparent pointer-events-none z-30"></div>
    </div>
  );
}
