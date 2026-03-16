"use client";

import { Controller, useFormContext } from "react-hook-form";
import { PetRegistrationFormValues } from "@/entities/pet/petRegistrationSchema";
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

export function Step1() {
  const { control } = useFormContext<PetRegistrationFormValues>();

  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>반려가족을 등록해주세요!</FieldLegend>
        <FieldDescription>
          반려 가족을 등록해야 지켜줄개만의 다양한 서비스를 이용할 수 있어요
        </FieldDescription>

        <FieldGroup>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">반려동물 이름</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  placeholder="이름을 입력해주세요"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="birthDate"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="birthDate">생년월일</FieldLabel>
                <Input
                  {...field}
                  id="birthDate"
                  type="date"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="weight"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="weight">체중 (kg)</FieldLabel>
                <Input
                  {...field}
                  id="weight"
                  type="number"
                  placeholder="체중을 입력해주세요"
                  aria-invalid={fieldState.invalid}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  );
}
