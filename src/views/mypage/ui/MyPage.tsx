"use client";
import { useRouter } from "next/navigation";
import { CommonLayout } from "@/widgets/CommonLayout";
import { Header } from "@/widgets/Header";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Pet, User } from "@/shared/types";
import { calcAge } from "@/shared/lib/date";
import { BottomNavigation } from "@/widgets/BottomNavigation";
type Props = {
  profile: User;
  pets: Pet[];
};

const MENU_ITEMS = [
  { label: "초대코드가 있으신가요?" },
  { label: "마케팅 정보 알림 설정" },
  { label: "약관 및 정책" },
  { label: "공지사항" },
  { label: "로그아웃", danger: true },
];

export const MyPage = ({ profile, pets }: Props) => {
  const router = useRouter();
  return (
    <CommonLayout>
      <Header left={<ChevronLeft />} title="마이페이지" />

      <div className="flex flex-col">
        <button
          onClick={() => router.push("/mypage/edit")}
          className="flex items-center gap-4 px-6 py-5 border-b border-gray-100"
        >
          <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
            {profile.profileImageUrl && (
              <img
                src={profile.profileImageUrl}
                alt={profile.nickname}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col items-start flex-1">
            <span className="font-bold text-lg">{profile.nickname}</span>
            <span className="text-sm text-gray-400">{profile.email}</span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </button>

        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex justify-between">
            <h2 className="font-semibold text-base mb-3">등록된 반려동물</h2>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1">
            {pets.map((pet) => (
              <div key={pet.id} className="flex items-center gap-2 ">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                    {pet.profileImageUrl && (
                      <img
                        src={pet.profileImageUrl}
                        alt={pet.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col w-20">
                  <span className="text-sm font-medium mb-1">{pet.name}</span>
                  <span className="text-xs text-gray-400">{pet.breed}</span>
                  {!pet.birthDateUnknown && (
                    <span className="text-xs text-gray-400">
                      {calcAge(pet.birthDate)}{" "}
                      {pet.gender === "MALE" ? "남아" : "여아"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          {MENU_ITEMS.map(({ label, danger }) => (
            <button
              key={label}
              //   onClick={() => {}}
              className={`flex items-center justify-between px-6 py-4 border-b border-gray-100 ${
                danger ? "text-red-400" : "text-gray-700"
              }`}
            >
              <span className="text-sm">{label}</span>
              {!danger && <ChevronRight size={16} className="text-gray-400" />}
            </button>
          ))}
        </div>
      </div>
      <BottomNavigation />
    </CommonLayout>
  );
};
