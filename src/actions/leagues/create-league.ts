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

export async function createLeague(data: z.infer<typeof leagueSchema>) {
  const validatedData = leagueSchema.parse(data);

  // Create the league data first
  const leagueData = await prisma.individualLeagueData.create({
    data: {
      name: validatedData.name,
      color: validatedData.color,
      description: validatedData.description,
      xpRequirement: validatedData.xpRequirement,
      resetDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      canBeRelegated: validatedData.canBeRelegated,
      maxPowerUpsPerWeek: validatedData.maxPowerUpsPerWeek,
      xpMultiplier: validatedData.xpMultiplier,
    },
  });

  revalidatePath('/admin/leagues');
  revalidatePath('/admin/leagues/list');

  return { leagueData };
}
