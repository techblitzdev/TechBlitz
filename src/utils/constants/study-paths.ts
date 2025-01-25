export interface StudyPath {
  slug: string;
  title: string;
  description: string;
  questionUids: string[];
  educationLevel: 'beginner' | 'intermediate' | 'advanced';
}

export const studyPaths: StudyPath[] = [
  {
    title: 'JavaScript Fundamentals',
    slug: 'javascript-fundamentals',
    description:
      'Learn the essential concepts of JavaScript to get you started on your journey to becoming a JavaScript developer. Learn the basics of variables, flow control, functions, arrays, objects, and more.',
    questionUids: [
      // sum of two numbers
      '3h39wdw39d3qw-9di3jj3w890jwdio',
      // is number even or odd
      '1kk8m6cea9w9',
      // reverse a string
      'hsrm641thqy',
      // find largest number in array
      'hsrm641odxl',
      // count the vowels
      '162am6bd9zxl',
      // capitalize each word
      '1kk8m6c3j1n8',
    ],
    educationLevel: 'beginner',
  },
  {
    title: 'React Fundamentals',
    slug: 'react-fundamentals',
    description: 'Learn the basics of React',
    questionUids: [],
    educationLevel: 'beginner',
  },
  {
    title: 'React Hooks',
    slug: 'react-hooks',
    description: 'Learn the basics of React Hooks',
    questionUids: [],
    educationLevel: 'intermediate',
  },
  {
    title: 'Arrays',
    slug: 'arrays',
    description: 'Learn the basics of Arrays',
    questionUids: [],
    educationLevel: 'beginner',
  },
  {
    title: 'Asynchronous Programming',
    slug: 'asynchronous-programming',
    description: 'Learn the basics of Asynchronous Programming',
    questionUids: [],
    educationLevel: 'intermediate',
  },
];
