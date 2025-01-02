import * as React from 'react';
import { mockUser } from './index';
import type { Tag, Users, Questions, Answers } from '@prisma/client';

type MockDb = {
  users: Map<string, Users>;
  streak: Map<string, any>;
  statistics: Map<string, any>;
  userQuestionProgress: Map<string, any>;
  answers: Map<string, Answers>;
  roadmaps: Map<string, any>;
  userRoadmaps: Map<string, any>;
  questions: Map<string, Questions>;
  questionAttempts: Map<string, any>;
  aiResponses: Map<string, any>;
  waitlist: Map<string, any>;
  stripeCustomers: Map<string, any>;
  stripeSubscriptions: Map<string, any>;
  tags: Map<string, Tag>;
  questionTags: Map<string, any>;
};

// Mock database storage
const mockDb: MockDb = {
  users: new Map(),
  streak: new Map(),
  statistics: new Map(),
  userQuestionProgress: new Map(),
  answers: new Map(),
  roadmaps: new Map(),
  userRoadmaps: new Map(),
  questions: new Map(),
  questionAttempts: new Map(),
  aiResponses: new Map(),
  waitlist: new Map(),
  stripeCustomers: new Map(),
  stripeSubscriptions: new Map(),
  tags: new Map(),
  questionTags: new Map()
};

// Initialize with mock data
const mockUserData: Users = {
  uid: mockUser.id,
  email: mockUser.email,
  username: 'devuser',
  firstName: 'Dev',
  lastName: 'User',
  userProfilePicture: mockUser.avatar_url,
  userLevel: 'STANDARD',
  totalDailyStreak: 15,
  correctDailyStreak: 12,
  showTimeTaken: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  lastLogin: new Date(),
  codeEditorTheme: 'vs-dark',
  sendPushNotifications: false
};

// Mock questions with full data structure
const mockQuestionsData: Questions[] = [
  {
    uid: 'mock-question-1',
    question: 'What is React?',
    codeSnippet: 'const App = () => { return <div>Hello World</div> }',
    hint: 'Think about component-based architecture',
    difficulty: 'EASY',
    questionDate: '2024-01-01',
    correctAnswer: 'React is a JavaScript library for building user interfaces',
    dailyQuestion: false,
    customQuestion: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    answerResource: null
  },
  {
    uid: 'mock-question-2',
    question: 'Explain TypeScript interfaces',
    codeSnippet: 'interface User { name: string; age: number; }',
    hint: 'Think about type definitions',
    difficulty: 'MEDIUM',
    questionDate: '2024-01-02',
    correctAnswer: 'TypeScript interfaces define contracts in your code',
    dailyQuestion: false,
    customQuestion: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    answerResource: null
  }
];

// Create question-tag relationships separately
const mockQuestionTags = [
  {
    questionId: 'mock-question-1',
    tagId: 'mock-tag-1'
  },
  {
    questionId: 'mock-question-1',
    tagId: 'mock-tag-2'
  },
  {
    questionId: 'mock-question-2',
    tagId: 'mock-tag-3'
  }
];

// Mock tags data
const mockTags: Tag[] = [
  {
    uid: 'mock-tag-1',
    name: 'JavaScript'
  },
  {
    uid: 'mock-tag-2',
    name: 'React'
  },
  {
    uid: 'mock-tag-3',
    name: 'TypeScript'
  },
  {
    uid: 'mock-tag-4',
    name: 'Node.js'
  }
];

// Mock answers data
const mockAnswers: Answers[] = [
  {
    uid: 'mock-answer-1',
    userUid: mockUser.id,
    questionUid: 'mock-question-1',
    userAnswerUid: 'mock-user-answer-1',
    correctAnswer: true,
    questionDate: '2024-01-01',
    timeTaken: 120,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    uid: 'mock-answer-2',
    userUid: mockUser.id,
    questionUid: 'mock-question-2',
    userAnswerUid: 'mock-user-answer-2',
    correctAnswer: false,
    questionDate: '2024-01-02',
    timeTaken: 180,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Initialize mock data
mockDb.users.set(mockUser.id, mockUserData);

mockTags.forEach(tag => {
  mockDb.tags.set(tag.uid, tag);
});

mockQuestionsData.forEach(question => {
  mockDb.questions.set(question.uid, question);
});

mockAnswers.forEach(answer => {
  mockDb.answers.set(answer.uid, answer);
});

mockQuestionTags.forEach(questionTag => {
  if (!mockDb.questionTags.has(questionTag.questionId)) {
    mockDb.questionTags.set(questionTag.questionId, []);
  }
  (mockDb.questionTags.get(questionTag.questionId) as any[]).push(questionTag.tagId);
});

// Mock database operations
export const mockDatabase = {
  users: {
    findUnique: async ({ where }: { where: { uid: string } }) => {
      const user = mockDb.users.get(where.uid);
      if (!user) return null;
      return user;
    },
    findFirst: async ({ where }: { where: { uid: string } }) => {
      const user = mockDb.users.get(where.uid);
      if (!user) return null;
      return user;
    },
    update: async ({ where, data }: { where: { uid: string }; data: Partial<Users> }) => {
      const user = mockDb.users.get(where.uid);
      if (!user) return null;
      const updatedUser = { ...user, ...data };
      mockDb.users.set(where.uid, updatedUser);
      return updatedUser;
    },
    create: async ({ data }: { data: Partial<Users> }) => {
      const newUser = {
        ...mockUserData,
        ...data,
        id: mockDb.users.size + 1
      };
      mockDb.users.set(data.uid!, newUser);
      return newUser;
    }
  },
  tag: {
    findMany: async () => {
      return Array.from(mockDb.tags.values());
    },
    findUnique: async ({ where }: { where: { uid: string } }) => {
      return mockDb.tags.get(where.uid) || null;
    },
    create: async ({ data }: { data: Partial<Tag> }) => {
      const newTag = {
        uid: `mock-tag-${mockDb.tags.size + 1}`,
        name: data.name || 'Unknown Tag'
      };
      mockDb.tags.set(newTag.uid, newTag);
      return newTag;
    }
  },
  questions: {
    findMany: async ({ skip = 0, take = 10, where, orderBy, include }: {
      skip?: number;
      take?: number;
      where?: any;
      orderBy?: any;
      include?: any;
    }) => {
      let questions = Array.from(mockDb.questions.values());

      // Apply filters
      if (where?.AND) {
        where.AND.forEach((condition: any) => {
          if (condition.difficulty) {
            questions = questions.filter(q => q.difficulty === condition.difficulty);
          }
          if (condition.userAnswers?.some) {
            questions = questions.filter(q => 
              (q as any).userAnswers.some((a: any) => a.userUid === condition.userAnswers.some.userUid)
            );
          }
          if (condition.userAnswers?.none) {
            questions = questions.filter(q => 
              !(q as any).userAnswers.some((a: any) => a.userUid === condition.userAnswers.none.userUid)
            );
          }
          if (condition.tags?.some) {
            questions = questions.filter(q =>
              (mockDb.questionTags.get(q.uid) || []).some((tagId: string) => 
                condition.tags.some.tag.name.in.includes(mockDb.tags.get(tagId)?.name)
              )
            );
          }
          if (condition.questionDate?.lte) {
            const date = new Date(condition.questionDate.lte);
            questions = questions.filter(q => new Date(q.questionDate) <= date);
          }
        });
      }

      // Apply ordering
      if (orderBy?.questionDate) {
        questions.sort((a, b) => {
          if (orderBy.questionDate === 'asc') {
            return new Date(a.questionDate).getTime() - new Date(b.questionDate).getTime();
          } else {
            return new Date(b.questionDate).getTime() - new Date(a.questionDate).getTime();
          }
        });
      }

      // Apply pagination
      const paginatedQuestions = questions.slice(skip, skip + take);

      // Include relations if requested
      if (include?.tags) {
        return paginatedQuestions.map(q => ({
          ...q,
          tags: (mockDb.questionTags.get(q.uid) || []).map((tagId: string) => ({ tag: mockDb.tags.get(tagId) }))
        }));
      }

      return paginatedQuestions;
    },
    count: async ({ where }: { where?: any }) => {
      let questions = Array.from(mockDb.questions.values());

      // Apply the same filters as findMany for consistency
      if (where?.AND) {
        where.AND.forEach((condition: any) => {
          if (condition.difficulty) {
            questions = questions.filter(q => q.difficulty === condition.difficulty);
          }
          if (condition.userAnswers?.some) {
            questions = questions.filter(q => 
              (q as any).userAnswers.some((a: any) => a.userUid === condition.userAnswers.some.userUid)
            );
          }
          if (condition.userAnswers?.none) {
            questions = questions.filter(q => 
              !(q as any).userAnswers.some((a: any) => a.userUid === condition.userAnswers.none.userUid)
            );
          }
          if (condition.tags?.some) {
            questions = questions.filter(q =>
              (mockDb.questionTags.get(q.uid) || []).some((tagId: string) => 
                condition.tags.some.tag.name.in.includes(mockDb.tags.get(tagId)?.name)
              )
            );
          }
          if (condition.questionDate?.lte) {
            const date = new Date(condition.questionDate.lte);
            questions = questions.filter(q => new Date(q.questionDate) <= date);
          }
        });
      }

      return questions.length;
    }
  },
  answers: {
    findFirst: async ({ where }: { where: { questionUid?: string; userUid?: string } }) => {
      return Array.from(mockDb.answers.values()).find(answer => {
        if (where?.questionUid && answer.questionUid !== where.questionUid) return false;
        if (where?.userUid && answer.userUid !== where.userUid) return false;
        return true;
      }) || null;
    },
    findMany: async ({ where }: { where: { questionUid?: string; userUid?: string } }) => {
      return Array.from(mockDb.answers.values()).filter(answer => {
        if (where?.questionUid && answer.questionUid !== where.questionUid) return false;
        if (where?.userUid && answer.userUid !== where.userUid) return false;
        return true;
      });
    },
    create: async ({ data }: { data: Partial<Answers> }) => {
      const newAnswer = {
        uid: `mock-answer-${mockDb.answers.size + 1}`,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      } as Answers;
      mockDb.answers.set(newAnswer.uid, newAnswer);
      return newAnswer;
    },
    update: async ({ where, data }: { where: { uid: string }; data: Partial<Answers> }) => {
      const answer = mockDb.answers.get(where.uid);
      if (!answer) return null;
      const updatedAnswer = { ...answer, ...data, updatedAt: new Date() };
      mockDb.answers.set(where.uid, updatedAnswer);
      return updatedAnswer;
    }
  }
};
