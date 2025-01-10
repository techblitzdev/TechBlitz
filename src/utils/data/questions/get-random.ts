import { prisma } from '@/lib/prisma';
import { getUser } from '@/actions/user/authed/get-user';

/**
 * Retrieve a random question
 *
 * @param currentQuestionUid - The uid of the current question
 * @returns The slug of the next question
 */
export const getRandomQuestion = async (opts: {
  currentQuestionSlug: string;
}) => {
  const { currentQuestionSlug } = opts;

  // if the we have a user, we will get a question that the user hasn't answered
  // if the user is not logged in, we will get a random question
  const user = await getUser();

  // any here is to avoid type errors
  let question: any;

  if (user) {
    // get a random question that the user hasn't answered using raw SQL
    question = await prisma.$queryRaw`
      SELECT q.slug 
      FROM "Questions" q
      LEFT JOIN "QuestionAnswers" ua 
        ON ua."questionUid" = q.uid 
        AND ua."uid" = ${user.uid}
      WHERE q.slug != ${currentQuestionSlug}
        AND ua.uid IS NULL
      ORDER BY RANDOM()
      LIMIT 1
    `;

    // extract first result if exists
    question = question[0];
  } else {
    // get a random question for non-logged in users using raw SQL
    question = await prisma.$queryRaw`
      SELECT slug
      FROM "Questions"
      WHERE slug != ${currentQuestionSlug}
      ORDER BY RANDOM()
      LIMIT 1
    `;

    // extract first result if exists
    question = question[0];
  }

  console.log('question', question);

  // we only need the slug to redirect to the questions
  return question?.slug;
};
