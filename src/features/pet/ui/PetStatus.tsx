import Image from "next/image";
import { MessageSquare } from "lucide-react";

interface PetStatusProps {
  petName?: string;
  achievement: number;
  memoTitle?: string;
  memoMessage?: string;
}

export const PetStatus = ({
  petName = "반려동물",
  achievement,
  memoTitle = "현재 도착한 메모가 없어요",
  memoMessage = "실시간으로 케어를 공유해보세요!",
}: PetStatusProps) => {
  return (
    <div className="mx-5 flex flex-col gap-5">
      {/* Pet info row */}
      <div className="flex items-center gap-[27px]">
        {/* Left column: texts + progress */}
        <div className="flex flex-col gap-5 flex-1">
          <div className="flex flex-col" style={{ gap: "-1px" }}>
            <p className="text-[20px] font-medium text-[#3D3D3D] leading-[1.6] tracking-[-0.04em]">
              {petName} 기분이 좋아보여요
            </p>
            <p className="text-[20px] font-semibold text-[#3D3D3D] leading-[1.6] tracking-[-0.04em]">
              오늘 케어가 안정적이예요!
            </p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <Image
              src="/images/emoji_90.png"
              alt="케어 상태 이모지"
              width={56}
              height={56}
              className="object-contain"
              unoptimized
            />
            <div className="relative w-full h-[26px] bg-[#E0E0E0] rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{
                  width: `${achievement}%`,
                  background:
                    "linear-gradient(90deg, #FFD08A 0%, #D5CF85 15%, #6BCB77 100%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center gap-1.5">
                <span className="text-[14px] font-medium text-white tracking-[-0.04em]">
                  케어 수행률
                </span>
                <span className="text-[18px] font-semibold text-white tracking-[-0.04em]">
                  {achievement}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dog image */}
        <div className="w-[134px] h-[134px] rounded-full overflow-hidden flex-shrink-0">
          <Image
            src="/images/dog_profile.png"
            alt="반려동물 프로필"
            width={134}
            height={134}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
      </div>

      {/* Memo alert card */}
      <div className="w-full h-[90px] bg-[#FFFCF8] border border-[#FFD08A] rounded-[8px] flex items-center gap-[10px] px-[10px]">
        <div className="w-[60px] h-[60px] flex items-center justify-center flex-shrink-0">
          <MessageSquare className="text-[#FFD08A]" size={32} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[14px] font-bold text-[#3D3D3D] leading-[1.17]">
            {memoTitle}
          </p>
          <p className="text-[14px] font-normal text-[#6B6B6B] leading-[1.57]">
            {memoMessage}
          </p>
        </div>
      </div>
    </div>
  );
};
