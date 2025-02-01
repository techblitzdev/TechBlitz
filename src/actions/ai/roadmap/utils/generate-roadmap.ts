'use server'
import { openai } from '@/lib/open-ai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { aiQuestionSchema } from '@/lib/zod/schemas/ai/response'
import type { ReturnType } from '@/actions/ai/roadmap/get-question-data-for-gen'
import { getPrompt } from '@/actions/ai/utils/get-prompt'
import Anthropic from '@anthropic-ai/sdk'
import { UserRecord } from '@/types/User'

export const generateRoadmapResponse = async (opts: {
  formattedData: ReturnType[]
  user: UserRecord
}) => {
  const { formattedData, user } = opts

  const prompts = await getPrompt({
    name: [
      'roadmap-generate-pass-one-teacher',
      'roadmap-generate-pass-one-question',
      'roadmap-generate-pass-one-topics',
      'roadmap-generate-pass-two',
      'claude-ai-first-pass',
      'roadmap-chat-gpt-formatter',
    ],
  })

  if (!prompts) {
    throw new Error('Prompt not found')
  }

  // use claude 3.5 sonnet to generate the questions and answers (they are soooo much better than gpt-4o-mini)
  const apiKey = process.env.NEXT_PRIVATE_CLAUDE_API_KEY

  const anthropic = new Anthropic({ apiKey })

  const firstPassClaude = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-latest',
    max_tokens: 8192,
    temperature: 0,
    messages: [
      {
        role: 'user',
        content: prompts['claude-ai-first-pass'].content,
      },
      {
        role: 'assistant',
        content:
          'The user has provided the following information about themselves, tailor your answer to this information:',
      },
      {
        role: 'user',
        content: user?.aboutMeAiHelp || '',
      },
      {
        role: 'assistant',
        content: `format the data EACH question in the following format: 
          {
            "title": "string",
            "description": "string",
            "questionData": [{ "question": "string", "codeSnippet": "string" (MUST be wrapped in <pre><code> tags), "hint": "string",  "difficulty": "string", "answers": [{"answer": "string", "correct": "boolean"}]}]
          }
        `,
      },
      {
        role: 'user',
        content: JSON.stringify(formattedData),
      },
    ],
    system: prompts['roadmap-generate-pass-one-topics'].content,
  })

  console.log('First pass claude:', firstPassClaude.content)

  // we then use gpt-4o-mini to ensure that the claude response is in the format
  // that we need it in
  const chatgptFirstPass = await openai.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
    messages: [
      {
        role: 'assistant',
        content: prompts['roadmap-chat-gpt-formatter'].content,
      },
      {
        role: 'user',
        content: JSON.stringify(firstPassClaude.content),
      },
      {
        role: 'assistant',
        content: prompts['roadmap-generate-pass-two'].content,
      },
    ],
    response_format: zodResponseFormat(aiQuestionSchema, 'event'),
    temperature: 0.7,
  })

  if (!chatgptFirstPass.choices[0]?.message?.content) {
    throw new Error('AI response is missing content')
  }

  console.log('First pass:', chatgptFirstPass.choices[0].message.content)

  return chatgptFirstPass.choices[0].message.content
}
