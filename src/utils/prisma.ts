import * as React from 'react';
import { PrismaClient } from '@prisma/client';
import { mockDatabase } from '@/lib/mock/db';

let prismaGlobal: any;

if (process.env.NODE_ENV === 'development') {
  prismaGlobal = mockDatabase;
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prismaGlobal = global.prisma;
}

export const prisma = prismaGlobal;
