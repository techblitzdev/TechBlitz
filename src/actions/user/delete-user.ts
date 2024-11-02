'use server';
import { supabase } from "@/lib/supabase";
import { prisma } from "@/utils/prisma";

export const deleteUser = async (opts: {
  userUid: string
}) => {
  const { userUid } = opts
  if(!userUid) {
    throw new Error('User UID is required')
  }

  // Wrap all Prisma operations in a transaction
  await prisma.$transaction(async (tx) => {
    // delete all of the answers for the user
    await tx.answers.deleteMany({
      where: {
        userAnswerUid: userUid
      }
    });

    // delete the subscription for the user
    await tx.subscriptions.deleteMany({
      where: {
        userUid
      }
    });

    // delete the user from the database
    await tx.users.delete({
      where: {
        uid: userUid
      }
    });

    // delete the user from supabase auth
    const { error } = await supabase.auth.admin.deleteUser(
      userUid
    );

    if(error) {
      throw new Error(error.message)
    }
  });
}