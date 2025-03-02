import { NextResponse } from 'next/server';
import { Anthropic } from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { getUser } from '@/actions/user/authed/get-user';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(request: Request) {
  try {
    // Check if user is authenticated and has admin access
    const user = await getUser();

    if (!user || user.userLevel !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { targetingKeywords, slug, model = 'claude' } = body;

    if (!targetingKeywords || !slug) {
      return NextResponse.json(
        { message: 'Missing required fields: targetingKeywords and slug' },
        { status: 400 }
      );
    }

    // Create a system prompt that explains the task
    const systemPrompt = `You are an expert in SEO and content creation. Your task is to generate content for a PSEO (Programmatic SEO) page based on the provided targeting keywords and slug.
    
The content should be optimized for search engines and provide value to readers. Do not use placeholder text. Generate engaging, informative content that accurately targets the keywords.

The output should be JSON with the following structure:
{
  "title": "Main title of the page",
  "metaTitle": "SEO optimized title for meta tags",
  "metaDescription": "Compelling meta description under 160 characters",
  "metaKeywords": "keyword1, keyword2, keyword3",
  "targetingKeywords": "primary-keyword, secondary-keyword",
  "heroHeader": "Main heading for the hero section",
  "heroSubheader": "Supporting text for the hero section",
  "leftHeader": "Feature section heading",
  "leftSubheader": "Supporting text for the feature section",
  "roadmapTitle": "Title for the roadmap section",
  "roadmapDescription": "Description of the roadmap",
  "questionHeader": "Title for the Q&A section",
  "questionSubheader": "Description of the Q&A section",
  "contentGridTitle": "Title for the content grid section",
  "contentGridItems": "JSON array of items with title, description, and iconSrc properties",
  "ctaTitle": "Call to action title",
  "ctaDescription": "Call to action description",
  "contentSections": "JSON array of sections with title and content properties",
  "faqs": "JSON array of FAQs with question and answer properties",
  "marketingItems": "JSON array of related items with title and url properties",
  "templateConfig": "JSON object with template configuration"
}

All JSON properties should be properly escaped for valid JSON. For any JSON arrays or objects, provide them properly formatted with relevant, meaningful content related to the keywords.`;

    // Create user prompt with the specific keywords and slug
    const userPrompt = `Please generate content for a PSEO page with the following details:
    
Targeting Keywords: ${targetingKeywords}
Page Slug: ${slug}

The content should be comprehensive, engaging, and optimized for the targeting keywords. Ensure that the JSON is valid and all required fields are included.`;

    let generatedContent;

    // Generate content using the selected model
    if (model === 'claude') {
      // Generate with Claude
      const response = await anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 4000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
        temperature: 0.7,
      });

      // Extract JSON content from Claude's response
      const textContent = response.content.find((block) => block.type === 'text')?.text || '';
      const jsonMatch = textContent.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        generatedContent = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Could not parse JSON from Claude response');
      }
    } else {
      // Generate with OpenAI
      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      });

      // Extract JSON content from OpenAI's response
      const textContent = response.choices[0].message.content || '';
      const jsonMatch = textContent.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        generatedContent = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Could not parse JSON from OpenAI response');
      }
    }

    // Ensure proper formatting for JSON fields that need to be stringified
    const formattedContent = {
      ...generatedContent,
      contentGridItems:
        typeof generatedContent.contentGridItems === 'string'
          ? generatedContent.contentGridItems
          : JSON.stringify(generatedContent.contentGridItems, null, 2),
      contentSections:
        typeof generatedContent.contentSections === 'string'
          ? generatedContent.contentSections
          : JSON.stringify(generatedContent.contentSections, null, 2),
      faqs:
        typeof generatedContent.faqs === 'string'
          ? generatedContent.faqs
          : JSON.stringify(generatedContent.faqs, null, 2),
      marketingItems:
        typeof generatedContent.marketingItems === 'string'
          ? generatedContent.marketingItems
          : JSON.stringify(generatedContent.marketingItems, null, 2),
      templateConfig:
        typeof generatedContent.templateConfig === 'string'
          ? generatedContent.templateConfig
          : JSON.stringify(generatedContent.templateConfig, null, 2),
    };

    return NextResponse.json(formattedContent);
  } catch (error) {
    console.error('Error generating PSEO content:', error);
    return NextResponse.json(
      { message: 'Failed to generate content', error: (error as Error).message },
      { status: 500 }
    );
  }
}
