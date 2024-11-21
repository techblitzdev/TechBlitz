'use server';
import { prisma } from '@/utils/prisma';

export const answerDefaultRoadmapQuestion = async (opts: {
  questionUid: string;
  answerUid: string;
  roadmapUid: string;
}) => {
  const { questionUid, answerUid, roadmapUid } = opts;

  const question = await prisma.defaultRoadmapQuestions.findUnique({
    where: { uid: questionUid },
  });

  if (!question) {
    throw new Error('Question not found');
  }

  const correctAnswer = question.correctAnswer === answerUid;

  const userAnswer = await prisma.defaultRoadmapQuestionsUsersAnswers.create({
    data: {
      questionUid: questionUid,
      correct: correctAnswer,
      roadmapUid: roadmapUid,
      answer: answerUid,
    },
  });

  return { correctAnswer, userAnswer, currentQuestionIndex: question.order };
};
