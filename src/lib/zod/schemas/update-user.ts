import { z } from "zod";

export const updateUserSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().optional(),
  })
  .refine(
    (data) => {
      // If email is entered, at least one of email or password must be present
      return data.email || data.password;
    },
    {
      message: "Either email or password must be provided",
      path: ["email"], // This marks the error on the email field
    },
  );
