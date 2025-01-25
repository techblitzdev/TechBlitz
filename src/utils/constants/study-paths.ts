interface StudyPath {
  slug: string;
  title: string;
  description: string;
  questionUids: string[];
}

export const studyPaths: StudyPath[] = [
  {
    title: 'JavaScript Fundamentals',
    slug: 'javascript-fundamentals',
    description:
      'Learn the essential concepts of JavaScript to get you started on your journey to becoming a JavaScript developer.',
    questionUids: [
      // sum of two numbers
      '3h39wdw39d3qw-9di3jj3w890jwdio',
      // is number even or odd
      '1kk8m6cea9w9',
      // reverse a string
      'hsrm641thqy',
      // count the vowels
      '162am6bd9zxl',
      // find largest number in array
      'hsrm641odxl',
      // capitalize each word
      '1kk8m6c3j1n8',
    ],
  },
  {
    title: 'React Fundamentals',
    slug: 'react-fundamentals',
    description: 'Learn the basics of React',
    questionUids: [],
  },
  {
    title: 'React Hooks',
    slug: 'react-hooks',
    description: 'Learn the basics of React Hooks',
    questionUids: [],
  },
  {
    title: 'Arrays',
    slug: 'arrays',
    description: 'Learn the basics of Arrays',
    questionUids: [],
  },
  {
    title: 'Asynchronous Programming',
    slug: 'asynchronous-programming',
    description: 'Learn the basics of Asynchronous Programming',
    questionUids: [],
  },
];
