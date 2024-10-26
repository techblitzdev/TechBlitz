import { z } from 'zod';

export const userDetailsSchema = z.object({
  username: z.string().min(3),
  firstName: z.string().min(3).optional(),
  lastName: z.string().min(3).optional(),
  email: z.string().email(),
  profilePicture: z.string().url().optional(),
});
