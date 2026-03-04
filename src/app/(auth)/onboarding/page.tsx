"use client";
import Completed from "@/components/onboarding/Completed";
import Terms from "@/components/onboarding/Terms";
import { useState } from "react";
export default function Page() {
  const [step, setStep] = useState<"Terms" | "Completed">("Terms");

  const nextStep = () => setStep("Completed");
  const prevStep = () => setStep("Terms");
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
