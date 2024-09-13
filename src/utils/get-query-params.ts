import { useSearchParams } from 'next/navigation';

interface QueryParams {
  [key: string]: string;
}

interface GetQueryParamsProps {
  keys?: string[];
}

/**
 * Method to get all parameters in a query string.
 * (not to be confused with 'useQueryParams', which allows 
 *  you to set query params.)
 * 
 * @returns QueryParams
 */
export const getQueryParams = ({ keys = [] }: GetQueryParamsProps): QueryParams => {
  const searchParams = useSearchParams();
  const searchParamsKeys = Array.from(searchParams.keys());

  if (!keys || keys.length === 0) {
    return Array.from(searchParams.entries()).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as QueryParams);
  }

  const values: QueryParams = {};

  for (const key of searchParamsKeys) {
    const value = searchParams.get(key);
    if (value !== null && keys.includes(key)) {
      values[key] = value;
    }
  }
  return values;
};
