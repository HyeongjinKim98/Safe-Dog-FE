"use client";
import Completed from "@/views/onboarding/Completed";
import Terms from "@/views/onboarding/Terms";
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
