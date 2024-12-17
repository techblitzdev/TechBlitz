/**
 * Method to add order to response questions.
 * If we are extending a roadmap, we need to start the
 * order from the last question in the roadmap.
 *
 * do not add a order to the response answers
 */
export const addOrderToResponseQuestions = (
  response: any,
  startingIndex: number = 0
) => {
  if (!Array.isArray(response)) {
    throw new Error('Input must be an array of questions.');
  }

  return response.map((question, index) => ({
    ...question,
    order: index + startingIndex + 1
  }));
};
