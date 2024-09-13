export type Answer = {
  uid: string
  user: string
  question: string

  userAnswer: string
  correctAnswer: string
  
  createdAt: string
  updatedAt: string

  questionDate: string

  timeTaken?: number
}