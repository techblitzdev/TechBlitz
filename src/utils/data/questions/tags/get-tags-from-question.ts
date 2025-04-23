import type { Question, QuestionWithoutAnswers, QuestionWithTags } from '@/types';

export const getTagsFromQuestion = (questions: Question | QuestionWithoutAnswers[]) => {
  if (!questions) return [];

  const processQuestion = (question: Question | QuestionWithoutAnswers) => ({
    ...question,
    tags: question.tags?.map((tag) => ({
      questionId: tag?.questionId,
      tagId: tag?.tagId,
      tag: {
        uid: tag?.tagId,
        name: tag?.tag?.name,
      },
    })),
  });

  // Check if `questions` is an array or a single object
  return Array.isArray(questions) ? questions.map(processQuestion) : processQuestion(questions);
};

export const extractTagIds = (questions: QuestionWithTags[]) => {
  const tagIds = questions.flatMap((question) =>
    question.tags.map((tagRelation) => tagRelation.tag.uid)
  );

  return tagIds;
};
