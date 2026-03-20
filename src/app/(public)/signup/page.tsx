"use client";
import { SignUpPage } from "@/views/signup/SignUpPage";
import { useRouter } from "next/navigation";
import { completeSocialSignup } from "@/shared/actions/auth";

export default function SignupPage() {
  const router = useRouter();

  const handleComplete = async () => {
    await completeSocialSignup();
    router.push("/pet-note");
  };

  return <button onClick={handleComplete}>가입 완료</button>;
}
