'use server'
import type { PromptName } from '@/utils/constants/prompts'
import { prisma } from '@/lib/prisma'

export const getPrompt = async (opts: { name: PromptName | PromptName[] }) => {
  const { name } = opts

  if (Array.isArray(name)) {
    const prompts = await prisma.aIPrompts.findMany({
      where: {
        name: {
          in: name,
        },
      },
    })

    return prompts.reduce(
      (
        acc: { [key: string]: { content: string } },
        prompt: { name: string; prompt: string },
      ) => {
        acc[prompt.name] = { content: prompt.prompt }
        return acc
      },
      {},
    )
  }

  const prompt = await prisma.aIPrompts.findFirst({
    where: {
      name: name,
    },
  })

  if (!prompt) {
    return {}
  }

  return {
    [prompt.name]: { content: prompt.prompt },
  }
}
