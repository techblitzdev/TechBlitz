import * as React from 'react';
import { mockUser } from './index';

const mockUserData = {
  ...mockUser,
  id: 1,
  uid: mockUser.id,
  email: mockUser.email,
  name: mockUser.name,
  avatar_url: mockUser.avatar_url,
  userLevel: 'ADMIN',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  lastLoginAt: new Date(),
  stripeCustomerId: 'mock_stripe_id',
  subscription: {
    status: 'active',
    plan: 'pro'
  },
  streak: {
    id: 1,
    userId: 1,
    currentStreak: 5,
    longestStreak: 10,
    lastCompleted: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
};

export const mockPrismaClient = {
  users: {
    findUnique: async () => mockUserData,
    findFirst: async () => mockUserData,
    update: async (data: any) => ({
      ...mockUserData,
      ...data.data
    }),
    create: async (data: any) => ({
      ...mockUserData,
      ...data.data
    }),
    upsert: async (data: any) => ({
      ...mockUserData,
      ...data.create
    })
  },
  streak: {
    findUnique: async () => mockUserData.streak,
    update: async (data: any) => ({
      ...mockUserData.streak,
      ...data.data
    }),
    create: async (data: any) => ({
      ...mockUserData.streak,
      ...data.data
    }),
    upsert: async (data: any) => ({
      ...mockUserData.streak,
      ...data.create
    })
  },
  statistics: {
    findMany: async () => [{
      id: 1,
      userId: mockUserData.id,
      type: 'QUESTION_COMPLETED',
      value: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }],
    create: async (data: any) => ({
      id: 1,
      ...data.data,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  },
  userQuestionProgress: {
    findMany: async () => [{
      id: 1,
      userId: mockUserData.id,
      questionId: 1,
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }],
    create: async (data: any) => ({
      id: 1,
      ...data.data,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }
};
