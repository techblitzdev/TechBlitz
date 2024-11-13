import { BaseRecord } from './BaseRecord';

export interface Streaks extends BaseRecord {
  userUid: string;
  streakStart: Date;
  streakEnd: Date;

  currentStreakCount: number;
  longestStreakCount: number;
}
