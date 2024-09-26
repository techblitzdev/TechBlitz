/**
 * Method to get the current environment
 *
 * @returns 'development' | 'production' | 'test'
 */
export const getEnv = () => process.env.NODE_ENV;

export const getBaseUrl = () => {
  const publicRootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || '';
  return getEnv() === 'development'
    ? 'http://localhost:3000'
    : publicRootDomain;
};
