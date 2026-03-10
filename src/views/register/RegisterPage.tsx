"use client";
import Completed from "./ui/Completed";
import Terms from "./ui/Terms";
import { useRegisterStep } from "./model/useRegisterSteps";
export const RegisterPage=()=> {
  const { step, nextStep } = useRegisterStep();
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