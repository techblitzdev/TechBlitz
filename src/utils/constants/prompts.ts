export const PROMPT_NAMES = [
  // NEW ROADMAP QUESTIONS
  'first-pass-new-roadmap-question',
  'second-pass-new-roadmap-question',

  // ROADMAPS
  'roadmap-generate-pass-one-teacher',
  'roadmap-generate-pass-one-question',
  'roadmap-generate-pass-one-topics',
  'roadmap-generate-pass-two',

  // STATISTICS
  'statistics-generate-report',
] as const;

export type PromptName = (typeof PROMPT_NAMES)[number];
