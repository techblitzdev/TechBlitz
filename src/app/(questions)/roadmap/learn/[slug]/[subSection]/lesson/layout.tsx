import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

// Actions & Utils
import { devLog } from '@/utils';
import { getUser } from '@/actions/user/authed/get-user';
import { userHasAnsweredAnyQuestion } from '@/utils/data/questions/user-has-answered-any-question';

// Components
import { Onborda, OnbordaProvider } from 'onborda';
import { steps } from '@/lib/onborda';
import { TourCard } from '@/components/app/shared/question/tour-card';
import { getStudyPath } from '@/utils/data/study-paths/get';

const UpgradeModal = dynamic(() => import('@/components/app/shared/upgrade/upgrade-modal'));

export default async function QuestionUidLayout({
  params,
  children,
}: {
  params: { slug: string; subSection: string };
  children: React.ReactNode;
}) {
  const { slug, subSection } = params;

  const studyPath = await getStudyPath(slug);

  if (!studyPath) {
    devLog(`[LAYOUT] REDIRECTING: Study path not found for slug ${slug}`);
    redirect('/coding-challenges');
  }

  // Get all question slugs (for the entire roadmap)
  let allQuestionSlugs: string[] = [];

  // Get question slugs specifically for the current subsection
  let subsectionQuestionSlugs: string[] = [];

  if (studyPath.overviewData) {
    // Collect all question slugs from sections and subsections (for the entire roadmap)
    Object.values(studyPath.overviewData || {}).forEach((section: any) => {
      // Add direct section question slugs if they exist
      if (section.questionSlugs) {
        allQuestionSlugs = [...allQuestionSlugs, ...section.questionSlugs];
      }

      // Add subsection question slugs if they exist
      if (section.subSections) {
        Object.values(section.subSections).forEach((subSection: any) => {
          if (subSection.questionSlugs) {
            allQuestionSlugs = [...allQuestionSlugs, ...subSection.questionSlugs];
          }
        });
      }
    });

    // Now get questions specifically for this subsection
    if (subSection === 'main') {
      // For 'main', include direct section questions only
      subsectionQuestionSlugs = Object.values(studyPath.overviewData)
        .flatMap((section: any) => section.questionSlugs || [])
        .filter(Boolean);
    } else {
      // For specific subsections, get questions from the matching subsection
      Object.values(studyPath.overviewData).forEach((section: any) => {
        if (section.subSections) {
          Object.values(section.subSections).forEach((sub: any) => {
            if (sub.sectionSlug === subSection) {
              subsectionQuestionSlugs = [...(sub.questionSlugs || [])];
            }
          });
        }
      });

      // If no subsection found with sectionSlug, try to find by key (for backward compatibility)
      if (subsectionQuestionSlugs.length === 0) {
        Object.values(studyPath.overviewData).forEach((section: any) => {
          if (section.subSections && section.subSections[subSection]) {
            subsectionQuestionSlugs = [...(section.subSections[subSection].questionSlugs || [])];
          }
        });
      }
    }
  } else {
    // Fall back to regular questionSlugs (no subsections)
    allQuestionSlugs = studyPath.questionSlugs || [];
    subsectionQuestionSlugs = allQuestionSlugs;
  }

  const [user, { answeredQuestionsCount }] = await Promise.all([
    getUser(),
    userHasAnsweredAnyQuestion({
      numberOfQuestions: 3,
    }),
  ]);

  return (
    <>
      <OnbordaProvider>
        <Onborda
          steps={steps()}
          showOnborda={true}
          shadowRgb="0,0,0"
          shadowOpacity="0.8"
          cardComponent={TourCard}
          cardTransition={{ duration: 0.3, type: 'tween' }}
        >
          <div style={{ opacity: 'var(--content-opacity)' }} className="relative">
            {children}
          </div>
          {/** shown every 3 questions */}
          {user?.userLevel === 'FREE' && answeredQuestionsCount % 3 === 0 && <UpgradeModal />}
        </Onborda>
      </OnbordaProvider>
    </>
  );
}
