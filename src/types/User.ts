import { BaseRecord } from './BaseRecord';
import { RequireAtLeastOne } from './Utils';

export type UserLevel = 'STANDARD' | 'ADMIN' | 'TRIAL' | 'FREE' | 'PREMIUM';

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

  userLevel: UserLevel;
  answers: string[];

  correctDailyStreak: number | null;
  totalDailyStreak: number | null;

  /** a toggle the user can turn on to indicate how long it took them to answer a question */
  showTimeTaken?: boolean;
  sendPushNotifications?: boolean;

  /** the user's code editor theme */
  codeEditorTheme?: string;
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
  | 'sendPushNotifications'
  | 'codeEditorTheme'
>;

// First, create a type that excludes 'uid' from the partial requirement
export type UpdatableUserFields = Omit<UserRecord, 'uid'>;

// Then create the type for updates that requires uid and at least one other field
export type UserUpdatePayload = {
  uid: UserRecord['uid'];
} & RequireAtLeastOne<UpdatableUserFields>;

export type UserWithOutAnswers = Pick<User, Exclude<keyof User, 'answers'>>;
