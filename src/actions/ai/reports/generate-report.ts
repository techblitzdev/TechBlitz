'use server';
import {
  getUserFromDb,
  getUserFromSession,
} from '@/actions/user/authed/get-user';
import { getTagsReport } from '@/actions/ai/reports/utils/get-tags-report';
import { generateStatisticsCustomQuestions } from '@/actions/ai/reports/utils/generate-custom-questions';
import { prisma } from '@/utils/prisma';
import { nanoid } from 'nanoid';
import { generateReportHtml } from '@/actions/ai/reports/utils/generate-report-html';

type QuestionData = {
  questions: string;
  answers: Array<{
    answer: string;
    correct: boolean;
  }>;
  codeSnippet?: string;
  hint?: string;
  difficulty: string;
  tags: string[];
};

/**
 * Analyzes a user's question responses and generates a statistics report with custom questions.
 * @returns The generated statistics report or null if user validation fails
 */
export const generateStatisticsReport = async () => {
  // Validate user and permissions
  const { data } = await getUserFromSession();
  if (!data?.user?.id) throw new Error('User not found');

  const user = await getUserFromDb(data.user.id);
  if (!user) throw new Error('User not found');

  if (!['PREMIUM', 'ADMIN'].includes(user.userLevel)) {
    throw new Error('Premium access required');
  }

  // Get user performance data
  const { correctTags, incorrectTags } = await getTagsReport({ user });

  // the report html and question generations do not rely on each other
  // so we can run them in parallel
  const [customQuestionsResponse, reportHtmlResponse] = await Promise.all([
    generateStatisticsCustomQuestions({
      incorrectTags,
    }),
    generateReportHtml({
      correctTags,
      incorrectTags,
    }),
  ]);

  if (!customQuestionsResponse) {
    throw new Error('Failed to generate custom questions');
  }

  // Process questions data
  const { questionData } = JSON.parse(customQuestionsResponse);
  const questions = questionData.map((question: QuestionData) => {
    const answers = question.answers.map((answer) => ({
      ...answer,
      uid: nanoid(),
    }));

    const correctAnswer = answers.find((answer) => answer.correct);
    if (!correctAnswer) {
      throw new Error(
        `Missing correct answer for question: ${question.questions}`
      );
    }

    return {
      uid: nanoid(),
      customQuestion: true,
      question: question.questions,
      correctAnswer: correctAnswer.uid,
      codeSnippet: question.codeSnippet || null,
      hint: question.hint || null,
      difficulty: question.difficulty.toUpperCase(),
      tags: question.tags,
      questionDate: '',
      answers: {
        create: answers.map(({ uid, answer }) => ({
          uid,
          answer,
          isCodeSnippet: false,
        })),
      },
    };
  });

  // Create report and questions in transaction
  return await prisma.$transaction(async (prisma) => {
    const report = await prisma.statisticsReport.create({
      data: {
        userUid: user.uid,
        correctTags: correctTags.map((tag) => tag.tagName),
        incorrectTags: incorrectTags.map((tag) => tag.tagName),
        htmlReport: reportHtmlResponse,
      },
    });

    // TODO: Fix the any type
    await Promise.all(
      questions.map((question: any) =>
        prisma.questions.create({
          data: {
            ...question,
            linkedReports: {
              connect: { uid: report.uid },
            },
          },
        })
      )
    );

    return report;
  });
};
