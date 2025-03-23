import { prisma } from '@/lib/prisma';

export async function getLeagues() {
  const leagues = await prisma.individualLeagueData.findMany();
  return leagues;
}
