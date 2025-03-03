'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { PseoFormValues } from './create-pseo-page';

// Define a schema specifically for editing PSEO pages (requires UID)
const editPseoFormSchema = z.object({
  uid: z.string().min(1, 'UID is required for editing'),
  // Include other fields from the create schema as needed
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  metaTitle: z.string().min(1, 'Meta title is required'),
  metaDescription: z.string().min(1, 'Meta description is required'),
  // Other fields...
});

// Define a type with index signature for the form data
interface PageDataWithIndex extends Partial<PseoFormValues> {
  [key: string]: any;
}

export async function editPseoPage(formData: FormData) {
  try {
    // Extract the UID which is required for editing
    const uid = formData.get('uid') as string;

    if (!uid) {
      return { success: false, message: 'Page UID is required for editing' };
    }

    // Check if the page exists
    const existingPage = await prisma.pseoPages.findUnique({
      where: { uid },
    });

    if (!existingPage) {
      return { success: false, message: 'Page not found' };
    }

    // Extract form data and prepare for update
    // We'll use a simplified approach here to avoid repeating all the fields
    const pageData: PageDataWithIndex = {};

    // Process text fields
    const textFields = [
      'slug',
      'title',
      'metaTitle',
      'metaDescription',
      'canonicalUrl',
      'ogImage',
      'heroHeader',
      'heroSubheader',
      'leftHeader',
      'leftSubheader',
      'roadmapTitle',
      'roadmapDescription',
      'questionHeader',
      'questionSubheader',
      'contentGridTitle',
      'ctaTitle',
      'ctaDescription',
      'authorName',
      'jsonLdTitle',
      'jsonLdDescription',
    ];

    for (const field of textFields) {
      const value = formData.get(field);
      if (value !== null) {
        pageData[field] = value as string;
      }
    }

    // Process comma-separated lists
    const listFields = ['metaKeywords', 'targetingKeywords'];
    for (const field of listFields) {
      const value = formData.get(field);
      if (value !== null) {
        pageData[field] = (value as string).split(',').map((item) => item.trim());
      }
    }

    // Process boolean fields
    pageData.learnMoreLink = formData.get('learnMoreLink') === 'true';

    // Process JSON fields
    const jsonFields = [
      'contentGridItems',
      'contentSections',
      'faqs',
      'marketingItems',
      'templateConfig',
    ];
    for (const field of jsonFields) {
      const value = formData.get(field);
      if (value !== null && value !== '') {
        try {
          pageData[field] = JSON.parse(value as string);
        } catch (error) {
          return {
            success: false,
            message: `Invalid JSON in field ${field}. Please check the format and try again.`,
          };
        }
      }
    }

    // Check if the slug has changed and if the new slug is already in use
    if (existingPage.slug !== pageData.slug) {
      const pageWithSameSlug = await prisma.pseoPages.findFirst({
        where: {
          slug: pageData.slug,
          uid: { not: uid },
        },
      });

      if (pageWithSameSlug) {
        return { success: false, message: `A page with slug "${pageData.slug}" already exists` };
      }
    }

    // Update the page
    await prisma.pseoPages.update({
      where: { uid },
      data: pageData,
    });

    // Revalidate the paths
    revalidatePath('/admin/pseo/list');
    revalidatePath(`/admin/pseo/edit/${uid}`);
    revalidatePath(`/${pageData.slug}`);

    return {
      success: true,
      message: 'Page updated successfully',
      slug: pageData.slug,
    };
  } catch (error) {
    console.error('Error updating PSEO page:', error);

    if (error instanceof z.ZodError) {
      const errors = error.errors.map((err) => `${err.path.join('.')}: ${err.message}`).join(', ');
      return { success: false, message: `Validation failed: ${errors}` };
    }

    return { success: false, message: 'Failed to update page. Please try again.' };
  }
}
