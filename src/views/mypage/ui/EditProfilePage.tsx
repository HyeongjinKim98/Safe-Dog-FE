"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CommonLayout } from "@/widgets/CommonLayout";
import { Header } from "@/widgets/Header";
import { ArrowLeft, Camera, Pencil } from "lucide-react";
import { User } from "@/shared/types";
import { Button } from "@/shared/ui/button";

const PROVIDER_ICONS: Record<string, { label: string; color: string }> = {
  NAVER: { label: "네이버 계정 연결", color: "bg-[#4CAF66]" },
};

type Props = {
  profile: User;
};

export const EditProfilePage = ({ profile }: Props) => {
  const router = useRouter();
  const [nickname, setNickname] = useState(profile.nickname);
  const [isEditingNickname, setIsEditingNickname] = useState(false);

  const provider = PROVIDER_ICONS[profile.providerType] ?? PROVIDER_ICONS.LOCAL;

  return (
    <CommonLayout backgroundColor="bg-white">
      <Header
        left={
          <button onClick={() => router.back()}>
            <ArrowLeft className="w-6 h-6 text-[#1F1F1F]" />
          </button>
        }
        title="내 정보 수정"
      />

      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Avatar */}
        <div className="flex justify-center mt-6 mb-2">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-[#E0E0E0] overflow-hidden">
              {profile.profileImageUrl && (
                <img
                  src={profile.profileImageUrl}
                  alt={profile.nickname}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#9E9E9E] rounded-full flex items-center justify-center p-[5px]">
              <Camera size={16} className="text-white" />
            </button>
          </div>
        </div>

        {/* Form fields */}
        <div className="flex flex-col gap-6 mx-5 mt-6">
          {/* 이름 (readonly) */}
          <div className="flex flex-col gap-[10px]">
            <label className="text-[16px] font-medium text-[#1F1F1F] tracking-[-0.04em]">
              이름
            </label>
            <div className="h-[52px] bg-[#F7F7F7] rounded-[8px] flex items-center px-5">
              <span className="text-[14px] font-medium text-[#9E9E9E]">
                {profile.name}
              </span>
            </div>
          </div>

          {/* 닉네임 */}
          <div className="flex flex-col gap-[10px]">
            <label className="text-[16px] font-medium text-[#1F1F1F] tracking-[-0.04em]">
              닉네임
            </label>
            <div className="h-[52px] bg-[#FDF7F2] rounded-[8px] flex items-center justify-between px-5">
              {isEditingNickname ? (
                <input
                  autoFocus
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  onBlur={() => setIsEditingNickname(false)}
                  className="flex-1 bg-transparent outline-none text-[14px] font-medium text-[#6B6B6B]"
                />
              ) : (
                <span className="flex-1 text-[14px] font-medium text-[#6B6B6B]">
                  {nickname}
                </span>
              )}
              <button onClick={() => setIsEditingNickname(true)}>
                <Pencil size={16} className="text-[#9E9E9E]" />
              </button>
            </div>
          </div>

          {/* 계정 연결 */}
          <div className="flex flex-col gap-[10px]">
            <label className="text-[16px] font-medium text-[#1F1F1F] tracking-[-0.04em]">
              계정 연결
            </label>
            <div className="h-[58px] rounded-[8px] flex items-center justify-between px-4">
              <div className="flex items-center gap-[10px]">
                <div
                  className={`w-7 h-7 rounded-full ${provider?.color ?? "bg-[#E0E0E0]"} flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-white text-xs font-bold">
                    {profile.providerType[0]}
                  </span>
                </div>
                <span className="text-[14px] font-medium text-[#1F1F1F]">
                  {provider?.label ?? "계정 연결"}
                </span>
              </div>
              <span className="text-[12px] font-medium text-[#6B6B6B]">
                연결중
              </span>
            </div>
          </div>

          {/* 탈퇴하기 */}
          <button
            onClick={() => {}}
            className="py-[10px] text-left"
          >
            <span className="text-[14px] font-medium text-[#9E9E9E] tracking-[-0.04em]">
              탈퇴하기
            </span>
          </button>
        </div>
      </div>

      {/* Save button */}
      <div className="mx-5 mb-8 mt-auto">
        <Button
          onClick={() => router.push("/mypage")}
          className="w-full h-[58px] rounded-[30px] bg-[#9F7248] hover:bg-[#8A6240] text-white text-[16px] font-medium"
        >
          저장하기
        </Button>
      </div>
    </CommonLayout>
  );
};
