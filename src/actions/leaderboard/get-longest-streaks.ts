'use server';
import { prisma } from '@/utils/prisma';
import { unstable_cache as NextCache } from 'next/cache';

type StreakWithUser = {
  userUid: string;
  streak: number;
  rank: number;
  user: {
    uid: string;
    email: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    userLevel: 'STANDARD' | 'ADMIN' | 'TRIAL' | 'FREE' | 'PREMIUM';
    totalDailyStreak: number | null;
    correctDailyStreak: number | null;
    userProfilePicture: string | null;
    showTimeTaken: boolean;
    createdAt: Date;
    updatedAt: Date;
    lastLogin: Date | null;
  };
};

export const getLongestStreaks = NextCache(
  async () => {
    const result = await prisma.$queryRaw<StreakWithUser[]>`
      WITH RankedStreaks AS (
        SELECT 
          "Streaks"."userUid",
          "Streaks"."longestStreak" as streak,
          CAST(RANK() OVER (ORDER BY "longestStreak" DESC) AS INTEGER) as rank,
          "Users"."uid",
          "Users"."email",
          "Users"."username",
          "Users"."firstName",
          "Users"."lastName",
          "Users"."userLevel",
          "Users"."totalDailyStreak",
          "Users"."correctDailyStreak",
          "Users"."userProfilePicture",
          "Users"."showTimeTaken"
        FROM "Streaks"
        INNER JOIN "Users" ON "Streaks"."userUid" = "Users"."uid"
        WHERE "longestStreak" > 0
        ORDER BY "longestStreak" DESC
        LIMIT 5
      )
      SELECT 
        "userUid",
        CAST(streak AS INTEGER) as streak,
        rank,
        json_build_object(
          'uid', uid,
          'email', email,
          'username', username,
          'firstName', "firstName",
          'lastName', "lastName",
          'userLevel', "userLevel",
          'totalDailyStreak', CAST("totalDailyStreak" AS INTEGER),
          'correctDailyStreak', CAST("correctDailyStreak" AS INTEGER),
          'userProfilePicture', "userProfilePicture",
          'showTimeTaken', "showTimeTaken"
        ) as user
      FROM RankedStreaks
    `;

    return result;
  },
  ['longest-streaks-with-users'],
  {
    revalidate: 60 // Cache for 1 minute
  }
);
