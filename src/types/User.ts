/**
 * Represents a user in the system.
 */
export type User = {
  uid: string;
  email: string;
  name?: string;

  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;

  userLevel: 'STANDARD' | 'ADMIN' | 'TRIAL' | 'FREE';
  answers: string[];

  correctDailyStreak: number;
  totalDailyStreak: number;
};

export type UserRecord = Pick<
  User,
  | 'uid'
  | 'email'
  | 'name'
  | 'createdAt'
  | 'updatedAt'
  | 'lastLogin'
  | 'userLevel'
  | 'correctDailyStreak'
  | 'totalDailyStreak'
>;
