'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

// Define the schema for PSEO page form validation
const pseoFormSchema = z.object({
  // For editing - optional uid
  uid: z.string().optional(),

  // Basic info
  slug: z.string().min(1, 'Slug is required'),
  metaTitle: z.string().min(1, 'Meta title is required'),
  metaDescription: z.string().min(1, 'Meta description is required'),
  metaKeywords: z.string().transform((val) => val.split(',').map((k) => k.trim())),

  // SEO
  canonicalUrl: z.string().optional(),
  ogImage: z.string().optional(),

  // Content
  targetingKeywords: z.string().transform((val) => val.split(',').map((k) => k.trim())),
  title: z.string().min(1, 'Page title is required'),
  subtitle: z.string().optional(),
  heroImage: z.string().optional(),
  heroImageAlt: z.string().optional(),

  // Features
  featureTitle: z.string().optional(),
  featureDescription: z.string().optional(),
  marketingItems: z.string().transform((val) => {
    try {
      return JSON.parse(val);
    } catch {
      return [];
    }
  }),

  // Roadmap
  roadmapTitle: z.string().optional(),
  roadmapDescription: z.string().optional(),
  learnMoreLink: z.enum(['true', 'false']).transform((val) => val === 'true'),
  learnMoreText: z.string().optional(),
  learnMoreUrl: z.string().optional(),

  // Questions
  questionTitle: z.string().optional(),
  questionDescription: z.string().optional(),
  faqs: z.string().transform((val) => {
    try {
      return JSON.parse(val);
    } catch {
      return [];
    }
  }),

  // Content Grid
  contentGridTitle: z.string().optional(),
  contentGridDescription: z.string().optional(),
  contentGridItems: z.string().transform((val) => {
    try {
      return JSON.parse(val);
    } catch {
      return [];
    }
  }),

  // CTA
  ctaTitle: z.string().optional(),
  ctaDescription: z.string().optional(),
  ctaButtonText: z.string().optional(),
  ctaButtonUrl: z.string().optional(),

  // Additional Content
  contentSections: z.string().transform((val) => {
    try {
      return JSON.parse(val);
    } catch {
      return [];
    }
  }),

  // Template
  templateType: z.string().optional(),
  templateConfig: z.string().transform((val) => {
    if (!val) return null;
    try {
      return JSON.parse(val);
    } catch {
      return null;
    }
  }),

  // Author
  authorName: z.string().optional(),
  authorTitle: z.string().optional(),
  authorAvatar: z.string().optional(),
  authorDescription: z.string().optional(),

  // JSON-LD
  jsonLdType: z.string().optional(),
  jsonLdName: z.string().optional(),
  jsonLdDescription: z.string().optional(),
});

export type PseoFormValues = z.infer<typeof pseoFormSchema>;

export async function createPseoPage(formData: FormData) {
  try {
    // Parse and validate form data
    const validatedData = pseoFormSchema.parse(Object.fromEntries(formData));

    // Extract the uid if it exists (for editing)
    const { uid, ...pageData } = validatedData;

    // Check if we're updating an existing page or creating a new one
    if (uid) {
      // Editing an existing page
      const existingPage = await prisma.pseoPages.findUnique({
        where: { uid },
      });

      if (!existingPage) {
        return { success: false, message: 'Page not found' };
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

      // Revalidate the path to update the UI
      revalidatePath('/admin/pseo/list');
      revalidatePath(`/admin/pseo/edit/${uid}`);
      revalidatePath(`/${pageData.slug}`);

      return { success: true, message: 'Page updated successfully' };
    } else {
      // Creating a new page
      // Check if a page with the same slug already exists
      const existingPage = await prisma.pseoPages.findFirst({
        where: {
          slug: pageData.slug,
        },
      });

      if (existingPage) {
        return { success: false, message: `A page with slug "${pageData.slug}" already exists` };
      }

      // Create new page
      const newPage = await prisma.pseoPages.create({
        data: pageData,
      });

      // Revalidate the path to update the UI
      revalidatePath('/admin/pseo/list');
      revalidatePath(`/${pageData.slug}`);

      return { success: true, message: 'Page created successfully', pageId: newPage.uid };
    }
  } catch (error) {
    console.error('Error creating/updating PSEO page:', error);

    if (error instanceof z.ZodError) {
      // Handle validation errors
      const errors = error.errors.map((err) => `${err.path.join('.')}: ${err.message}`).join(', ');
      return { success: false, message: `Validation failed: ${errors}` };
    }

    return { success: false, message: 'Failed to save page. Please try again.' };
  }
}
