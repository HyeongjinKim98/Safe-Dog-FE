"use client";
import Completed from "./ui/Completed";
import Terms from "./ui/Terms";
import { useSignupStep } from "./model/useSignupStep";
export const SignUpPage = () => {
  const { step, nextStep } = useSignupStep();
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
};
