// next
import { revalidateTag } from 'next/cache';

// types
import type { StudyPathWithOverviewData } from '@/types/StudyPath';

// utils
import { prisma } from '@/lib/prisma';
import { getUser } from '@/actions/user/authed/get-user';
import { listQuestionsBySlugs } from '../questions/list';

/**
 * Category order configuration for displaying study paths on the roadmaps page
 * Add categories in the order you want them to appear
 */
export const categoryOrder = [
  'Career Paths',
  'Full-stack Development',
  'JavaScript',
  'React',
  'HTML',
  'CSS',
  'Misc',
];

/**
 * Get a study path by its slug
 * @param slug - The slug of the study path
 * @returns The study path
 */
export const getStudyPath = async (slug: string) => {
  return (await prisma.studyPath.findUnique({
    where: {
      slug,
    },
  })) as StudyPathWithOverviewData;
};

/**
 * Retrieve a single study path by its uid
 * @param uid - The uid of the study path
 * @returns The study path
 */
export const getStudyPathByUid = async (uid: string) => {
  return await prisma.studyPath.findUnique({
    where: {
      uid,
    },
  });
};

/**
 * Get all study paths ordered by creation date
 * @returns The study paths
 */
export const getAllStudyPaths = async () => {
  return await prisma.studyPath.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  });
};

/**
 * Get all study paths and group them by category
 * @returns The study paths grouped by category
 */
export const getStudyPathsAndGroupByCategory = async ({
  sortCategoryOrder = true,
}: {
  sortCategoryOrder?: boolean;
}): Promise<{
  categories: string[];
  studyPathsByCategory: Record<string, StudyPathWithOverviewData[]>;
}> => {
  const studyPaths = await getAllStudyPaths();

  if (!studyPaths) return { categories: [], studyPathsByCategory: {} };

  // group study paths by category
  const studyPathsByCategory: Record<string, typeof studyPaths> = studyPaths.reduce(
    (acc, studyPath) => {
      const category = studyPath.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(studyPath);
      return acc;
    },
    {} as Record<string, typeof studyPaths>
  );

  let sortedCategories: string[] = [];

  if (sortCategoryOrder) {
    // Sort categories according to the predefined order
    sortedCategories = Object.keys(studyPathsByCategory).sort((a, b) => {
      const indexA = categoryOrder.indexOf(a);
      const indexB = categoryOrder.indexOf(b);

      // If category is not in our predefined list, place it at the end
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;

      // Otherwise sort by the predefined order
      return indexA - indexB;
    });
  }

  return {
    categories: sortCategoryOrder ? sortedCategories : Object.keys(studyPathsByCategory),
    studyPathsByCategory: sortCategoryOrder
      ? Object.fromEntries(
          Object.entries(studyPathsByCategory).map(([category, paths]) => [
            category,
            paths as StudyPathWithOverviewData[],
          ])
        )
      : ({} as Record<string, StudyPathWithOverviewData[]>),
  };
};

export const getUserStudyPaths = async () => {
  const user = await getUser();
  return await prisma.userStudyPath.findMany({
    where: {
      userUid: user?.uid,
    },
    include: {
      studyPath: true,
    },
  });
};

export const getDashboardStudyPath = async () => {
  const user = await getUser();
  return await prisma.userStudyPath.findFirst({
    where: {
      userUid: user?.uid,
      AND: {
        progress: {
          lte: 100,
        },
        completedAt: null,
      },
    },
    include: {
      studyPath: true,
    },
  });
};

/**
 * Check if a user is enrolled in a study path
 * @param studyPathUid - The uid of the study path
 * @returns Whether the user is enrolled in the study path
 */
export const isUserEnrolledInStudyPath = async (studyPathUid: string) => {
  // Run these queries in parallel
  const [user, studyPath] = await Promise.all([
    getUser(),
    prisma.studyPath.findUnique({
      where: { uid: studyPathUid },
      select: { uid: true, slug: true }, // Only select needed fields
    }),
  ]);

  if (!user || !studyPath) return false;

  revalidateTag(`study-path-${studyPath.slug}`);

  // Check enrollment directly from prisma instead of filtering in memory
  const enrollment = await prisma.userStudyPath.findUnique({
    where: {
      userUid_studyPathUid: {
        userUid: user.uid,
        studyPathUid: studyPath.uid,
      },
    },
  });

  return enrollment;
};

/**
 * Method for extracting the questions from a study path and grouping them by section and sub-section
 * We also determine the % complete for each sub-section
 * We also determine which section/sub-section contains the first incomplete section
 *
 * @param studyPath - The study path to extract questions from
 * @returns The questions grouped by section and sub-section
 */
export const getAndGroupStudyPathQuestions = async ({
  studyPath,
  takeQuestions = false,
}: {
  studyPath: StudyPathWithOverviewData;
  takeQuestions?: boolean;
}) => {
  // we need the study path to extract the overview data
  if (!studyPath || !studyPath.overviewData) return [];

  // all of the data to drive the study path sections
  const overviewData = studyPath.overviewData;

  // Get all question slugs from the study path
  const allQuestionSlugs = new Set<string>();

  // Collect all question slugs from sections and subsections
  Object.values(overviewData).forEach((section) => {
    // Add direct section question slugs if they exist
    if (section.questionSlugs) {
      section.questionSlugs.forEach((slug) => {
        if (slug) allQuestionSlugs.add(slug);
      });
    }

    // Add subsection question slugs if they exist
    if (section.subSections) {
      Object.values(section.subSections).forEach((subSection) => {
        subSection.questionSlugs.forEach((slug) => {
          if (slug) allQuestionSlugs.add(slug);
        });
      });
    }
  });

  // Fetch all questions for the study path
  const questions = takeQuestions
    ? await listQuestionsBySlugs({
        questionSlugs: Array.from(allQuestionSlugs),
      })
    : [];

  // Find the first section with an incomplete subsection and the first incomplete subsection
  let firstSectionWithIncompleteSubSection: string | null = null;
  let firstIncompleteSubSection: string | null = null;

  // Process sections with their completion status
  const sections = Object.entries(overviewData).map(([key, section]) => {
    // Process direct section questions if they exist
    const sectionQuestions = section.questionSlugs
      ? section.questionSlugs.map((slug) => questions.find((q) => q.slug === slug)).filter(Boolean)
      : [];

    // Calculate section completion - count questions with correct answers
    const sectionAnsweredCount = sectionQuestions.filter(
      (q) =>
        q?.userAnswers &&
        q.userAnswers.length > 0 &&
        q.userAnswers.some((answer) => answer.correctAnswer === true)
    ).length;

    const sectionCompletionPercentage =
      sectionQuestions.length > 0
        ? Math.round((sectionAnsweredCount / sectionQuestions.length) * 100)
        : 0;

    // Find the next unanswered question index in the section
    const nextQuestionIndex = sectionQuestions.findIndex(
      (q, index) => index >= sectionAnsweredCount && (!q?.userAnswers || q.userAnswers.length === 0)
    );

    // Process subsections if they exist
    const subSections = section.subSections
      ? Object.entries(section.subSections).map(([subKey, subSection]) => {
          const subSectionQuestions = subSection.questionSlugs
            .map((slug) => questions.find((q) => q.slug === slug))
            .filter(Boolean);

          // Calculate subsection completion - ensure we're properly checking userAnswers
          const answeredCount = subSectionQuestions.filter(
            (q) =>
              q?.userAnswers &&
              q.userAnswers.length > 0 &&
              q.userAnswers.some((answer) => answer.correctAnswer === true)
          ).length;

          const completionPercentage =
            subSectionQuestions.length > 0
              ? Math.round((answeredCount / subSectionQuestions.length) * 100)
              : 0;

          // Check if this subsection is incomplete (less than 100% complete)
          const isIncomplete = completionPercentage < 100;

          console.log({
            ...subSectionQuestions,
          });

          // Find the next unanswered question index in this subsection
          const nextQuestionIndex = subSectionQuestions.findIndex(
            (q, index) =>
              index >= answeredCount &&
              (!q?.userAnswers ||
                q.userAnswers.length === 0 ||
                !q.userAnswers.some((a) => a.correctAnswer === true))
          );

          // If we haven't found the first incomplete subsection yet and this one is incomplete
          if (!firstIncompleteSubSection && isIncomplete && !firstSectionWithIncompleteSubSection) {
            firstSectionWithIncompleteSubSection = key;
            firstIncompleteSubSection = subKey;
          }

          return {
            key: subKey,
            ...subSection,
            questions: subSectionQuestions,
            completionPercentage,
            isIncomplete,
            nextQuestionIndex: nextQuestionIndex !== -1 ? nextQuestionIndex : null,
            isFirstIncompleteSubSection:
              firstIncompleteSubSection === subKey && firstSectionWithIncompleteSubSection === key,
          };
        })
      : [];

    // Check if this section is incomplete (less than 100% complete)
    const isSectionIncomplete = sectionCompletionPercentage < 100;

    // Find first incomplete subsection in this section
    const sectionFirstIncompleteSubSection =
      subSections.length > 0 ? subSections.find((sub) => sub.isIncomplete) : null;

    const data = {
      key,
      ...section,
      questions: sectionQuestions,
      firstIncompleteQuestionIndex: sectionQuestions.findIndex(
        (q, index) =>
          index >= sectionAnsweredCount &&
          (!q?.userAnswers ||
            q.userAnswers.length === 0 ||
            !q.userAnswers.some((a) => a.correctAnswer === true))
      ),
      nextQuestionIndex: nextQuestionIndex !== -1 ? nextQuestionIndex : null,
      subSections: subSections.length > 0 ? subSections : undefined,
      completionPercentage: sectionCompletionPercentage,
      isIncomplete: isSectionIncomplete,
      firstIncompleteSection: isSectionIncomplete
        ? sectionFirstIncompleteSubSection || { key, isMainSection: true }
        : null,
      isFirstIncompleteSection: key === firstSectionWithIncompleteSubSection,
    };

    return data;
  });

  return sections;
};
