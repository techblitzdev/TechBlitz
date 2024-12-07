/**
 * Method to get the current environment
 *
 * @returns 'development' | 'production' | 'test'
 */
export const getEnv = () => process.env.NODE_ENV;

export const getBaseUrl = () => {
  const publicRootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || '';
  return getEnv() === 'development'
    ? 'http://localhost:3005'
    : publicRootDomain;
};

export const capitalise = (string: string) => {
  if (!string) return '';
  // lowercase the whole string
  const lowercaseString = string?.toLowerCase();
  return lowercaseString[0]?.toUpperCase() + lowercaseString?.slice(1);
};

// border-green-500 border-yellow-500 border-red-500 text-green-500 text-yellow-500 text-red-500
export const getQuestionDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'EASY':
      return 'green-500';
    case 'MEDIUM':
      return 'yellow-500';
    case 'HARD':
      return 'red-500';
    default:
      return 'gray';
  }
};
