import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';

type IncludeOptions = {
  answers?: boolean;
  tags?: boolean;
  userAnswers?: boolean;
};

type GetQuestionsOpts = {
  questionSlugs: string[];
  include?: IncludeOptions;
};

export const getQuestions = async (opts: GetQuestionsOpts) => {
  const user = await getUser();
  const { questionSlugs, include = { answers: true, tags: true, userAnswers: true } } = opts;

  const includeOptions: any = {};

  if (include.answers) {
    includeOptions.answers = true;
  }

  if (include.tags) {
    includeOptions.tags = {
      include: {
        tag: true,
      },
    };
  }

  if (include.userAnswers) {
    includeOptions.userAnswers = {
      where: {
        userUid: user?.uid,
      },
    };
  }

  const res = await prisma.questions.findMany({
    where: {
      slug: {
        in: questionSlugs,
      },
    },
    include: includeOptions,
  });

  // current date
  return res;
};
