"use client";
import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";
import { CommonLayout } from "@/widgets/CommonLayout";
import Image from "next/image";

export const LoginPage = () => {
  const router = useRouter();

  return (
    <CommonLayout>
      <div className="flex flex-col w-full h-screen gap-2 p-4 items-center justify-center">
        <Image
          src="/icons/logo-icon.svg"
          alt="지켜줄개 로고"
          width={160}
          height={160}
        />
        <div className="whitespace-pre-line text-center text-secondary-900 font-normal">
          지켜줄개로 {"\n"} 아이의 건강을 지켜주세요
        </div>

        <Button
          className="w-72 rounded-full h-12 mt-12 bg-primary-600 hover:bg-primary-300"
          onClick={() => {
            router.push("/home");
          }}
        >
          로그인
        </Button>
      </div>
    </CommonLayout>
  );
};
