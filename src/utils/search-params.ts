import { QuestionDifficulty } from '@/types/Questions';

export interface FilterParams {
  page: number;
  ascending: boolean;
  difficulty?: QuestionDifficulty;
  completed?: boolean;
  tags: string[];
}

export const parseSearchParams = (searchParams: {
  [key: string]: string | string[] | undefined;
}): FilterParams => {
  return {
    page: parseInt(searchParams.page as string) || 1,
    ascending: searchParams.ascending === 'true',
    difficulty: searchParams.difficulty as QuestionDifficulty,
    completed:
      'completed' in searchParams
        ? searchParams.completed === 'true'
        : undefined,
    tags: (searchParams.tags as string)?.split(',').filter(Boolean) || [],
  };
};

export const validateSearchParams = (params: FilterParams): boolean => {
  if (params.page < 1) return false;
  return true;
};

export const buildSearchParams = (
  params: Partial<FilterParams>
): URLSearchParams => {
  const searchParams = new URLSearchParams();

  if (params.page && params.page > 1) {
    searchParams.set('page', params.page.toString());
  }
  if (params.ascending !== undefined) {
    searchParams.set('ascending', params.ascending.toString());
  }
  if (params.difficulty) {
    searchParams.set('difficulty', params.difficulty);
  }
  if (params.completed !== undefined) {
    searchParams.set('completed', params.completed.toString());
  }
  if (params.tags?.length) {
    searchParams.set('tags', params.tags.join(','));
  }

  return searchParams;
};
