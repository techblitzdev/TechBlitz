export const PROMPT_NAMES = [
  // NEW ROADMAP QUESTIONS
  'first-pass-new-roadmap-question',
  'second-pass-new-roadmap-question',

  // ROADMAPS
  'first-pass-roadmap-generation',
  'second-pass-roadmap-generation'
] as const;

export type PromptName = (typeof PROMPT_NAMES)[number];
