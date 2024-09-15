'use server'
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
  })

  // Basic validation
  if (!question || !answers.length || !questionDate) {
    console.error('Please provide a question, at least one answer, and a question date');
    return 'Please provide a question, at least one answer, and a question date'
  }

  try {
    // Generate a unique ID for the question
    const uid = uniqid();

    // Create a new question in the database
    const newQuestion = await prisma.questions.create({
      data: {
        uid,
        question,
        answer: answers,
        questionDate: new Date(questionDate),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log('New question created:', newQuestion)

    // If creation is successful, return a success message
    return 'ok'
  } catch (error) {
    console.error('Failed to add new question:', error);
    return error;
  }
};
