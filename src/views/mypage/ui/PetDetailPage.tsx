"use client";
import { useRouter } from "next/navigation";
import { CommonLayout } from "@/widgets/CommonLayout";
import { Header } from "@/widgets/Header";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Pet } from "@/shared/types";
import { calcAge } from "@/shared/lib/date";

type Props = {
  pet: Pet;
};

const DISEASE_LABELS: Record<string, string> = {
  HEART_DISEASE: "심장병",
  DIABETES: "당뇨병",
  KIDNEY_DISEASE: "신장병",
  CANCER: "암",
  EYE_DISEASE: "안과 질환",
  CUSHING: "쿠싱증후군",
  ARTHRITIS: "관절염",
  PATELLAR_LUXATION: "슬개골 탈구",
  OTHER: "기타",
};

export const PetDetailPage = ({ pet }: Props) => {
  const router = useRouter();

  const infoFields = [
    { label: "품종", value: pet.breed || "-" },
    {
      label: "나이",
      value: pet.birthDateUnknown ? "모름" : calcAge(pet.birthDate),
    },
    { label: "성별", value: pet.gender === "MALE" ? "남아" : "여아" },
    { label: "중성화", value: pet.neutered ? "유" : "무" },
    {
      label: "몸무게",
      value: pet.weightUnknown ? "모름" : `${pet.weight}kg`,
    },
  ];

  return (
    <CommonLayout backgroundColor="bg-white">
      <Header
        left={
          <button onClick={() => router.back()}>
            <ArrowLeft className="w-6 h-6 text-[#1F1F1F]" />
          </button>
        }
        title="반려동물 상세"
        right={
          <button className="border border-[#C2C2C2] rounded-[8px] px-[14px] h-[34px] flex items-center">
            <span className="text-[14px] font-medium text-[#C2C2C2]">
              정보 수정
            </span>
          </button>
        }
      />

      <div className="flex flex-col flex-1 overflow-y-auto pb-8">
        {/* Avatar */}
        <div className="flex justify-center mt-4">
          <div className="w-[120px] h-[120px] rounded-full bg-[#E0E0E0] overflow-hidden">
            {pet.profileImageUrl && (
              <img
                src={pet.profileImageUrl}
                alt={pet.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Name badge */}
        <div className="flex justify-center mt-3">
          <div className="bg-[#F7F7F7] rounded-[12px] px-5 py-2">
            <span className="text-[16px] font-bold text-[#1F1F1F]">
              {pet.name}
            </span>
          </div>
        </div>

        {/* Info card */}
        <div className="mx-5 mt-5 border border-[#C2C2C2] rounded-[12px] p-5 flex gap-[10px]">
          {/* Left: General info */}
          <div className="flex flex-col gap-3 flex-1">
            <span className="text-[16px] font-bold text-[#1F1F1F]">
              일반 정보
            </span>
            {infoFields.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-[14px] text-[#9E9E9E]">{label}</span>
                <span className="text-[16px] font-medium text-[#3D3D3D]">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="w-px bg-[#E0E0E0] self-stretch" />

          {/* Right: Disease info */}
          <div className="flex flex-col gap-3 flex-1">
            <span className="text-[16px] font-bold text-[#1F1F1F]">
              질병 정보
            </span>
            {pet.diseases.length === 0 ? (
              <span className="text-[14px] text-[#9E9E9E]">없음</span>
            ) : (
              <div className="flex flex-wrap gap-2">
                {pet.diseases.map((disease) => (
                  <div
                    key={disease}
                    className="bg-[#FFFCF8] border border-[#D9CBBE] rounded-[42px] h-[34px] px-3 flex items-center"
                  >
                    <span className="text-[13px] font-medium text-[#3D3D3D]">
                      {DISEASE_LABELS[disease] ?? disease}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Guardian info */}
        <button
          onClick={() => router.push("/mypage/guardians")}
          className="mx-5 mt-4 border border-[#C2C2C2] rounded-[12px] px-5 py-[14px] flex items-center justify-between"
        >
          <span className="text-[16px] font-bold text-[#1F1F1F]">
            보호자 정보
          </span>
          <ChevronRight size={20} className="text-[#1F1F1F]" />
        </button>
      </div>
    </CommonLayout>
  );
};
