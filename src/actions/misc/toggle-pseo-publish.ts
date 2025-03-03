'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/actions/user/authed/get-user';

// Input schema validation
const TogglePseoPublishSchema = z.object({
  uid: z.string().min(1, 'Page UID is required'),
});

export type TogglePseoPublishInput = z.infer<typeof TogglePseoPublishSchema>;

/**
 * Toggle the publish status of a PSEO page
 */
export async function togglePseoPublish(input: TogglePseoPublishInput) {
  try {
    // Validate input
    const { uid } = TogglePseoPublishSchema.parse(input);

    // Check if user is authenticated and has admin access
    const user = await getUser();
    if (!user || user.userLevel !== 'ADMIN') {
      return {
        success: false,
        message: 'Unauthorized. Only admins can toggle page publish status.',
      };
    }

    // Get the current page to check its publish status
    const currentPage = await prisma.pseoPages.findUnique({
      where: { uid },
      select: { isPublished: true },
    });

    if (!currentPage) {
      return { success: false, message: 'Page not found.' };
    }

    // Toggle the publish status
    const updatedPage = await prisma.pseoPages.update({
      where: { uid },
      data: { isPublished: !currentPage.isPublished },
      select: { isPublished: true },
    });

    return {
      success: true,
      message: `Page ${updatedPage.isPublished ? 'published' : 'unpublished'} successfully.`,
      isPublished: updatedPage.isPublished,
    };
  } catch (error) {
    console.error('Error toggling PSEO page publish status:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to toggle page publish status.',
    };
  }
}
