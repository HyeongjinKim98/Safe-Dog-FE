"use client";
import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";
import { testLogin } from "@/shared/actions/auth";
const oauth_url = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization`;
export const LoginPage = () => {
  const router = useRouter();
  const handleLogin = (provider: "GOOGLE" | "naver" | "kakao") => {
    window.location.href = `${oauth_url}/GOOGLE`;
  };
  const test = async () => {
    const response = await testLogin("test@gmail.com");
  };
  return (
    <div className="flex flex-col w-full gap-2 p-4 items-center ">
      <div className="w-40 h-40 bg-black rounded-full"></div>
      <div className="whitespace-pre-line text-center font-semibold text-xl">
        지켜줄개로 {"\n"} 아이의 건강을 지켜주세요
      </div>
      <Button
        className="w-72 rounded-full h-12"
        onClick={() => handleLogin("GOOGLE")}
      >
        구글 로그인
      </Button>
      <Button
        className="w-72 rounded-full h-12"
        onClick={() => handleLogin("naver")}
      >
        네이버 로그인
      </Button>
      <Button
        className="w-72 rounded-full h-12"
        onClick={() => handleLogin("kakao")}
      >
        카카오 로그인
      </Button>
      <Button
        className="w-72 rounded-full h-12"
        onClick={() => router.push("/register")}
      >
        반려동물 등록
      </Button>
      <Button
        className="w-72 rounded-full h-12"
        onClick={() => router.push("/onboarding")}
      >
        온보딩
      </Button>
      <Button
        className="w-72 rounded-full h-12"
        onClick={() => router.push("/signup")}
      >
        약관
      </Button>
      <Button className="w-72 rounded-full h-12" onClick={test}>
        테스트로그인
      </Button>
      <Button
        className="w-72 rounded-full h-12"
        onClick={() => router.push("/pet-note")}
      >
        반려노트
      </Button>
    </div>
  );
};
