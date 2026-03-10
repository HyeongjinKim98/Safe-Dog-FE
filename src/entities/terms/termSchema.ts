import { z } from "zod";

export const termsSchema = z.object({
  agreements: z.record(z.string(), z.boolean()),
});

export type TermsFormValues = {
  agreements: Record<string, boolean>;
};
