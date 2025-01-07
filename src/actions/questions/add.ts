'use server';
import { QuestionDifficulty } from '@/types/Questions';
import { prisma } from '@/lib/prisma';
import uniqid from 'uniqid';

export const addQuestion = async (opts: {
  question: string;
  answers: string[];
  questionDate?: string;
  correctAnswer: number;
  codeSnippet?: string;
  hint?: string;
  dailyQuestion?: boolean;
  tags: string[];
  isRoadmapQuestion?: boolean;
  order?: number;
  difficulty: QuestionDifficulty;
  aiTitle?: string;
  questionResources?: {
    title: string;
    url: string;
  }[];
}) => {
  const {
    question,
    answers,
    questionDate,
    correctAnswer,
    codeSnippet,
    hint,
    dailyQuestion,
    tags,
    isRoadmapQuestion,
    order,
    aiTitle,
    difficulty,
    questionResources,
  } = opts;

  console.log('hit');

  if (!question || !answers.length) {
    console.error(
      'Please provide a question, at least one answer, and a question date'
    );
    return 'Please provide a question, at least one answer, and a question date';
  }

  if (
    !Array.isArray(answers) ||
    !answers.every((answer) => typeof answer === 'string')
  ) {
    console.error('Each answer must be a string');
    return 'Each answer must be a string';
  }

  const answerRecords = answers.map((answer) => ({
    uid: uniqid(),
    answer,
  }));

  if (correctAnswer < 0 || correctAnswer >= answers.length) {
    console.error('Invalid correctAnswer index');
    return 'Invalid correctAnswer index';
  }

  const correctAnswerUid = answerRecords[correctAnswer].uid;
  const questionUid = uniqid();

  try {
    if (!isRoadmapQuestion) {
      await prisma.questions.create({
        data: {
          uid: questionUid,
          question,
          questionDate: questionDate
            ? new Date(questionDate).toISOString().split('T')[0]
            : '',
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
          difficulty,
          QuestionResources: questionResources
            ? {
                createMany: {
                  data: questionResources.map((resource) => ({
                    title: resource.title,
                    resource: resource.url,
                    uid: uniqid(),
                  })),
                },
              }
            : undefined,
          tags: {
            connectOrCreate: tags.map((tag) => ({
              where: {
                questionId_tagId: {
                  questionId: questionUid,
                  tagId: uniqid(),
                },
              },
              create: {
                tag: {
                  connectOrCreate: {
                    where: { name: tag },
                    create: {
                      uid: uniqid(),
                      name: tag,
                    },
                  },
                },
              },
            })),
          },
        },
      });
    } else {
      await prisma.defaultRoadmapQuestions.create({
        data: {
          uid: questionUid,
          question,
          createdAt: new Date(),
          updatedAt: new Date(),
          answers: {
            createMany: {
              data: answerRecords,
            },
          },
          correctAnswer: correctAnswerUid,
          codeSnippet: codeSnippet || null,
          hint: hint || null,
          DefaultRoadmapQuestionsUsersAnswers: {},
          order: order || 0,
          aiTitle: aiTitle || null,
          difficulty,
        },
      });
    }

    return 'ok';
  } catch (error) {
    console.error('Failed to add new question:', error);
    return error instanceof Error
      ? error.message
      : 'Failed to add new question';
  }
};
