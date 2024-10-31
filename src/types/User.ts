import { BaseRecord } from './BaseRecord';
import { RequireAtLeastOne } from './Utils';

/**
 * Represents a user in the system.
 */
export interface User extends BaseRecord {
  email: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  userProfilePicture?: string | null;

  lastLogin: Date | null;

  userLevel: 'STANDARD' | 'ADMIN' | 'TRIAL' | 'FREE';
  answers: string[];

  correctDailyStreak: number | null;
  totalDailyStreak: number | null;

  /** a toggle the user can turn on to indicate how long it took them to answer a question */
  showTimeTaken?: boolean;
}

export type UserRecord = Pick<
  User,
  | 'uid'
  | 'email'
  | 'username'
  | 'firstName'
  | 'lastName'
  | 'userProfilePicture'
  | 'createdAt'
  | 'updatedAt'
  | 'lastLogin'
  | 'userLevel'
  | 'correctDailyStreak'
  | 'totalDailyStreak'
  | 'showTimeTaken'
>;

// First, create a type that excludes 'uid' from the partial requirement
type UpdateableUserFields = Omit<UserRecord, 'uid'>;

// Then create the type for updates that requires uid and at least one other field
export type UserUpdatePayload = {
  uid: UserRecord['uid'];
} & RequireAtLeastOne<UpdateableUserFields>;

export type UserWithOutAnswers = Pick<User, Exclude<keyof User, 'answers'>>;
