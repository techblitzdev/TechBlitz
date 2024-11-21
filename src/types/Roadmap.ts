import { BaseRecord } from './BaseRecord';
import { QuestionDifficulty } from './Questions';
import { User } from './User';

export type RoadmapStatus = 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';

// Main roadmap associated with a user
export interface UserRoadmaps extends BaseRecord {
  userUid: string; // Connects to the user
  user: User; // Relation to the Users type
  questions: RoadmapUserQuestions[]; // Related questions specific to this roadmap
  status: RoadmapStatus; // Status of the roadmap (active, completed, archived)
  defaultRoadmapQuestionsUsersAnswers: DefaultRoadmapQuestionsUsersAnswers[]; // User answers to default questions
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
  RoadmapUserQuestionsAnswers: RoadmapUserQuestionsAnswers[]; // Array of possible answers
  RoadmapUserQuestionsUserAnswers: RoadmapUserQuestionsUserAnswers[]; // User-specific answers
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
  codeSnippet: string | null; // Optional code snippet for the default question
  hint: string | null; // Optional hint for the question
  difficulty: QuestionDifficulty; // Enum for question difficulty
  answers: DefaultRoadmapQuestionsAnswers[]; // Submitted answers
  correctAnswer: string; // Connects to the correct answer
  order: number; // Order of the question in the default roadmap
}

// User answers to the default roadmap questions
export interface DefaultRoadmapQuestionsAnswers extends BaseRecord {
  questionUid: string; // Connects to the associated default question
  answer: string; // User-provided answer text
}

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
