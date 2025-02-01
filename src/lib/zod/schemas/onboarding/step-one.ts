import { z } from 'zod'

// step one of the onboarding only requires a username.
export const onboardingStepOneSchema = z.object({
  profilePicture: z.string().optional(),
  username: z.string().min(2).max(20),
  showTimeTaken: z.boolean().default(false),
  sendPushNotifications: z.boolean().default(false),
  experienceLevel: z
    .enum(['beginner', 'intermediate', 'advanced', 'master'])
    .default('beginner'),
})
