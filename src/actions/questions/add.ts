'use server';
import { prisma } from '@/utils/prisma';
import uniqid from 'uniqid';

export const addQuestion = async (opts: {
  question: string;
  answers: string[];
  questionDate: string;
}) => {
  console.log('Adding new question...');
  // Destructure the input values from opts
  const { question, answers, questionDate } = opts;

  console.log({
    question,
    answers,
    questionDate,
  });

  console.log('type of answers', typeof Array.from(answers));

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

  try {
    // Generate a unique ID for the question
    const uid = uniqid();

    // Create a new question in the database
    const newQuestion = await prisma.questions.create({
      data: {
        uid,
        question,
        answer: [...answers],
        questionDate: new Date(questionDate),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log('New question created:', newQuestion);

    // If creation is successful, return a success message
    return 'ok';
  } catch (error) {
    console.error('Failed to add new question:', error);
    if (error instanceof Error) return error.message;
    else return 'Failed to add new question';
  }
};
