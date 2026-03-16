"use client";

import { useState } from "react";
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

export function Step3() {
  const { control, watch, setValue } =
    useFormContext<PetRegistrationFormValues>();
  const [allergyInput, setAllergyInput] = useState("");
  const [diseaseInput, setDiseaseInput] = useState("");

  const hasAllergy = watch("hasAllergy");
  const allergies = watch("allergy");
  const diseases = watch("diseases");

  const addTag = (
    fieldName: "allergy" | "diseases",
    input: string,
    setInput: (v: string) => void,
    current: string[],
  ) => {
    const trimmed = input.trim();
    if (!trimmed || current.includes(trimmed)) return;
    setValue(fieldName, [...current, trimmed], { shouldValidate: true });
    setInput("");
  };

  const removeTag = (
    fieldName: "allergy" | "diseases",
    target: string,
    current: string[],
  ) => {
    setValue(
      fieldName,
      current.filter((v) => v !== target),
      { shouldValidate: true },
    );
  };

  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>마지막이에요!</FieldLegend>
        <FieldDescription>
          반려가족을 등록해야 지켜줄개만의 다양한 서비스를 이용할 수 있어요!
        </FieldDescription>
        <FieldGroup>
          {/* 알레르기 여부 */}
          <Controller
            name="hasAllergy"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>알레르기 여부</FieldLabel>
                <div className="flex gap-2">
                  {[
                    { label: "있음", value: true },
                    { label: "없음", value: false },
                  ].map((option) => (
                    <Button
                      key={String(option.value)}
                      type="button"
                      variant={
                        field.value === option.value ? "default" : "outline"
                      }
                      onClick={() => {
                        field.onChange(option.value);
                        if (!option.value) setValue("allergy", []);
                      }}
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

          {/* 알레르기 직접 입력 */}
          {hasAllergy && (
            <Controller
              name="allergy"
              control={control}
              render={({ fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>알레르기 입력</FieldLabel>
                  <div className="flex gap-2">
                    <Input
                      value={allergyInput}
                      onChange={(e) => setAllergyInput(e.target.value)}
                      placeholder="알레르기 항목을 입력해주세요"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag(
                            "allergy",
                            allergyInput,
                            setAllergyInput,
                            allergies,
                          );
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() =>
                        addTag(
                          "allergy",
                          allergyInput,
                          setAllergyInput,
                          allergies,
                        )
                      }
                    >
                      추가
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {allergies.map((item) => (
                      <span
                        key={item}
                        className="flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm"
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() => removeTag("allergy", item, allergies)}
                          className="ml-1"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          )}

          {/* 질병 */}
          <Controller
            name="diseases"
            control={control}
            render={({ fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>현재 질병</FieldLabel>
                <div className="flex gap-2">
                  <Input
                    value={diseaseInput}
                    onChange={(e) => setDiseaseInput(e.target.value)}
                    placeholder="질병을 입력해주세요"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag(
                          "diseases",
                          diseaseInput,
                          setDiseaseInput,
                          diseases,
                        );
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      addTag(
                        "diseases",
                        diseaseInput,
                        setDiseaseInput,
                        diseases,
                      )
                    }
                  >
                    추가
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {diseases.map((item) => (
                    <span
                      key={item}
                      className="flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeTag("diseases", item, diseases)}
                        className="ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
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
