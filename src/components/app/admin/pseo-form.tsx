'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPseoPage } from '@/actions/misc/create-pseo-page';
import { editPseoPage } from '@/actions/misc/edit-pseo-page';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import PseoAiGenerator from './pseo-ai-generator';

// JSON editor helper component
function JsonEditor({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-white">
        {label}
      </Label>
      <Textarea
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-32 font-mono text-sm bg-black-100 border-black-50 text-white"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <p className="text-xs text-gray-400">Enter valid JSON</p>
    </div>
  );
}

interface PseoFormProps {
  initialData?: any; // We'll use any for now since the full type would be complex
  isEditing?: boolean;
}

export default function PseoForm({ initialData, isEditing = false }: PseoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  // Form element refs for updating with AI-generated content
  const formRef = useRef<HTMLFormElement>(null);
  const slugRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const metaTitleRef = useRef<HTMLInputElement>(null);
  const metaDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const metaKeywordsRef = useRef<HTMLInputElement>(null);
  const targetingKeywordsRef = useRef<HTMLInputElement>(null);
  const heroHeaderRef = useRef<HTMLInputElement>(null);
  const heroSubheaderRef = useRef<HTMLTextAreaElement>(null);
  const leftHeaderRef = useRef<HTMLInputElement>(null);
  const leftSubheaderRef = useRef<HTMLTextAreaElement>(null);
  const roadmapTitleRef = useRef<HTMLInputElement>(null);
  const roadmapDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const questionHeaderRef = useRef<HTMLInputElement>(null);
  const questionSubheaderRef = useRef<HTMLTextAreaElement>(null);
  const contentGridTitleRef = useRef<HTMLInputElement>(null);
  const ctaTitleRef = useRef<HTMLInputElement>(null);
  const ctaDescriptionRef = useRef<HTMLTextAreaElement>(null);

  // Form state for JSON fields - initialize with values from initialData if available
  const [contentGridItems, setContentGridItems] = useState(
    initialData?.contentGridItems ? JSON.stringify(initialData.contentGridItems, null, 2) : '[]'
  );
  const [contentSections, setContentSections] = useState(
    initialData?.contentSections ? JSON.stringify(initialData.contentSections, null, 2) : '[]'
  );
  const [faqs, setFaqs] = useState(
    initialData?.faqs ? JSON.stringify(initialData.faqs, null, 2) : '[]'
  );
  const [marketingItems, setMarketingItems] = useState(
    initialData?.marketingItems ? JSON.stringify(initialData.marketingItems, null, 2) : '[]'
  );
  const [templateConfig, setTemplateConfig] = useState(
    initialData?.templateConfig ? JSON.stringify(initialData.templateConfig, null, 2) : '{}'
  );

  // Form state for boolean switches
  const [learnMoreLink, setLearnMoreLink] = useState(initialData?.learnMoreLink ?? false);
  const [isPublished, setIsPublished] = useState(initialData?.isPublished ?? false);

  // JSON validation state
  const [jsonErrors, setJsonErrors] = useState<Record<string, string>>({});

  // Helper function to handle generated content
  const handleGeneratedContent = (content: any) => {
    // Set simple text fields using refs
    if (slugRef.current) slugRef.current.value = content.slug || initialData?.slug || '';
    if (titleRef.current) titleRef.current.value = content.title || '';
    if (metaTitleRef.current) metaTitleRef.current.value = content.metaTitle || '';
    if (metaDescriptionRef.current)
      metaDescriptionRef.current.value = content.metaDescription || '';
    if (metaKeywordsRef.current) metaKeywordsRef.current.value = content.metaKeywords || '';
    if (targetingKeywordsRef.current)
      targetingKeywordsRef.current.value = content.targetingKeywords || '';
    if (heroHeaderRef.current) heroHeaderRef.current.value = content.heroHeader || '';
    if (heroSubheaderRef.current) heroSubheaderRef.current.value = content.heroSubheader || '';
    if (leftHeaderRef.current) leftHeaderRef.current.value = content.leftHeader || '';
    if (leftSubheaderRef.current) leftSubheaderRef.current.value = content.leftSubheader || '';
    if (roadmapTitleRef.current) roadmapTitleRef.current.value = content.roadmapTitle || '';
    if (roadmapDescriptionRef.current)
      roadmapDescriptionRef.current.value = content.roadmapDescription || '';
    if (questionHeaderRef.current) questionHeaderRef.current.value = content.questionHeader || '';
    if (questionSubheaderRef.current)
      questionSubheaderRef.current.value = content.questionSubheader || '';
    if (contentGridTitleRef.current)
      contentGridTitleRef.current.value = content.contentGridTitle || '';
    if (ctaTitleRef.current) ctaTitleRef.current.value = content.ctaTitle || '';
    if (ctaDescriptionRef.current) ctaDescriptionRef.current.value = content.ctaDescription || '';

    // Set JSON fields with proper formatting
    if (content.contentGridItems) {
      setContentGridItems(JSON.stringify(content.contentGridItems, null, 2));
    }
    if (content.contentSections) {
      setContentSections(JSON.stringify(content.contentSections, null, 2));
    }
    if (content.faqs) {
      setFaqs(JSON.stringify(content.faqs, null, 2));
    }
    if (content.marketingItems) {
      setMarketingItems(JSON.stringify(content.marketingItems, null, 2));
    }
    if (content.templateConfig) {
      setTemplateConfig(JSON.stringify(content.templateConfig, null, 2));
    }

    // Show success message
    setFormStatus({
      success: true,
      message: 'Content generated successfully! Review and save to publish.',
    });

    // Scroll to form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Helper function to validate JSON
  const validateJson = (json: string, field: string): boolean => {
    try {
      if (json) {
        JSON.parse(json);
      }
      // Clear error for this field
      setJsonErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
      return true;
    } catch (e) {
      // Set error for this field
      setJsonErrors((prev) => ({
        ...prev,
        [field]: 'Invalid JSON format',
      }));
      return false;
    }
  };

  // Handle form submission
  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setFormStatus({});

    // First validate all JSON fields client-side
    let hasJsonError = false;
    const jsonErrors: Record<string, string> = {};

    if (!validateJson(contentGridItems, 'contentGridItems')) {
      jsonErrors.contentGridItems = 'Invalid JSON format';
      hasJsonError = true;
    }
    if (!validateJson(contentSections, 'contentSections')) {
      jsonErrors.contentSections = 'Invalid JSON format';
      hasJsonError = true;
    }
    if (!validateJson(faqs, 'faqs')) {
      jsonErrors.faqs = 'Invalid JSON format';
      hasJsonError = true;
    }
    if (!validateJson(marketingItems, 'marketingItems')) {
      jsonErrors.marketingItems = 'Invalid JSON format';
      hasJsonError = true;
    }
    if (templateConfig && !validateJson(templateConfig, 'templateConfig')) {
      jsonErrors.templateConfig = 'Invalid JSON format';
      hasJsonError = true;
    }

    if (hasJsonError) {
      setJsonErrors(jsonErrors);
      setIsSubmitting(false);
      setFormStatus({
        success: false,
        message: 'Please fix JSON formatting errors before submitting',
      });
      return;
    }

    // Add all JSON fields to the form data
    formData.set('contentGridItems', contentGridItems);
    formData.set('contentSections', contentSections);
    formData.set('faqs', faqs);
    formData.set('marketingItems', marketingItems);
    formData.set('templateConfig', templateConfig);
    formData.set('learnMoreLink', learnMoreLink.toString());
    formData.set('isPublished', isPublished.toString());

    try {
      // Choose the appropriate server action based on whether we're editing or creating
      if (isEditing) {
        // Ensure we have the page UID for editing
        if (!initialData?.uid) {
          setFormStatus({
            success: false,
            message: 'Page UID is required for editing',
          });
          setIsSubmitting(false);
          return;
        }

        // Add the UID to the form data
        formData.set('uid', initialData.uid);

        const result = await editPseoPage(formData);

        if (result.success) {
          setFormStatus({
            success: true,
            message: result.message || 'Page updated successfully!',
          });
        } else {
          setFormStatus({
            success: false,
            message: result.message || 'Failed to update page. Please try again.',
          });
        }
      } else {
        const result = await createPseoPage(formData);

        if (result.success) {
          setFormStatus({
            success: true,
            message: result.message || 'Page created successfully!',
          });
        } else {
          setFormStatus({
            success: false,
            message: result.message || 'Failed to create page. Please try again.',
          });
        }
      }
    } catch (e) {
      console.error('Error saving page:', e);
      setFormStatus({
        success: false,
        message: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-black-75 rounded-lg p-6">
      {/* Add AI Generator to the top of the form */}
      <PseoAiGenerator onGeneratedContent={handleGeneratedContent} />

      {formStatus.message && (
        <div
          className={`p-4 mb-6 rounded-lg ${
            formStatus.success
              ? 'bg-green-900/20 text-green-700 dark:text-green-300'
              : 'bg-red-900/20 text-red-700 dark:text-red-300'
          }`}
        >
          {formStatus.message}
        </div>
      )}

      <form ref={formRef} action={handleSubmit} className="space-y-8">
        <div className="border-b border-black-50 pb-4 mb-6">
          <h2 className="text-xl font-semibold text-white">
            {isEditing ? 'Edit PSEO Page' : 'Create New PSEO Page'}
          </h2>
          <p className="text-sm text-gray-400">
            {isEditing
              ? 'Update the details for this PSEO page'
              : 'Fill out the form below to create a new PSEO page'}
          </p>
        </div>

        <fieldset className="border border-black-50 rounded-md p-4">
          <legend className="px-2 text-lg font-medium">Page Status</legend>
          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center space-x-2">
              <Switch id="isPublished" checked={isPublished} onCheckedChange={setIsPublished} />
              <div>
                <Label htmlFor="isPublished" className="text-white">
                  Published
                </Label>
                <p className="text-xs text-gray-400">
                  {isPublished
                    ? 'This page is publicly accessible'
                    : 'This page is in draft mode and not publicly accessible'}
                </p>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-black-50 rounded-md p-4">
          <legend className="px-2 text-lg font-medium">Basic Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="slug" className="text-white">
                Page Slug *
              </Label>
              <Input
                id="slug"
                name="slug"
                ref={slugRef}
                placeholder="e.g., learn/javascript-tutorial"
                defaultValue={initialData?.slug || ''}
                className="bg-black-100 border-black-50 text-white"
                required
              />
              <p className="text-xs text-gray-400">The URL path for this page (no leading slash)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">
                Page Title *
              </Label>
              <Input
                id="title"
                name="title"
                ref={titleRef}
                placeholder="e.g., Learn JavaScript: Complete Tutorial"
                defaultValue={initialData?.title || ''}
                className="bg-black-100 border-black-50 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaTitle" className="text-white">
                Meta Title *
              </Label>
              <Input
                id="metaTitle"
                name="metaTitle"
                ref={metaTitleRef}
                placeholder="e.g., Learn JavaScript - Complete Tutorial | TechBlitz"
                defaultValue={initialData?.metaTitle || ''}
                className="bg-black-100 border-black-50 text-white"
                required
              />
              <p className="text-xs text-gray-400">
                Title shown in search results and browser tabs
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaDescription" className="text-white">
                Meta Description *
              </Label>
              <Textarea
                id="metaDescription"
                name="metaDescription"
                ref={metaDescriptionRef}
                placeholder="A comprehensive description of the page content..."
                defaultValue={initialData?.metaDescription || ''}
                className="bg-black-100 border-black-50 text-white"
                required
              />
              <p className="text-xs text-gray-400">Description shown in search results</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaKeywords" className="text-white">
                Meta Keywords
              </Label>
              <Input
                id="metaKeywords"
                name="metaKeywords"
                ref={metaKeywordsRef}
                placeholder="e.g., javascript, tutorial, web development"
                defaultValue={initialData?.metaKeywords?.join(', ') || ''}
                className="bg-black-100 border-black-50 text-white"
              />
              <p className="text-xs text-gray-400">Comma-separated list of keywords</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetingKeywords" className="text-white">
                Targeting Keywords *
              </Label>
              <Input
                id="targetingKeywords"
                name="targetingKeywords"
                ref={targetingKeywordsRef}
                placeholder="web development roadmap, learn web dev"
                defaultValue={initialData?.targetingKeywords?.join(', ') || ''}
                required
                className="bg-black-100 border-black-50 text-white"
              />
              <p className="text-xs text-gray-400">Comma-separated list of primary keywords</p>
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-black-50 rounded-md p-4">
          <legend className="px-2 text-lg font-medium">SEO Settings</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="canonicalUrl" className="text-white">
                Canonical URL
              </Label>
              <Input
                id="canonicalUrl"
                name="canonicalUrl"
                placeholder="https://techblitz.dev/web-development-roadmap"
                defaultValue={initialData?.canonicalUrl || ''}
                className="bg-black-100 border-black-50 text-white"
              />
              <p className="text-xs text-gray-400">
                Optional: canonical URL if different from default
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ogImage" className="text-white">
                Open Graph Image URL
              </Label>
              <Input
                id="ogImage"
                name="ogImage"
                placeholder="https://techblitz.dev/images/web-dev-og.jpg"
                defaultValue={initialData?.ogImage || ''}
                className="bg-black-100 border-black-50 text-white"
              />
              <p className="text-xs text-gray-400">Optional: image URL for social sharing</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jsonLdTitle" className="text-white">
                JSON-LD Title
              </Label>
              <Input
                id="jsonLdTitle"
                name="jsonLdTitle"
                placeholder="Web Development Roadmap"
                defaultValue={initialData?.jsonLdTitle || ''}
                className="bg-black-100 border-black-50 text-white"
              />
              <p className="text-xs text-gray-400">Optional: title for structured data</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jsonLdDescription" className="text-white">
                JSON-LD Description
              </Label>
              <Textarea
                id="jsonLdDescription"
                name="jsonLdDescription"
                placeholder="A comprehensive guide to learning web development..."
                defaultValue={initialData?.jsonLdDescription || ''}
                className="bg-black-100 border-black-50 text-white"
              />
              <p className="text-xs text-gray-400">Optional: description for structured data</p>
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-black-50 rounded-md p-4">
          <legend className="px-2 text-lg font-medium">Hero Section</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="heroHeader" className="text-white">
                Hero Header *
              </Label>
              <Input
                id="heroHeader"
                name="heroHeader"
                ref={heroHeaderRef}
                placeholder="Web Development Roadmap"
                defaultValue={initialData?.heroHeader || ''}
                required
                className="bg-black-100 border-black-50 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="heroSubheader" className="text-white">
                Hero Subheader *
              </Label>
              <Textarea
                id="heroSubheader"
                name="heroSubheader"
                ref={heroSubheaderRef}
                placeholder="Learn to code with our step-by-step guide to becoming a web developer"
                defaultValue={initialData?.heroSubheader || ''}
                required
                className="bg-black-100 border-black-50 text-white"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-black-50 rounded-md p-4">
          <legend className="px-2 text-lg font-medium">Feature Section</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="leftHeader" className="text-white">
                Left Header *
              </Label>
              <Input
                id="leftHeader"
                name="leftHeader"
                ref={leftHeaderRef}
                placeholder="Why Learn Web Development?"
                defaultValue={initialData?.leftHeader || ''}
                required
                className="bg-black-100 border-black-50 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="leftSubheader" className="text-white">
                Left Subheader *
              </Label>
              <Textarea
                id="leftSubheader"
                name="leftSubheader"
                ref={leftSubheaderRef}
                placeholder="Web development is one of the most in-demand skills in the tech industry"
                defaultValue={initialData?.leftSubheader || ''}
                required
                className="bg-black-100 border-black-50 text-white"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="learnMoreLink"
                checked={learnMoreLink}
                onCheckedChange={setLearnMoreLink}
              />
              <Label htmlFor="learnMoreLink">Show Learn More Link</Label>
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-black-50 rounded-md p-4">
          <legend className="px-2 text-lg font-medium">Roadmap Section</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="roadmapTitle">Roadmap Title *</Label>
              <Input
                id="roadmapTitle"
                name="roadmapTitle"
                ref={roadmapTitleRef}
                placeholder="Your Web Development Learning Path"
                defaultValue={initialData?.roadmapTitle || ''}
                required
                className="bg-black-100 border-black-50 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roadmapDescription">Roadmap Description *</Label>
              <Textarea
                id="roadmapDescription"
                name="roadmapDescription"
                ref={roadmapDescriptionRef}
                placeholder="Follow this roadmap to learn web development from beginner to advanced"
                defaultValue={initialData?.roadmapDescription || ''}
                required
                className="bg-black-100 border-black-50 text-white"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-black-50 rounded-md p-4">
          <legend className="px-2 text-lg font-medium">Question Section</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="questionHeader">Question Header *</Label>
              <Input
                id="questionHeader"
                name="questionHeader"
                ref={questionHeaderRef}
                placeholder="Practice with Real Interview Questions"
                defaultValue={initialData?.questionHeader || ''}
                required
                className="bg-black-100 border-black-50 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="questionSubheader">Question Subheader *</Label>
              <Textarea
                id="questionSubheader"
                name="questionSubheader"
                ref={questionSubheaderRef}
                placeholder="Test your skills with questions from top tech companies"
                defaultValue={initialData?.questionSubheader || ''}
                required
                className="bg-black-100 border-black-50 text-white"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-black-50 rounded-md p-4">
          <legend className="px-2 text-lg font-medium">Content Grid</legend>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contentGridTitle">Content Grid Title *</Label>
              <Input
                id="contentGridTitle"
                name="contentGridTitle"
                ref={contentGridTitleRef}
                placeholder="Key Topics to Master"
                defaultValue={initialData?.contentGridTitle || ''}
                required
                className="bg-black-100 border-black-50 text-white"
              />
            </div>

            <JsonEditor
              id="contentGridItems"
              label="Content Grid Items (JSON Array) *"
              placeholder='[{ "title": "HTML Basics", "description": "Learn HTML structure and semantics", "iconSrc": "/icons/html.svg" }]'
              value={contentGridItems}
              onChange={(value) => {
                setContentGridItems(value);
                validateJson(value, 'contentGridItems');
              }}
              error={jsonErrors.contentGridItems}
            />
          </div>
        </fieldset>

        <fieldset className="border border-black-50 rounded-md p-4">
          <legend className="px-2 text-lg font-medium">Call to Action</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="ctaTitle">CTA Title *</Label>
              <Input
                id="ctaTitle"
                name="ctaTitle"
                ref={ctaTitleRef}
                placeholder="Start Your Web Development Journey Today"
                defaultValue={initialData?.ctaTitle || ''}
                required
                className="bg-black-100 border-black-50 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ctaDescription">CTA Description *</Label>
              <Textarea
                id="ctaDescription"
                name="ctaDescription"
                ref={ctaDescriptionRef}
                placeholder="Sign up for free and get access to our comprehensive curriculum"
                defaultValue={initialData?.ctaDescription || ''}
                required
                className="bg-black-100 border-black-50 text-white"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-black-50 rounded-md p-4">
          <legend className="px-2 text-lg font-medium">Additional Content (JSON)</legend>
          <div className="grid grid-cols-1 gap-6">
            <JsonEditor
              id="contentSections"
              label="Content Sections (JSON Array)"
              placeholder='[{ "title": "Getting Started", "content": "Here are the first steps..." }]'
              value={contentSections}
              onChange={(value) => {
                setContentSections(value);
                validateJson(value, 'contentSections');
              }}
              error={jsonErrors.contentSections}
            />

            <JsonEditor
              id="faqs"
              label="FAQs (JSON Array)"
              placeholder='[{ "question": "How long does it take to learn web development?", "answer": "It depends on your dedication..." }]'
              value={faqs}
              onChange={(value) => {
                setFaqs(value);
                validateJson(value, 'faqs');
              }}
              error={jsonErrors.faqs}
            />

            <JsonEditor
              id="marketingItems"
              label="Marketing Items (JSON Array)"
              placeholder='[{ "title": "Related Topic", "url": "/related-topic" }]'
              value={marketingItems}
              onChange={(value) => {
                setMarketingItems(value);
                validateJson(value, 'marketingItems');
              }}
              error={jsonErrors.marketingItems}
            />
          </div>
        </fieldset>

        <fieldset className="border border-black-50 rounded-md p-4">
          <legend className="px-2 text-lg font-medium">Template Settings</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="templateId">Template ID *</Label>
              <Input
                id="templateId"
                name="templateId"
                placeholder="standard"
                defaultValue={initialData?.templateId || ''}
                required
                className="bg-black-100 border-black-50 text-white"
              />
              <p className="text-xs text-gray-500">Identifier for the page template to use</p>
            </div>

            <div className="md:col-span-2">
              <JsonEditor
                id="templateConfig"
                label="Template Config (JSON Object)"
                placeholder='{ "showHeaderImage": true, "backgroundColor": "#f5f5f5" }'
                value={templateConfig}
                onChange={(value) => {
                  setTemplateConfig(value);
                  validateJson(value, 'templateConfig');
                }}
                error={jsonErrors.templateConfig}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-black-50 rounded-md p-4">
          <legend className="px-2 text-lg font-medium">Author Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="authorId">Author ID</Label>
              <Input
                id="authorId"
                name="authorId"
                placeholder="author-123"
                defaultValue={initialData?.authorId || ''}
                className="bg-black-100 border-black-50 text-white"
              />
              <p className="text-xs text-gray-500">Optional: unique identifier for the author</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="authorName">Author Name</Label>
              <Input
                id="authorName"
                name="authorName"
                placeholder="John Doe"
                defaultValue={initialData?.authorName || ''}
                className="bg-black-100 border-black-50 text-white"
              />
              <p className="text-xs text-gray-500">Optional: name of the author</p>
            </div>
          </div>
        </fieldset>

        <div className="pt-6 border-t border-black-50 flex justify-between items-center">
          <div>
            {formStatus.message && (
              <p className={formStatus.success ? 'text-green-500' : 'text-red-500'}>
                {formStatus.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting || Object.keys(jsonErrors).length > 0}
            className="bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? (
              <>
                <span className="mr-2">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </span>
                Processing...
              </>
            ) : isEditing ? (
              'Update Page'
            ) : (
              'Create Page'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
