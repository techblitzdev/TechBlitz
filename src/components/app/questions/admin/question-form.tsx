'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Questions, QuestionDifficulty, QuestionType } from '@prisma/client';
import { updateQuestion } from '@/actions/questions/update-question';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface QuestionFormProps {
  initialData?: Questions;
  isEditing?: boolean;
}

interface FormData {
  title: string;
  question: string;
  correctAnswer: string;
  difficulty: QuestionDifficulty;
  questionType: QuestionType;
  isPremiumQuestion: boolean;
  hint: string | null;
  codeSnippet: string | null;
}

export default function QuestionForm({ initialData, isEditing = false }: QuestionFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: initialData?.title || '',
    question: initialData?.question || '',
    correctAnswer: initialData?.correctAnswer || '',
    difficulty: initialData?.difficulty || QuestionDifficulty.EASY,
    questionType: initialData?.questionType || QuestionType.MULTIPLE_CHOICE,
    isPremiumQuestion: initialData?.isPremiumQuestion || false,
    hint: initialData?.hint || null,
    codeSnippet: initialData?.codeSnippet || null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isEditing && initialData) {
        const result = await updateQuestion(initialData.uid, formData);
        if (result.success) {
          toast.success('Question updated successfully');
          router.push('/admin/questions/list');
        } else {
          toast.error(result.error || 'Failed to update question');
        }
      } else {
        // TODO: Implement create question action
        toast.error('Create question functionality coming soon');
      }
    } catch (error) {
      toast.error('An error occurred while saving the question');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="question">Question *</Label>
          <Textarea
            id="question"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="correctAnswer">Correct Answer *</Label>
          <Input
            id="correctAnswer"
            value={formData.correctAnswer}
            onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="difficulty">Difficulty *</Label>
            <Select
              value={formData.difficulty}
              onValueChange={(value) =>
                setFormData({ ...formData, difficulty: value as QuestionDifficulty })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={QuestionDifficulty.EASY}>Easy</SelectItem>
                <SelectItem value={QuestionDifficulty.MEDIUM}>Medium</SelectItem>
                <SelectItem value={QuestionDifficulty.HARD}>Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="questionType">Question Type *</Label>
            <Select
              value={formData.questionType}
              onValueChange={(value) =>
                setFormData({ ...formData, questionType: value as QuestionType })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={QuestionType.MULTIPLE_CHOICE}>Multiple Choice</SelectItem>
                <SelectItem value={QuestionType.CODING_CHALLENGE}>Coding Challenge</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isPremiumQuestion"
            checked={formData.isPremiumQuestion}
            onCheckedChange={(checked) => setFormData({ ...formData, isPremiumQuestion: checked })}
          />
          <Label htmlFor="isPremiumQuestion">Premium Question</Label>
        </div>

        <div>
          <Label htmlFor="hint">Hint</Label>
          <Textarea
            id="hint"
            value={formData.hint || ''}
            onChange={(e) => setFormData({ ...formData, hint: e.target.value || null })}
          />
        </div>

        <div>
          <Label htmlFor="codeSnippet">Code Snippet</Label>
          <Textarea
            id="codeSnippet"
            value={formData.codeSnippet || ''}
            onChange={(e) => setFormData({ ...formData, codeSnippet: e.target.value || null })}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/questions/list')}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Question' : 'Create Question'}
        </Button>
      </div>
    </form>
  );
}
