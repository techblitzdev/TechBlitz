export type Question = {
  uid: string
  user: string
  question: string
  answer: string
  createdAt: string
  updatedAt: string

  // The answer to the question
  questionDate: string
  answers: string[]
}