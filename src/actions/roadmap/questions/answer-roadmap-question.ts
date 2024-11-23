'use server';
import { prisma } from '@/utils/prisma';
import { fetchRoadmapQuestion } from './fetch-roadmap-question';

export const answerRoadmapQueston = async (opts: {
  questionUid: string;
  answerUid: string;
  roadmapUid: string;
  userUid: string;
  currentQuestionIndex: number;
}) => {
  console.log('hit');
  const { questionUid, answerUid, roadmapUid, userUid, currentQuestionIndex } =
    opts;

  // get the question
  const question = await fetchRoadmapQuestion(questionUid);
  if (!question) {
    throw new Error('Question not found');
  }

  // check if the answer is correct
  const correctAnswer = question.correctAnswerUid === answerUid;

  // check if the answer already exists
  const existingAnswer = await prisma.roadmapUserQuestionsAnswers.findFirst({
    where: {
      questionUid,
      AND: {
        question: {
          roadmap: {
            userUid,
          },
        },
      },
    },
  });

  let userAnswer;

  if (existingAnswer) {
    // if the answer already exists, update it instead of creating a new one
    userAnswer = await prisma.roadmapUserQuestionsAnswers.update({
      where: { uid: existingAnswer.uid },
      data: {
        answer: answerUid,
        correct: correctAnswer,
      },
    });
  } else {
    // create a new answer record
    userAnswer = await prisma.roadmapUserQuestionsAnswers.create({
      data: {
        questionUid: questionUid,
        correct: correctAnswer,
        answer: answerUid,
      },
    });
  }

  // if this is the last question, mark the roadmap as completed
  const totalQuestions = await prisma.roadmapUserQuestions.count({
    where: {
      roadmapUid,
    },
  });

  let nextQuestion = null;

  if (currentQuestionIndex === totalQuestions - 1) {
    await prisma.userRoadmaps.update({
      where: {
        uid: roadmapUid,
      },
      data: {
        status: 'COMPLETED',
      },
    });
  } else {
    // get the next question
    nextQuestion = await prisma.roadmapUserQuestions.findFirst({
      where: {
        roadmapUid,
        order: currentQuestionIndex + 1,
      },
    });

    if (!nextQuestion) {
      throw new Error('Next question not found');
    }
  }

  return { userAnswer, totalQuestions, nextQuestion };
};
