import { z } from 'zod';

// step one of the onboarding only requires a username.
export const onboardingStepOneSchema = z.object({
  username: z.string().min(3).max(20),
  showTimeTaken: z.boolean().default(false),
  sendPushNotifications: z.boolean().default(false)
});
