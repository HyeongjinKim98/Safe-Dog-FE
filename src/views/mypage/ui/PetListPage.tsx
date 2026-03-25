"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CommonLayout } from "@/widgets/CommonLayout";
import { Header } from "@/widgets/Header";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Pet } from "@/shared/types";
import { calcAge } from "@/shared/lib/date";

type Props = {
  myPets: Pet[];
  sharedPets: Pet[];
};

export const PetListPage = ({ myPets, sharedPets }: Props) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"my" | "shared">("my");
  const [sortOrder, setSortOrder] = useState<"oldest" | "newest">("oldest");

  const pets = activeTab === "my" ? myPets : sharedPets;
  const sortedPets = [...pets].sort((a, b) => {
    const diff =
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return sortOrder === "oldest" ? diff : -diff;
  });

  return (
    <CommonLayout backgroundColor="bg-white">
      <Header
        left={
          <button onClick={() => router.back()}>
            <ArrowLeft className="w-6 h-6 text-[#1F1F1F]" />
          </button>
        }
        title="반려동물 목록"
      />

      {/* Tabs */}
      <div className="flex border-b border-[#EEEEEE]">
        {(["my", "shared"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 h-12 text-[15px] relative ${
              activeTab === tab
                ? "font-bold text-[#1F1F1F]"
                : "font-medium text-[#C2C2C2]"
            }`}
          >
            {tab === "my" ? "내가 등록한 반려동물" : "공유받은 반려동물"}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1F1F1F]" />
            )}
          </button>
        ))}
      </div>

      {/* Sort filter */}
      <div className="flex items-center justify-end gap-5 px-5 py-3">
        {(["oldest", "newest"] as const).map((order) => (
          <button
            key={order}
            onClick={() => setSortOrder(order)}
            className="flex items-center gap-1.5"
          >
            <div
              className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                sortOrder === order
                  ? "border-[#1F1F1F]"
                  : "border-[#9E9E9E]"
              }`}
            >
              {sortOrder === order && (
                <div className="w-[6px] h-[6px] rounded-full bg-[#1F1F1F]" />
              )}
            </div>
            <span className="text-[13px] text-[#3D3D3D]">
              {order === "oldest" ? "오래된순" : "최신순"}
            </span>
          </button>
        ))}
      </div>

      {/* Pet list */}
      <div className="flex flex-col overflow-y-auto flex-1">
        {sortedPets.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-20">
            <p className="text-[14px] text-[#9E9E9E]">
              {activeTab === "my"
                ? "등록된 반려동물이 없어요"
                : "공유받은 반려동물이 없어요"}
            </p>
          </div>
        ) : (
          sortedPets.map((pet) => (
            <button
              key={pet.id}
              onClick={() => router.push(`/mypage/pets/${pet.id}`)}
              className="flex items-center gap-4 px-5 h-[106px] border-b border-[#EEEEEE]"
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
              <div className="flex flex-col gap-1 flex-1 text-left">
                <span className="text-[16px] font-medium text-[#1F1F1F]">
                  {pet.name}
                </span>
                {!pet.birthDateUnknown && (
                  <span className="text-[13px] text-[#9E9E9E]">
                    {calcAge(pet.birthDate)} ·{" "}
                    {pet.gender === "MALE" ? "남아" : "여아"}
                  </span>
                )}
              </div>
              <ChevronRight
                size={20}
                className="text-[#1F1F1F] flex-shrink-0"
              />
            </button>
          ))
        )}
      </div>
    </CommonLayout>
  );
};
