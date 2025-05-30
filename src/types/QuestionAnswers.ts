export type QuestionAnswerType = 'PREFILL' | 'STANDARD';

/**
 * This type represents the shape of the data of a
 * answer to a question.
 */
export type QuestionAnswer = {
  uid: string;
  questionUid: string;
  answer: string;
  answerFullSnippet?: string | null;
  isCodeSnippet?: boolean;
  answerType: QuestionAnswerType;
};
