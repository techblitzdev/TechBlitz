import CodeSnippet from '@/components/marketing/global/code-snippet'

const codeSnippet1 = `// how to fetch data from an API
export const fetchData = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }); 

    const data = await response.json();
    // how can we return the first 5 posts?
    console.log(/* missing code here */);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();
`

const codeSnippet2 = `// how to use javascript array methods
const users = [
  { id: 1, name: 'Alice', active: true, age: 28 },
  { id: 2, name: 'Bob', active: false, age: 30 },
  { id: 3, name: 'Charlie', active: true, age: 25 },
  { id: 4, name: 'David', active: true, age: 22 },
  { id: 5, name: 'Eve', active: false, age: 35 },
];

// get the names of active users
const activeUserNames = users
  .filter(user => user.active)
  .map(user => user.name);

// remove users under the age of 27
const filteredUsers = users.filter(user => user.age >= 27);

// get the average age of users
const averageAge = users.reduce((sum, user) => sum + user.age, 0) / users.length;

console.log(filteredUsers); // Output: [{ id: 1, name: 'Alice', active: true, age: 28 }, { id: 2, name: 'Bob', active: false, age: 30 }, { id: 5, name: 'Eve', active: false, age: 35 }]
console.log(activeUserNames); // Output: ['Alice', 'Charlie', 'David']
console.log(averageAge); // Output: 28
`

export default function DailyQuestionBox() {
  return (
    <div className="gap-10">
      <div
        className="
          relative top-8 overflow-hidden 
          w-3/4 group-hover:top-12 duration-500 group-hover:scale-[1.03]
        "
      >
        <CodeSnippet
          code={codeSnippet1}
          language="javascript"
          filename="fetchData.js"
          lightTheme="one-dark-pro"
          darkTheme="one-dark-pro"
        />
      </div>
      <div
        className="
          absolute top-24 left-24 md:left-72 
          overflow-hidden w-4/5 md:w-3/5 group-hover:top-6 duration-500 group-hover:scale-[1.04]
        "
      >
        <CodeSnippet
          code={codeSnippet2}
          language="javascript"
          filename="users.js"
          lightTheme="one-dark-pro"
          darkTheme="one-dark-pro"
        />
      </div>
      <div
        className="
          absolute top-24 left-24 md:left-72 
          overflow-hidden w-4/5 md:w-3/5 group-hover:top-6 duration-500 group-hover:scale-[1.04]
        "
      >
        <CodeSnippet
          code={codeSnippet2}
          language="javascript"
          filename="users.js"
          lightTheme="one-dark-pro"
          darkTheme="one-dark-pro"
        />
      </div>
    </div>
  )
}
