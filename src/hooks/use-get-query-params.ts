'use client'
import { useSearchParams } from 'next/navigation'

interface QueryParams {
  [key: string]: string
}

interface GetQueryParamsProps {
  keys?: string[]
}

/**
 * Custom hook to get query parameters from the URL.
 *
 * @param keys Optional list of keys to filter specific parameters.
 * @returns QueryParams
 */
export const useGetQueryParams = ({
  keys = [],
}: GetQueryParamsProps = {}): QueryParams => {
  const searchParams = useSearchParams()
  const searchParamsKeys = Array.from(searchParams.keys())

  if (!keys || keys.length === 0) {
    return Array.from(searchParams.entries()).reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {} as QueryParams)
  }

  const values: QueryParams = {}

  for (const key of searchParamsKeys) {
    const value = searchParams.get(key)
    if (value !== null && keys.includes(key)) {
      values[key] = value
    }
  }

  return values
}
