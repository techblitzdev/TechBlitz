'use server';
import { prisma } from '@/utils/prisma';
import uniqid from 'uniqid';

export const addQuestion = async (opts: {
  question: string;
  answers: string[];
  questionDate?: string;
  correctAnswer: number;
  codeSnippet?: string;
  hint?: string;
  dailyQuestion?: boolean;
}) => {
  // Destructure the input values from opts
  const {
    question,
    answers,
    questionDate,
    correctAnswer,
    codeSnippet,
    hint,
    dailyQuestion,
  } = opts;

  // Basic validation
  if (!question || !answers.length || !questionDate) {
    console.error(
      'Please provide a question, at least one answer, and a question date'
    );
    return 'Please provide a question, at least one answer, and a question date';
  }

  // Check if answers is an array of strings
  if (!Array.isArray(answers)) {
    console.error('answers must be an array');
    return 'answers must be an array of strings';
  }

  if (!answers.every((answer) => typeof answer === 'string')) {
    console.error('Each answer must be a string');
    return 'Each answer must be a string';
  }

  // create the answers array
  const answerRecords = answers.map((answer) => ({
    uid: uniqid(),
    answer,
  }));

  // Check if correctAnswerIndex is valid
  if (correctAnswer < 0 || correctAnswer >= answers.length) {
    console.error('Invalid correctAnswerIndex');
    return 'Invalid correctAnswerIndex';
  }

  // get the correct answer uid
  const correctAnswerUid = answerRecords[correctAnswer].uid;

  try {
    const uid = uniqid();

    await prisma.questions.create({
      data: {
        uid,
        question,
        questionDate: new Date(questionDate).toISOString().split('T')[0],
        createdAt: new Date(),
        updatedAt: new Date(),
        answers: {
          createMany: {
            data: answerRecords,
          },
        },
        userAnswers: {},
        correctAnswer: correctAnswerUid,
        codeSnippet: codeSnippet || null,
        hint: hint || null,
        dailyQuestion: dailyQuestion || false,
      },
    });

    return 'ok';
  } catch (error) {
    console.error('Failed to add new question:', error);
    if (error instanceof Error) return error.message;
    else return 'Failed to add new question';
  }
};
