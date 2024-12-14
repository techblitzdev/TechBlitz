/**
 * This type represents the shape of the data of a
 * answer to a question.
 */
export type QuestionAnswer = {
  uid: string;
  questionUid: string;
  answer: string;
  isCodeSnippet?: boolean;
};
