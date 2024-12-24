'use server';

import { prisma } from '@/utils/prisma';
import { revalidateTag } from 'next/cache';
import { getUserFromSession } from './get-user';
import { UpdatableUserFields } from '@/types/User';

export const updateUser = async (opts: {
  userDetails: Partial<UpdatableUserFields>;
}) => {
  try {
    const { userDetails } = opts;

    console.log('Received update request');
    console.log('Raw userDetails:', JSON.stringify(userDetails, null, 2));

    if (!userDetails) {
      throw new Error('User data is required');
    }

    // Get the user details from the session
    const sessionResult = await getUserFromSession();

    // Ensure we have a valid user ID
    if (!sessionResult?.data?.user?.id) {
      throw new Error('No user found in session');
    }

    // Clean up the userDetails to remove any undefined or null values
    const cleanedUserDetails = Object.fromEntries(
      Object.entries(userDetails).filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, v]) => v !== undefined && v !== null
      )
    );

    // Update the user in the database
    const updatedUser = await prisma.users.update({
      where: {
        uid: sessionResult.data.user.id,
      },
      data: cleanedUserDetails,
    });

    // Revalidate the user details cache
    revalidateTag('user-details');

    return updatedUser;
  } catch (error) {
    console.error('Error in updateUser:', error);
    throw error;
  }
};
