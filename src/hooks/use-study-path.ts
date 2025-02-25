import { getQuestions } from '@/actions/questions/admin/list';
import { getStudyPathPost, getStudyPathQuestions } from '@/actions/study-paths/get';
import { useQuery } from '@tanstack/react-query';

export const useStudyPath = (studyPathSlug: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['study-path', studyPathSlug],
    queryFn: async () => {
      const studyPath = await getStudyPathPost(studyPathSlug || '');
      return studyPath;
    },
    enabled: !!studyPathSlug,
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
  });

  return {
    studyPath: data,
    isLoading,
    isError,
    error,
  };
};

export const useStudyPathQuestions = (studyPathSlug: string) => {
  const { studyPath } = useStudyPath(studyPathSlug);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['study-path-questions', studyPathSlug],
    queryFn: async () => {
      const questions = await getStudyPathQuestions({
        questionSlugs: studyPath?.questionSlugs || [],
      });
      return questions;
    },
    staleTime: 5 * 60 * 1000, // data considered fresh for 5 minutes
  });

  return {
    questions: data,
    isLoading,
    isError,
    error,
  };
};
