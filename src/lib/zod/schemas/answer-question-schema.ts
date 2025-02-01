import { z } from 'zod'

export const answerQuestionSchema = z.object({
  answer: z.string().nonempty(),
})
