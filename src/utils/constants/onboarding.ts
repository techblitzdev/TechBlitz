const ONBOARDING_STEPS = ['user-info', 'tags', 'plan'];

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];
