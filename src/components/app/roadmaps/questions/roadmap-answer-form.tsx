"use client";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { answerQuestionSchema } from "@/lib/zod/schemas/answer-question-schema";
import { UserRecord } from "@/types/User";
import { RoadmapUserQuestions } from "@/types/Roadmap";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/components/ui/loading";
import CodeDisplay from "@/components/app/questions/single/layout/code-snippet";
import { useRoadmapQuestion } from "./[uid]/layout/roadmap-question-context";
import { cn } from "@/lib/utils";

type SchemaProps = z.infer<typeof answerQuestionSchema>;

interface AnswerQuestionFormProps {
  userData: UserRecord;
  question: RoadmapUserQuestions;
  roadmapUid: string;
}

const RoadmapAnswerQuestionForm = forwardRef<
  HTMLFormElement,
  AnswerQuestionFormProps
>(function RoadmapAnswerQuestionForm({ question }) {
  const { selectedAnswer, setSelectedAnswer, loading } = useRoadmapQuestion();

  const form = useForm<SchemaProps>({
    resolver: zodResolver(answerQuestionSchema),
    defaultValues: {
      answer: "",
    },
  });

  return (
    <Form {...form}>
      <form className="font-satoshi flex flex-col relative">
        {loading && (
          <div className="h-[25rem] absolute flex justify-center items-center w-full">
            <div className="gap-y-3 flex flex-col items-center">
              <LoadingSpinner />
              <p className="text-sm">Submitting</p>
            </div>
          </div>
        )}

        <p className="text-sm text-gray-400 font-light font-onest mt-3">
          Choose an option below
        </p>

        <div className="grid grid-cols-12 gap-4 pt-2">
          {question?.answers?.map((answer) => (
            <div key={answer.uid} className="col-span-full">
              <FormField
                name="answer"
                render={({ field }) => (
                  <FormControl>
                    <Label
                      htmlFor={answer.uid}
                      className={cn(
                        "px-2 lg:px-4 lg:py-2 rounded-lg min-h-16 w-full h-full flex items-center gap-x-2 cursor-pointer transition-colors border border-black-50",
                        selectedAnswer === answer.uid
                          ? "bg-black-25"
                          : "bg-black hover:border-accent",
                      )}
                      onClick={() => {
                        setSelectedAnswer(answer.uid);
                        field.onChange(answer.uid);
                      }}
                    >
                      <input
                        type="radio"
                        id={answer.uid}
                        className="hidden"
                        name="answer"
                        value={answer.uid}
                        checked={selectedAnswer === answer.uid}
                        onChange={() => {}}
                      />
                      {/<pre><code/.test(answer.answer) ? (
                        <CodeDisplay
                          content={answer.answer}
                          language="javascript"
                          hideIndex
                          backgroundColor="transparent"
                        />
                      ) : (
                        <p
                          className="text-sm"
                          dangerouslySetInnerHTML={{ __html: answer.answer }}
                        />
                      )}
                    </Label>
                  </FormControl>
                )}
              />
            </div>
          ))}
        </div>
      </form>
    </Form>
  );
});

export default RoadmapAnswerQuestionForm;
