"use client";

import { Controller, useFormContext } from "react-hook-form";
import { PetRegistrationFormValues } from "@/entities/pet/model/petRegistrationSchema";
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
const SPECIES_OPTIONS = {
  dog: [
    { label: "말티즈", value: "maltese" },
    { label: "푸들", value: "poodle" },
    { label: "포메라니안", value: "pomeranian" },
    { label: "골든 리트리버", value: "golden_retriever" },
    { label: "시츄", value: "shih_tzu" },
    { label: "비숑 프리제", value: "bichon_frise" },
    { label: "진돗개", value: "jindo" },
    { label: "웰시 코기", value: "welsh_corgi" },
    { label: "닥스훈트", value: "dachshund" },
    { label: "기타", value: "other" },
  ],
  cat: [
    { label: "코리안 숏헤어", value: "korean_shorthair" },
    { label: "페르시안", value: "persian" },
    { label: "스코티시 폴드", value: "scottish_fold" },
    { label: "러시안 블루", value: "russian_blue" },
    { label: "브리티시 숏헤어", value: "british_shorthair" },
    { label: "메인쿤", value: "maine_coon" },
    { label: "샴", value: "siamese" },
    { label: "아비시니안", value: "abyssinian" },
    { label: "벵갈", value: "bengal" },
    { label: "기타", value: "other" },
  ],
} as const;

export function Step2() {
  const { control, watch } = useFormContext<PetRegistrationFormValues>();
  const [genderOpen, setGenderOpen] = useState(false);
  const [neuteredOpen, setNeuteredOpen] = useState(false);
  const [speciesOpen, setSpeciesOpen] = useState(false);

  const division = watch("division");
  const speciesOptions = division ? SPECIES_OPTIONS[division] : [];

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
            name="species"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>품종</FieldLabel>
                <Drawer open={speciesOpen} onOpenChange={setSpeciesOpen}>
                  <DrawerTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start"
                      aria-invalid={fieldState.invalid}
                      disabled={!division}
                    >
                      {speciesOptions.find((o) => o.value === field.value)
                        ?.label ?? "품종을 선택해주세요"}
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>품종 선택</DrawerTitle>
                    </DrawerHeader>
                    <div className="flex flex-col gap-2 px-4 pb-8">
                      {speciesOptions.map((option) => (
                        <Button
                          key={option.value}
                          type="button"
                          variant={
                            field.value === option.value ? "default" : "outline"
                          }
                          onClick={() => {
                            field.onChange(option.value);
                            setSpeciesOpen(false);
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
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val === "" ? undefined : Number(val));
                  }}
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
