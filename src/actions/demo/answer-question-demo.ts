'use server';
import { prisma } from '@/utils/prisma';

export const answerDailyQuestionDemo = async (opts: {
  questionUid: string;
  userAnswerUid: string;
}) => {
  const { questionUid, userAnswerUid } = opts;

  // get the question
  const question = await prisma.questions.findUnique({
    where: {
      uid: questionUid
    }
  });

  // if the question does not exist, return null
  if (!question) {
    return null;
  }

  // check if the user answer is correct
  const isCorrect = question.correctAnswer === userAnswerUid;

  // if the answer is correct, return true
  if (isCorrect) return true;

  // if the answer is incorrect, return false
  return false;
};
