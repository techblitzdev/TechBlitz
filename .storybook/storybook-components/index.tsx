import React from 'react';

/**
 * MockUser represents a user for authentication in stories
 */
export interface MockUser {
  uid: string;
  email: string;
  name: string;
  image?: string;
  role?: string;
}

/**
 * AuthContext provides a mock authentication context for stories
 */
export const AuthContext = React.createContext<{
  user: MockUser | null;
  isLoading: boolean;
}>({
  user: null,
  isLoading: false,
});

/**
 * AuthProvider wraps components with a mock authentication context
 */
export function AuthProvider({
  children,
  user = null,
  isLoading = false,
}: {
  children: React.ReactNode;
  user?: MockUser | null;
  isLoading?: boolean;
}) {
  return <AuthContext.Provider value={{ user, isLoading }}>{children}</AuthContext.Provider>;
}

/**
 * useAuth hook for accessing the mock authentication context
 */
export function useAuth() {
  return React.useContext(AuthContext);
}

/**
 * MockPrisma provides mock database methods for stories
 */
export const MockPrisma = {
  // Add methods as needed for different stories
  answers: {
    findMany: async (options: any) => {
      // Return mock data based on options
      return [];
    },
    count: async (options: any) => {
      return 0;
    },
  },
  questions: {
    findMany: async (options: any) => {
      return [];
    },
    count: async (options: any) => {
      return 0;
    },
  },
  users: {
    findUnique: async (options: any) => {
      return null;
    },
  },
};

/**
 * DefaultMockUser can be used as a standard user in stories
 */
export const DefaultMockUser: MockUser = {
  uid: 'user-1',
  email: 'user@example.com',
  name: 'Test User',
  image: 'https://via.placeholder.com/40',
  role: 'user',
};

/**
 * StoryDecorator for wrapping stories with common providers
 */
export function StoryDecorator({
  children,
  user = DefaultMockUser,
  withAuth = true,
}: {
  children: React.ReactNode;
  user?: MockUser | null;
  withAuth?: boolean;
}) {
  if (withAuth) {
    return <AuthProvider user={user}>{children}</AuthProvider>;
  }
  return <>{children}</>;
}
