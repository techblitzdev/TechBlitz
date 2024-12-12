'use server';
import { userAuth } from '@/actions/questions/admin/utils/user-auth';
import { prisma } from '@/utils/prisma';

export const clearQuestionsForAdmin = async (uid: string) => {
  console.log('hit endpoint');
  // check the user is an admin user
  const isAdmin = await userAuth('ADMIN');
  if (!isAdmin) {
    throw new Error('Unauthorized: Admin access required');
  }

  // clear all questions that relate to the uid that was passed in
  await prisma.answers.deleteMany({
    where: {
      questionUid: uid
    }
  });

  return { success: true };
};
