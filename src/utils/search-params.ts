import { QuestionFilters } from '@/types/Filters'
import { QuestionDifficulty } from '@/types/Questions'

export const parseSearchParams = (searchParams: {
  [key: string]: string | string[] | undefined
}): QuestionFilters => {
  return {
    page: parseInt(searchParams.page as string) || 1,
    ascending: searchParams.ascending === 'true',
    difficulty: searchParams.difficulty as QuestionDifficulty,
    answered:
      'answered' in searchParams ? searchParams.answered === 'true' : undefined,
    tags: (searchParams.tags as string)?.split(',').filter(Boolean) || [],
    questionType: searchParams.questionType as string,
    sortBy: searchParams.sortBy as 'date' | 'submissions',
    postsPerPage: parseInt(searchParams.postsPerPage as string) || 15,
    bookmarked: searchParams.bookmarked === 'true',
    isPremiumQuestion: searchParams.isPremiumQuestion === 'true',
    recommended: searchParams.recommended === 'true',
  }
}

export const validateSearchParams = (params: QuestionFilters): boolean => {
  if (params.page && params.page < 1) return false
  return true
}
