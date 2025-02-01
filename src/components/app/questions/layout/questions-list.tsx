import QuestionCard from "@/components/app/questions/layout/question-card";

import { listQuestions } from "@/utils/data/questions/list";

import { Button } from "@/components/ui/button";
import { useUserServer } from "@/hooks/use-user-server";
import { QuestionFilters } from "@/types/Filters";
import ClearFilters from "./clear-filters";
import { getSuggestions } from "@/utils/data/questions/get-suggestions";
import GlobalPagination from "../../shared/pagination";

export default async function QuestionsList({
  currentPage,
  filters,
  customQuestions = false,
  previousQuestions = false,
  showSubmissions = true,
  paginationUrl,
  postsPerPage = 15,
}: {
  currentPage: number;
  filters: QuestionFilters;
  customQuestions: boolean;
  previousQuestions?: boolean;
  showSubmissions?: boolean;
  paginationUrl: string;
  postsPerPage?: number;
}) {
  const user = await useUserServer();

  // if we are on custom questions and the user is not a premium user, show a message
  if (customQuestions && user && user.userLevel === "FREE") {
    return (
      <div className="flex flex-col gap-y-4 items-center justify-center mt-4">
        <p className="text-lg font-medium text-gray-400">
          Upgrade to Premium to access custom questions.
        </p>
        <div className="flex gap-x-2">
          <Button href="/questions">Back to all questions</Button>
          <Button href="https://dub.sh/upgrade-techblitz" variant="secondary">
            Upgrade
          </Button>
        </div>
      </div>
    );
  }

  const recommendedQuestion = await getSuggestions({ limit: 10 });

  // do the fetch after we know the user can access this
  const data = await listQuestions({
    page: currentPage,
    pageSize: postsPerPage,
    userUid: user?.uid || "",
    filters,
    customQuestions,
    previousQuestions,
  });

  if (!data.questions || data.questions.length === 0) {
    return (
      <div className="flex flex-col gap-y-4 items-center justify-center mt-4">
        <p className="text-lg font-medium text-gray-400">
          No questions match your filters.
        </p>
        <ClearFilters />
      </div>
    );
  }

  // if we are showing just recommended questions, just show the recommended questions
  if (filters.recommended) {
    return (
      <>
        {recommendedQuestion?.map((q) => (
          <QuestionCard
            key={q.uid}
            questionData={q}
            showSubmissions={showSubmissions}
            identifier={customQuestions ? "uid" : "slug"}
            customQuestion={customQuestions}
            user={user}
            recommendedQuestion={true}
          />
        ))}
      </>
    );
  }

  return (
    <>
      {data.questions.map((q) => (
        <QuestionCard
          key={q.uid}
          questionData={q}
          showSubmissions={showSubmissions}
          identifier={customQuestions ? "uid" : "slug"}
          customQuestion={customQuestions}
          user={user}
          recommendedQuestion={
            recommendedQuestion?.find((rq) => rq.uid === q.uid) ? true : false
          }
        />
      ))}
      {!customQuestions && data.totalPages > 1 && (
        <div className="mt-5 w-full flex justify-center gap-x-2">
          <GlobalPagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            href={paginationUrl}
            paramName="page"
            postsPerPage={postsPerPage}
          />
        </div>
      )}
    </>
  );
}
