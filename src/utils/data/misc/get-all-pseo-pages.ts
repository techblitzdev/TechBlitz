import { prisma } from '@/lib/prisma';

export async function getAllPseoPages() {
  const pseoPages = await prisma.pseoPages.findMany();
  return pseoPages;
}
