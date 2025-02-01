"use server";

import { prisma } from "@/lib/prisma";
/**
 * Method to get questions after the user has selected their tags
 * in the onboarding process
 */
export async function getOnboardingQuestions(tags: string[]) {
  if (!tags.length) {
    return [];
  }

  // get questions with the tags the user has selected
  // in onboarding step two
  const questions = await prisma.questions.findMany({
    where: {
      tags: {
        some: {
          tag: {
            name: {
              in: tags,
            },
          },
        },
      },
    },
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
  });

  return questions;
}
