'use server';
import { prisma } from '@/lib/prisma';
import { fetchRoadmapQuestion } from '@/utils/data/roadmap/questions/fetch-roadmap-question';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

export const answerRoadmapQuestion = async (opts: {
  questionUid: string;
  answerUid: string;
  roadmapUid: string;
  userUid: string;
  currentQuestionIndex: number;
  answer: string;
}) => {
  const { questionUid, answerUid, roadmapUid, currentQuestionIndex, answer } = opts;

  // Get and validate question
  const question = await fetchRoadmapQuestion(questionUid);
  if (!question) throw new Error('Question not found');

  const correctAnswer = question.correctAnswerUid === answerUid;

  // Handle user answer
  const existingAnswer = await prisma.roadmapUserQuestionsUserAnswers.findFirst({
    where: { questionUid },
  });

  const answerData = {
    questionUid,
    answer: answer,
    correct: correctAnswer,
    answerUid: answerUid,
  };

  const userAnswer = existingAnswer
    ? await prisma.roadmapUserQuestionsUserAnswers.update({
        where: { uid: existingAnswer.uid },
        data: answerData,
        include: { question: true },
      })
    : await prisma.roadmapUserQuestionsUserAnswers.create({
        data: answerData,
        include: { question: true },
      });

  // Update question status
  await prisma.roadmapUserQuestions.update({
    where: { uid: questionUid },
    data: {
      userCorrect: correctAnswer,
      completed: true,
    },
  });

  // Check roadmap completion
  const unansweredQuestions = await prisma.roadmapUserQuestions.findMany({
    where: {
      roadmapUid,
      completed: false,
      userCorrect: false,
    },
  });

  let nextQuestion = null;

  if (unansweredQuestions.length === 0) {
    await prisma.userRoadmaps.update({
      where: { uid: roadmapUid },
      data: { status: 'COMPLETED' },
    });
  } else {
    nextQuestion = await prisma.roadmapUserQuestions.findFirst({
      where: {
        roadmapUid,
        order: currentQuestionIndex + 1,
      },
    });

    if (!nextQuestion) {
      redirect(`/roadmap/${roadmapUid}?complete=true`);
    }
  }

  revalidateTag('roadmap-list');

  return { userAnswer, nextQuestion };
};
