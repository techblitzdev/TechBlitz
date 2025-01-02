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
  roadmapQuestions: Map<string, any>;
  defaultRoadmapQuestions: Map<string, any>;
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
  questionTags: new Map(),
  roadmapQuestions: new Map(),
  defaultRoadmapQuestions: new Map()
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
    findMany: async ({ 
      where,
      orderBy,
      take,
      select,
      include
    }: { 
      where?: {
        answers?: {
          some: {}
        }
      },
      orderBy?: {
        answers?: {
          _count: 'asc' | 'desc'
        }
      },
      take?: number,
      select?: {
        uid?: boolean,
        username?: boolean,
        email?: boolean,
        answers?: boolean,
        userProfilePicture?: boolean,
        _count?: {
          select: { answers: boolean }
        }
      },
      include?: {
        answers?: boolean
      }
    }) => {
      let users = Array.from(mockDb.users.values());

      // Filter users who have answered questions
      if (where?.answers?.some) {
        users = users.filter(user => {
          const userAnswers = Array.from(mockDb.answers.values()).filter(
            answer => answer.userUid === user.uid
          );
          return userAnswers.length > 0;
        });
      }

      // Order by answer count
      if (orderBy?.answers?._count) {
        users.sort((a, b) => {
          const aCount = Array.from(mockDb.answers.values()).filter(
            answer => answer.userUid === a.uid
          ).length;
          const bCount = Array.from(mockDb.answers.values()).filter(
            answer => answer.userUid === b.uid
          ).length;

          return orderBy?.answers?._count === 'desc' ? bCount - aCount : aCount - bCount;
        });
      }

      // Apply pagination
      if (typeof take === 'number') {
        users = users.slice(0, take);
      }

      // Apply selection
      if (select) {
        users = users.map(user => {
          const result: any = {};
          if (select.uid) result.uid = user.uid;
          if (select.username) result.username = user.username;
          if (select.email) result.email = user.email;
          if (select.userProfilePicture) result.userProfilePicture = user.userProfilePicture;
          if (select.answers) {
            result.answers = Array.from(mockDb.answers.values()).filter(
              answer => answer.userUid === user.uid
            );
          }
          if (select._count?.select?.answers) {
            result._count = {
              answers: Array.from(mockDb.answers.values()).filter(
                answer => answer.userUid === user.uid
              ).length
            };
          }
          return result;
        });
      }

      return users;
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
    findMany: async ({ 
      where,
      include,
      orderBy,
      take,
      skip = 0
    }: { 
      where?: {
        AND?: Array<{
          tags?: {
            some?: {
              tag?: {
                uid?: {
                  in?: string[]
                }
              }
            }
          },
          dailyQuestion?: boolean
        }>,
        NOT?: {
          uid?: {
            in?: string[]
          }
        }
      },
      include?: {
        tags?: {
          include?: {
            tag?: boolean
          }
        }
      },
      orderBy?: {
        createdAt?: 'asc' | 'desc'
      },
      take?: number,
      skip?: number
    }) => {
      let questions = Array.from(mockDb.questions.values());

      if (where?.AND) {
        questions = questions.filter(question => {
          return where.AND!.every((condition: { 
            tags?: { 
              some?: { 
                tag?: { 
                  uid?: { 
                    in?: string[] 
                  } 
                } 
              } 
            };
            dailyQuestion?: boolean 
          }) => {
            if (condition.tags?.some?.tag) {
              const questionTags = mockDb.questionTags.get(question.uid) || [];
              return questionTags.some((tagId: string) => {
                const tag = mockDb.tags.get(tagId);
                return condition.tags?.some?.tag?.uid?.in?.includes(tag?.uid || '');
              });
            }
            if (condition.dailyQuestion !== undefined) {
              return question.dailyQuestion === condition.dailyQuestion;
            }
            return true;
          });
        });
      }

      if (where?.NOT?.uid?.in) {
        questions = questions.filter(question => 
          !where.NOT?.uid?.in?.includes(question.uid)
        );
      }

      // Handle ordering
      if (orderBy?.createdAt) {
        questions.sort((a, b) => {
          if (orderBy.createdAt === 'desc') {
            return b.createdAt.getTime() - a.createdAt.getTime();
          }
          return a.createdAt.getTime() - b.createdAt.getTime();
        });
      }

      // Handle includes
      if (include?.tags) {
        questions = questions.map(question => {
          type QuestionWithTags = typeof question & {
            tags?: Array<{ tag?: { uid: string } | undefined }>;
          };
          
          let questionWithIncludes = { ...question } as QuestionWithTags;

          if (include.tags?.include?.tag) {
            const tags = mockDb.questionTags.get(question.uid) || [];
            questionWithIncludes.tags = tags.map((tagId: string) => ({
              tag: mockDb.tags.get(tagId)
            }));
          }

          return questionWithIncludes;
        });
      }

      // Handle pagination
      const paginatedQuestions = questions.slice(skip, skip + (take || questions.length));

      return paginatedQuestions;
    },
    findFirst: async ({ 
      where,
      include,
      orderBy 
    }: { 
      where?: { 
        uid?: { 
          not?: string 
        } 
      };
      include?: {
        tags?: {
          include?: {
            tag?: boolean
          }
        }
      };
      orderBy?: {
        createdAt?: 'asc' | 'desc'
      }
    } = {}) => {
      let questions = Array.from(mockDb.questions.values());

      if (where?.uid?.not !== undefined) {
        questions = questions.filter(question => question.uid !== where?.uid?.not);
      }

      // Handle ordering
      if (orderBy?.createdAt) {
        questions.sort((a, b) => {
          if (orderBy.createdAt === 'desc') {
            return b.createdAt.getTime() - a.createdAt.getTime();
          }
          return a.createdAt.getTime() - b.createdAt.getTime();
        });
      }

      // Handle includes
      let result = questions[0];
      if (!result) return null;

      type QuestionWithIncludes = typeof result & {
        tags?: Array<{
          tag?: { uid: string } | undefined;
        }>;
      };

      if (include?.tags) {
        const tags = mockDb.questionTags.get(result.uid) || [];
        result = {
          ...result,
          tags: tags.map((tagId: string) => ({
            tag: include.tags?.include?.tag ? mockDb.tags.get(tagId) : undefined
          }))
        } as QuestionWithIncludes;
      }

      return result;
    },
    count: async ({ where }: { where?: any }) => {
      let questions = Array.from(mockDb.questions.values());

      // Apply the same filters as findMany for consistency
      if (where?.AND) {
        questions = questions.filter(question => {
          return where.AND!.every((condition: { 
            tags?: { 
              some?: { 
                tag?: { 
                  uid?: { 
                    in?: string[] 
                  } 
                } 
              } 
            };
            dailyQuestion?: boolean 
          }) => {
            if (condition.tags?.some?.tag) {
              const questionTags = mockDb.questionTags.get(question.uid) || [];
              return questionTags.some((tagId: string) => {
                const tag = mockDb.tags.get(tagId);
                return condition.tags?.some?.tag?.uid?.in?.includes(tag?.uid || '');
              });
            }
            if (condition.dailyQuestion !== undefined) {
              return question.dailyQuestion === condition.dailyQuestion;
            }
            return true;
          });
        });
      }

      if (where?.NOT?.uid?.in) {
        questions = questions.filter(question => 
          !where.NOT?.uid?.in?.includes(question.uid)
        );
      }

      return questions.length;
    }
  },
  defaultRoadmapQuestions: {
    findFirst: async ({ 
      where,
      include
    }: { 
      where?: { 
        order?: number;
      };
      include?: {
        answers?: boolean;
      }
    } = {}) => {
      let questions = Array.from(mockDb.defaultRoadmapQuestions.values());

      // Filter by order
      if (where?.order !== undefined) {
        questions = questions.filter(question => question.order === where.order);
      }

      // Get the first matching question
      const question = questions[0];
      if (!question) return null;

      // Handle includes
      if (include?.answers) {
        return {
          ...question,
          answers: Array.from(mockDb.answers.values())
            .filter(answer => answer.questionUid === question.questionUid)
        };
      }

      return question;
    },
    findMany: async ({ 
      where,
      include,
      orderBy
    }: { 
      where?: { 
        order?: number;
      };
      include?: {
        answers?: boolean;
      };
      orderBy?: {
        order?: 'asc' | 'desc';
      }
    } = {}) => {
      let questions = Array.from(mockDb.defaultRoadmapQuestions.values());

      // Filter by order
      if (where?.order !== undefined) {
        questions = questions.filter(question => question.order === where.order);
      }

      // Handle ordering
      if (orderBy?.order) {
        questions.sort((a, b) => {
          if (orderBy.order === 'desc') {
            return b.order - a.order;
          }
          return a.order - b.order;
        });
      }

      // Handle includes
      if (include?.answers) {
        questions = questions.map(question => ({
          ...question,
          answers: Array.from(mockDb.answers.values())
            .filter(answer => answer.questionUid === question.questionUid)
        }));
      }

      return questions;
    },
    create: async ({ 
      data 
    }: { 
      data: { 
        questionUid: string;
        order: number;
      } 
    }) => {
      const defaultQuestion = {
        uid: `default_roadmap_question_${Date.now()}`,
        questionUid: data.questionUid,
        order: data.order,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mockDb.defaultRoadmapQuestions.set(defaultQuestion.uid, defaultQuestion);
      return defaultQuestion;
    },
    update: async ({ 
      where,
      data 
    }: { 
      where: { 
        uid: string 
      };
      data: {
        order?: number;
      }
    }) => {
      const question = mockDb.defaultRoadmapQuestions.get(where.uid);
      if (!question) return null;

      const updatedQuestion = {
        ...question,
        ...data,
        updatedAt: new Date()
      };
      mockDb.defaultRoadmapQuestions.set(where.uid, updatedQuestion);
      return updatedQuestion;
    },
    delete: async ({ where }: { where: { uid: string } }) => {
      const question = mockDb.defaultRoadmapQuestions.get(where.uid);
      if (!question) return null;

      mockDb.defaultRoadmapQuestions.delete(where.uid);
      return question;
    }
  },
  userRoadmaps: {
    findMany: async ({ 
      where,
      include,
      orderBy
    }: { 
      where?: { 
        userUid?: string 
      };
      include?: {
        questions?: {
          include?: {
            answers?: boolean
          }
        }
      };
      orderBy?: {
        createdAt?: 'asc' | 'desc'
      }
    } = {}) => {
      let roadmaps = Array.from(mockDb.userRoadmaps.values());

      // Filter by user
      if (where?.userUid) {
        roadmaps = roadmaps.filter(roadmap => roadmap.userUid === where.userUid);
      }

      // Handle ordering
      if (orderBy?.createdAt) {
        roadmaps.sort((a, b) => {
          if (orderBy.createdAt === 'desc') {
            return b.createdAt.getTime() - a.createdAt.getTime();
          }
          return a.createdAt.getTime() - b.createdAt.getTime();
        });
      }

      // Handle includes
      if (include?.questions?.include?.answers) {
        roadmaps = roadmaps.map(roadmap => {
          const questions = mockDb.roadmapQuestions.get(roadmap.uid) || [];
          return {
            ...roadmap,
            questions: questions.map((questionId: string) => {
              const question = mockDb.questions.get(questionId);
              if (!question) return null;

              const answers = Array.from(mockDb.answers.values())
                .filter(answer => answer.questionUid === questionId);

              return {
                ...question,
                answers
              };
            }).filter(Boolean)
          };
        });
      }

      return roadmaps;
    },
    create: async ({ 
      data 
    }: { 
      data: { 
        userUid: string;
        name: string;
        description?: string;
      } 
    }) => {
      const roadmap = {
        uid: `roadmap_${Date.now()}`,
        userUid: data.userUid,
        name: data.name,
        description: data.description || '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mockDb.userRoadmaps.set(roadmap.uid, roadmap);
      return roadmap;
    },
    update: async ({ 
      where,
      data 
    }: { 
      where: { 
        uid: string 
      };
      data: {
        name?: string;
        description?: string;
      }
    }) => {
      const roadmap = mockDb.userRoadmaps.get(where.uid);
      if (!roadmap) return null;

      const updatedRoadmap = {
        ...roadmap,
        ...data,
        updatedAt: new Date()
      };
      mockDb.userRoadmaps.set(where.uid, updatedRoadmap);
      return updatedRoadmap;
    },
    delete: async ({ where }: { where: { uid: string } }) => {
      const roadmap = mockDb.userRoadmaps.get(where.uid);
      if (!roadmap) return null;

      mockDb.userRoadmaps.delete(where.uid);
      return roadmap;
    }
  },
  $queryRaw: async <T extends { rank: number }[]>(
    strings: TemplateStringsArray,
    questionUid: string,
    userUid: string
  ): Promise<T> => {
    // Get all answers for the question
    const answers = Array.from(mockDb.answers.values())
      .filter(answer => answer.questionUid === questionUid)
      .sort((a, b) => (a.timeTaken || 0) - (b.timeTaken || 0));

    // Find the rank of the user
    const userRank = answers.findIndex(answer => answer.userUid === userUid) + 1;

    // Return in the expected format
    return [{ rank: userRank }] as T;
  },
  answers: {
    findFirst: async ({ where }: { where: { questionUid?: string; userUid?: string } }) => {
      return Array.from(mockDb.answers.values()).find(
        answer =>
          (!where.questionUid || answer.questionUid === where.questionUid) &&
          (!where.userUid || answer.userUid === where.userUid)
      );
    },
    findMany: async ({ 
      where, 
      include,
      orderBy,
      take,
      skip = 0
    }: { 
      where?: { 
        questionUid?: string; 
        userUid?: string;
        questionDate?: string;
        correctAnswer?: boolean;
        user?: {
          showTimeTaken?: boolean;
        }
      };
      include?: {
        question?: {
          include?: {
            tags?: {
              include?: {
                tag?: boolean
              }
            }
          }
        };
        user?: boolean;
      };
      orderBy?: {
        createdAt?: 'asc' | 'desc';
        timeTaken?: 'asc' | 'desc';
      };
      take?: number;
      skip?: number;
    }) => {
      let answers = Array.from(mockDb.answers.values()).filter((answer) => {
        if (!where) return true;
        if (where.questionDate && answer.questionDate !== where.questionDate) return false;
        if (where.questionUid && answer.questionUid !== where.questionUid) return false;
        if (where.userUid && answer.userUid !== where.userUid) return false;
        if (where.correctAnswer !== undefined && answer.correctAnswer !== where.correctAnswer) return false;
        if (where.user?.showTimeTaken !== undefined) {
          const user = mockDb.users.get(answer.userUid);
          if (!user || user.showTimeTaken !== where.user.showTimeTaken) return false;
        }
        return true;
      });

      // Handle ordering
      if (orderBy?.createdAt) {
        answers.sort((a, b) => {
          if (orderBy.createdAt === 'desc') {
            return b.createdAt.getTime() - a.createdAt.getTime();
          }
          return a.createdAt.getTime() - b.createdAt.getTime();
        });
      } else if (orderBy?.timeTaken) {
        answers.sort((a, b) => {
          const aTime = a.timeTaken || 0;
          const bTime = b.timeTaken || 0;
          if (orderBy.timeTaken === 'desc') {
            return bTime - aTime;
          }
          return aTime - bTime;
        });
      }

      // Handle pagination
      if (typeof skip === 'number' && typeof take === 'number') {
        answers = answers.slice(skip, skip + take);
      }

      // Handle includes
      if (include?.question) {
        answers = answers.map(answer => {
          const question = mockDb.questions.get(answer.questionUid);
          if (!question) return answer;

          let questionWithIncludes: any = { ...question };

          if (include.question?.include?.tags?.include?.tag) {
            const tags = mockDb.questionTags.get(question.uid) || [];
            questionWithIncludes.tags = tags.map((tagId: string) => ({
              tag: mockDb.tags.get(tagId)
            }));
          }

          return {
            ...answer,
            question: questionWithIncludes
          };
        });
      }

      if (include?.user) {
        answers = answers.map(answer => {
          const user = mockDb.users.get(answer.userUid);
          return {
            ...answer,
            user: user || null
          };
        });
      }

      return answers;
    },
    count: async ({ where }: { where: { questionUid?: string; userUid?: string } }) => {
      return Array.from(mockDb.answers.values()).filter(
        answer =>
          (!where.questionUid || answer.questionUid === where.questionUid) &&
          (!where.userUid || answer.userUid === where.userUid)
      ).length;
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
