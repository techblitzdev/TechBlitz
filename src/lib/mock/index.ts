import * as React from 'react';

// Mock user data
export const mockUser = {
  id: 'mock-user-1',
  email: 'test@example.com',
  name: 'Test User',
  avatar_url: 'https://example.com/avatar.jpg'
};

// Mock questions data
export const mockQuestions = [
  {
    id: 1,
    uid: 'mock-question-1',
    question: 'What is React?',
    codeSnippet: 'const App = () => { return <div>Hello World</div> }',
    hint: 'Think about component-based architecture',
    difficulty: 'BEGINNER',
    questionDate: new Date('2024-01-01'),
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
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const mockPricingPlans = [
  {
    id: 'mock-free-plan',
    name: 'Free',
    price: 0,
    features: ['Basic features', 'Limited usage'],
    interval: 'month'
  },
  {
    id: 'mock-pro-plan',
    name: 'Pro',
    price: 10,
    features: ['Advanced features', 'Unlimited usage'],
    interval: 'month'
  }
];

export const mockRoadmapSteps = [
  {
    id: 1,
    title: 'Getting Started',
    description: 'Introduction to web development',
    content: 'Learn the basics of HTML, CSS, and JavaScript',
    order: 1,
    roadmapId: 'mock-roadmap-1'
  },
  {
    id: 2,
    title: 'Advanced Concepts',
    description: 'Deep dive into frameworks',
    content: 'Learn React, Vue, and Angular',
    order: 2,
    roadmapId: 'mock-roadmap-1'
  }
];

export const mockStatistics = [
  {
    id: 1,
    type: 'QUESTION_COMPLETED',
    value: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    type: 'STREAK_MAINTAINED',
    value: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const mockAIResponses = [
  {
    id: 1,
    question: 'What is React?',
    response: 'React is a JavaScript library for building user interfaces.',
    createdAt: new Date()
  },
  {
    id: 2,
    question: 'Explain async/await',
    response: 'async/await is a way to handle promises in JavaScript.',
    createdAt: new Date()
  }
];

export type MockServiceResponse<T> = {
  data: T;
  error: null;
} | {
  data: null;
  error: {
    message: string;
  };
};

export const createMockResponse = <T>(data: T): MockServiceResponse<T> => ({
  data,
  error: null
});
