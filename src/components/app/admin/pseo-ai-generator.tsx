'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Sparkles } from 'lucide-react';
import { generatePseoContent } from '@/actions/ai/generate-pseo-content';

interface PseoAiGeneratorProps {
  onGeneratedContent: (content: any) => void;
}

export default function PseoAiGenerator({ onGeneratedContent }: PseoAiGeneratorProps) {
  const [targetingKeywords, setTargetingKeywords] = useState('');
  const [slug, setSlug] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState<'claude' | 'openai'>('claude');

  const generateContent = async () => {
    if (!targetingKeywords.trim()) {
      setError('Please enter targeting keywords');
      return;
    }

    if (!slug.trim()) {
      setError('Please enter a slug');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await generatePseoContent({
        targetingKeywords,
        slug,
        model,
      });

      if ('error' in result) {
        throw new Error(result.error);
      }

      onGeneratedContent(result.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-black-75 border border-black-50 p-6 mb-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white mb-2">AI Content Generator</h2>
        <p className="text-gray-400 text-sm">
          Generate PSEO content based on targeting keywords and page slug. This will populate the
          form fields with AI-generated content.
        </p>
      </div>

      <Tabs defaultValue="claude" className="mb-4">
        <TabsList className="bg-black-100">
          <TabsTrigger
            value="claude"
            onClick={() => setModel('claude')}
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Claude
          </TabsTrigger>
          <TabsTrigger
            value="openai"
            onClick={() => setModel('openai')}
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            OpenAI
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="targetingKeywords" className="text-white">
            Targeting Keywords *
          </Label>
          <Input
            id="targetingKeywords"
            value={targetingKeywords}
            onChange={(e) => setTargetingKeywords(e.target.value)}
            placeholder="e.g., javascript tutorial, learn javascript, javascript for beginners"
            className="bg-black-100 border-black-50 text-white"
          />
          <p className="text-xs text-gray-400">Comma-separated keywords to target for this page</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug" className="text-white">
            Page Slug *
          </Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g., learn/javascript-tutorial"
            className="bg-black-100 border-black-50 text-white"
          />
          <p className="text-xs text-gray-400">The URL path for this page (no leading slash)</p>
        </div>
      </div>

      {error && <div className="bg-red-900/20 text-red-300 p-3 rounded-md mb-4">{error}</div>}

      <Button
        type="button"
        onClick={generateContent}
        disabled={isLoading}
        className="bg-primary hover:bg-primary/90 text-white"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Content
          </>
        )}
      </Button>
    </Card>
  );
}
