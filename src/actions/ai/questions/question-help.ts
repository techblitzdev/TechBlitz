'use server';
import { prisma } from '@/lib/prisma';
import { getPrompt } from '../utils/get-prompt';
import { getUser } from '@/actions/user/authed/get-user';
import { questionHelpSchema } from '@/lib/zod/schemas/ai/question-help';
import { zodResponseFormat } from 'openai/helpers/zod.mjs';
import { checkUserTokens, deductUserTokens } from '../utils/user-tokens';
import type { Question } from '@/types/Questions';
import type { DefaultRoadmapQuestions, RoadmapUserQuestions } from '@/types/Roadmap';

//
import { streamObject, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { stderr } from 'node:process';
import { createStreamableValue } from 'ai/rsc';

// Define the message interface
interface ChatMessage {
  role: 'user' | 'system' | 'assistant';
  content: string;
}

/**
 * Method to generate question help for both regular and roadmap questions.
 *
 * @param questionUid - The uid of the question to generate help for.
 * @param userContent - The user's content to generate help for.
 * @param questionType - Whether this is a roadmap question or not
 * @returns
 */
export const generateQuestionHelp = async (
  questionUid: string,
  userContent?: string,
  questionType: 'roadmap' | 'regular' = 'regular'
) => {
  'use server';

  // get the current user requesting help
  const user = await getUser();
  if (!user) {
    console.error('User not found');
    return {
      object: 'User not found',
      content: null,
      tokensUsed: 0,
    };
  }

  // For regular questions, check if the user has enough tokens
  if (questionType === 'regular') {
    const hasTokens = await checkUserTokens(user);
    if (!hasTokens) {
      console.error('User does not have enough tokens');
      return {
        object: 'User does not have enough tokens',
        content: null,
        tokensUsed: 0,
      };
    }
  }

  // Initialize question variable
  let question: Question | RoadmapUserQuestions | DefaultRoadmapQuestions | null = null;

  // Get the appropriate question based on type
  if (questionType === 'roadmap') {
    // Get the roadmap question
    question = (await prisma.roadmapUserQuestions.findUnique({
      where: {
        uid: questionUid,
        AND: {
          roadmap: {
            userUid: user.uid,
          },
        },
      },
      include: {
        answers: true,
      },
    })) as RoadmapUserQuestions | null;
  } else if (questionType === 'regular') {
    // Get the regular question
    question = await prisma.questions.findUnique({
      where: {
        uid: questionUid,
      },
      include: {
        answers: true,
      },
    });
  }

  // if no question, return error
  if (!question) {
    console.error('No question found');
    return {
      object: 'No question found',
      content: null,
      tokensUsed: 0,
    };
  }

  // get the prompt
  const prompts = await getPrompt({
    name: ['ai-question-generation-help'],
  });

  // Start the stream generation in the background
  // This is important - we need to return the stream before it completes
  // Handle token decrement for regular questions
  if (questionType === 'regular') {
    const deducted = await deductUserTokens(user);
    if (!deducted) {
      return {
        object: 'Cannot deduct tokens',
        content: null,
        tokensUsed: 0,
      };
    }
  }

  // create a streamable value
  const stream = createStreamableValue();

  // Check if userContent contains conversation history
  const hasConversationHistory = userContent?.includes('Previous conversation:');

  // Extract current question if conversation history is present
  let currentQuestion = userContent;
  if (hasConversationHistory && userContent) {
    const parts = userContent.split('Current question:');
    if (parts.length > 1) {
      currentQuestion = parts[1].trim();
    }
  }

  (async () => {
    // Build messages array for OpenAI
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content:
          prompts['ai-question-generation-help'].content +
          '\nThis is a chat interface, so maintain a conversational tone. ' +
          'Focus on being helpful, direct, and concise.',
      },
    ];

    // Add question context if this appears to be the first message
    if (!hasConversationHistory) {
      messages.push(
        {
          role: 'system',
          content: 'A user has asked for help with the following question:',
        },
        {
          role: 'system',
          content: question.codeSnippet || '',
        }
      );
    }

    // Add the user's message
    if (hasConversationHistory && userContent) {
      // For subsequent messages, the client is sending conversation history + new question
      messages.push({
        role: 'user',
        content: currentQuestion || '',
      });
    } else {
      // First message - just add the user content directly
      messages.push({
        role: 'user',
        content: userContent || '',
      });
    }

    try {
      // generate the question help
      const { partialObjectStream } = streamObject({
        model: openai('gpt-4o-mini-2024-07-18'),
        temperature: 0.2,
        messages,
        schema: questionHelpSchema,
      });

      // loop through the streamed response and set the state
      for await (const partialObject of partialObjectStream) {
        stream.update(partialObject);
      }

      // the stream has been completed
      stream.done();
    } catch (error) {
      console.error('Error generating AI response:', error);
      stream.update({ error: 'Failed to generate response. Please try again.' });
      stream.done();
    }
  })();

  return { object: stream };
};
