import { z } from 'zod'

export const reportHtmlSchema = z.object({
  briefSummary: z.string(),
  userPerformance: z.string(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  suggestions: z.array(z.string()),
  topicsToFocusOn: z.array(z.string()),
})
