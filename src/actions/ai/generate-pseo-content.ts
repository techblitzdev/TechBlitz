'use server';

import { z } from 'zod';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { getUser } from '@/actions/user/authed/get-user';

// Input schema validation with Zod
const GeneratePseoInputSchema = z.object({
  targetingKeywords: z.string().min(1, 'Targeting keywords are required'),
  slug: z.string().min(1, 'Slug is required'),
  model: z.enum(['claude', 'openai']).default('claude'),
});

// Define nested schemas for structured content
const ContentGridItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  iconSrc: z.string().optional(),
});

const ContentSectionSchema = z.object({
  title: z.string(),
  content: z.string(),
});

const FaqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const MarketingItemSchema = z.object({
  title: z.string(),
  url: z.string(),
});

// Comprehensive output schema
const GeneratedContentSchema = z.object({
  title: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  metaKeywords: z.string(),
  targetingKeywords: z.string(),
  heroHeader: z.string(),
  heroSubheader: z.string(),
  leftHeader: z.string(),
  leftSubheader: z.string(),
  roadmapTitle: z.string(),
  roadmapDescription: z.string(),
  questionHeader: z.string(),
  questionSubheader: z.string(),
  contentGridTitle: z.string(),
  contentGridItems: z.array(ContentGridItemSchema),
  ctaTitle: z.string(),
  ctaDescription: z.string(),
  contentSections: z.array(ContentSectionSchema),
  faqs: z.array(FaqSchema),
  marketingItems: z.array(MarketingItemSchema),
  templateConfig: z.record(z.any()),
});

export type GeneratePseoInput = z.infer<typeof GeneratePseoInputSchema>;
export type GeneratedContent = z.infer<typeof GeneratedContentSchema>;

/**
 * Generate PSEO content using AI based on targeting keywords and slug
 */
export async function generatePseoContent(input: GeneratePseoInput) {
  try {
    // Validate input
    const { targetingKeywords, slug, model } = GeneratePseoInputSchema.parse(input);

    // Check if user is authenticated and has admin access
    const user = await getUser();
    if (!user || user.userLevel !== 'ADMIN') {
      return { error: 'Unauthorized. Only admins can generate PSEO content.' };
    }

    // Create system prompt for AI
    const systemPrompt = `You are an expert in SEO and content creation. Your task is to generate content for a PSEO (Programmatic SEO) page based on the provided targeting keywords and slug.  
    The content should be optimized for search engines and provide value to readers. Do not use placeholder text. Generate engaging, informative content that accurately targets the keywords.
    The marketingItems must be six items.
    `;

    // Create user prompt
    const userPrompt = `Please generate content for a PSEO page with the following details:
    Targeting Keywords: ${targetingKeywords}
    Page Slug: ${slug}
    The content should be comprehensive, engaging, and optimized for the targeting keywords.`;

    // Select the appropriate AI model based on user input
    const aiModel =
      model === 'claude' ? anthropic('claude-3-5-sonnet-latest') : openai('gpt-4-turbo');

    // Generate structured content using the AI SDK
    const { object } = await generateObject({
      model: aiModel,
      schema: GeneratedContentSchema,
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.7,
      maxTokens: 4000,
    });

    return { success: true, content: object };
  } catch (error) {
    console.error('Error generating PSEO content:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return { error: `Failed to generate content: ${errorMessage}` };
  }
}
