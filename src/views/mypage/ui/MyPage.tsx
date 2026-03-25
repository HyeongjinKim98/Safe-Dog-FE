"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CommonLayout } from "@/widgets/CommonLayout";
import { Header } from "@/widgets/Header";
import { ArrowLeft, ChevronRight, Copy, Check } from "lucide-react";
import { Pet, User } from "@/shared/types";
import { calcAge } from "@/shared/lib/date";
import { BottomNavigation } from "@/widgets/BottomNavigation";
import Image from "next/image";

type Props = {
  profile: User;
  pets: Pet[];
  inviteCode?: string;
};

const MENU_ITEMS = [
  { label: "마케팅 정보 알림 설정" },
  { label: "약관 및 정책" },
  { label: "공지사항" },
];

export const MyPage = ({ profile, pets, inviteCode = "ZchjTy" }: Props) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
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
        title="마이페이지"
      />

      <div className="flex flex-col flex-1 overflow-y-auto pb-24">
        {/* Profile card */}
        <div className="mx-5 mt-4">
          <button
            onClick={() => router.push("/mypage/edit")}
            className="w-full bg-[#FDF7F2] rounded-[8px] px-[10px] py-5 flex items-center gap-[19px]"
          >
            <div className="w-12 h-12 rounded-full bg-[#E0E0E0] overflow-hidden flex-shrink-0">
              {profile.profileImageUrl && (
                <img
                  src={profile.profileImageUrl}
                  alt={profile.nickname}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex flex-col items-start gap-1 flex-1">
              <span className="text-[16px] font-bold text-[#1F1F1F]">
                {profile.nickname}
              </span>
            </div>
            <ChevronRight size={20} className="text-[#1F1F1F]" />
          </button>
        </div>

        {/* 등록된 반려동물 */}
        <div className="mx-5 mt-3">
          <button
            onClick={() => router.push("/mypage/pets")}
            className="w-full flex items-center justify-between py-[10px]"
          >
            <span className="text-[16px] font-bold text-[#1F1F1F] tracking-[-0.04em]">
              등록된 반려동물
            </span>
            <ChevronRight size={20} className="text-[#1F1F1F]" />
          </button>
        </div>

        {/* Pet cards */}
        {pets.length > 0 && (
          <div className="mx-5 mb-3">
            <div className="flex gap-[10px] overflow-x-auto scrollbar-hide pb-1">
              {pets.map((pet) => (
                <button
                  key={pet.id}
                  onClick={() => router.push(`/mypage/pets/${pet.id}`)}
                  className="flex-shrink-0 w-[240px] h-[100px] border border-[#E0E0E0] rounded-[8px] bg-white flex items-center gap-4 px-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#E0E0E0] overflow-hidden flex-shrink-0">
                    {pet.profileImageUrl && (
                      <img
                        src={pet.profileImageUrl}
                        alt={pet.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-0.5 text-left">
                    <span className="text-[14px] font-bold text-[#1F1F1F]">
                      {pet.name}
                    </span>
                    <span className="text-[14px] text-[#6B6B6B]">
                      {pet.breed}
                    </span>
                    {!pet.birthDateUnknown && (
                      <span className="text-[14px] text-[#6B6B6B]">
                        {calcAge(pet.birthDate)}{" "}
                        {pet.gender === "MALE" ? "남아" : "여아"}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="h-2 bg-[#F7F7F7]" />

        {/* 가족 초대 / 공동보호자 */}
        <div className="mx-5 mt-3">
          <button
            onClick={() => router.push("/mypage/guardians")}
            className="w-full flex items-center justify-between h-11"
          >
            <div className="flex items-center gap-2">
              <Image
                src="/images/icon_invite.png"
                alt="초대"
                width={24}
                height={24}
                unoptimized
              />
              <span className="text-[15px] font-medium text-[#1F1F1F] tracking-[-0.04em]">
                공동보호자 관리
              </span>
            </div>
            <ChevronRight size={20} className="text-[#1F1F1F]" />
          </button>

          {/* Invite code */}
          <div className="flex items-center justify-between bg-[#FDF7F2] rounded-[8px] px-4 py-3 mb-1">
            <div className="flex flex-col gap-0.5">
              <span className="text-[12px] text-[#9E9E9E]">내 초대코드</span>
              <span className="text-[18px] font-bold text-[#9F7248] tracking-widest">
                {inviteCode}
              </span>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 h-9 rounded-full border border-[#9F7248] text-[#9F7248] text-[13px] font-medium"
            >
              {copied ? (
                <>
                  <Check size={14} />
                  복사됨
                </>
              ) : (
                <>
                  <Copy size={14} />
                  복사하기
                </>
              )}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-2 bg-[#F7F7F7] mt-3" />

        {/* Menu items */}
        <div className="flex flex-col mx-5 mt-3">
          {MENU_ITEMS.map(({ label }) => (
            <button
              key={label}
              className="flex items-center justify-between h-11"
            >
              <span className="text-[15px] font-medium text-[#1F1F1F] tracking-[-0.04em]">
                {label}
              </span>
              <ChevronRight size={20} className="text-[#1F1F1F]" />
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="h-2 bg-[#F7F7F7] mt-3" />

        {/* Logout */}
        <div className="mx-5 mt-3">
          <button className="py-[10px]">
            <span className="text-[14px] font-medium text-[#9E9E9E] tracking-[-0.04em]">
              로그아웃
            </span>
          </button>
        </div>
      </div>

      <BottomNavigation />
    </CommonLayout>
  );
};
