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
  heroHeader: z
    .string()
    .describe(
      'The main heading of the page. Must be engaging and entice the user to want to sign up for a service.'
    ),
  heroSubheader: z
    .string()
    .describe(
      'The subheading of the page. Must be engaging and entice the user to want to sign up for a service.'
    ),
  leftHeader: z.string(),
  leftSubheader: z.string(),
  roadmapTitle: z
    .string()
    .describe(
      'The title of our personalized roadmap section. Must be engaging and entice the user to want to upgrade to a paid plan.'
    ),
  roadmapDescription: z.string(),
  questionHeader: z.string(),
  questionSubheader: z.string().describe('Show cases a marquee of questions on TechBlitz.'),
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
    You are trying to entice the user to want to sign up for a service, optimize for the keywords and provide value to the user. Ensure you are solving a problem that the user is trying to solve.
    You must invoke an emotion in the user, make them feel something and show how TechBlitz solves their problem. These pages are landing pages, not blog posts.
    The content should be optimized for search engines and provide value to readers. Do not use placeholder text. Generate engaging, informative content that accurately targets the keywords. The marketingItems must be six items. 
    `;

    // Create user prompt
    const userPrompt = `Please generate content for a PSEO page with the following details:
    Targeting Keywords: ${targetingKeywords}
    Page Slug: ${slug}
    The content should be comprehensive, engaging, and optimized for the targeting keywords.`;

    // Select the appropriate AI model based on user input
    const aiModel =
      model === 'claude' ? anthropic('claude-3-5-sonnet-latest') : openai('gpt-4-turbo');

    // Add retry logic with exponential backoff
    const maxRetries = 3;
    const baseDelay = 1000; // 1 second

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
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
        // If this is the last attempt, throw the error
        if (attempt === maxRetries) {
          throw error;
        }

        // Calculate delay with exponential backoff
        const delay = baseDelay * Math.pow(2, attempt - 1);

        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, delay));

        // Log retry attempt
        console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
      }
    }

    // This should never be reached due to the throw in the last attempt
    throw new Error('Failed to generate content after all retries');
  } catch (error) {
    console.error('Error generating PSEO content:', error);

    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('rate limit')) {
        return { error: 'The AI service is currently busy. Please try again in a few minutes.' };
      }
      if (error.message.includes('overloaded')) {
        return {
          error: 'The AI service is temporarily overloaded. Please try again in a few minutes.',
        };
      }
      if (error.message.includes('timeout')) {
        return { error: 'The request timed out. Please try again.' };
      }
    }

    return { error: 'Failed to generate content. Please try again in a few minutes.' };
  }
}
