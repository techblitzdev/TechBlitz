import { z } from "zod";

export const answerHelpSchema = z.object({
  "step-1": z.string(),
  "step-2": z.string(),
  "step-3": z.string(),
  "step-4": z.string(),
  "step-5": z.string(),
});
