import * as React from 'react';
import { mockUser, mockQuestions } from './index';

const mockDb = {
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
  roadmapQuestions: new Map(),
  defaultRoadmapQuestions: new Map(),
  defaultRoadmapQuestionsAnswers: new Map(),
  tags: new Map()
};

// Initialize with mock data
const mockUserData = {
  id: 1,
  uid: mockUser.id,
  email: mockUser.email,
  name: mockUser.name,
  username: 'devuser',
  firstName: 'Dev',
  lastName: 'User',
  avatar_url: mockUser.avatar_url,
  userLevel: 'ADMIN',
  isActive: true,
  totalDailyStreak: 15,
  correctDailyStreak: 12,
  userProfilePicture: mockUser.avatar_url,
  showTimeTaken: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  lastLogin: new Date(),
  stripeCustomerId: 'mock_stripe_id',
  subscription: {
    status: 'active',
    plan: 'pro'
  }
};

// Mock roadmap questions
const mockRoadmapQuestions = [
  {
    id: 1,
    uid: 'mock-roadmap-question-1',
    question: 'What is React?',
    codeSnippet: 'const App = () => { return <div>Hello World</div> }',
    hint: 'Think about component-based architecture',
    difficulty: 'BEGINNER',
    completed: true,
    completedAt: new Date(),
    roadmapUid: 'mock-roadmap-1',
    correctAnswerUid: 'mock-answer-1',
    userCorrect: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    uid: 'mock-roadmap-question-2',
    question: 'Explain React hooks',
    codeSnippet: 'const [state, setState] = useState(0)',
    hint: 'Consider the lifecycle of a component',
    difficulty: 'INTERMEDIATE',
    completed: false,
    completedAt: null,
    roadmapUid: 'mock-roadmap-1',
    correctAnswerUid: 'mock-answer-2',
    userCorrect: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Mock roadmaps data
const mockRoadmaps = [
  {
    id: 1,
    uid: 'mock-roadmap-1',
    title: 'Frontend Development',
    description: 'Learn frontend development from scratch',
    difficulty: 'INTERMEDIATE',
    tags: ['react', 'javascript', 'css'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    uid: 'mock-roadmap-2',
    title: 'Backend Development',
    description: 'Master backend development',
    difficulty: 'ADVANCED',
    tags: ['node', 'express', 'databases'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Mock user roadmaps
const mockUserRoadmaps = [
  {
    id: 1,
    uid: 'mock-user-roadmap-1',
    userUid: mockUserData.uid,
    roadmapUid: 'mock-roadmap-1',
    status: 'ACTIVE',
    currentQuestionIndex: 1,
    hasGeneratedRoadmap: true,
    title: 'My Frontend Journey',
    description: 'Personal frontend development path',
    questions: mockRoadmapQuestions,
    DefaultRoadmapQuestionsUsersAnswers: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    uid: 'mock-user-roadmap-2',
    userUid: mockUserData.uid,
    roadmapUid: 'mock-roadmap-2',
    status: 'CREATING',
    currentQuestionIndex: 0,
    hasGeneratedRoadmap: false,
    title: 'Backend Learning Path',
    description: 'Personal backend development journey',
    questions: [],
    DefaultRoadmapQuestionsUsersAnswers: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Mock answers data
const mockAnswers = [
  {
    id: 1,
    uid: 'mock-answer-1',
    questionUid: 'mock-roadmap-question-1',
    userUid: mockUser.id,
    answer: 'React is a JavaScript library for building user interfaces',
    isCorrect: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    uid: 'mock-answer-2',
    questionUid: 'mock-roadmap-question-2',
    userUid: mockUser.id,
    answer: 'React hooks are functions that allow you to use state and other React features in functional components',
    isCorrect: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Mock question attempts data
const mockQuestionAttempts = [
  {
    id: 1,
    uid: 'mock-attempt-1',
    userUid: mockUser.id,
    questionUid: 'mock-roadmap-question-1',
    attemptCount: 2,
    completed: true,
    timeTaken: 120,
    lastAttempted: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    uid: 'mock-attempt-2',
    userUid: mockUser.id,
    questionUid: 'mock-roadmap-question-2',
    attemptCount: 1,
    completed: false,
    timeTaken: 60,
    lastAttempted: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Mock AI responses data
const mockAIResponses = [
  {
    id: 1,
    uid: 'mock-ai-response-1',
    userUid: mockUser.id,
    questionUid: 'mock-roadmap-question-1',
    response: 'React is a JavaScript library for building user interfaces. It uses a component-based architecture and virtual DOM for efficient updates.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    uid: 'mock-ai-response-2',
    userUid: mockUser.id,
    questionUid: 'mock-roadmap-question-2',
    response: 'React hooks are functions that let you use state and other React features in functional components. They were introduced in React 16.8.',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Mock tags data
const mockTags = [
  {
    id: 1,
    uid: 'mock-tag-1',
    name: 'JavaScript',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    uid: 'mock-tag-2',
    name: 'React',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    uid: 'mock-tag-3',
    name: 'TypeScript',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    uid: 'mock-tag-4',
    name: 'Node.js',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Mock statistics data
const mockStatistics = [
  {
    id: 1,
    uid: 'mock-stat-1',
    userUid: mockUser.id,
    totalQuestions: 100,
    correctAnswers: 75,
    incorrectAnswers: 25,
    averageTime: 120,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Mock Stripe data
const mockStripeCustomers = [
  {
    id: 1,
    uid: 'mock-stripe-customer-1',
    userUid: mockUser.id,
    stripeCustomerId: 'cus_mock1',
    email: mockUser.email,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockStripeSubscriptions = [
  {
    id: 1,
    uid: 'mock-stripe-subscription-1',
    userUid: mockUser.id,
    stripeCustomerId: 'cus_mock1',
    stripeSubscriptionId: 'sub_mock1',
    stripePriceId: 'price_mock1',
    status: 'active',
    currentPeriodStart: new Date(),
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    cancelAtPeriodEnd: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Mock questions data
const mockQuestions = [
  {
    id: 1,
    uid: 'mock-question-1',
    question: 'What is React?',
    codeSnippet: 'const App = () => { return <div>Hello World</div> }',
    hint: 'Think about component-based architecture',
    difficulty: 'BEGINNER',
    questionDate: new Date('2024-01-01'),
    tags: [
      {
        tag: {
          id: 1,
          uid: 'mock-tag-1',
          name: 'React',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      },
      {
        tag: {
          id: 2,
          uid: 'mock-tag-2',
          name: 'JavaScript',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }
    ],
    userAnswers: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    uid: 'mock-question-2',
    question: 'Explain TypeScript interfaces',
    codeSnippet: 'interface User { name: string; age: number; }',
    hint: 'Think about type definitions',
    difficulty: 'INTERMEDIATE',
    questionDate: new Date('2024-01-02'),
    tags: [
      {
        tag: {
          id: 3,
          uid: 'mock-tag-3',
          name: 'TypeScript',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }
    ],
    userAnswers: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Initialize mock data
mockDb.users.set(mockUser.id, mockUserData);

mockTags.forEach(tag => {
  mockDb.tags.set(tag.uid, tag);
});

mockRoadmaps.forEach(roadmap => {
  mockDb.roadmaps.set(roadmap.uid, roadmap);
});

mockUserRoadmaps.forEach(userRoadmap => {
  mockDb.userRoadmaps.set(userRoadmap.uid, userRoadmap);
});

mockRoadmapQuestions.forEach(question => {
  mockDb.roadmapQuestions.set(question.uid, question);
});

mockAnswers.forEach(answer => {
  mockDb.answers.set(answer.uid, answer);
});

mockQuestionAttempts.forEach(attempt => {
  mockDb.questionAttempts.set(attempt.uid, attempt);
});

mockStatistics.forEach(stat => {
  mockDb.statistics.set(stat.uid, stat);
});

mockAIResponses.forEach(response => {
  mockDb.aiResponses.set(response.uid, response);
});

mockStripeCustomers.forEach(customer => {
  mockDb.stripeCustomers.set(customer.uid, customer);
});

mockStripeSubscriptions.forEach(subscription => {
  mockDb.stripeSubscriptions.set(subscription.uid, subscription);
});

mockQuestions.forEach(question => {
  mockDb.questions.set(question.uid, question);
});

// Mock database operations
export const mockDatabase = {
  users: {
    findUnique: async ({ where }: any) => {
      const user = mockDb.users.get(where.uid);
      if (!user) return null;
      return user;
    },
    findFirst: async ({ where }: any) => {
      const user = mockDb.users.get(where.uid);
      if (!user) return null;
      return user;
    },
    update: async ({ where, data }: any) => {
      const user = mockDb.users.get(where.uid);
      if (!user) return null;
      const updatedUser = { ...user, ...data };
      mockDb.users.set(where.uid, updatedUser);
      return updatedUser;
    },
    create: async ({ data }: any) => {
      const newUser = {
        ...mockUserData,
        ...data,
        id: mockDb.users.size + 1
      };
      mockDb.users.set(data.uid, newUser);
      return newUser;
    }
  },
  userRoadmaps: {
    findMany: async ({ where, include }: any) => {
      return Array.from(mockDb.userRoadmaps.values()).filter(roadmap => {
        if (where?.userUid && roadmap.userUid !== where.userUid) return false;
        if (where?.roadmapUid && roadmap.roadmapUid !== where.roadmapUid) return false;
        return true;
      });
    },
    findFirst: async ({ where }: any) => {
      return Array.from(mockDb.userRoadmaps.values()).find(roadmap => {
        if (where?.userUid && roadmap.userUid !== where.userUid) return false;
        if (where?.roadmapUid && roadmap.roadmapUid !== where.roadmapUid) return false;
        return true;
      }) || null;
    },
    findUnique: async ({ where }: any) => {
      return mockDb.userRoadmaps.get(where.uid) || null;
    },
    create: async ({ data }: any) => {
      const newRoadmap = {
        id: mockDb.userRoadmaps.size + 1,
        uid: `mock-user-roadmap-${mockDb.userRoadmaps.size + 1}`,
        ...data,
        status: 'CREATING',
        currentQuestionIndex: 0,
        hasGeneratedRoadmap: false,
        questions: [],
        DefaultRoadmapQuestionsUsersAnswers: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mockDb.userRoadmaps.set(newRoadmap.uid, newRoadmap);
      return newRoadmap;
    },
    update: async ({ where, data }: any) => {
      const roadmap = mockDb.userRoadmaps.get(where.uid);
      if (!roadmap) return null;
      const updatedRoadmap = { ...roadmap, ...data, updatedAt: new Date() };
      mockDb.userRoadmaps.set(where.uid, updatedRoadmap);
      return updatedRoadmap;
    }
  },
  roadmaps: {
    findMany: async ({ where }: any) => {
      return Array.from(mockDb.roadmaps.values()).filter(roadmap => {
        if (where?.uid && roadmap.uid !== where.uid) return false;
        return true;
      });
    },
    findUnique: async ({ where }: any) => {
      return mockDb.roadmaps.get(where.uid) || null;
    }
  },
  roadmapQuestions: {
    findMany: async ({ where }: any) => {
      return Array.from(mockDb.roadmapQuestions.values()).filter(question => {
        if (where?.roadmapUid && question.roadmapUid !== where.roadmapUid) return false;
        return true;
      });
    },
    findUnique: async ({ where }: any) => {
      return mockDb.roadmapQuestions.get(where.uid) || null;
    },
    create: async ({ data }: any) => {
      const newQuestion = {
        id: mockDb.roadmapQuestions.size + 1,
        uid: `mock-roadmap-question-${mockDb.roadmapQuestions.size + 1}`,
        ...data,
        completed: false,
        completedAt: null,
        userCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mockDb.roadmapQuestions.set(newQuestion.uid, newQuestion);
      return newQuestion;
    },
    update: async ({ where, data }: any) => {
      const question = mockDb.roadmapQuestions.get(where.uid);
      if (!question) return null;
      const updatedQuestion = { ...question, ...data, updatedAt: new Date() };
      mockDb.roadmapQuestions.set(where.uid, updatedQuestion);
      return updatedQuestion;
    }
  },
  questionAttempts: {
    findFirst: async ({ where }: any) => {
      return Array.from(mockDb.questionAttempts.values()).find(attempt => {
        if (where?.userUid && attempt.userUid !== where.userUid) return false;
        if (where?.questionUid && attempt.questionUid !== where.questionUid) return false;
        return true;
      }) || null;
    },
    findMany: async ({ where }: any) => {
      return Array.from(mockDb.questionAttempts.values()).filter(attempt => {
        if (where?.userUid && attempt.userUid !== where.userUid) return false;
        if (where?.questionUid && attempt.questionUid !== where.questionUid) return false;
        return true;
      });
    },
    create: async ({ data }: any) => {
      const newAttempt = {
        id: mockDb.questionAttempts.size + 1,
        uid: `mock-attempt-${mockDb.questionAttempts.size + 1}`,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mockDb.questionAttempts.set(newAttempt.uid, newAttempt);
      return newAttempt;
    },
    update: async ({ where, data }: any) => {
      const attempt = mockDb.questionAttempts.get(where.uid);
      if (!attempt) return null;
      const updatedAttempt = { ...attempt, ...data, updatedAt: new Date() };
      mockDb.questionAttempts.set(where.uid, updatedAttempt);
      return updatedAttempt;
    }
  },
  answers: {
    findFirst: async ({ where }: any) => {
      return Array.from(mockDb.answers.values()).find(answer => {
        if (where?.questionUid && answer.questionUid !== where.questionUid) return false;
        if (where?.userUid && answer.userUid !== where.userUid) return false;
        return true;
      }) || null;
    },
    findMany: async ({ where }: any) => {
      return Array.from(mockDb.answers.values()).filter(answer => {
        if (where?.questionUid && answer.questionUid !== where.questionUid) return false;
        if (where?.userUid && answer.userUid !== where.userUid) return false;
        return true;
      });
    },
    create: async ({ data }: any) => {
      const newAnswer = {
        id: mockDb.answers.size + 1,
        uid: `mock-answer-${mockDb.answers.size + 1}`,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mockDb.answers.set(newAnswer.uid, newAnswer);
      return newAnswer;
    },
    update: async ({ where, data }: any) => {
      const answer = mockDb.answers.get(where.uid);
      if (!answer) return null;
      const updatedAnswer = { ...answer, ...data, updatedAt: new Date() };
      mockDb.answers.set(where.uid, updatedAnswer);
      return updatedAnswer;
    }
  },
  aiResponses: {
    findFirst: async ({ where }: any) => {
      return Array.from(mockDb.aiResponses.values()).find(response => {
        if (where?.userUid && response.userUid !== where.userUid) return false;
        if (where?.questionUid && response.questionUid !== where.questionUid) return false;
        return true;
      }) || null;
    },
    findMany: async ({ where }: any) => {
      return Array.from(mockDb.aiResponses.values()).filter(response => {
        if (where?.userUid && response.userUid !== where.userUid) return false;
        if (where?.questionUid && response.questionUid !== where.questionUid) return false;
        return true;
      });
    },
    create: async ({ data }: any) => {
      const newResponse = {
        id: mockDb.aiResponses.size + 1,
        uid: `mock-ai-response-${mockDb.aiResponses.size + 1}`,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mockDb.aiResponses.set(newResponse.uid, newResponse);
      return newResponse;
    },
    update: async ({ where, data }: any) => {
      const response = mockDb.aiResponses.get(where.uid);
      if (!response) return null;
      const updatedResponse = { ...response, ...data, updatedAt: new Date() };
      mockDb.aiResponses.set(where.uid, updatedResponse);
      return updatedResponse;
    }
  },
  statistics: {
    findFirst: async ({ where }: any) => {
      return Array.from(mockDb.statistics.values()).find(stat => {
        if (where?.userUid && stat.userUid !== where.userUid) return false;
        return true;
      }) || null;
    },
    findMany: async ({ where }: any) => {
      return Array.from(mockDb.statistics.values()).filter(stat => {
        if (where?.userUid && stat.userUid !== where.userUid) return false;
        return true;
      });
    },
    create: async ({ data }: any) => {
      const newStat = {
        id: mockDb.statistics.size + 1,
        uid: `mock-stat-${mockDb.statistics.size + 1}`,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mockDb.statistics.set(newStat.uid, newStat);
      return newStat;
    },
    update: async ({ where, data }: any) => {
      const stat = mockDb.statistics.get(where.uid);
      if (!stat) return null;
      const updatedStat = { ...stat, ...data, updatedAt: new Date() };
      mockDb.statistics.set(where.uid, updatedStat);
      return updatedStat;
    }
  },
  tag: {
    findMany: async () => {
      return Array.from(mockDb.tags.values());
    },
    findUnique: async ({ where }: any) => {
      return mockDb.tags.get(where.uid) || null;
    },
    create: async ({ data }: any) => {
      const newTag = {
        id: mockDb.tags.size + 1,
        uid: `mock-tag-${mockDb.tags.size + 1}`,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mockDb.tags.set(newTag.uid, newTag);
      return newTag;
    }
  },
  tags: {
    findMany: async () => {
      return Array.from(mockDb.tags.values());
    },
    findUnique: async ({ where }: any) => {
      return mockDb.tags.get(where.uid) || null;
    },
    create: async ({ data }: any) => {
      const newTag = {
        id: mockDb.tags.size + 1,
        uid: `mock-tag-${mockDb.tags.size + 1}`,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mockDb.tags.set(newTag.uid, newTag);
      return newTag;
    }
  },
  stripeCustomers: {
    findFirst: async ({ where }: any) => {
      return Array.from(mockDb.stripeCustomers.values()).find(customer => {
        if (where?.userUid && customer.userUid !== where.userUid) return false;
        if (where?.stripeCustomerId && customer.stripeCustomerId !== where.stripeCustomerId) return false;
        return true;
      }) || null;
    },
    create: async ({ data }: any) => {
      const newCustomer = {
        id: mockDb.stripeCustomers.size + 1,
        uid: `mock-stripe-customer-${mockDb.stripeCustomers.size + 1}`,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mockDb.stripeCustomers.set(newCustomer.uid, newCustomer);
      return newCustomer;
    },
    update: async ({ where, data }: any) => {
      const customer = mockDb.stripeCustomers.get(where.uid);
      if (!customer) return null;
      const updatedCustomer = { ...customer, ...data, updatedAt: new Date() };
      mockDb.stripeCustomers.set(where.uid, updatedCustomer);
      return updatedCustomer;
    }
  },
  stripeSubscriptions: {
    findFirst: async ({ where }: any) => {
      return Array.from(mockDb.stripeSubscriptions.values()).find(subscription => {
        if (where?.userUid && subscription.userUid !== where.userUid) return false;
        if (where?.stripeSubscriptionId && subscription.stripeSubscriptionId !== where.stripeSubscriptionId) return false;
        return true;
      }) || null;
    },
    create: async ({ data }: any) => {
      const newSubscription = {
        id: mockDb.stripeSubscriptions.size + 1,
        uid: `mock-stripe-subscription-${mockDb.stripeSubscriptions.size + 1}`,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mockDb.stripeSubscriptions.set(newSubscription.uid, newSubscription);
      return newSubscription;
    },
    update: async ({ where, data }: any) => {
      const subscription = mockDb.stripeSubscriptions.get(where.uid);
      if (!subscription) return null;
      const updatedSubscription = { ...subscription, ...data, updatedAt: new Date() };
      mockDb.stripeSubscriptions.set(where.uid, updatedSubscription);
      return updatedSubscription;
    }
  },
  questions: {
    findMany: async ({ skip = 0, take = 10, where, orderBy, include }: any) => {
      let questions = Array.from(mockDb.questions.values());

      // Apply filters
      if (where?.AND) {
        where.AND.forEach((condition: any) => {
          if (condition.difficulty) {
            questions = questions.filter(q => q.difficulty === condition.difficulty);
          }
          if (condition.userAnswers?.some) {
            questions = questions.filter(q => 
              q.userAnswers.some(a => a.userUid === condition.userAnswers.some.userUid)
            );
          }
          if (condition.userAnswers?.none) {
            questions = questions.filter(q => 
              !q.userAnswers.some(a => a.userUid === condition.userAnswers.none.userUid)
            );
          }
          if (condition.tags?.some) {
            questions = questions.filter(q =>
              q.tags.some(t => 
                condition.tags.some.tag.name.in.includes(t.tag.name)
              )
            );
          }
          if (condition.questionDate?.lte) {
            const date = new Date(condition.questionDate.lte);
            questions = questions.filter(q => q.questionDate <= date);
          }
        });
      }

      // Apply ordering
      if (orderBy?.questionDate) {
        questions.sort((a, b) => {
          if (orderBy.questionDate === 'asc') {
            return a.questionDate.getTime() - b.questionDate.getTime();
          } else {
            return b.questionDate.getTime() - a.questionDate.getTime();
          }
        });
      }

      // Apply pagination
      const paginatedQuestions = questions.slice(skip, skip + take);

      // Include relations if requested
      if (include?.tags) {
        return paginatedQuestions.map(q => ({
          ...q,
          tags: include.tags.include.tag ? q.tags.map(t => ({ tag: t.tag })) : q.tags
        }));
      }

      return paginatedQuestions;
    },
    count: async ({ where }: any) => {
      let questions = Array.from(mockDb.questions.values());

      // Apply the same filters as findMany for consistency
      if (where?.AND) {
        where.AND.forEach((condition: any) => {
          if (condition.difficulty) {
            questions = questions.filter(q => q.difficulty === condition.difficulty);
          }
          if (condition.userAnswers?.some) {
            questions = questions.filter(q => 
              q.userAnswers.some(a => a.userUid === condition.userAnswers.some.userUid)
            );
          }
          if (condition.userAnswers?.none) {
            questions = questions.filter(q => 
              !q.userAnswers.some(a => a.userUid === condition.userAnswers.none.userUid)
            );
          }
          if (condition.tags?.some) {
            questions = questions.filter(q =>
              q.tags.some(t => 
                condition.tags.some.tag.name.in.includes(t.tag.name)
              )
            );
          }
          if (condition.questionDate?.lte) {
            const date = new Date(condition.questionDate.lte);
            questions = questions.filter(q => q.questionDate <= date);
          }
        });
      }

      return questions.length;
    }
  },
  $queryRaw: async <T>(query: TemplateStringsArray, ...values: any[]): Promise<T> => {
    // Mock implementation for the longest streaks query
    if (query[0].includes('RankedStreaks')) {
      const streaks = Array.from(mockDb.streak.values());
      const users = Array.from(mockDb.users.values());
      
      const rankedStreaks = streaks
        .map(streak => {
          const user = users.find(u => u.uid === streak.userUid);
          if (!user || streak.longestStreak === 0) return null;
          
          return {
            userUid: streak.userUid,
            streak: streak.longestStreak,
            rank: 0, // Will be calculated below
            user: {
              uid: user.uid,
              email: user.email,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              userLevel: user.userLevel,
              totalDailyStreak: user.totalDailyStreak,
              correctDailyStreak: user.correctDailyStreak,
              userProfilePicture: user.userProfilePicture,
              showTimeTaken: user.showTimeTaken,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
              lastLogin: user.lastLogin
            }
          };
        })
        .filter(Boolean)
        .sort((a, b) => b!.streak - a!.streak)
        .map((streak, index) => ({
          ...streak!,
          rank: index + 1
        }))
        .slice(0, 5);

      return rankedStreaks as T;
    }
    
    // Default fallback for unknown queries
    return [] as T;
  }
};
