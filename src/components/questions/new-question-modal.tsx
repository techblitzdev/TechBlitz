'use client';
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField } from '../ui/form';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newQuestionSchema } from '@/lib/zod/schemas/new-question-schema';
import { z } from 'zod';
import { InputWithLabel } from '@/components/ui/input-label';
import { toast } from 'sonner';
import { DatePicker } from '@/components/ui/date-picker';
import { formatISO } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { addQuestion } from '@/actions/questions/add';
import { useMutation } from '@tanstack/react-query';

import { LANGUAGE_OPTIONS } from '@/utils/constants/language-options';

const lowlight = createLowlight(common);

type SchemaProps = z.infer<typeof newQuestionSchema>;

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
        variant="default"
        size="sm"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'bg-black-50' : ''}
      >
        code block
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

export default function NewQuestionModal({ ...props }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'javascript',
      }),
    ],
    content: 'Enter code snippet here...',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      form.setValue('codeSnippet', html);
    },
  });

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
      toast.success('Question added successfully');
      form.reset();
      editor?.commands.setContent('');
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
      <DialogContent className="bg-black md:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add new Question</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleNewQuestion)}
              className="flex flex-col gap-y-4 !mt-6"
            >
              {/* Question */}
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormControl>
                    <InputWithLabel
                      label="Question"
                      type="text"
                      wrapperclassname="lg:w-96"
                      {...field}
                    />
                  </FormControl>
                )}
              />
              {/* TipTap Editor */}
              <FormField
                control={form.control}
                name="codeSnippet"
                render={({ field }) => (
                  <FormControl>
                    <div className="border border-black-50 rounded-md">
                      <MenuBar editor={editor} />
                      <EditorContent
                        editor={editor}
                        className="prose prose-invert max-w-none p-4 focus:border-none"
                        {...field}
                      />
                    </div>
                  </FormControl>
                )}
              />

              {/* Dynamic Answer Fields */}
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row md:items-center gap-4"
                >
                  <FormField
                    control={form.control}
                    name={`answers.${index}.text`}
                    render={({ field }) => (
                      <FormControl>
                        <InputWithLabel
                          label={`Answer ${index + 1}`}
                          type="text"
                          wrapperclassname="lg:w-96"
                          {...field}
                        />
                      </FormControl>
                    )}
                  />
                  <div className="w-full flex items-center justify-between self-end">
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
                    <Button
                      variant="destructive"
                      type="button"
                      onClick={() => remove(index)}
                      className="self-end"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}

              {/* Add New Answer Button */}
              <Button
                type="button"
                className="w-fit"
                onClick={() => append({ text: '' })}
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
              <Button type="submit" variant="secondary" disabled={isPending}>
                {isPending ? 'Adding...' : 'Add Question'}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
