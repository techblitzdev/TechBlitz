import { NextRequest } from 'next/server';

/**
 * Checks if the request is authorized to run the cron job
 * @param request - The request to check
 * @returns True if the request is authorized, false otherwise
 */
export const isAuthorized = (request: NextRequest): boolean => {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) return true;

  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${process.env.CRON_SECRET}`;
};
