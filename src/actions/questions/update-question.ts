'use server';

import { prisma } from '@/lib/prisma';
import { QuestionDifficulty, QuestionType } from '@prisma/client';
import { revalidatePath } from 'next/cache';

interface UpdateQuestionData {
  title: string;
  question: string;
  correctAnswer: string;
  difficulty: QuestionDifficulty;
  questionType: QuestionType;
  isPremiumQuestion: boolean;
  hint: string | null;
  codeSnippet: string | null;
}

export async function updateQuestion(uid: string, data: UpdateQuestionData) {
  try {
    // Validate the data
    if (!uid) {
      return { success: false, error: 'Question ID is required' };
    }

    if (!data.title || !data.question || !data.correctAnswer) {
      return { success: false, error: 'Required fields are missing' };
    }

    // Update the question
    const updatedQuestion = await prisma.questions.update({
      where: { uid },
      data: {
        title: data.title,
        question: data.question,
        correctAnswer: data.correctAnswer,
        difficulty: data.difficulty,
        questionType: data.questionType,
        isPremiumQuestion: data.isPremiumQuestion,
        hint: data.hint,
        codeSnippet: data.codeSnippet,
      },
    });

    // Revalidate the relevant paths
    revalidatePath('/admin/questions');
    revalidatePath('/admin/questions/list');
    revalidatePath(`/admin/questions/${uid}`);

    return { success: true, data: updatedQuestion };
  } catch (error) {
    console.error('Failed to update question:', error);

    // Handle specific Prisma errors
    if (error instanceof Error) {
      if (error.message.includes('Record to update not found')) {
        return { success: false, error: 'Question not found' };
      }
      if (error.message.includes('Unique constraint failed')) {
        return { success: false, error: 'A question with this title already exists' };
      }
    }

    return { success: false, error: 'Failed to update question' };
  }
}
