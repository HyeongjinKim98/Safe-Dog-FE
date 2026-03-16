import { z } from "zod";

export const petRegistrationSchema = z
  .object({
    // step 1
    // profileImageUrl: z.string().optional(),
    name: z
      .string()
      .min(1, "이름을 입력해주세요")
      .max(20, "이름은 20자 이하로 입력해주세요")
      .regex(
        /^[가-힣a-zA-Z0-9._\-]+$/,
        "한글, 영문, 숫자, '.', '_', '-'만 사용 가능합니다",
      ),
    birthDate: z.string(),
    weight: z
      .number("숫자를 입력해주세요")
      .positive("몸무게는 0보다 커야 합니다"),

    // step 2
    division: z.enum(["cat", "dog"]),
    species: z.string().min(1).max(50).optional(),
    registrationNumber: z.number(),
    gender: z.enum(["male", "female"]),
    isNeutered: z.boolean(),

    // step3
    hasAllergy: z.boolean(),
    allergy: z.array(z.string()),
    diseases: z.array(z.string()),
  })
  .refine((data) => !data.hasAllergy || data.allergy.length > 0, {
    message: "알레르기 항목을 입력해주세요",
    path: ["allergy"],
  });

export type PetRegistrationFormValues = z.infer<typeof petRegistrationSchema>;
