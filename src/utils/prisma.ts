import { PrismaClient } from '@prisma/client';
import { mockPrisma } from '@/lib/mock/prisma';

declare global {
  var prisma: PrismaClient | undefined;
}

let prismaGlobal: PrismaClient;

if (process.env.NODE_ENV === 'development') {
  prismaGlobal = mockPrisma as unknown as PrismaClient;
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prismaGlobal = global.prisma;
}

export const prisma = prismaGlobal;
