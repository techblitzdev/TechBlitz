"use client";

import { CheckCircle2Icon, XCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingSpinner from "@/components/ui/loading";

export default function AnswerSubmittedForm(opts: {
  newUserData: {
    correct: boolean;
    message?: string;
  };
  nextQuestionIndex: number | null;
  roadmapUid: string;
}) {
  const { newUserData, nextQuestionIndex, roadmapUid } = opts;

  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  const handleNextQuestion = () => {
    if (redirecting) return;
    setRedirecting(true);

    // If no next question, redirect to generate page
    if (nextQuestionIndex === null) {
      router.push(`/roadmap/${roadmapUid}/onboarding/generate`);
      return;
    }

    // Redirect to next question
    router.push(`/roadmap/${roadmapUid}/onboarding/${nextQuestionIndex}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[25rem] p-6 text-center">
      <div className="bg-black-25 border border-black-50 rounded-xl p-8 shadow-lg text-center max-w-md w-full">
        {newUserData.correct ? (
          <div className="flex flex-col gap-y-4 items-center">
            <CheckCircle2Icon className="mx-auto text-green-500 size-16" />
            <h3 className="text-2xl font-semibold text-green-600">Correct!</h3>
            <p className="text-sm">
              {newUserData.message ||
                "Great job! You've answered the question correctly."}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-y-4 items-center">
            <XCircleIcon className="mx-auto text-red-500 size-16" />
            <h3 className="text-2xl font-semibold text-red-600">Incorrect</h3>
            <p className="text-sm">
              {newUserData.message ||
                "Don't worry, learning is a process. Keep trying!"}
            </p>
          </div>
        )}
        <div className="flex justify-center items-center gap-x-3 mt-4">
          <Button href="/dashboard" variant="secondary">
            Dashboard
          </Button>
          <Button
            variant="accent"
            onClick={() => handleNextQuestion()}
            type="button"
          >
            {redirecting ? <LoadingSpinner /> : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  );
}
