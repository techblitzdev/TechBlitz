import type { QuestionDifficulty } from '@/types';
import Star3 from './icons/star';

/**
 * A component that displays a number of stars based on the difficulty of a question
 * - 1 star for beginner
 * - 2 stars for easy
 * - 3 stars for medium
 * - 4 stars for hard
 * - 5 stars for expert
 *
 * @param param
 * @returns
 */
export default function DifficultyStars({ difficulty }: { difficulty: QuestionDifficulty }) {
  // create a map of difficulty to number of stars
  const difficultyToStars = {
    BEGINNER: 1,
    EASY: 2,
    MEDIUM: 3,
    HARD: 4,
  };

  return (
    <div className="flex items-center gap-x-1">
      {Array.from({ length: difficultyToStars[difficulty] }).map((_, index) => (
        <Star3 key={index} fill="yellow" height="20" width="20" />
      ))}
    </div>
  );
}
