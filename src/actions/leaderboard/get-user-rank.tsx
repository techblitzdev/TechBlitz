import { prisma } from '@/utils/prisma';

export const getUserAnswerRank = async (opts: {
  questionUid: string;
  userUid: string;
}) => {
  const { questionUid, userUid } = opts;

  const result = await prisma.$queryRaw<{ rank: number }[]>`
    SELECT CAST(rank AS INTEGER) as rank
    FROM (
      SELECT
        "userUid",
        RANK() OVER (ORDER BY "timeTaken" ASC) AS rank
      FROM "Answers"
      WHERE "questionUid" = ${questionUid}
    ) AS ranked_answers
    WHERE "userUid" = ${userUid}
  `;

  console.log({
    result,
  });

  return result.length > 0 ? result[0].rank : null;
};

/**

export const getUserAnswerRank = async (opts: {
  questionUid: string;
  userUid: string;
}) => {
  const { questionUid, userUid } = opts;

  // Find the time taken by the user's answer
  const userAnswer = await prisma.answers.findFirst({
    where: { userUid, questionUid },
    select: { timeTaken: true },
  });

  if (!userAnswer || userAnswer.timeTaken === null) {
    throw new Error('User answer not found or time taken is missing');
  }

  // Count answers with a lower timeTaken for the same question
  const fasterAnswersCount = await prisma.answers.count({
    where: {
      questionUid,
      timeTaken: { lt: userAnswer.timeTaken },
    },
  });

  // Rank is number of faster answers plus one
  return fasterAnswersCount + 1;
};

 */
