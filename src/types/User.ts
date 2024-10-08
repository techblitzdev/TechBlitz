import { BaseRecord } from './BaseRecord';

/**
 * Represents a user in the system.
 */
export interface User extends BaseRecord {
  email: string;
  name?: string;

  lastLogin: Date;

  userLevel: 'STANDARD' | 'ADMIN' | 'TRIAL' | 'FREE';
  answers: string[];

  correctDailyStreak: number;
  totalDailyStreak: number;

  /** a toggle the user can turn on to indicate how long it took them to answer a question */
  showTimeTaken?: boolean;
}

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
  | 'showTimeTaken'
>;
