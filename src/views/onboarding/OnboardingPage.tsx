"use client";
import Completed from "@/views/onboarding/ui/Completed";
import Terms from "@/views/onboarding/ui/Terms";
import { useOnboardingStep } from "./model/useOnboardingSteps";
export const OnboardingPage=()=> {
  const { step, nextStep } = useOnboardingStep();
  if (step === "Terms") {
    return (
      <>
        <div className="flex flex-col w-full h-screen">
          <Terms nextStep={nextStep} />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <Completed />
      </div>
    </>
  );
}