'use server'
import { prisma } from '@/utils/prisma'
import uniqid from 'uniqid';

export const addQuestion = async (opts: {
  question: string,
  answer: string,
  questionDate: string
}) => { 
  // get the question and answer from the opts
  const { question, answer, questionDate } = opts

  if (!question || !answer || !questionDate) {
    return 'Please provide a question and an answer'
  }

  console.log({
    question,
    answer,
    questionDate
  })
  
  // generate a new question id
  const uid = uniqid()  
  const newQuestion = await prisma.questions.create({
    data: {
      uid,
      answer,
      question,
      questionDate,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  })

  if(!newQuestion) {
    return 'Failed to add new question'
  }
  return 'ok'
}