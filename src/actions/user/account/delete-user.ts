'use server';
import { createClient as createServerClient } from '@/utils/supabase/server';
import { prisma } from '@/lib/prisma';
import { getUserFromSession } from '../authed/get-user';

export const deleteUser = async (opts: { userUid: string }) => {
  const { userUid } = opts;
  if (!userUid) {
    throw new Error('User UID is required');
  }

  // Verify the user is authenticated and is deleting their own account
  const { data } = await getUserFromSession();
  if (!data?.user) {
    throw new Error('User not authenticated');
  }

  // Ensure the user is deleting their own account
  if (data.user.id !== userUid) {
    throw new Error('User not allowed');
  }

  // Get regular client for user session operations
  const supabase = await createServerClient();

  // Wrap all Prisma operations in a transaction
  try {
    await prisma.$transaction(async (tx) => {
      // Delete user data first
      await tx.users.delete({
        where: {
          uid: userUid,
        },
      });

      // Use the admin client with service role key to delete the user from Supabase Auth
      const { error } = await supabase.auth.admin.deleteUser(userUid);

      if (error) {
        // Log the error for debugging
        console.error('Error deleting user from Supabase:', error);
        throw new Error(`Failed to delete user: ${error.message}`);
      }

      // Sign out the user using the regular client
      await supabase.auth.signOut();
    });
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error; // Re-throw to be handled by the UI
  }
};
