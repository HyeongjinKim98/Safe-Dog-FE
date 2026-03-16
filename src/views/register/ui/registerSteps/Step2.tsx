"use client";

import { Controller, useFormContext } from "react-hook-form";
import { PetRegistrationFormValues } from "@/entities/pet/petRegistrationSchema";
import { Button } from "@/shared/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldDescription,
} from "@/components/ui/field";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";

const DIVISION_OPTIONS = [
  { label: "강아지", value: "dog" },
  { label: "고양이", value: "cat" },
] as const;

const GENDER_OPTIONS = [
  { label: "남아", value: "male" },
  { label: "여아", value: "female" },
] as const;

const NEUTERED_OPTIONS = [
  { label: "중성화 완료", value: true },
  { label: "중성화 안함", value: false },
] as const;

export function Step2() {
  const { control } = useFormContext<PetRegistrationFormValues>();
  const [genderOpen, setGenderOpen] = useState(false);
  const [neuteredOpen, setNeuteredOpen] = useState(false);

  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>반려가족을 등록해주세요!</FieldLegend>
        <FieldDescription>
          반려 가족을 등록해야 지켜줄개만의 다양한 서비스를 이용할 수 있어요
        </FieldDescription>

        <FieldGroup>
          <Controller
            name="division"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>구분</FieldLabel>
                <div className="flex gap-2">
                  {DIVISION_OPTIONS.map((option) => (
                    <Button
                      key={option.value}
                      type="button"
                      variant={
                        field.value === option.value ? "default" : "outline"
                      }
                      onClick={() => field.onChange(option.value)}
                      className="flex-1"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="gender"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>성별</FieldLabel>
                <Drawer open={genderOpen} onOpenChange={setGenderOpen}>
                  <DrawerTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start"
                      aria-invalid={fieldState.invalid}
                    >
                      {GENDER_OPTIONS.find((o) => o.value === field.value)
                        ?.label ?? "성별을 선택해주세요"}
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>성별 선택</DrawerTitle>
                    </DrawerHeader>
                    <div className="flex flex-col gap-2 px-4 pb-8">
                      {GENDER_OPTIONS.map((option) => (
                        <Button
                          key={option.value}
                          type="button"
                          variant={
                            field.value === option.value ? "default" : "outline"
                          }
                          onClick={() => {
                            field.onChange(option.value);
                            setGenderOpen(false);
                          }}
                          className="w-full"
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </DrawerContent>
                </Drawer>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="isNeutered"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>중성화 여부</FieldLabel>
                <Drawer open={neuteredOpen} onOpenChange={setNeuteredOpen}>
                  <DrawerTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start"
                      aria-invalid={fieldState.invalid}
                    >
                      {field.value === undefined
                        ? "중성화 여부를 선택해주세요"
                        : NEUTERED_OPTIONS.find((o) => o.value === field.value)
                            ?.label}
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>중성화 여부 선택</DrawerTitle>
                    </DrawerHeader>
                    <div className="flex flex-col gap-2 px-4 pb-8">
                      {NEUTERED_OPTIONS.map((option) => (
                        <Button
                          key={String(option.value)}
                          type="button"
                          variant={
                            field.value === option.value ? "default" : "outline"
                          }
                          onClick={() => {
                            field.onChange(option.value);
                            setNeuteredOpen(false);
                          }}
                          className="w-full"
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </DrawerContent>
                </Drawer>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* 동물 등록번호 */}
          <Controller
            name="registrationNumber"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="registrationNumber">
                  동물 등록번호
                </FieldLabel>
                <Input
                  {...field}
                  id="registrationNumber"
                  placeholder="등록번호를 입력해주세요"
                  aria-invalid={fieldState.invalid}
                  onChange={(e) => field.onChange(Number(e.target.value))}
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
