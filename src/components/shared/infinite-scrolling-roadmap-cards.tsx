import { Question } from '@/types';
import StudyPathsList from '../app/study-paths/list';
import { StudyPath } from '@prisma/client';
import { cn } from '@/lib/utils';

// Mock questions data similar to the storybook examples
const questions: Partial<Question>[] = [
  {
    uid: '1',
    title: 'JavaScript Variables',
    question: 'What is the correct way to declare a variable in JavaScript?',
    description: 'Understanding variable declarations in JavaScript',
    answers: [
      {
        uid: 'a1',
        questionUid: '1',
        answer: 'var x = 5;',
        answerType: 'STANDARD',
        isCodeSnippet: false,
      },
      {
        uid: 'a2',
        questionUid: '1',
        answer: 'variable x = 5;',
        answerType: 'STANDARD',
        isCodeSnippet: false,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    questionDate: '2023-01-01',
    correctAnswer: 'a1',
    slug: 'javascript-variables',
    questionType: 'MULTIPLE_CHOICE',
    difficulty: 'BEGINNER',
    userAnswers: [
      {
        uid: 'ua1',
        userUid: 'user123',
        questionUid: '1',
        userAnswerUid: 'a1',
        correctAnswer: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        questionDate: '2023-01-01',
        timeTaken: 15,
        difficulty: 'EASY',
      },
    ],
  },
  {
    uid: '2',
    title: 'JavaScript Arrays',
    question: 'Which method is used to add an element to the end of an array?',
    description: 'Understanding array manipulation in JavaScript',
    answers: [
      {
        uid: 'b1',
        questionUid: '2',
        answer: 'push()',
        answerType: 'STANDARD',
        isCodeSnippet: false,
      },
      {
        uid: 'b2',
        questionUid: '2',
        answer: 'append()',
        answerType: 'STANDARD',
        isCodeSnippet: false,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    questionDate: '2023-01-02',
    correctAnswer: 'b1',
    slug: 'javascript-arrays',
    questionType: 'MULTIPLE_CHOICE',
    difficulty: 'EASY',
    userAnswers: [
      {
        uid: 'ua2',
        userUid: 'user123',
        questionUid: '2',
        userAnswerUid: 'b1',
        correctAnswer: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        questionDate: '2023-01-02',
        timeTaken: 20,
        difficulty: 'EASY',
      },
    ],
  },
  {
    uid: '3',
    title: 'JavaScript Functions',
    question: 'What defines an arrow function in JavaScript?',
    description: 'Understanding arrow functions in JavaScript',
    answers: [
      {
        uid: 'c1',
        questionUid: '3',
        answer: '() => {}',
        answerType: 'STANDARD',
        isCodeSnippet: false,
      },
      {
        uid: 'c2',
        questionUid: '3',
        answer: 'function() {}',
        answerType: 'STANDARD',
        isCodeSnippet: false,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    questionDate: '2023-01-03',
    correctAnswer: 'c1',
    slug: 'javascript-functions',
    questionType: 'MULTIPLE_CHOICE',
    difficulty: 'MEDIUM',
    userAnswers: [
      {
        uid: 'ua3',
        userUid: 'user123',
        questionUid: '3',
        userAnswerUid: 'c2',
        correctAnswer: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        questionDate: '2023-01-03',
        timeTaken: 30,
        difficulty: 'MEDIUM',
      },
    ],
  },
  {
    uid: '4',
    title: 'JavaScript Variables',
    question: 'What is the correct way to declare a variable in JavaScript?',
    description: 'Understanding variable declarations in JavaScript',
    answers: [
      {
        uid: 'a1',
        questionUid: '1',
        answer: 'var x = 5;',
        answerType: 'STANDARD',
        isCodeSnippet: false,
      },
      {
        uid: 'a2',
        questionUid: '1',
        answer: 'variable x = 5;',
        answerType: 'STANDARD',
        isCodeSnippet: false,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    questionDate: '2023-01-01',
    correctAnswer: 'a1',
    slug: 'javascript-variables',
    questionType: 'MULTIPLE_CHOICE',
    difficulty: 'BEGINNER',
    userAnswers: [
      {
        uid: 'ua1',
        userUid: 'user123',
        questionUid: '1',
        userAnswerUid: 'a1',
        correctAnswer: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        questionDate: '2023-01-01',
        timeTaken: 15,
        difficulty: 'EASY',
      },
    ],
  },
  {
    uid: '5',
    title: 'JavaScript Arrays',
    question: 'Which method is used to add an element to the end of an array?',
    description: 'Understanding array manipulation in JavaScript',
    answers: [
      {
        uid: 'b1',
        questionUid: '2',
        answer: 'push()',
        answerType: 'STANDARD',
        isCodeSnippet: false,
      },
      {
        uid: 'b2',
        questionUid: '2',
        answer: 'append()',
        answerType: 'STANDARD',
        isCodeSnippet: false,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    questionDate: '2023-01-02',
    correctAnswer: 'b1',
    slug: 'javascript-arrays',
    questionType: 'MULTIPLE_CHOICE',
    difficulty: 'EASY',
    userAnswers: [
      {
        uid: 'ua2',
        userUid: 'user123',
        questionUid: '2',
        userAnswerUid: 'b1',
        correctAnswer: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        questionDate: '2023-01-02',
        timeTaken: 20,
        difficulty: 'EASY',
      },
    ],
  },
  {
    uid: '6',
    title: 'JavaScript Functions',
    question: 'What defines an arrow function in JavaScript?',
    description: 'Understanding arrow functions in JavaScript',
    answers: [
      {
        uid: 'c1',
        questionUid: '3',
        answer: '() => {}',
        answerType: 'STANDARD',
        isCodeSnippet: false,
      },
      {
        uid: 'c2',
        questionUid: '3',
        answer: 'function() {}',
        answerType: 'STANDARD',
        isCodeSnippet: false,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    questionDate: '2023-01-03',
    correctAnswer: 'c1',
    slug: 'javascript-functions',
    questionType: 'MULTIPLE_CHOICE',
    difficulty: 'MEDIUM',
    userAnswers: [
      {
        uid: 'ua3',
        userUid: 'user123',
        questionUid: '3',
        userAnswerUid: 'c2',
        correctAnswer: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        questionDate: '2023-01-03',
        timeTaken: 30,
        difficulty: 'MEDIUM',
      },
    ],
  },
];

// Triple the questions to ensure smooth infinite scroll
const allQuestions = [...questions, ...questions, ...questions];

// Mock study path
const studyPath: Partial<StudyPath> = {
  slug: 'javascript-fundamentals',
  title: 'JavaScript Fundamentals',
  description: 'Learn the fundamentals of JavaScript programming',
  heroChip: 'Master JavaScript from scratch',
  questionSlugs: ['javascript-variables', 'javascript-arrays', 'javascript-functions'],
  educationLevel: 'beginner',
};

export default function InfiniteScrollingRoadmapCards({ className }: { className?: string }) {
  return (
    <>
      {/** 'infinite' scrolling animation of the study path buttons. */}
      {/* Scrolling content */}
      <div className={cn('relative overflow-hidden mt-3', className)}>
        {/** top fade effect */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#000] to-transparent z-10" />

        <div
          className="animate-scroll relative z-0 flex flex-col gap-4"
          style={{ '--question-count': questions.length } as React.CSSProperties}
        >
          {/* First set of items */}
          <StudyPathsList
            offsetType="sine"
            offsetMultiplier={0.12}
            questions={allQuestions as any}
            studyPath={studyPath as any}
            className="flex flex-col gap-4"
          />

          {/* Clone of the first set to create seamless loop */}
          <div className="absolute top-full left-0 w-full">
            <StudyPathsList
              offsetType="sine"
              offsetMultiplier={0.12}
              questions={questions as any}
              studyPath={studyPath as any}
              className="flex flex-col gap-8"
            />
          </div>
        </div>

        {/* Bottom fade effect */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#000] to-transparent z-10" />
      </div>
    </>
  );
}
