'use server';
import { prisma } from '@/lib/prisma';
import { userAuth } from '@/actions/questions/admin/utils/user-auth';

type GetQuestionsOpts = { from: number; to: number };

export const getQuestions = async (opts: GetQuestionsOpts) => {
  const { from, to } = opts;

  // ensure the user trying to get the questions is an admin
  const isAdmin = await userAuth('ADMIN');
  if (!isAdmin) {
    return;
  }

  try {
    // limit to 'to' questions per page starting from 'from'
    const res = await prisma.questions.findMany({
      skip: from,
      take: to,
      orderBy: {
        questionDate: 'asc',
      },
      include: {
        answers: true,
      },
    });

    // revalidate the 'questions' tag
    //revalidateTag('questions');

    // current date
    const today = new Date();

    // sort the questions into three arrays: today, future, and past
    const {
      today: todayQuestions,
      future: futureQuestions,
      past: pastQuestions,
    } = res.reduce(
      (acc, question) => {
        const questionDate = new Date(question.questionDate);
        if (questionDate.toDateString() === today.toDateString()) {
          acc.today.push(question);
        } else if (questionDate > today) {
          acc.future.push(question);
        } else {
          acc.past.push(question);
        }
        return acc;
      },
      { today: [], future: [], past: [] } as {
        today: typeof res;
        future: typeof res;
        past: typeof res;
      }
    );

    return {
      today: todayQuestions,
      future: futureQuestions,
      past: pastQuestions,
    };
  } catch (error) {
    console.error('Failed to get questions:', error);
  }
};
