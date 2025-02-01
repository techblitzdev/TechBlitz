import { prisma } from "@/lib/prisma";
import { getTagsFromQuestion } from "./tags/get-tags-from-question";
import { Question } from "@/types/Questions";

/**
 * Retrieve a question via its uid
 *
 * @param uid - The uid of the question to retrieve
 * @returns The question object
 */
export const getQuestion = async (
  identifier: "slug" | "uid" = "slug",
  value: string,
) => {
  if (!value) {
    console.error("Please provide a uid");
    return null;
  }

  try {
    let res = await prisma.questions.findUnique({
      where: identifier === "uid" ? { uid: value } : { slug: value },
      include: {
        answers: true,
        tags: {
          include: {
            tag: true,
          },
        },
        QuestionResources: true,
        bookmarks: true,
      },
    });

    // If not found, try the other identifier
    if (!res) {
      res = await prisma.questions.findUnique({
        where: identifier === "uid" ? { slug: value } : { uid: value },
        include: {
          answers: true,
          tags: {
            include: {
              tag: true,
            },
          },
          QuestionResources: true,
          bookmarks: true,
        },
      });
    }

    if (!res) {
      console.error("Question not found");
      return null;
    }

    // get the tags from out the question
    const question = getTagsFromQuestion(res) as unknown as Question;

    return question;
  } catch (e) {
    console.error("Error getting question", e);
    return null;
  }
};
