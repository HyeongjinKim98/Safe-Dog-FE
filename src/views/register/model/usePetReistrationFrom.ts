"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PetRegistrationFormValues,
  petRegistrationSchema,
} from "@/entities/pet/petRegistrationSchema";

const STEPS = [1, 2, 3] as const;
type Step = (typeof STEPS)[number];

const STEP_FIELDS: Record<Step, (keyof PetRegistrationFormValues)[]> = {
  1: ["name", "birthDate", "weight"],
  2: ["division", "registrationNumber", "gender", "isNeutered"],
  3: ["hasAllergy", "allergy", "diseases"],
};

export function usePetRegistrationForm() {
  const form = useForm<PetRegistrationFormValues>({
    resolver: zodResolver(petRegistrationSchema),
    defaultValues: {
      name: "",
      birthDate: "",
      weight: undefined,
      division: undefined,
      species: undefined,
      registrationNumber: undefined,
      gender: undefined,
      isNeutered: undefined,
      hasAllergy: false,
      allergy: [],
      diseases: [],
    },
    mode: "onTouched",
  });

  const [currentStep, setCurrentStep] = useState<Step>(1);

  const goNext = async () => {
    // const fields = STEP_FIELDS[currentStep];
    // const isValid = await form.trigger(fields);
    // if (!isValid) return;
    setCurrentStep((prev) => Math.min(prev + 1, 3) as Step);
  };

  const goPrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1) as Step);
  };

  return {
    form,
    currentStep,
    totalSteps: STEPS.length,
    goNext,
    goPrev,
  };
}
