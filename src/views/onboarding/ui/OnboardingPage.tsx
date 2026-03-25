"use client";
import { useRegisterStep } from "../model/useRegisterSteps";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { Header } from "@/widgets/Header";
import { CommonLayout } from "../../../widgets/CommonLayout";
import Image from "next/image";
const TOTAL_STEPS = 3;
const SLIDES = [
  {
    title: "함께 돌보는 반려생활",
    description: `가족과 함께 반려동물의 케어를${"\n"}체계적으로 관리하세요`,
    gif: "/gifs/onboarding1.gif",
  },
  {
    title: "시니어 맞춤케어",
    description: `우리 아이 상태에 맞는${"\n"}필요한 케어를 추천해요`,
    gif: "/gifs/onboarding2.gif",
  },
  {
    title: "시니어 맞춤케어",
    description: `우리 아이 상태에 맞는${"\n"}필요한 케어를 추천해요`,
    gif: "/gifs/onboarding3.gif",
  },
];
export const OnboardingPage = () => {
  const router = useRouter();
  const { step, nextStep, prevStep } = useRegisterStep();
  return (
    <>
      <CommonLayout backgroundColor="bg-primary-100">
        <Header
          bgColor="transparent"
          right={
            <button
              className="text-neutral-500"
              onClick={() => router.push("/login")}
            >
              건너뛰기
            </button>
          }
        />
        <div className="h-full flex flex-1 flex-col items-center justify-center whitespace-pre-line text-center ">
          <div className="text-3xl font-bold whitespace-pre-line mb-4">
            {SLIDES[step].title}
          </div>
          {SLIDES[step].description && (
            <p className="text-lg text-muted-foreground">
              {SLIDES[step].description}
            </p>
          )}
          <Image
            src={SLIDES[step].gif}
            alt={`onboarding ${step + 1}`}
            width={480}
            height={160}
            className="rounded-xl mt-4"
            unoptimized
          />
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
        <div className="bottom-0 flex p-2 gap-2 w-full mt-auto ">
          {step == 1 && (
            <Button
              onClick={prevStep}
              variant={"outline"}
              className="flex-1 rounded-full h-16 text-xl"
            >
              이전
            </Button>
          )}
          {step !== 2 && (
            <Button
              onClick={nextStep}
              className="flex-2 rounded-full h-16 text-xl"
            >
              다음
            </Button>
          )}

          {step == 2 && (
            <Button
              onClick={() => router.push("/login")}
              className="flex-2 rounded-full h-16 text-xl"
            >
              시작하기
            </Button>
          )}
        </div>
      </CommonLayout>
    </>
  );
};
