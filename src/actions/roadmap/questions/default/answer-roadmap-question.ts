"use server";
import { getUser } from "@/actions/user/authed/get-user";
import { prisma } from "@/lib/prisma";

export const answerDefaultRoadmapQuestion = async (opts: {
  questionUid: string;
  answerUid: string;
  roadmapUid: string;
  currentQuestionIndex: number;
}) => {
  const { questionUid, answerUid, roadmapUid, currentQuestionIndex } = opts;

  const user = await getUser();
  if (!user) {
    throw new Error("User not found");
  }

  const question = await prisma.defaultRoadmapQuestions.findUnique({
    where: { uid: questionUid },
    include: {
      answers: true,
    },
  });

  if (!question) {
    throw new Error("Question not found");
  }

  const correctAnswer = question.correctAnswer === answerUid;

  const { userAnswer, totalQuestions } = await prisma.$transaction(
    async (prisma) => {
      // Check if the answer already exists
      const existingAnswer =
        await prisma.defaultRoadmapQuestionsUsersAnswers.findFirst({
          where: {
            questionUid,
            roadmapUid,
          },
        });

      let userAnswer;

      if (existingAnswer) {
        // If the answer already exists, update it instead of creating a new one
        userAnswer = await prisma.defaultRoadmapQuestionsUsersAnswers.update({
          where: { uid: existingAnswer.uid },
          data: {
            answer: answerUid,
            correct: correctAnswer,
          },
        });
      } else {
        // Create a new answer record
        userAnswer = await prisma.defaultRoadmapQuestionsUsersAnswers.create({
          data: {
            questionUid: questionUid,
            correct: correctAnswer,
            roadmapUid: roadmapUid,
            answer: answerUid,
          },
        });
      }

      // If this is the last question, mark the roadmap as completed
      const totalQuestions = await prisma.defaultRoadmapQuestions.count();

      // Update the user's roadmap progress
      await prisma.userRoadmaps.update({
        where: {
          uid: roadmapUid,
          AND: {
            userUid: user.uid,
          },
        },
        data: {
          // set the current question to the next question, unless this is the last question
          currentQuestionIndex:
            currentQuestionIndex === totalQuestions
              ? currentQuestionIndex
              : currentQuestionIndex + 1,
          // If this is the last question, mark the roadmap as completed
          status:
            currentQuestionIndex === totalQuestions ? "ACTIVE" : "CREATING",
        },
      });

      return { userAnswer, totalQuestions };
    },
  );

  const isLastQuestion = currentQuestionIndex === totalQuestions;

  // Find the answer text from the question's answers
  const answerText =
    question.answers.find((a) => a.uid === answerUid)?.answer || "";

  return {
    correctAnswer,
    userAnswer: {
      ...userAnswer,
      answer: answerText,
    },
    currentQuestionIndex: question.order,
    isLastQuestion,
    userAnswerContent: answerText,
    nextQuestion: currentQuestionIndex + 1,
  };
};
