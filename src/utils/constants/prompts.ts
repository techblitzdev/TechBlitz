const PROMPT_NAMES = [
  // NEW ROADMAP QUESTIONS
  "first-pass-new-roadmap-question",
  "second-pass-new-roadmap-question",

  // ROADMAPS
  "roadmap-generate-pass-one-teacher",
  "roadmap-generate-pass-one-question",
  "roadmap-generate-pass-one-topics",
  "roadmap-generate-pass-two",
  "roadmap-chat-gpt-formatter",

  // STATISTICS
  "statistics-generate-report",
  "statistics-generate-report-html",

  // CLAUDE
  "claude-ai-first-pass",

  // QUESTION HELP
  "ai-question-generation-help",
  "question-answer-help",
] as const;

export type PromptName = (typeof PROMPT_NAMES)[number];
