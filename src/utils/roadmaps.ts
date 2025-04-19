import { UserRecord } from '@/types/User';
import { StudyPath } from '@prisma/client';

interface GetRecommendedCompletionDateProps {
  user: UserRecord | null;
  studyPath: StudyPath;
}

/**
 * Get the recommended completion date for a study path based on user preferences and study path length.
 * Takes into account:
 * - User's preferred daily study time
 * - User's experience level
 * - Total number of questions
 * - Average time per question based on difficulty
 *
 * @param user - The user to get the recommended completion date for
 * @param studyPath - The study path to get the recommended completion date for
 * @returns The recommended completion date
 */
export const getRecommendedCompletionDate = ({
  user,
  studyPath,
}: GetRecommendedCompletionDateProps) => {
  // get user preferences with defaults
  const userTimePerDay = user?.timeSpendingPerDay || 'LESS_THAN_5_MINUTES';
  const userSkillLevel = user?.experienceLevel || 'BEGINNER';
  const totalQuestions = studyPath.questionSlugs.length;

  // minutes per day based on user preference
  const minutesPerDayMap: Record<string, number> = {
    LESS_THAN_5_MINUTES: 5,
    '5_TO_15_MINUTES': 15,
    '15_TO_30_MINUTES': 30,
    '30_MINUTES_OR_MORE': 45,
  };

  // difficulty multiplier based on skill level
  const skillLevelMultiplier = {
    BEGINNER: 1.5,
    INTERMEDIATE: 1,
    ADVANCED: 0.75,
  };

  // average minutes per question based on difficulty
  const avgMinutesPerQuestion = 5;

  // minutes per day the user will spend - default to 5 minutes if preference not found
  const minutesPerDay = minutesPerDayMap[userTimePerDay] || 5;

  // calculate total minutes needed
  const totalMinutesNeeded =
    totalQuestions *
    avgMinutesPerQuestion *
    skillLevelMultiplier[userSkillLevel as keyof typeof skillLevelMultiplier];

  // calculate days needed
  const daysNeeded = Math.ceil(totalMinutesNeeded / minutesPerDay);

  // calculate completion date
  const recommendedCompletionDate = new Date();
  recommendedCompletionDate.setDate(recommendedCompletionDate.getDate() + daysNeeded);

  return recommendedCompletionDate;
};

const buttonColorMap = {
  completed: {
    base: 'bg-green-500',
    '3dShade': 'bg-green-600',
    hover: 'bg-green-600',
    active: 'bg-green-700',
    boxShadow: '[box-shadow:0_8px_0_0_#16a34a,0_9px_0_0_#16a34a]',
  },
  inProgress: {
    base: 'bg-[#191919]',
    '3dShade': 'bg-[#0e0e0e]',
    hover: 'bg-black-100',
    active: 'bg-black-100',
    boxShadow: '[box-shadow:0_8px_0_0_#0e0e0e,0_9px_0_0_#0e0e0e]',
  },
  nextUp: {
    base: 'bg-[#191919]',
    '3dShade': 'bg-accent/80',
    hover: 'bg-black-100',
    active: 'bg-black-100',
    boxShadow: '[box-shadow:0_8px_0_0_#7c3aed,0_9px_0_0_#7c3aed]',
  },
  notStarted: {
    base: 'bg-[#191919]',
    '3dShade': 'bg-[#0e0e0e]',
    hover: 'bg-black-100',
    active: 'bg-black-100',
    boxShadow: '[box-shadow:0_8px_0_0_#0e0e0e,0_9px_0_0_#0e0e0e]',
  },
};

export const getButtonStyle = ({
  completionPercentage,
  isFirstIncomplete,
}: {
  completionPercentage: number;
  isFirstIncomplete: boolean;
}) => {
  if (completionPercentage === 100) {
    return buttonColorMap.completed;
  }

  if (isFirstIncomplete) {
    return buttonColorMap.nextUp;
  }

  if (completionPercentage > 0) {
    return buttonColorMap.inProgress;
  }

  return buttonColorMap.notStarted;
};

// Internal calculation function based on provided parameters
export const getOffset = (
  index: number,
  offsetType: 'sine' | 'linear' | 'none',
  offsetMultiplier: number
) => {
  switch (offsetType) {
    case 'sine':
      return Math.sin(index * 2.5) * 25 * offsetMultiplier;
    case 'linear':
      return (index % 2 === 0 ? 1 : -1) * 20 * offsetMultiplier;
    case 'none':
    default:
      return 0;
  }
};
