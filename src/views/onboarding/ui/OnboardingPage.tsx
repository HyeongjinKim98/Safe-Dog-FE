"use client";
import { useRegisterStep } from "../model/useRegisterSteps";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { Header } from "@/widgets/Header";
import { CommonLayout } from "../../../widgets/CommonLayout";
const TOTAL_STEPS = 3;
const SLIDES = [
  {
    title: "함께 돌보는 반려생활",
    description: "가족과 나누는 체크리스트로 실수 없이 제어하세요",
  },
  {
    title: "시니어 맞춤케어",
    description: `나이 들수록 더 세심하게 ${"\n"}상태에 맞춰 필요한 케어가 자동으로 준비돼요`,
  },
  {
    title: "오늘 할 일을 한눈에\n지켜줄개로 시작해보세요",
  },
];
export const OnboardingPage = () => {
  const router = useRouter();
  const { step, nextStep, prevStep } = useRegisterStep();
  return (
    <>
        <CommonLayout>
          <Header right ={<button onClick={()=>router.push('/login')}>SKIP</button>}/>
        <div className="h-full flex flex-col items-center justify-center whitespace-pre-line text-center">
          <div className="text-2xl font-bold whitespace-pre-line">
            {SLIDES[step].title}
          </div>
          {SLIDES[step].description && <p>{SLIDES[step].description}</p>}
          <div className="w-60 h-40 bg-gray-400 rounded-xl mt-4"></div>
          <div className="flex gap-2 m-2">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`rounded-full w-2 h-2  ${
                  i === step ? "bg-gray-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="bottom-0 flex p-2 gap-2 w-full">
          {step == 1 && (
            <Button
              onClick={prevStep}
              variant={"outline"}
              className="flex-1 rounded-full h-12"
            >
              이전
            </Button>
          )}
          {step !== 2 && (
            <Button onClick={nextStep} className="flex-2 rounded-full h-12">
              다음
            </Button>
          )}

          {step == 2 && (
            <Button
              onClick={() => router.push("/login")}
              className="flex-2 rounded-full h-12"
            >
              시작하기
            </Button>
          )}
        </div>
        </CommonLayout>
    </>
  );
};
