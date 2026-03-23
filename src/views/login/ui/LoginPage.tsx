"use client";
import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";
import { testLogin } from "@/shared/actions/auth";
import { testGet } from "@/shared/actions/auth";
import { registerPet } from "@/shared/actions/pet";
import { getMyPets } from "@/shared/actions/pet";
import { CommonLayout } from "@/widgets/CommonLayout";
const oauth_url = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/naver`;
export const LoginPage = () => {
  const router = useRouter();
  console.log(process.env.NEXT_PUBLIC_API_URL);
  const handleNaverLogin = () => {
    window.location.href = oauth_url;
  };
  const test = async () => {
    await testLogin("test@gmail.com");
  };
  return (
    <CommonLayout>
      <div className="flex flex-col w-full h-screen gap-2 p-4 items-center justify-center">
        <div className="w-40 h-40 bg-black rounded-full"></div>
        <div className="whitespace-pre-line text-center font-semibold text-xl">
          지켜줄개로 {"\n"} 아이의 건강을 지켜주세요
        </div>

        <Button
          className="w-72 rounded-full h-12 mt-12"
          onClick={handleNaverLogin}
        >
          로그인
        </Button>
      </div>
    </CommonLayout>
  );
};
