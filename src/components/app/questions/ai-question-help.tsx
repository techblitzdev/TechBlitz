import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Question } from '@/types/Questions';
import { StarsIcon } from 'lucide-react';

/**
 *
 *
 * @returns
 */
export default function AiQuestionHelp(opts: { question: Question }) {
  const { question } = opts;

  const handleSubmit = async (formData: FormData) => {
    console.log('hello world');
  };

  return (
    <Popover>
      <PopoverTrigger>
        <StarsIcon className="size-4 text-yellow-400 fill-yellow-500" />
      </PopoverTrigger>
      <PopoverContent
        className="w-80 bg-black-100 text-white border border-black-50"
        align="end"
      >
        <form
          action={async (formData) => {
            'use server';
            console.log(formData);
          }}
          className="flex flex-col gap-y-2"
        >
          <h5 className="text-lg font-semibold mb-2">
            Need assistance with this question? Let AI help you!
          </h5>
          <Textarea
            placeholder="What specific part of this question would you like help with?"
            className="mb-4 text-white border border-black-50"
          />
          <Button type="submit" variant="secondary">
            Request AI Assistance
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
