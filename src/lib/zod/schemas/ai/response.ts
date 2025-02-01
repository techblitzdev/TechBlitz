import { z } from 'zod'
import { questionSchema } from './index'

export const aiQuestionSchema = z.object({
  questionData: z.array(questionSchema),
  title: z.string(),
  description: z.string(),
})
