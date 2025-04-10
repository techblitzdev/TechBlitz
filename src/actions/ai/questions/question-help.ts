'use server';
import { prisma } from '@/lib/prisma';
import { getPrompt } from '../utils/get-prompt';
import { getUser } from '@/actions/user/authed/get-user';
import { questionHelpSchema } from '@/lib/zod/schemas/ai/question-help';
import { checkUserTokens, deductUserTokens } from '../utils/user-tokens';
import type { Question } from '@/types/Questions';
import type { DefaultRoadmapQuestions, RoadmapUserQuestions } from '@/types/Roadmap';

// ai
import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
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
 * @param previousMessages - Previous chat messages for context (optional)
 * @returns
 */
export const generateQuestionHelp = async (
  questionUid: string,
  userContent?: string,
  questionType: 'roadmap' | 'regular' | 'study-path' = 'regular',
  previousMessages: ChatMessage[] = []
) => {
  'use server';

  // get the current user requesting help
  const user = await getUser();
  if (!user) {
    console.error('User not found');
    return {
      object: null,
      content: null,
      tokensUsed: 0,
    };
  }

  // For regular questions and study-path questions, check if the user has enough tokens
  if (questionType === 'regular' || questionType === 'study-path') {
    const hasTokens = await checkUserTokens(user);
    if (!hasTokens) {
      console.error('User does not have enough tokens');
      return {
        object: null,
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
  } else if (questionType === 'regular' || questionType === 'study-path') {
    // Get the regular question or study path question (both use the same Questions table)
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
      object: null,
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
  // Handle token decrement for regular questions and study-path questions
  if (questionType === 'regular' || questionType === 'study-path') {
    const deducted = await deductUserTokens(user);
    if (!deducted) {
      return {
        object: null,
        content: null,
        tokensUsed: 0,
      };
    }
  }

  // create a streamable value
  const stream = createStreamableValue();

  // Build the conversation history
  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: prompts['ai-question-generation-help'].content,
    },
  ];

  // If this is the first message, add the question context
  if (previousMessages.length === 0) {
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

  // Add previous conversation context if available
  if (previousMessages.length > 0) {
    messages.push(...previousMessages);
  }

  // Add the current user message
  messages.push({
    role: 'user',
    content: userContent || '',
  });

  (async () => {
    // generate the question help
    const { partialObjectStream } = streamObject({
      model: openai('gpt-4o-mini-2024-07-18'),
      temperature: 0.2,
      messages: messages,
      schema: questionHelpSchema,
    });

    try {
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

  // Determine token count for the response
  const tokensUsed =
    questionType === 'regular' || questionType === 'study-path'
      ? user.aiQuestionHelpTokens
        ? user.aiQuestionHelpTokens - 1
        : 0
      : Number.POSITIVE_INFINITY;

  return {
    object: stream.value,
    content: null,
    tokensUsed: tokensUsed,
  };
};
