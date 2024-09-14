'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { addQuestion } from '@/actions/questions/add';
import { Form, FormControl, FormField } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newQuestionSchema } from '@/lib/zod/schemas/new-question-schema';
import { z } from 'zod';
import { InputWithLabel } from '@/components/ui/input-label';
import { toast } from 'sonner';

type SchemaProps = z.infer<typeof newQuestionSchema>;

export default function NewQuestionModal({ ...props }) {
  const form = useForm<SchemaProps>({
    resolver: zodResolver(newQuestionSchema),
    defaultValues: {
      answer: '',
      question: '',
      questionDate: new Date().toISOString(),
    },
  });

  const {
    mutateAsync: server_addQuestion,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (values: SchemaProps) => addQuestion({ ...values }),
    onSuccess: () => {
      toast.success('Question added successfully');

      form.reset();
    },
    onError: () => {
      toast.error('Failed to add question');
    },
  });

  const handleNewQuestion = async (values: SchemaProps) => {
    await server_addQuestion(values);
  };

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
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormControl>
                    <InputWithLabel label="Question" type="text" {...field} />
                  </FormControl>
                )}
              />
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormControl>
                    <InputWithLabel label="Answer" type="text" {...field} />
                  </FormControl>
                )}
              />
              <FormField
                control={form.control}
                name="questionDate"
                render={({ field }) => (
                  <FormControl>
                    <InputWithLabel
                      label="Question Date"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                )}
              />

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
