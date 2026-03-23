"use client";

import { useFormContext } from "react-hook-form";
import { PetRegistrationFormValues } from "@/entities/pet/model/petRegistrationSchema";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { useState } from "react";

export function Step1() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<PetRegistrationFormValues>();

  const [unknownBirthDate, setUnknownBirthDate] = useState(false);
  const [unknownWeight, setUnknownWeight] = useState(false);

  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>반려가족을 등록해주세요!</FieldLegend>
        <FieldDescription>
          반려 가족을 등록해야 지켜줄개만의 다양한 서비스를 이용할 수 있어요
        </FieldDescription>

        <FieldGroup>
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="name">반려동물 이름</FieldLabel>
            <Input
              {...register("name")}
              id="name"
              placeholder="이름을 입력해주세요"
              aria-invalid={!!errors.name}
            />
            {errors.name && <FieldError errors={[errors.name]} />}
          </Field>

          <Field data-invalid={!!errors.birthDate}>
            <FieldLabel htmlFor="birthDate">생년월일</FieldLabel>
            <Input
              {...register("birthDate")}
              id="birthDate"
              type="date"
              disabled={unknownBirthDate}
              aria-invalid={!!errors.birthDate}
              className={
                unknownBirthDate ? "opacity-40 cursor-not-allowed" : ""
              }
            />
            {errors.birthDate && !unknownBirthDate && (
              <FieldError errors={[errors.birthDate]} />
            )}
            <label className="flex items-center gap-2 mt-1 text-sm text-gray-500 cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={unknownBirthDate}
                onChange={(e) => {
                  setUnknownBirthDate(e.target.checked);
                  if (e.target.checked) setValue("birthDate", "");
                }}
                className="w-4 h-4"
              />
              출생일을 모르겠어요
            </label>
          </Field>

          <Field data-invalid={!!errors.weight}>
            <FieldLabel htmlFor="weight">체중</FieldLabel>
            <div className="relative">
              <Input
                {...register("weight", { valueAsNumber: true })}
                id="weight"
                type="number"
                placeholder="체중을 입력해주세요"
                disabled={unknownWeight}
                aria-invalid={!!errors.weight}
                className={`pr-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none${unknownWeight ? " opacity-40 cursor-not-allowed" : ""}`}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">
                kg
              </span>
            </div>
            {errors.weight && !unknownWeight && (
              <FieldError errors={[errors.weight]} />
            )}
            <label className="flex items-center gap-2 mt-1 text-sm text-gray-500 cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={unknownWeight}
                onChange={(e) => {
                  setUnknownWeight(e.target.checked);
                  if (e.target.checked) setValue("weight", 0);
                }}
                className="w-4 h-4"
              />
              체중을 잘 모르겠어요
            </label>
          </Field>
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  );
}
