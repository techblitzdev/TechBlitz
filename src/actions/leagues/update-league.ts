'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const leagueSchema = z.object({
  name: z.enum(['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND']),
  color: z.enum(['CD7F32', 'C0C0C0', 'FFD700', 'E5E4E2', 'b9f2ff']),
  description: z.string().min(10).max(500),
  xpRequirement: z.number().min(0),
  resetDate: z.string(),
  canBeRelegated: z.boolean(),
  maxPowerUpsPerWeek: z.number().min(1).max(10),
  xpMultiplier: z.number().min(1).max(5),
  maxUsers: z.number().min(10).max(100),
  promotionCount: z.number().min(1),
  relegationCount: z.number().min(1),
  weeklyChallenge: z.string().optional(),
  weeklyChallengeXP: z.number().optional(),
});

export async function updateLeague(uid: string, data: z.infer<typeof leagueSchema>) {
  const validatedData = leagueSchema.parse(data);

  const league = await prisma.leagues.findUnique({
    where: { uid },
    include: { leagueData: true },
  });

  if (!league) {
    throw new Error('League not found');
  }

  // Update league data
  await prisma.individualLeagueData.update({
    where: { uid: league.leagueData.uid },
    data: {
      name: validatedData.name,
      color: validatedData.color,
      description: validatedData.description,
      xpRequirement: validatedData.xpRequirement,
      resetDate: new Date(validatedData.resetDate),
      canBeRelegated: validatedData.canBeRelegated,
      maxPowerUpsPerWeek: validatedData.maxPowerUpsPerWeek,
      xpMultiplier: validatedData.xpMultiplier,
    },
  });

  // Update league instance
  await prisma.leagues.update({
    where: { uid },
    data: {
      maxUsers: validatedData.maxUsers,
      promotionCount: validatedData.promotionCount,
      relegationCount: validatedData.relegationCount,
      weeklyChallenge: validatedData.weeklyChallenge,
      weeklyChallengeXP: validatedData.weeklyChallengeXP,
    },
  });

  revalidatePath('/admin/leagues');
  revalidatePath('/admin/leagues/list');
  revalidatePath(`/admin/leagues/${uid}`);
}
