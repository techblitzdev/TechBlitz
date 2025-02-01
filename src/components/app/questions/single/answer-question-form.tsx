"use client";

import { forwardRef, useEffect } from "react";

// components
import { Form, FormControl, FormField } from "@/components/ui/form";
import LoadingSpinner from "@/components/ui/loading";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import CodeDisplay from "@/components/app/questions/single/layout/code-snippet";
import { useQuestionSingle } from "./layout/question-single-context";

// zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { answerQuestionSchema } from "@/lib/zod/schemas/answer-question-schema";

export type SchemaProps = z.infer<typeof answerQuestionSchema>;
type AnswerQuestionFormProps = {
  time: number;
};

const AnswerQuestionForm = forwardRef(function AnswerQuestionForm({
  time,
}: AnswerQuestionFormProps) {
  const {
    question,
    isSubmitting,
    userAnswer,
    selectedAnswer,
    setTimeTaken,
    setSelectedAnswer,
  } = useQuestionSingle();

  const form = useForm<SchemaProps>({
    resolver: zodResolver(answerQuestionSchema),
    defaultValues: {
      answer: "",
    },
  });

  // reset the selected answer when the userAnswer changes
  useEffect(() => {
    if (userAnswer) {
      form.reset();
      setSelectedAnswer("");
    }
  }, [userAnswer, setSelectedAnswer, form]);

  return (
    <Form {...form}>
      <form className="font-inter flex flex-col relative">
        {isSubmitting && (
          <div className="h-[25rem] absolute flex justify-center items-center w-full z-50">
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
                control={form.control}
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
                        isSubmitting ? "opacity-50 cursor-not-allowed" : "",
                      )}
                      onClick={() => {
                        !isSubmitting && field.onChange(answer.uid);
                        setSelectedAnswer(answer.uid);
                        setTimeTaken(time);
                      }}
                    >
                      <input
                        type="radio"
                        id={answer.uid}
                        className="hidden"
                        name="answer"
                        value={answer.uid}
                        checked={field.value === answer.uid}
                        onChange={() => {
                          setSelectedAnswer(answer.uid);
                        }}
                        disabled={isSubmitting}
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

export default AnswerQuestionForm;
