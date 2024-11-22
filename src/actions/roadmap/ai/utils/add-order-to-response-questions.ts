/**
 * Method to add order to response questions
 *
 * do not add a order to the response answers
 */
export const addOrderToResponseQuestions = (response: any) => {
  if (!Array.isArray(response)) {
    throw new Error('Input must be an array of questions.');
  }

  return response.map((question, index) => ({
    ...question,
    order: index,
  }));
};
