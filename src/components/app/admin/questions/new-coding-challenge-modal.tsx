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
import { newCodingChallengeQuestionSchema } from '@/lib/zod/schemas/new-question-schema';
import { z } from 'zod';
import { formatISO } from 'date-fns';

// react query
import { useMutation } from '@tanstack/react-query';

// actions
import { addCodingChallengeQuestion } from '@/actions/questions/add';

// constants
import { LANGUAGE_OPTIONS } from '@/utils/constants/language-options';
import type { QuestionDifficulty } from '@/types';
import { Textarea } from '@/components/ui/textarea';

type SchemaProps = z.infer<typeof newCodingChallengeQuestionSchema>;

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

export default function NewCodingChallengeQuestionModal({ ...props }) {
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
    resolver: zodResolver(newCodingChallengeQuestionSchema),
    defaultValues: {
      title: '',
      description: '',
      question: '',
      codeSnippet: '',
      hint: '',
      dailyQuestion: false,
      tags: '',
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

  const {
    fields: resourceFields,
    append: appendResource,
    remove: removeResource,
  } = useFieldArray({
    control: form.control,
    name: 'questionResources',
  });

  const { mutateAsync: server_addQuestion, isPending } = useMutation({
    mutationFn: (values: SchemaProps) => {
      const {
        title = '',
        description = '',
        hint = '',
        questionDate = undefined,
        questionResources = [],
        ...rest
      } = values;

      return addCodingChallengeQuestion({
        ...rest,
        title,
        description,
        hint,
        questionDate,
        questionResources,
        tags: rest.tags ? rest.tags.split(',').map((tag) => tag.trim()) : [],
        aiTitle: rest.aiTitle || '',
        difficulty: rest.difficulty as QuestionDifficulty,
        // @ts-ignore
        testCases: rest.testCases,
        codeSnippet: rest.codeSnippet,
        dailyQuestion: rest.dailyQuestion || false,
        question: rest.question,
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

  const handleNewQuestion = async (values: SchemaProps) => await server_addQuestion(values);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...props}>Create New Coding Challenge Question</Button>
      </DialogTrigger>
      <DialogContent className="bg-black-75 md:max-w-7xl max-h-[1000px] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Add new Coding Challenge Question
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
              {/** add the test cases in json format */}
              <FormField
                control={form.control}
                name="testCases"
                render={({ field }) => (
                  <FormControl>
                    <div className="space-y-1">
                      <p className="text-sm">Test Cases</p>
                      <div className="border border-black-50 rounded-md">
                        <MenuBar editor={editor} />
                        <Textarea
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
              </div>
              {/* Dynamic Answer Fields with TipTap Editor */}
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
