import { z } from "zod";

export const termsSchema = z.object({
  age: z.boolean().refine((val) => val === true, {
    message: "만 14세 이상 동의가 필요합니다.",
  }),
  service: z.boolean().refine((val) => val === true, {
    message: "서비스 이용약관 동의가 필요합니다.",
  }),
  privacy: z.boolean().refine((val) => val === true, {
    message: "개인정보 동의가 필요합니다.",
  }),
  marketing: z.boolean().optional(),
});

export type TermsFormValues = {
  agreements: Record<string, boolean>;
};
