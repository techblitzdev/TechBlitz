import { BaseRecord } from './BaseRecord';
import { QuestionDifficulty } from './Questions';
import { User } from './User';

export type RoadmapStatus = 'ACTIVE' | 'COMPLETED' | 'ARCHIVED' | 'CREATING';

// Main roadmap associated with a user
export interface UserRoadmaps extends BaseRecord {
  userUid: string; // Connects to the user
  user: User; // Relation to the Users type
  questions: RoadmapUserQuestions[]; // Related questions specific to this roadmap
  status: RoadmapStatus; // Status of the roadmap (active, completed, archived, creating)
  defaultRoadmapQuestionsUsersAnswers: DefaultRoadmapQuestionsUsersAnswers[]; // User answers to default questions
  currentQuestionIndex: number; // Index of the user's current question
  hasGeneratedRoadmap: boolean; // Indicates if the roadmap has been generated
}

// Individual questions in a user's roadmap
export interface RoadmapUserQuestions extends BaseRecord {
  question: string; // Question text
  codeSnippet?: string; // Optional code snippet for the question
  hint?: string; // Optional hint to help the user
  difficulty: QuestionDifficulty; // Enum for question difficulty
  completed: boolean; // Track completion status for this question
  completedAt?: Date; // Timestamp for when the question was completed
  roadmapUid: string; // Connect to the associated roadmap
  roadmap: UserRoadmaps; // Relation to the UserRoadmaps type
  correctAnswerUid: string; // Connects to the correct answer
  answers: RoadmapUserQuestionsAnswers[]; // Array of possible answers
  userAnswers: RoadmapUserQuestionsUserAnswers[]; // User-specific answers
  order: number; // Order of the question in the roadmap
}

// Possible answers for roadmap questions
export interface RoadmapUserQuestionsAnswers extends BaseRecord {
  questionUid: string; // Connects to the associated roadmap question
  question: RoadmapUserQuestions; // Relation to the RoadmapUserQuestions type
  correct: boolean; // Indicates whether this is the correct answer
  answer: string; // Answer text
}

// User-provided answers to roadmap questions
export interface RoadmapUserQuestionsUserAnswers extends BaseRecord {
  questionUid: string; // Connects to the associated roadmap question
  question: RoadmapUserQuestions; // Relation to the RoadmapUserQuestions type
  correct: boolean; // Indicates whether the user's answer was correct
  answer: string; // User-provided answer text
}

// Default questions used to generate user roadmaps
export interface DefaultRoadmapQuestions extends BaseRecord {
  question: string; // Default question text
  codeSnippet?: string; // Optional code snippet for the default question
  hint?: string; // Optional hint for the question
  difficulty: QuestionDifficulty; // Enum for question difficulty
  answers: DefaultRoadmapQuestionsAnswers[]; // Submitted answers
  correctAnswer: string; // Connects to the correct answer
  order: number; // Order of the question in the default roadmap
  aiTitle?: string; // AI-generated title for the question
}

// User answers to the default roadmap questions
export interface DefaultRoadmapQuestionsAnswers extends BaseRecord {
  questionUid: string; // Connects to the associated default question
  answer: string; // User-provided answer text
}

// User-specific answers to default roadmap questions
export interface DefaultRoadmapQuestionsUsersAnswers extends BaseRecord {
  questionUid: string; // Connects to the associated default question
  question: DefaultRoadmapQuestions; // Relation to the DefaultRoadmapQuestions type
  userUid: string; // Connects to the user who answered the question
  user: User; // Relation to the Users type
  correct: boolean; // Indicates whether the user's answer was correct
  answer: string; // User-provided answer text
  roadmapUid: string; // Connects to the associated roadmap
  roadmap: UserRoadmaps; // Relation to the UserRoadmaps type
}
