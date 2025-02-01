"use server";
// lib
import { openai } from "@/lib/open-ai";
import { prisma } from "@/lib/prisma";
import { answerHelpSchema } from "@/lib/zod/schemas/ai/answer-help";

// helpers
import { getPrompt } from "../utils/get-prompt";
import { getUser } from "@/actions/user/authed/get-user";
import { zodResponseFormat } from "openai/helpers/zod.mjs";

// types
import type { UserRecord } from "@/types/User";
import type {
  DefaultRoadmapQuestions,
  RoadmapUserQuestions,
} from "@/types/Roadmap";
import type { Question } from "@/types/Questions";

const answerHelp = async (
  userCorrect: boolean,
  user: UserRecord,
  question: Question | RoadmapUserQuestions | DefaultRoadmapQuestions,
) => {
  const answerHelpPrompt = await getPrompt({
    name: "question-answer-help",
  });

  const answerHelp = await openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: answerHelpPrompt["question-answer-help"].content,
      },
      {
        role: "system",
        content:
          "The user answered correctly: " +
          (userCorrect ? "true" : "false") +
          ". This is the reason as to why the user is asking for help: " +
          (userCorrect
            ? "The user answered correctly"
            : "The user answered incorrectly, provide a more detailed explanation"),
      },
      {
        role: "system",
        content:
          "The user has provided the following information about themselves, tailor your answer to this information:",
      },
      {
        role: "user",
        content: user?.aboutMeAiHelp || "",
      },
      {
        role: "user",
        content: question.codeSnippet || "",
      },
    ],
    response_format: zodResponseFormat(answerHelpSchema, "event"),
  });

  if (!answerHelp.choices[0]?.message?.content) {
    throw new Error("AI response is missing content");
  }

  return JSON.parse(answerHelp.choices[0].message.content);
};

/**
 * Method to generate answer help for both regular and roadmap questions.
 * It will return the code snippet, but fully explained with comments and explanations.
 *
 * @param questionUid - The uid of the question to generate help for.
 * @param userCorrect - Whether the user answered correctly - helps us to generate a better explanation
 * @param isRoadmapQuestion - Whether this is a roadmap question or a regular question
 * @returns
 */
export const generateAnswerHelp = async (
  questionUid: string,
  userCorrect: boolean,
  questionType: "regular" | "roadmap" | "onboarding",
) => {
  const user = await getUser();

  if (!user) {
    return {
      content: null,
      tokensUsed: 0,
    };
  }

  // For regular questions, check if the user has enough tokens
  if (
    questionType === "regular" &&
    user.aiQuestionHelpTokens &&
    user.aiQuestionHelpTokens <= 0
  ) {
    return {
      content: null,
      tokensUsed: 0,
    };
  }

  let question:
    | Question
    | RoadmapUserQuestions
    | DefaultRoadmapQuestions
    | null = null;

  if (questionType === "roadmap") {
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
  } else if (questionType === "regular") {
    // Get the regular question
    question = await prisma.questions.findUnique({
      where: { uid: questionUid },
      include: {
        answers: true,
      },
    });
  } else if (questionType === "onboarding") {
    // Get the onboarding question
    question = await prisma.defaultRoadmapQuestions.findUnique({
      where: { uid: questionUid },
      include: {
        answers: true,
      },
    });
  }

  if (!question) {
    console.error("Question not found");
    return {
      content: null,
      tokensUsed: 0,
    };
  }

  // Generate the answer help
  const formattedData = await answerHelp(userCorrect, user, question);

  // Handle token decrement for regular questions
  if (
    questionType === "regular" &&
    user.userLevel !== "PREMIUM" &&
    user.userLevel !== "ADMIN"
  ) {
    const updatedUser = await prisma.users.update({
      where: { uid: user.uid },
      data: { aiQuestionHelpTokens: { decrement: 1 } },
    });

    return {
      content: formattedData,
      tokensUsed: updatedUser.aiQuestionHelpTokens,
    };
  }

  // For roadmap questions or premium users, return infinite tokens
  return {
    content: formattedData,
    tokensUsed: Number.POSITIVE_INFINITY,
  };
};
