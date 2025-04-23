'use client';
import React from 'react';

// tip tap
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
import { DatePicker } from '@/components/ui/date-picker';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
const lowlight = createLowlight(common);
import { TrashIcon } from 'lucide-react';

// react hook form
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newQuestionSchema } from '@/lib/zod/schemas/new-question-schema';
import { z } from 'zod';
import { formatISO } from 'date-fns';

// react query
import { useMutation } from '@tanstack/react-query';

// actions
import { addQuestion } from '@/actions/questions/add';

// constants
import { LANGUAGE_OPTIONS } from '@/utils/constants/language-options';
import type { QuestionDifficulty } from '@/types';

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

const AnswerEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'javascript',
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html); // Update the form value with the editor's content
    },
  });

  return (
    <div className="border border-black-50 rounded-md">
      {/* Menu Bar */}
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="prose prose-invert max-w-none p-4" />
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
    content: '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      form.setValue('codeSnippet', html);
    },
  });

  const form = useForm<SchemaProps>({
    resolver: zodResolver(newQuestionSchema),
    defaultValues: {
      title: '',
      description: '',
      question: '',
      questionDate: '',
      answers: [
        { text: '', isCodeSnippet: false, answerFullSnippet: '' },
        { text: '', isCodeSnippet: false, answerFullSnippet: '' },
        { text: '', isCodeSnippet: false, answerFullSnippet: '' },
        { text: '', isCodeSnippet: false, answerFullSnippet: '' },
      ],
      correctAnswer: null,
      codeSnippet: '',
      hint: '',
      dailyQuestion: false,
      tags: '',
      isRoadmapQuestion: false,
      aiTitle: undefined,
      difficulty: 'EASY',
      questionResources: [
        {
          title: '',
          url: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'answers',
  });

  const {
    fields: resourceFields,
    append: appendResource,
    remove: removeResource,
  } = useFieldArray({
    control: form.control,
    name: 'questionResources',
  });

  const toggleCorrectAnswer = (index: number) => form.setValue('correctAnswer', index);

  const { mutateAsync: server_addQuestion, isPending } = useMutation({
    mutationFn: (values: SchemaProps) => {
      const { answers, ...rest } = values;
      const answerFullSnippets = answers.map((answer) => answer.answerFullSnippet);

      return addQuestion({
        ...rest,
        answers: answers.map((answer) => ({
          text: answer.text,
          isCodeSnippet: answer.isCodeSnippet,
          answerFullSnippet: answer.answerFullSnippet,
          answerType: answerFullSnippets.length > 0 ? 'PREFILL' : 'STANDARD',
        })),
        correctAnswer: Number(rest.correctAnswer),
        tags: rest.tags ? rest.tags.split(',').map((tag) => tag.trim()) : [],
        aiTitle: rest.aiTitle || undefined,
        difficulty: rest.difficulty as QuestionDifficulty,
      });
    },
    onSuccess: () => {
      toast.success('Question added successfully');
      form.reset();
      form.setValue('tags', '');
      editor?.commands.setContent('');
    },
    onError: () => {
      toast.error('Failed to add question');
    },
  });

  const showAiTitleField = form.watch('isRoadmapQuestion') && !form.watch('dailyQuestion');

  const handleNewQuestion = async (values: SchemaProps) => await server_addQuestion(values);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...props}>Create New Question</Button>
      </DialogTrigger>
      <DialogContent className="bg-black-75 md:max-w-7xl max-h-[1000px] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Add new Question
            <Separator className="bg-black-50 mt-2" />
          </DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleNewQuestion)}
              className="flex flex-col gap-y-4 !mt-6"
            >
              <div className="flex gap-4 items-end">
                <div className="flex flex-col gap-2">
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
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormControl>
                        <InputWithLabel
                          label="Title"
                          type="text"
                          wrapperclassname="lg:w-96"
                          {...field}
                        />
                      </FormControl>
                    )}
                  />
                </div>
                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormControl>
                      <InputWithLabel
                        label="Description"
                        type="text"
                        wrapperclassname="lg:w-96"
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
                    </FormControl>
                  )}
                />
                {/* Question Date */}
                {form.watch('dailyQuestion') && (
                  <FormField
                    control={form.control}
                    name="questionDate"
                    render={({ field }) => (
                      <FormControl>
                        <DatePicker
                          date={field.value ? new Date(field.value) : undefined}
                          setDate={(date) =>
                            form.setValue('questionDate', date ? formatISO(date) : '')
                          }
                        />
                      </FormControl>
                    )}
                  />
                )}
              </div>
              {/* TipTap Editor for Code Snippet */}
              <FormField
                control={form.control}
                name="codeSnippet"
                render={({ field }) => (
                  <FormControl>
                    <div className="space-y-1">
                      <p className="text-sm">Code Block</p>
                      <div className="border border-black-50 rounded-md">
                        <MenuBar editor={editor} />
                        <EditorContent
                          editor={editor}
                          className="prose prose-invert max-w-none p-4 focus:border-none"
                          {...field}
                        />
                      </div>
                    </div>
                  </FormControl>
                )}
              />

              <div className="flex gap-4 items-end">
                <FormField
                  control={form.control}
                  name="hint"
                  render={({ field }) => (
                    <FormControl>
                      <InputWithLabel
                        label="Hint"
                        type="text"
                        wrapperclassname="lg:w-96"
                        {...field}
                      />
                    </FormControl>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dailyQuestion"
                  render={({ field }) => (
                    <FormControl>
                      <div className="flex items-center gap-1 mb-1">
                        <Switch
                          id="dailyQuestion"
                          checked={field.value || false}
                          onCheckedChange={field.onChange}
                        />
                        <Label htmlFor="dailyQuestion">Daily Question?</Label>
                      </div>
                    </FormControl>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isRoadmapQuestion"
                  render={({ field }) => (
                    <FormControl>
                      <div className="flex items-center gap-1 mb-1">
                        <Switch
                          id="isRoadmapQuestion"
                          checked={field.value || false}
                          onCheckedChange={field.onChange}
                        />
                        <Label htmlFor="isRoadmapQuestion">Roadmap Question?</Label>
                      </div>
                    </FormControl>
                  )}
                />
              </div>
              {/* AI Title Field */}
              {showAiTitleField && (
                <FormField
                  control={form.control}
                  name="aiTitle"
                  render={({ field }) => (
                    <FormControl>
                      <InputWithLabel
                        label="AI Title"
                        type="text"
                        wrapperclassname="lg:w-96"
                        {...field}
                      />
                    </FormControl>
                  )}
                />
              )}

              <Separator className="bg-black-50" />

              <p className="text-white font-semibold text-xl">Answers</p>

              {/* Dynamic Answer Fields with TipTap Editor */}
              {fields.map((item, index) => (
                <div key={item.id} className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <AnswerEditor
                      value={item.text} // Set initial value
                      onChange={(value) => form.setValue(`answers.${index}.text`, value)} // Update the form field
                    />
                  </div>
                  <div className="flex-1">
                    <AnswerEditor
                      value={item.text} // Set initial value
                      onChange={(value) =>
                        form.setValue(`answers.${index}.answerFullSnippet`, value)
                      } // Update the form field
                    />
                  </div>
                  <div className="flex gap-4 items-center justify-between">
                    <Button
                      type="button"
                      onClick={() => toggleCorrectAnswer(index)}
                      className="btn"
                    >
                      {index === form.watch('correctAnswer') && form.watch('correctAnswer') !== null
                        ? '✅'
                        : 'Mark as correct'}
                    </Button>
                    <Button type="button" onClick={() => remove(index)} className="btn">
                      <TrashIcon className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
              {/* Add New Answer Button */}
              <Button
                type="button"
                className="w-fit"
                onClick={() =>
                  append({
                    text: '',
                    isCodeSnippet: false,
                    answerFullSnippet: '',
                  })
                }
              >
                Add Answer
              </Button>

              <Separator className="bg-black-50" />

              <p className="text-white font-semibold text-xl">Tags</p>

              {/* Tags */}
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormControl>
                    <InputWithLabel
                      label="Tags"
                      type="text"
                      wrapperclassname="lg:w-96"
                      {...field}
                    />
                  </FormControl>
                )}
              />

              <Separator className="bg-black-50" />

              <p className="text-white font-semibold text-xl">Resources</p>

              {/* Resources */}
              {resourceFields.map((item, index) => (
                <div key={item.id} className="flex gap-4 items-end">
                  <FormField
                    control={form.control}
                    name={`questionResources.${index}.title`}
                    render={({ field }) => (
                      <FormControl>
                        <InputWithLabel
                          label="Resource Title"
                          type="text"
                          wrapperclassname="lg:w-72"
                          {...field}
                        />
                      </FormControl>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`questionResources.${index}.url`}
                    render={({ field: { value, ...fieldProps } }) => (
                      <FormControl>
                        <InputWithLabel
                          label="Resource Link"
                          type="text"
                          wrapperclassname="lg:w-72"
                          value={value?.toString() ?? ''}
                          {...fieldProps}
                        />
                      </FormControl>
                    )}
                  />
                  <Button
                    type="button"
                    onClick={() => appendResource({ title: '', url: '' })}
                    className="btn"
                  >
                    Add Resource
                  </Button>
                  <Button type="button" onClick={() => removeResource(index)} className="btn">
                    <TrashIcon className="size-4 text-destructive" />
                  </Button>
                </div>
              ))}

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
