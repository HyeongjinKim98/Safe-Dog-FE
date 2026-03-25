"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CommonLayout } from "@/widgets/CommonLayout";
import { Header } from "@/widgets/Header";
import { ArrowLeft, Copy, Check, UserPlus, ChevronRight } from "lucide-react";
import { Guardian } from "@/shared/types";

type Props = {
  guardians: Guardian[];
  inviteCode: string;
};

export const GuardiansPage = ({ guardians, inviteCode }: Props) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CommonLayout backgroundColor="bg-white">
      <Header
        left={
          <button onClick={() => router.back()}>
            <ArrowLeft className="w-6 h-6 text-[#1F1F1F]" />
          </button>
        }
        title="공동보호자 관리"
      />

      <div className="flex flex-col flex-1 overflow-y-auto pb-8">
        {/* Invite code card */}
        <div className="mx-5 mt-4 bg-[#FDF7F2] rounded-[12px] p-5">
          <p className="text-[14px] text-[#6B6B6B] mb-1">
            아래 코드를 공유해 가족을 초대하세요
          </p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-[28px] font-bold text-[#9F7248] tracking-[0.1em]">
              {inviteCode}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 h-10 rounded-full border border-[#9F7248] text-[#9F7248] text-[14px] font-medium"
            >
              {copied ? (
                <>
                  <Check size={15} />
                  복사됨!
                </>
              ) : (
                <>
                  <Copy size={15} />
                  코드 복사
                </>
              )}
            </button>
          </div>
          <p className="text-[12px] text-[#C2C2C2] mt-2">
            초대받은 사람은 앱에서 코드를 입력하면 공동보호자로 등록돼요
          </p>
        </div>

        {/* Guardian list */}
        <div className="mx-5 mt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[16px] font-bold text-[#1F1F1F]">
              공동보호자 목록
            </span>
            <span className="text-[13px] text-[#9E9E9E]">
              {guardians.length}명
            </span>
          </div>

          {guardians.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <div className="w-16 h-16 rounded-full bg-[#F7F7F7] flex items-center justify-center">
                <UserPlus size={28} className="text-[#C2C2C2]" />
              </div>
              <p className="text-[14px] text-[#9E9E9E] text-center">
                아직 공동보호자가 없어요{"\n"}초대코드를 공유해 가족을
                초대해보세요
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-0.5">
              {guardians.map((guardian) => (
                <div
                  key={guardian.id}
                  className="flex items-center gap-4 h-[68px] border-b border-[#F7F7F7]"
                >
                  <div className="w-11 h-11 rounded-full bg-[#E0E0E0] overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {guardian.profileImageUrl ? (
                      <img
                        src={guardian.profileImageUrl}
                        alt={guardian.nickname}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[16px] font-bold text-[#9E9E9E]">
                        {guardian.nickname[0]}
                      </span>
                    )}
                  </div>
                  <span className="flex-1 text-[16px] font-medium text-[#1F1F1F]">
                    {guardian.nickname}
                  </span>
                  <button className="text-[13px] text-[#9E9E9E] border border-[#E0E0E0] rounded-full px-3 h-8">
                    내보내기
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Invitation link */}
        <div className="mx-5 mt-6">
          <button
            onClick={() =>
              router.push(`/invitation?code=${inviteCode}`)
            }
            className="w-full flex items-center justify-between h-12 border border-[#E0E0E0] rounded-[8px] px-4"
          >
            <span className="text-[14px] font-medium text-[#3D3D3D]">
              초대 페이지 미리보기
            </span>
            <ChevronRight size={18} className="text-[#9E9E9E]" />
          </button>
        </div>
      </div>
    </CommonLayout>
  );
};
