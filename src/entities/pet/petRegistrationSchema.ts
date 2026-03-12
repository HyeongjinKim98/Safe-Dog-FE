import { z } from "zod";

export const petRegistrationSchema = z.object({
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
  division: z.enum(["cat", "dog"]),
  species: z.string().min(1).max(50).optional(),
  registrationNumber: z.number(),
  gender: z.enum(["male", "female"]),
  isNeutered: z.boolean(),
  profileImageUrl: z.string().optional(),
  allergy: z.array(z.string()),
  diseases: z.array(z.string()),
});

export type PetRegistrationFormValues = z.infer<typeof petRegistrationSchema>;
