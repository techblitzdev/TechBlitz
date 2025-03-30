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
  const { studyPath, isLoading: isStudyPathLoading } = useStudyPath(studyPathSlug);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['study-path-questions', studyPathSlug],
    queryFn: async () => {
      if (!studyPath) {
        console.log('Study path not loaded yet, returning empty array');
        return [];
      }

      // determine if we're using the overview data or the question slugs
      let questionSlugs: string[] = [];

      try {
        if (studyPath.overviewData) {
          // If we have overviewData, extract questionSlugs from each section
          questionSlugs = Object.values(studyPath.overviewData)
            .flatMap((section: any) => section.questionSlugs || [])
            .filter(Boolean);

          console.log('Using overviewData questionSlugs:', questionSlugs.length);
        } else {
          // Fall back to regular questionSlugs
          questionSlugs = studyPath.questionSlugs || [];
          console.log('Using regular questionSlugs:', questionSlugs.length);
        }

        console.log('Study path slug:', studyPathSlug);
        console.log('Question slugs count:', questionSlugs.length);

        if (questionSlugs.length === 0) {
          console.log('No question slugs found, returning empty array');
          return [];
        }

        const questions = await getStudyPathQuestions({
          questionSlugs,
        });

        console.log('Loaded questions count:', questions.length);
        return questions;
      } catch (err) {
        console.error('Error processing study path questions:', err);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // data considered fresh for 5 minutes
    enabled: !!studyPath,
    retry: 1,
  });

  return {
    questions: data || [],
    isLoading: isLoading || isStudyPathLoading,
    isError,
    error,
  };
};
