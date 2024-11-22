/**
 * Method to add order to response questions
 */
export const addOrderToResponseQuestions = (response: any) => {
  if (!Array.isArray(response)) {
    throw new Error('Input must be an array of questions.');
  }

  return response.map((question, index) => {
    return {
      ...question,
      order: index + 1,
    };
  });
};
