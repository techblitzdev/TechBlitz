export interface StudyPath {
  slug: string;
  title: string;
  description: string;
  heroChip: React.ReactNode;
  questionSlugs: string[];
  educationLevel: 'beginner' | 'intermediate' | 'advanced';
}

export const studyPaths: StudyPath[] = [
  {
    title: 'JavaScript Fundamentals',
    slug: 'javascript-fundamentals',
    description:
      'Learn the essential concepts of JavaScript to get you started on your journey to becoming a JavaScript developer. Learn the basics of variables, flow control, functions, arrays, objects, and more.',
    heroChip: 'Everything you need to kickstart your JavaScript journey',
    questionSlugs: [
      // if statement basics
      'javascript-if-statement-basics',
      // determine age group with if statement
      'determine-age-group',
      // sum of two numbers
      'sum-two-numbers',
      // is number even or odd
      'number-is-odd-or-even',
      // string concatenation
      'javascript-string-concatenation',
      // string concatenation re-enforced
      'javascript-greeting-string-concatenation',
      // reverse a string
      'reverse-a-string',
      // count the vowels
      'count-the-vowels',
      // capitalize each word
      'capitalize-each-word',
      // remove duplicate characters
      'remove-duplicate-characters',
      // find longest word in sentence
      'find-longest-word-in-sentence',
      // sum of array with for loop
      'for-loop-sum-of-array',
    ],
    educationLevel: 'beginner',
  },
  {
    title: 'Arrays',
    slug: 'arrays',
    description: 'Learn how to use different array methods in JavaScript.',
    heroChip: 'Learn how to use Arrays in JavaScript',
    questionSlugs: [
      // getting the length of an array
      'get-array-length-javascript',
      // find largest number in array
      'find-largest-number',
      // sum of array with for loop
      'for-loop-sum-of-array',
      // merge two arrays without modifying original
      'merge-arrays-without-modifying-original',
      // difference between map and foreach
      'difference-map-foreach-javascript-array-methods',
      // array reassignment push output
      'array-reassignment-push-output',
      // Calculate Sum of Even Numbers in JavaScript Array Using Array Methods
      'combining-array-methods',
      // remove falsy values from array
      'remove-falsy-values-from-array',
      // double the numbers
      'double-the-numbers',
    ],
    educationLevel: 'beginner',
  },
  {
    title: 'React Fundamentals',
    slug: 'react-fundamentals',
    description: 'Learn the basics of React',
    heroChip: 'Everything you need to kickstart your React journey',
    questionSlugs: [],
    educationLevel: 'beginner',
  },
  {
    title: 'React Hooks',
    slug: 'react-hooks',
    description: 'Learn the basics of React Hooks',
    heroChip:
      'Learn how to use React Hooks through interactive coding challenges',
    questionSlugs: [],
    educationLevel: 'intermediate',
  },
  {
    title: 'Asynchronous Programming',
    slug: 'asynchronous-programming',
    description: 'Learn the basics of Asynchronous Programming',
    heroChip:
      'Learn what Asynchronous Programming is and how to use it in JavaScript',
    questionSlugs: [],
    educationLevel: 'intermediate',
  },
];
