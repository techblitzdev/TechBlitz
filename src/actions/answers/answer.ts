'use server';
import { prisma } from '@/utils/prisma';
import { connect } from 'http2';
import uniqid from 'uniqid';

export const answerQuestion = async (opts: {
  questionUid: string;
  answerUid: string;
  userId: string;
}) => {
  const { questionUid, answerUid, userId } = opts;
  try {
    // check if the answerUid is the correct answer
    // if it is, return true
    // if it is not, return false
    const question = await prisma.questions.findUnique({
      where: {
        uid: questionUid,
      },
    });

    if (!question) {
      throw new Error('Question not found');
    }

    const correctAnswer = question.correctAnswer === answerUid ? true : false;

    // get the current user

    // we now need to save the user's answer to the db
    await prisma.answers.create({
      data: {
        correctAnswer,
        createdAt: new Date(),
        userAnswer: {
          connect: {
            uid: answerUid,
          },
        },
        user: {
          connect: {
            uid: userId,
          },
        },
        question: {
          connect: {
            uid: questionUid,
          },
        },
      },
    });
  } catch (e) {
    console.error(e);
  }
};
