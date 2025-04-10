import { Meta, StoryObj } from '@storybook/react';
import StudyPathQuestionCard from './study-path-question-card';
import { Question } from '@/types/Questions';
import { StudyPath } from '@prisma/client';
import { QuestionAnswerType } from '@/types/QuestionAnswers';
import { Suspense } from 'react';

// Mock data for questions
const mockQuestions: Record<string, Question> = {
  correct: {
    uid: '1',
    title: 'JavaScript Variables',
    question: 'What is the correct way to declare a variable in JavaScript?',
    description: 'Understanding variable declarations in JavaScript',
    answers: [
      {
        uid: 'a1',
        questionUid: '1',
        answer: 'var x = 5;',
        answerType: 'STANDARD' as QuestionAnswerType,
        isCodeSnippet: false,
      },
      {
        uid: 'a2',
        questionUid: '1',
        answer: 'variable x = 5;',
        answerType: 'STANDARD' as QuestionAnswerType,
        isCodeSnippet: false,
      },
      {
        uid: 'a3',
        questionUid: '1',
        answer: 'x := 5;',
        answerType: 'STANDARD' as QuestionAnswerType,
        isCodeSnippet: false,
      },
      {
        uid: 'a4',
        questionUid: '1',
        answer: 'int x = 5;',
        answerType: 'STANDARD' as QuestionAnswerType,
        isCodeSnippet: false,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    questionDate: '2023-01-01',
    answerResource:
      'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var',
    correctAnswer: 'a1',
    codeSnippet: null,
    hint: 'Think about the keywords used in JavaScript for variable declaration.',
    dailyQuestion: false,
    customQuestion: false,
    difficulty: 'BEGINNER',
    slug: 'javascript-variables',
    slugGenerated: true,
    questionType: 'MULTIPLE_CHOICE',
    nextQuestionSlug: 'javascript-data-types',
    previousQuestionSlug: null,
    testCases: null,
    functionName: null,
    expectedParams: null,
    isPremiumQuestion: false,
    userAnswers: [
      {
        uid: 'ua1',
        userUid: 'user1',
        questionUid: '1',
        userAnswerUid: 'a1',
        correctAnswer: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        questionDate: '2023-01-01',
        timeTaken: 45,
        difficulty: 'EASY',
      },
    ],
    afterQuestionInfo: 'Variables in JavaScript can be declared using var, let, or const keywords.',
    aiTimeToComplete: 30,
  },
  incorrect: {
    uid: '2',
    title: 'JavaScript Arrays',
    question: 'Which method is used to add an element to the end of an array?',
    description: 'Understanding array manipulation in JavaScript',
    answers: [
      {
        uid: 'b1',
        questionUid: '2',
        answer: 'push()',
        answerType: 'STANDARD' as QuestionAnswerType,
        isCodeSnippet: false,
      },
      {
        uid: 'b2',
        questionUid: '2',
        answer: 'append()',
        answerType: 'STANDARD' as QuestionAnswerType,
        isCodeSnippet: false,
      },
      {
        uid: 'b3',
        questionUid: '2',
        answer: 'addToEnd()',
        answerType: 'STANDARD' as QuestionAnswerType,
        isCodeSnippet: false,
      },
      {
        uid: 'b4',
        questionUid: '2',
        answer: 'insert()',
        answerType: 'STANDARD' as QuestionAnswerType,
        isCodeSnippet: false,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    questionDate: '2023-01-02',
    answerResource:
      'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push',
    correctAnswer: 'b1',
    codeSnippet: null,
    hint: 'This method is named after the physical action of adding something to a stack.',
    dailyQuestion: false,
    customQuestion: false,
    difficulty: 'EASY',
    slug: 'javascript-arrays',
    slugGenerated: true,
    questionType: 'MULTIPLE_CHOICE',
    nextQuestionSlug: 'javascript-objects',
    previousQuestionSlug: 'javascript-variables',
    testCases: null,
    functionName: null,
    expectedParams: null,
    isPremiumQuestion: false,
    userAnswers: [
      {
        uid: 'ua2',
        userUid: 'user1',
        questionUid: '2',
        userAnswerUid: 'b2',
        correctAnswer: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        questionDate: '2023-01-02',
        timeTaken: 55,
        difficulty: 'EASY',
      },
    ],
    afterQuestionInfo:
      'The push() method adds one or more elements to the end of an array and returns the new length of the array.',
    aiTimeToComplete: 35,
  },
  unanswered: {
    uid: '3',
    title: 'JavaScript Functions',
    question: 'What defines an arrow function in JavaScript?',
    description: 'Understanding arrow functions in JavaScript',
    answers: [
      {
        uid: 'c1',
        questionUid: '3',
        answer: '() => {}',
        answerType: 'STANDARD' as QuestionAnswerType,
        isCodeSnippet: false,
      },
      {
        uid: 'c2',
        questionUid: '3',
        answer: 'function() {}',
        answerType: 'STANDARD' as QuestionAnswerType,
        isCodeSnippet: false,
      },
      {
        uid: 'c3',
        questionUid: '3',
        answer: '-> {}',
        answerType: 'STANDARD' as QuestionAnswerType,
        isCodeSnippet: false,
      },
      {
        uid: 'c4',
        questionUid: '3',
        answer: '=>() {}',
        answerType: 'STANDARD' as QuestionAnswerType,
        isCodeSnippet: false,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    questionDate: '2023-01-03',
    answerResource:
      'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions',
    correctAnswer: 'c1',
    codeSnippet: null,
    hint: 'It uses a special operator that looks like an arrow.',
    dailyQuestion: false,
    customQuestion: false,
    difficulty: 'MEDIUM',
    slug: 'javascript-functions',
    slugGenerated: true,
    questionType: 'MULTIPLE_CHOICE',
    nextQuestionSlug: 'javascript-closures',
    previousQuestionSlug: 'javascript-arrays',
    testCases: null,
    functionName: null,
    expectedParams: null,
    isPremiumQuestion: false,
    userAnswers: [],
    afterQuestionInfo:
      'Arrow functions were introduced in ES6 and provide a concise syntax for writing functions in JavaScript.',
    aiTimeToComplete: 40,
  },
  premium: {
    uid: '4',
    title: 'JavaScript Promises',
    question: 'Which method is used to handle errors in a Promise chain?',
    description: 'Understanding error handling in JavaScript Promises',
    answers: [
      {
        uid: 'd1',
        questionUid: '4',
        answer: 'catch()',
        answerType: 'STANDARD' as QuestionAnswerType,
        isCodeSnippet: false,
      },
      {
        uid: 'd2',
        questionUid: '4',
        answer: 'error()',
        answerType: 'STANDARD' as QuestionAnswerType,
        isCodeSnippet: false,
      },
      {
        uid: 'd3',
        questionUid: '4',
        answer: 'try()',
        answerType: 'STANDARD' as QuestionAnswerType,
        isCodeSnippet: false,
      },
      {
        uid: 'd4',
        questionUid: '4',
        answer: 'handleError()',
        answerType: 'STANDARD' as QuestionAnswerType,
        isCodeSnippet: false,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    questionDate: '2023-01-04',
    answerResource:
      'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch',
    correctAnswer: 'd1',
    codeSnippet: null,
    hint: 'Think about similar error handling mechanics in try/catch blocks.',
    dailyQuestion: false,
    customQuestion: false,
    difficulty: 'HARD',
    slug: 'javascript-promises',
    slugGenerated: true,
    questionType: 'MULTIPLE_CHOICE',
    nextQuestionSlug: 'javascript-async-await',
    previousQuestionSlug: 'javascript-functions',
    testCases: null,
    functionName: null,
    expectedParams: null,
    isPremiumQuestion: true,
    userAnswers: [],
    afterQuestionInfo: 'The catch() method returns a Promise and deals with rejected cases only.',
    aiTimeToComplete: 60,
  },
  next: {
    uid: '5',
    title: 'JavaScript Closures',
    question: 'What is a closure in JavaScript?',
    description: 'Understanding closures in JavaScript',
    answers: [
      {
        uid: 'e1',
        questionUid: '5',
        answer: 'A function that has access to variables from its outer scope',
        answerType: 'STANDARD' as QuestionAnswerType,
        isCodeSnippet: false,
      },
      {
        uid: 'e2',
        questionUid: '5',
        answer: 'A way to close a function call',
        answerType: 'STANDARD' as QuestionAnswerType,
        isCodeSnippet: false,
      },
      {
        uid: 'e3',
        questionUid: '5',
        answer: 'A method to terminate execution',
        answerType: 'STANDARD' as QuestionAnswerType,
        isCodeSnippet: false,
      },
      {
        uid: 'e4',
        questionUid: '5',
        answer: 'A private variable declaration',
        answerType: 'STANDARD' as QuestionAnswerType,
        isCodeSnippet: false,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    questionDate: '2023-01-05',
    answerResource: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures',
    correctAnswer: 'e1',
    codeSnippet: null,
    hint: 'It has to do with scope and variable access.',
    dailyQuestion: false,
    customQuestion: false,
    difficulty: 'HARD',
    slug: 'javascript-closures',
    slugGenerated: true,
    questionType: 'MULTIPLE_CHOICE',
    nextQuestionSlug: 'javascript-prototypes',
    previousQuestionSlug: 'javascript-functions',
    testCases: null,
    functionName: null,
    expectedParams: null,
    isPremiumQuestion: false,
    userAnswers: [],
    afterQuestionInfo:
      'A closure is the combination of a function bundled together with references to its surrounding state.',
    aiTimeToComplete: 55,
  },
};

// Mock study path
const mockStudyPath: StudyPath = {
  uid: 'sp1',
  title: 'JavaScript Fundamentals',
  slug: 'javascript-fundamentals',
  description: 'Learn the fundamentals of JavaScript programming',
  heroChip: 'Master JavaScript from scratch',
  questionSlugs: [
    'javascript-variables',
    'javascript-arrays',
    'javascript-functions',
    'javascript-promises',
    'javascript-closures',
  ],
  educationLevel: 'beginner',
  createdAt: new Date(),
  updatedAt: new Date(),
  averageCompletionTime: 3600, // in seconds
  category: 'Programming',
  isPublished: true,
  nextStudyPathSlug: 'javascript-advanced',
  overviewData: {},
  icon: '📚',
  type: 'LEARN',
  categoryToolTip: 'Programming'
};

const meta: Meta<typeof StudyPathQuestionCard> = {
  title: 'App/Study Paths/StudyPathQuestionCard',
  component: StudyPathQuestionCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Suspense fallback={<div>Loading...</div>}>
        <div className="p-10 flex flex-col items-center justify-center">
          <Story />
        </div>
      </Suspense>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StudyPathQuestionCard>;

export const CorrectlyAnswered: Story = {
  args: {
    questionData: mockQuestions.correct,
    studyPath: mockStudyPath,
  },
};

export const IncorrectlyAnswered: Story = {
  args: {
    questionData: mockQuestions.incorrect,
    studyPath: mockStudyPath,
  },
};

export const Unanswered: Story = {
  args: {
    questionData: mockQuestions.unanswered,
    studyPath: mockStudyPath,
  },
};

export const PremiumLocked: Story = {
  args: {
    questionData: mockQuestions.premium,
    studyPath: mockStudyPath,
  },
};

export const NextQuestion: Story = {
  args: {
    questionData: mockQuestions.next,
    studyPath: mockStudyPath,
    isNextQuestion: true,
  },
};

// Example of multiple cards in a path
export const StudyPathExample: Story = {
  render: () => (
    <div className="flex flex-col items-center space-y-16">
      <StudyPathQuestionCard questionData={mockQuestions.correct} studyPath={mockStudyPath} />
      <StudyPathQuestionCard questionData={mockQuestions.incorrect} studyPath={mockStudyPath} />
      <StudyPathQuestionCard
        questionData={mockQuestions.unanswered}
        studyPath={mockStudyPath}
        isNextQuestion={true}
      />
      <StudyPathQuestionCard questionData={mockQuestions.premium} studyPath={mockStudyPath} />
      <StudyPathQuestionCard questionData={mockQuestions.next} studyPath={mockStudyPath} />
    </div>
  ),
};
