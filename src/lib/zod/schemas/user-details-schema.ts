import { z } from 'zod';

export const userDetailsSchema = z.object({
  username: z.string().min(3).optional(),
  firstName: z.string().min(3).optional(),
  lastName: z.string().min(3).optional(),
  showTimeTaken: z.boolean().optional()
}).refine(
  (data) => {
    // At least one field must be provided
    return Object.values(data).some(value => value !== undefined);
  },
  {
    message: "At least one field must be provided for update",
    path: [] // This will make it a general form error rather than field-specific
  }
);