import { StudyPath, StudyPathGoal, UserStudyPath } from '@prisma/client';
import { BaseRecord } from './BaseRecord';
import { Question } from './Questions';
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
  codeEditorTheme?: string | null;

  /** the number of ai question help tokens the user has */
  aiQuestionHelpTokens?: number;

  /** a flag to indicate if the user has a custom username */
  isCustomUsername?: boolean;

  experienceLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'MASTER';

  // optional stripe emails for paid users
  stripeEmails?: string[];

  // where the user found out about techblitz
  howDidYouHearAboutTechBlitz?: string | null;

  // the user's referral code
  referralCode?: string | null;

  // user entered text that will be used to assist in ai generation
  aboutMeAiHelp?: string | null;

  // the user's bookmarked questions (an array of question ids)
  bookmarkedQuestions?: Question[];

  // the study paths the user has enrolled in
  studyPathEnrollments?: UserStudyPath[] | null;

  // the study path goals the user has set for themselves
  studyPathGoals?: StudyPathGoal[] | null;
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
  | 'aiQuestionHelpTokens'
  | 'isCustomUsername'
  | 'experienceLevel'
  | 'stripeEmails'
  | 'howDidYouHearAboutTechBlitz'
  | 'referralCode'
  | 'aboutMeAiHelp'
  | 'studyPathEnrollments'
  | 'studyPathGoals'
>;

// First, create a type that excludes 'uid' from the partial requirement
export type UpdatableUserFields = Omit<UserRecord, 'uid'>;

// Then create the type for updates that requires uid and at least one other field
export type UserUpdatePayload = {
  uid: UserRecord['uid'];
} & RequireAtLeastOne<UpdatableUserFields>;

export type UserWithOutAnswers = Pick<User, Exclude<keyof User, 'answers'>>;
