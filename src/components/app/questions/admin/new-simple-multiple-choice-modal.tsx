'use client';
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';

// components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField } from '@/components/ui/form';
import { InputWithLabel } from '@/components/ui/input-label';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { TrashIcon } from 'lucide-react';

// react hook form
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// react query
import { useMutation } from '@tanstack/react-query';

// actions
import { addQuestion } from '@/actions/questions/add';

// constants
import { LANGUAGE_OPTIONS } from '@/utils/constants/language-options';

const lowlight = createLowlight(common);

// Define schema for the simple multiple choice question form
const simpleMultipleChoiceSchema = z.object({
  slug: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  answers: z
    .array(
      z.object({
        text: z.string().min(1, 'Answer is required'),
      })
    )
    .min(2, 'At least two answers are required'),
  correctAnswer: z.number().refine((val) => val >= 0, {
    message: 'Please select a correct answer',
  }),
  afterQuestionInfo: z.string().optional(),
  difficulty: z.enum(['BEGINNER', 'EASY', 'MEDIUM', 'HARD'], {
    required_error: 'Difficulty is required',
  }),
  tags: z.string().optional(),
});

type SchemaProps = z.infer<typeof simpleMultipleChoiceSchema>;

const MenuBar = ({ editor }: { editor: any }) => {
  const [currentLanguage, setCurrentLanguage] = React.useState('javascript');

  if (!editor) {
    return null;
  }

  return (
    <div className="border-b border-black-50 p-2 flex items-center gap-2 flex-wrap">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-black-50' : ''}
      >
        bold
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-black-50' : ''}
      >
        italic
      </Button>
      <Button
        type="button"
        variant="default"
        size="sm"
        onClick={() => {
          editor.chain().focus().toggleCodeBlock().run();
        }}
        className={editor.isActive('codeBlock') ? 'bg-black-50' : ''}
      >
        Code block
      </Button>
      {editor.isActive('codeBlock') && (
        <Select
          value={currentLanguage}
          onValueChange={(value) => {
            setCurrentLanguage(value);
            editor.chain().focus().setCodeBlock({ language: value }).run();
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent className="h-auto">
            {LANGUAGE_OPTIONS.map((lang) => (
              <SelectItem key={lang.language} value={lang.language}>
                {lang.config.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default function NewSimpleMultipleChoiceModal({ ...props }) {
  const afterQuestionInfoEditor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'javascript',
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      form.setValue('afterQuestionInfo', html);
    },
  });

  const form = useForm<SchemaProps>({
    resolver: zodResolver(simpleMultipleChoiceSchema),
    defaultValues: {
      slug: '',
      title: '',
      answers: [{ text: '' }, { text: '' }],
      correctAnswer: 0,
      afterQuestionInfo: '',
      difficulty: 'EASY',
      tags: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'answers',
  });

  const toggleCorrectAnswer = (index: number) => form.setValue('correctAnswer', index);

  const { mutateAsync: server_addQuestion, isPending } = useMutation({
    mutationFn: async (values: SchemaProps) => {
      const { answers, correctAnswer, slug, afterQuestionInfo, tags, ...rest } = values;

      console.log('adding new question', values);

      try {
        const response = await addQuestion({
          ...rest,
          question: rest.title, // For simple multiple choice, title acts as the question
          answers: answers.map((answer) => ({
            text: answer.text,
            isCodeSnippet: false,
            answerFullSnippet: '',
          })),
          correctAnswer: Number(correctAnswer),
          tags: tags ? tags.split(',').map((tag) => tag.trim()) : [],
          afterQuestionInfo: afterQuestionInfo || undefined,
          slug: slug || undefined,
          questionType: 'SIMPLE_MULTIPLE_CHOICE', // Pass this as a string rather than enum
        });

        console.log('Server response from addQuestion:', response);

        if (response !== 'ok') {
          throw new Error(response);
        }

        return response;
      } catch (error) {
        console.error('Error in mutation function:', error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success('Simple multiple choice question added successfully');
      form.reset();
      form.setValue('tags', '');
      afterQuestionInfoEditor?.commands.setContent('');
      setOpen(false);
    },
    onError: (error) => {
      console.error('Mutation error:', error);
      toast.error(
        `Failed to add question: ${error instanceof Error ? error.message : String(error)}`
      );
    },
  });

  const handleNewQuestion = async (values: SchemaProps) => {
    try {
      console.log('Form values submitted:', values);

      // Additional validation before submission
      if (values.correctAnswer < 0 || values.correctAnswer >= values.answers.length) {
        toast.error(`Invalid correct answer selection: ${values.correctAnswer}`);
        return;
      }

      // Check if answers contain empty values
      if (values.answers.some((a) => !a.text.trim())) {
        toast.error('All answers must have content');
        return;
      }

      // Check if title is empty
      if (!values.title.trim()) {
        toast.error('Question title cannot be empty');
        return;
      }

      const result = await server_addQuestion(values);
      console.log('Server response:', result);
      return result;
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(`Submission error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Add state to control dialog open/close
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button {...props} onClick={() => setOpen(true)}>
          Create Simple Multiple Choice
        </Button>
      </DialogTrigger>
      <DialogContent
        className="bg-black-75 md:max-w-7xl max-h-[1000px] overflow-y-scroll"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Add new Simple Multiple Choice Question
            <Separator className="bg-black-50 mt-2" />
          </DialogTitle>
          <Form {...form}>
            <form
              onSubmit={(e) => {
                console.log('Form submitted', form.getValues());
                console.log('Form errors:', form.formState.errors);
                form.handleSubmit(handleNewQuestion)(e);
              }}
              className="flex flex-col gap-y-4 !mt-6"
            >
              {/* Display form errors if any */}
              {Object.keys(form.formState.errors).length > 0 && (
                <div className="bg-red-900/40 border border-red-700 p-4 rounded-md mb-4">
                  <h3 className="text-red-300 font-semibold mb-2">
                    Please fix the following errors:
                  </h3>
                  <ul className="list-disc pl-4 text-red-200">
                    {Object.entries(form.formState.errors).map(([field, error]) => (
                      <li key={field}>
                        {field}: {error?.message?.toString()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col gap-4">
                {/* Slug */}
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormControl>
                      <InputWithLabel
                        label="Slug (optional - will be auto-generated if empty)"
                        type="text"
                        wrapperclassname="lg:w-96"
                        {...field}
                      />
                    </FormControl>
                  )}
                />

                {/* Title (acts as the question) */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormControl>
                      <InputWithLabel
                        label="Title/Question"
                        type="text"
                        wrapperclassname="lg:w-full"
                        {...field}
                      />
                    </FormControl>
                  )}
                />

                {/* Difficulty */}
                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormControl>
                      <div className="flex flex-col gap-1.5">
                        <Label>Difficulty</Label>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BEGINNER">Beginner</SelectItem>
                            <SelectItem value="EASY">Easy</SelectItem>
                            <SelectItem value="MEDIUM">Medium</SelectItem>
                            <SelectItem value="HARD">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                  )}
                />
              </div>

              <Separator className="bg-black-50" />

              <p className="text-white font-semibold text-xl">Multiple Choice Answers</p>

              {/* Answer Fields */}
              {fields.map((item, index) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <FormField
                    control={form.control}
                    name={`answers.${index}.text`}
                    render={({ field }) => (
                      <FormControl>
                        <InputWithLabel
                          label={`Answer ${index + 1}`}
                          type="text"
                          wrapperclassname="lg:w-96 flex-1"
                          {...field}
                        />
                      </FormControl>
                    )}
                  />
                  <div className="flex gap-2 items-center h-full pt-6">
                    <Button
                      type="button"
                      onClick={() => toggleCorrectAnswer(index)}
                      variant={index === form.watch('correctAnswer') ? 'default' : 'secondary'}
                      className="h-10"
                    >
                      {index === form.watch('correctAnswer')
                        ? '✓ Correct Answer'
                        : 'Mark as Correct'}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      variant="ghost"
                      className="h-10"
                      disabled={fields.length <= 2}
                    >
                      <TrashIcon className="size-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}

              {/* Add Answer Button */}
              <Button type="button" className="w-fit" onClick={() => append({ text: '' })}>
                Add Answer Option
              </Button>

              <Separator className="bg-black-50" />

              <p className="text-white font-semibold text-xl">Additional Information</p>

              {/* After Question Info Editor */}
              <div className="space-y-2">
                <Label>Explanation (shown after answering)</Label>
                <div className="border border-black-50 rounded-md">
                  <MenuBar editor={afterQuestionInfoEditor} />
                  <EditorContent
                    editor={afterQuestionInfoEditor}
                    className="prose prose-invert max-w-none p-4"
                  />
                </div>
              </div>

              {/* Tags */}
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormControl>
                    <InputWithLabel
                      label="Tags (comma separated)"
                      type="text"
                      wrapperclassname="lg:w-96"
                      {...field}
                    />
                  </FormControl>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" variant="secondary" disabled={isPending} className="mt-4">
                {isPending ? 'Adding...' : 'Add Simple Multiple Choice Question'}
              </Button>

              {/* Test button to directly call server action */}
              <Button
                type="button"
                onClick={async () => {
                  try {
                    const testResult = await addQuestion({
                      question: 'Test question',
                      title: 'Test title',
                      answers: [
                        { text: 'Answer 1', isCodeSnippet: false },
                        { text: 'Answer 2', isCodeSnippet: false },
                      ],
                      correctAnswer: 0,
                      tags: [],
                      difficulty: 'EASY',
                      questionType: 'SIMPLE_MULTIPLE_CHOICE',
                    });
                    console.log('Test addQuestion result:', testResult);
                    toast.success('Test question added successfully');
                  } catch (error) {
                    console.error('Test addQuestion error:', error);
                    toast.error(
                      `Test failed: ${error instanceof Error ? error.message : String(error)}`
                    );
                  }
                }}
                variant="outline"
                className="mt-2"
              >
                Test Direct Server Action
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
