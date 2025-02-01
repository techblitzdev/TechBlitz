import OpenAI from 'openai'

const apiKey = process.env.NEXT_PRIVATE_OPEN_AI_API_KEY
const organization = process.env.NEXT_PRIVATE_OPEN_AI_ORG

export const openai = new OpenAI({
  apiKey,
  organization,
})
