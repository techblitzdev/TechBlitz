'use server'

import { getPrompt } from '@/actions/ai/utils/get-prompt'
import { openai } from '@/lib/open-ai'
import { reportHtmlSchema } from '@/lib/zod/schemas/ai/report-html'
import { UserRecord } from '@/types/User'
import { zodResponseFormat } from 'openai/helpers/zod.mjs'

type Tag = {
  tagName: string
  count: number
}

/**
 * Generate a report html for the user
 *
 * @param opts
 */
export const generateReportHtml = async (opts: {
  correctTags: Tag[]
  incorrectTags: Tag[]
  user: UserRecord
}) => {
  const { correctTags, incorrectTags, user } = opts

  // go and get the prompt from the db
  const prompts = await getPrompt({
    name: ['statistics-generate-report-html'],
  })

  if (!prompts) {
    throw new Error('Prompt not found')
  }

  const prompt = prompts['statistics-generate-report-html'].content

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
    messages: [
      {
        role: 'system',
        content: prompt,
      },
      {
        role: 'system',
        content:
          'The user has provided the following information about themselves, tailor your answer to this information:',
      },
      {
        role: 'user',
        content: user?.aboutMeAiHelp || '',
      },
      {
        role: 'user',
        content: JSON.stringify({ correctTags, incorrectTags }),
      },
    ],
    response_format: zodResponseFormat(reportHtmlSchema, 'event'),
    temperature: 0.7,
  })

  return response.choices[0].message.content
}
