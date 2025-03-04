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

  // Hero section
  heroHeader: z.string().min(1, 'Hero header is required'),
  heroSubheader: z.string().min(1, 'Hero subheader is required'),

  // Feature sections
  leftHeader: z.string().min(1, 'Left header is required'),
  leftSubheader: z.string().min(1, 'Left subheader is required'),
  learnMoreLink: z.enum(['true', 'false']).transform((val) => val === 'true'),

  // Roadmap section
  roadmapTitle: z.string().min(1, 'Roadmap title is required'),
  roadmapDescription: z.string().min(1, 'Roadmap description is required'),

  // Question section
  questionHeader: z
    .string()
    .min(1, 'Question header is required')
    .describe('A section that includes a marquee of example questions.'),
  questionSubheader: z
    .string()
    .min(1, 'Question subheader is required')
    .describe(
      'A section that includes a marquee of example questions. This field will support the heading'
    ),

  // Content grid
  contentGridTitle: z.string().min(1, 'Content grid title is required'),
  contentGridItems: z.string().transform((val) => {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed)
        ? parsed.map((item: any) => ({
            title: item.title || '',
            description: item.description || '',
            icon: item.icon || null,
          }))
        : [];
    } catch {
      return [];
    }
  }),

  // CTA
  ctaTitle: z.string().min(1, 'CTA title is required'),
  ctaDescription: z.string().min(1, 'CTA description is required'),

  // Additional Content
  contentSections: z.string().transform((val) => {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }),

  // FAQ section
  faqs: z.string().transform((val) => {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed)
        ? parsed.map((faq: any) => ({
            question: faq.question || '',
            answer: faq.answer || '',
          }))
        : [];
    } catch {
      return [];
    }
  }),

  // Marketing items
  marketingItems: z.string().transform((val) => {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }),

  // Template
  templateId: z.string().min(1, 'Template ID is required'),
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

  // JSON-LD
  jsonLdTitle: z.string().optional(),
  jsonLdDescription: z.string().optional(),

  // Publish status
  isPublished: z.enum(['true', 'false']).transform((val) => val === 'true'),
});

export type PseoFormValues = z.infer<typeof pseoFormSchema>;

export async function createPseoPage(formData: FormData) {
  try {
    // Parse and validate form data
    const validatedData = pseoFormSchema.parse(Object.fromEntries(formData));

    // Extract the uid if it exists (for editing)
    const { uid, ...pageData } = validatedData;

    // Ensure JSON fields are arrays
    pageData.contentGridItems = Array.isArray(pageData.contentGridItems)
      ? pageData.contentGridItems
      : [];
    pageData.contentSections = Array.isArray(pageData.contentSections)
      ? pageData.contentSections
      : [];
    pageData.faqs = Array.isArray(pageData.faqs) ? pageData.faqs : [];
    pageData.marketingItems = Array.isArray(pageData.marketingItems) ? pageData.marketingItems : [];

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
