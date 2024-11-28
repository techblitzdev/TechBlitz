'use server';
import { prisma } from '@/utils/prisma';
import { fetchRoadmapQuestion } from './fetch-roadmap-question';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

export const answerRoadmapQuestion = async (opts: {
  questionUid: string;
  answerUid: string;
  roadmapUid: string;
  userUid: string;
  currentQuestionIndex: number;
}) => {
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
  const existingAnswer = await prisma.roadmapUserQuestionsUserAnswers.findFirst(
    {
      where: {
        questionUid
      }
    }
  );

  let userAnswer;

  if (existingAnswer) {
    console.log('updating answer');
    // if the answer already exists, update it instead of creating a new one
    userAnswer = await prisma.roadmapUserQuestionsUserAnswers.update({
      where: { uid: existingAnswer.uid },
      data: {
        answer: answerUid,
        correct: correctAnswer
      }
    });
  } else {
    console.log('creating answer');
    // create a new answer record
    userAnswer = await prisma.roadmapUserQuestionsUserAnswers.create({
      data: {
        questionUid: questionUid,
        correct: correctAnswer,
        answer: answerUid
      }
    });
  }

  // update the question record to mark it as answered and either correct or incorrect
  await prisma.roadmapUserQuestions.update({
    where: {
      uid: questionUid
    },
    data: {
      userCorrect: correctAnswer,
      completed: true
    }
  });

  // if this is the last question, and all other questions have been answered
  // mark the roadmap as complete

  // we find this by trying to find values where the user has either not answered
  // or answered incorrectly
  const hasAnsweredAllQuestions = await prisma.roadmapUserQuestions.findMany({
    where: {
      roadmapUid,
      completed: false,
      userCorrect: false
    }
  });

  let nextQuestion = null;

  if (hasAnsweredAllQuestions.length === 0) {
    await prisma.userRoadmaps.update({
      where: {
        uid: roadmapUid
      },
      data: {
        status: 'COMPLETED'
      }
    });
  } else {
    // get the next question
    nextQuestion = await prisma.roadmapUserQuestions.findFirst({
      where: {
        roadmapUid,
        order: currentQuestionIndex + 1
      }
    });

    if (!nextQuestion) {
      redirect(`/roadmap/${roadmapUid}?complete=true`);
    }
  }

  // revaidate the roadmap list
  revalidateTag('roadmap-list');

  return { userAnswer, nextQuestion };
};
