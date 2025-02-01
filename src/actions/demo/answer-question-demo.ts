"use server";
import { prisma } from "@/lib/prisma";

export const answerDailyQuestionDemo = async (opts: {
  questionUid: string;
  userAnswerUid: string;
  timeTaken: number;
}) => {
  const { questionUid, userAnswerUid, timeTaken } = opts;

  // get the question
  const question = await prisma.questions.findUnique({
    where: {
      uid: questionUid,
    },
  });

  // if the question does not exist, return null
  if (!question) {
    return null;
  }

  // check if the user answer is correct
  const isCorrect = question.correctAnswer === userAnswerUid;

  // add the answer to the database
  await prisma.demoAnswers.create({
    data: {
      questionUid,
      userAnswer: userAnswerUid,
      correctAnswer: isCorrect,
      timeTaken,
    },
  });

  // if the answer is correct, return true
  if (isCorrect) return true;

  // if the answer is incorrect, return false
  return false;
};
