import { useState } from "react";

export const useRegisterStep=()=>{
      const [step, setStep] = useState<"Terms" | "Completed">("Terms");
      const nextStep = () => setStep("Completed");
      const prevStep = () => setStep("Terms");
      return {
            step,
            nextStep,
            prevStep
      }
}
