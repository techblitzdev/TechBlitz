'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { addQuestion } from '@/actions/questions/add';
import { Form, FormControl, FormField } from '../ui/form';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newQuestionSchema } from '@/lib/zod/schemas/new-question-schema';
import { z } from 'zod';
import { InputWithLabel } from '@/components/ui/input-label';
import { toast } from 'sonner';
import { DatePicker } from '@/components/ui/date-picker';
import { formatISO } from 'date-fns';

type SchemaProps = z.infer<typeof newQuestionSchema>;

export default function NewQuestionModal({ ...props }) {
  const form = useForm<SchemaProps>({
    resolver: zodResolver(newQuestionSchema),
    defaultValues: {
      question: '',
      questionDate: new Date().toISOString(),
      answers: [{ text: '' }],
      correctAnswer: null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'answers',
  });

  const toggleCorrectAnswer = (index: number) => {
    form.setValue('correctAnswer', index);
  };

  const { mutateAsync: server_addQuestion, isPending } = useMutation({
    mutationFn: (values: SchemaProps) => {
      const { answers, ...rest } = values;
      const answerTexts = answers.map((answer) => answer.text);
      return addQuestion({
        ...rest,
        answers: answerTexts,
        correctAnswer: Number(rest.correctAnswer),
      });
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success('Question added successfully');
      form.reset();
    },
    onError: () => {
      toast.error('Failed to add question');
    },
  });

  const handleNewQuestion = async (values: SchemaProps) =>
    await server_addQuestion(values);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...props}>Create New Question</Button>
      </DialogTrigger>
      <DialogContent className="bg-black">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add new Question</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleNewQuestion)}
              className="flex flex-col gap-y-4 !mt-6"
            >
              {/* Main Question Field */}
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormControl>
                    <InputWithLabel label="Question" type="text" {...field} />
                  </FormControl>
                )}
              />

              {/* Dynamic Answer Fields */}
              {fields.map((item, index) => (
                <div key={item.id} className="flex items-center gap-x-4">
                  <FormField
                    control={form.control}
                    name={`answers.${index}.text`}
                    render={({ field }) => (
                      <FormControl>
                        <InputWithLabel
                          label={`Answer ${index + 1}`}
                          type="text"
                          {...field}
                        />
                      </FormControl>
                    )}
                  />
                  {/** Mark as correct answer */}
                  <Button
                    variant="default"
                    type="button"
                    className="self-end"
                    onClick={() => toggleCorrectAnswer(index)}
                  >
                    {index === form.watch('correctAnswer') &&
                    form.watch('correctAnswer') !== null
                      ? '✅'
                      : 'Mark as correct'}
                  </Button>
                  {/* Remove Button */}
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => remove(index)}
                    className="self-end"
                  >
                    Remove
                  </Button>
                </div>
              ))}

              {/* Add New Answer Button */}
              <Button
                type="button"
                className="w-fit"
                onClick={() => append({ text: '' })} // Append a new empty answer
              >
                Add Answer
              </Button>

              {/* Question Date */}
              <FormField
                control={form.control}
                name="questionDate"
                render={({ field }) => (
                  <FormControl>
                    <DatePicker
                      date={field.value ? new Date(field.value) : undefined}
                      setDate={(date) =>
                        form.setValue(
                          'questionDate',
                          date ? formatISO(date) : ''
                        )
                      }
                    />
                  </FormControl>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="bg-blue-500 text-white"
                disabled={isPending}
              >
                {isPending ? 'Adding...' : 'Add Question'}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
