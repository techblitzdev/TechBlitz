'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function togglePseoPublish(uid: string) {
  try {
    // Get the current page to check its status
    const page = await prisma.pseoPages.findUnique({
      where: { uid },
      select: { isPublished: true },
    });

    if (!page) {
      return { success: false, message: 'Page not found' };
    }

    // Toggle the publish status
    await prisma.pseoPages.update({
      where: { uid },
      data: { isPublished: !page.isPublished },
    });

    // Revalidate the paths
    revalidatePath('/admin/pseo/list');
    revalidatePath(`/admin/pseo/edit/${uid}`);

    return {
      success: true,
      message: `Page ${page.isPublished ? 'unpublished' : 'published'} successfully`,
      isPublished: !page.isPublished,
    };
  } catch (error) {
    console.error('Error toggling publish status:', error);
    return { success: false, message: 'Failed to update publish status' };
  }
}
