import * as React from 'react';

// Mock data for development
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

export const mockUser = {
  id: 'mock-user-id',
  email: 'dev@example.com',
  name: 'Dev User',
  avatar_url: 'https://via.placeholder.com/150',
  subscription: {
    status: 'active',
    plan: 'pro'
  }
};

export const mockQuestions = [
  {
    id: 1,
    uid: 'mock-question-1',
    title: 'Introduction to React',
    description: 'Learn the basics of React',
    difficulty: 'BEGINNER',
    category: 'FRONTEND',
    tags: ['react', 'javascript'],
    content: '# React Basics\n\nReact is a JavaScript library for building user interfaces.',
    solution: 'Example solution code here',
    hints: ['Think about components', 'Consider state management'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    uid: 'mock-question-2',
    title: 'Node.js Fundamentals',
    description: 'Master Node.js basics',
    difficulty: 'INTERMEDIATE',
    category: 'BACKEND',
    tags: ['node', 'javascript'],
    content: '# Node.js Basics\n\nNode.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
    solution: 'Example solution code here',
    hints: ['Consider async/await', 'Think about error handling'],
    createdAt: new Date(),
    updatedAt: new Date()
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
