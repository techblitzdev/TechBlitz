'use server';
import { QuestionDifficulty } from '@/types/Questions';
import { prisma } from '@/lib/prisma';
import uniqid from 'uniqid';
import { addSlugToQuestion } from '@/scripts/add-slug-to-question';
import { QuestionAnswerType } from '@/types/QuestionAnswers';

export const addQuestion = async (opts: {
  title?: string;
  description?: string;
  question: string;
  answers: {
    text: string;
    isCodeSnippet: boolean;
    answerFullSnippet?: string | null;
    answerType?: QuestionAnswerType | null;
  }[];
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
  afterQuestionInfo?: string;
  questionType?: 'MULTIPLE_CHOICE' | 'CODING_CHALLENGE' | 'SIMPLE_MULTIPLE_CHOICE';
  slug?: string;
}) => {
  const {
    title,
    description,
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
    afterQuestionInfo,
    questionType,
    slug,
  } = opts;

  console.log('hit');

  if (!question || !answers.length) {
    console.error('Please provide a question, at least one answer, and a question date');
    return 'Please provide a question, at least one answer, and a question date';
  }

  const answerRecords = answers.map((answer) => ({
    uid: uniqid(),
    answer: answer.text,
    answerFullSnippet: answer.answerFullSnippet || null,
    answerType: answer.isCodeSnippet ? 'PREFILL' : ('STANDARD' as QuestionAnswerType),
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
          // Use provided slug or set to null for auto-generation
          slugGenerated: !slug,
          slug: slug || null,
          uid: questionUid,
          question,
          title: title || null,
          description: description || null,
          questionDate: questionDate ? new Date(questionDate).toISOString().split('T')[0] : '',
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
          questionType: questionType || 'MULTIPLE_CHOICE',
          afterQuestionInfo: afterQuestionInfo || null,
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

    // re run addSlugToQuestion to generate the slug
    await addSlugToQuestion();

    return 'ok';
  } catch (error) {
    console.error('Failed to add new question:', error);
    return error instanceof Error ? error.message : 'Failed to add new question';
  }
};

export const addCodingChallengeQuestion = async (opts: {
  question: string;
  title: string;
  description: string;
  testCases: {
    expected: any;
    input: any;
  }[];
  codeSnippet: string;
  hint: string;
  dailyQuestion: boolean;
  questionDate: string | undefined;
  tags: string[];
  aiTitle: string | undefined;
  difficulty: QuestionDifficulty | undefined;
  questionResources: {
    title: string;
    url: string;
  }[];
}) => {
  const {
    question,
    title,
    description,
    testCases,
    codeSnippet,
    hint,
    dailyQuestion,
    questionDate,
    tags,
    difficulty,
    questionResources,
  } = opts;

  const questionUid = uniqid();

  try {
    await prisma.questions.create({
      data: {
        uid: questionUid,
        question,
        title: title || null,
        description: description || null,
        questionDate: questionDate ? new Date(questionDate).toISOString().split('T')[0] : '',
        correctAnswer: '-',
        codeSnippet: codeSnippet || null,
        hint: hint || null,
        dailyQuestion: dailyQuestion || false,
        difficulty,
        questionType: 'CODING_CHALLENGE',
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
        testCases: testCases || null,
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
      },
    });
  } catch (error) {
    console.error('Failed to add new coding challenge question:', error);
    return error instanceof Error ? error.message : 'Failed to add new coding challenge question';
  }
};
