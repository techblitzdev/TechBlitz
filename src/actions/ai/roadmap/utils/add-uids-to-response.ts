import { nanoid } from 'nanoid'

/**
 * Adds unique uids to questions and answers in the response.
 * Sets the correct answer UID on each question.
 *
 * @param {Array} response - Array of questions with nested answers.
 * @returns {Array} - Updated array with unique uids and correctAnswerUid on each question.
 */
export const addUidsToResponse = (response: any) => {
  if (!Array.isArray(response)) {
    throw new Error('Input must be an array of questions.')
  }

  return response.map((question) => {
    const uid = nanoid()

    // Generate unique uids for each answer
    const answers = question.answers.map((answer: any) => ({
      ...answer,
      uid: nanoid(),
    }))

    // Find the correct answer's UID
    const correctAnswer = answers.find((answer: any) => answer.correct)
    if (!correctAnswer) {
      throw new Error(
        `No correct answer found for question: ${question.questions}`,
      )
    }

    return {
      ...question,
      uid,
      correctAnswerUid: correctAnswer.uid,
      answers,
    }
  })
}
