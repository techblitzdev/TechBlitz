import { Question } from '@/types/Questions'

/**
 * Method to add order to response questions.
 * If we are extending a roadmap, we need to start the
 * order from the last question in the roadmap.
 *
 * do not add a order to the response answers
 */
export const addOrderToResponseQuestions = (
  questions: Question[],
  existingQuestionsCount: number = 0,
): Question[] => {
  console.log('starting order from:', existingQuestionsCount)

  return questions.map((question, index) => ({
    ...question,
    // Start ordering from after the last existing question
    order: existingQuestionsCount + index + 1,
  }))
}
