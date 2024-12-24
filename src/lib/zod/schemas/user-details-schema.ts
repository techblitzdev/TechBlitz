import { z } from 'zod';

// Updated schema to properly handle optional fields
export const userDetailsSchema = z
  .object({
    username: z.string().min(3),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    showTimeTaken: z.boolean().optional(),
    sendPushNotifications: z.boolean().optional(),
    codeEditorTheme: z.string().optional(),
  })
  .transform((data) => {
    // Remove null values from the payload
    const cleanedData: Partial<typeof data> = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== null) {
        // @ts-expect-error
        cleanedData[key] = value;
      }
    }
    return cleanedData;
  });
