"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CommonLayout } from "@/widgets/CommonLayout";
import { FormProvider } from "react-hook-form";
import { usePetRegistrationForm } from "../model/usePetReistrationFrom";
import { Progress } from "@/shared/ui/progress";
import { Step1 } from "./registerSteps/Step1";
import { Step2 } from "./registerSteps/Step2";
import { Step3 } from "./registerSteps/Step3";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
export const RegisterPage = () => {
  const { form, currentStep, totalSteps, goNext, goPrev } =
    usePetRegistrationForm();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // const handleSubmit = form.handleSubmit((data) => {
  //   console.log("hi");
  //   setOpen(true);
  // });

  // 임시
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(true);
  };
  return (
    <CommonLayout>
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 p-4 h-full"
        >
          <Progress value={(currentStep / totalSteps) * 100} />

          <div className="flex-1 h-full">
            {currentStep === 1 && <Step1 />}
            {currentStep === 2 && <Step2 />}
            {currentStep === 3 && <Step3 />}
          </div>

          <div className="sticky bottom-0 flex p-2 gap-2 w-full">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={goPrev}
                className="flex-1 rounded-full h-12"
              >
                이전
              </Button>
            )}
            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={goNext}
                className="flex-1 rounded-full h-12"
              >
                다음
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                className="flex-1 rounded-full h-12"
              >
                등록
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>반려동물 등록이 완료되었어요</DialogTitle>
            <DialogDescription>
              흰동이의 건강한 반려생활을 응원할게요!
            </DialogDescription>
          </DialogHeader>
          <Button
            className="w-full rounded-full h-12"
            onClick={() => router.push("/")}
          >
            확인
          </Button>
        </DialogContent>
      </Dialog>
    </CommonLayout>
  );
};
