import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import FasterThanAIWrapper from './faster-than-ai-wrapper';

const meta: Meta<typeof FasterThanAIWrapper> = {
  title: 'App/Questions/FasterThanAI/Wrapper',
  component: FasterThanAIWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof FasterThanAIWrapper>;

// Interactive component to demonstrate the full flow
const WrapperWithDemo = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [wasCorrect, setWasCorrect] = useState<boolean | undefined>(undefined);

  const handleSubmit = (correct: boolean) => {
    setIsSubmitted(true);
    setWasCorrect(correct);
  };

  return (
    <div className="min-h-screen relative">
      <FasterThanAIWrapper
        fasterThanAiGameMode={true}
        aiTimeToComplete={15}
        isSubmitted={isSubmitted}
        wasCorrect={wasCorrect}
      >
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
          <div className="max-w-2xl w-full bg-card rounded-lg border border-border p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Sample Question</h2>
            <p className="mb-8">What is the capital of France?</p>

            <div className="space-y-3 mb-8">
              {[
                { text: 'Berlin', correct: false },
                { text: 'London', correct: false },
                { text: 'Paris', correct: true },
                { text: 'Madrid', correct: false },
              ].map((option, index) => (
                <button
                  key={index}
                  className={`w-full p-3 text-left rounded-md border transition-all
                    ${
                      isSubmitted && option.correct
                        ? 'bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-600'
                        : 'bg-background hover:bg-muted/50 border-border'
                    }`}
                  onClick={() => !isSubmitted && handleSubmit(option.correct)}
                  disabled={isSubmitted}
                >
                  {option.text}
                </button>
              ))}
            </div>

            {isSubmitted && (
              <div
                className={`p-4 rounded-md ${
                  wasCorrect ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                }`}
              >
                <p className="font-medium">
                  {wasCorrect
                    ? 'Correct! Paris is the capital of France.'
                    : 'Incorrect. The capital of France is Paris.'}
                </p>
              </div>
            )}

            {!isSubmitted && (
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-accent text-white rounded-md"
                  onClick={() => handleSubmit(true)}
                >
                  Submit Answer
                </button>
              </div>
            )}
          </div>
        </div>
      </FasterThanAIWrapper>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <WrapperWithDemo />,
};

// Static examples for different states
export const GameModeDisabled: Story = {
  args: {
    fasterThanAiGameMode: false,
    aiTimeToComplete: 15,
    isSubmitted: false,
    wasCorrect: undefined,
    children: (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-card p-6 rounded-lg border border-border max-w-md">
          <p className="text-lg font-medium">Game Mode Disabled</p>
          <p className="text-muted-foreground">Animation and countdown should not appear</p>
        </div>
      </div>
    ),
  },
};

export const Submitted: Story = {
  args: {
    fasterThanAiGameMode: true,
    aiTimeToComplete: 15,
    isSubmitted: true,
    wasCorrect: true,
    children: (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-card p-6 rounded-lg border border-border max-w-md">
          <p className="text-lg font-medium">Answer Submitted</p>
          <p className="text-muted-foreground">Should show completed state</p>
        </div>
      </div>
    ),
  },
};
