"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/shared/ui/button";
import { CareLog, Guardian } from "@/shared/types";
import { Check } from "lucide-react";

interface RequestDialogProps {
  open: boolean;
  onClose: () => void;
  onRequestSent?: (guardian: Guardian) => void;
  careLog: CareLog;
  guardians: Guardian[];
}

export const RequestDialog = ({
  open,
  onClose,
  onRequestSent,
  careLog,
  guardians,
}: RequestDialogProps) => {
  const [selectedGuardianId, setSelectedGuardianId] = useState<number | null>(
    null,
  );
  const [sent, setSent] = useState(false);

  const selectedGuardian = guardians.find((g) => g.id === selectedGuardianId);

  const handleSubmit = () => {
    if (!selectedGuardian) return;
    setSent(true);
    setTimeout(() => {
      onRequestSent?.(selectedGuardian);
      setSent(false);
      setSelectedGuardianId(null);
      onClose();
    }, 900);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-[18px] font-bold text-[#1F1F1F]">
            요청하기
          </DialogTitle>
        </DialogHeader>

        <p className="text-[14px] text-[#9E9E9E] text-center">
          선택한 항목을 누구에게 요청할까요?
        </p>

        <div className="flex items-center gap-2 px-4 py-3 rounded-[12px] border border-[#FFD08A] bg-[#FFFCF8]">
          <span className="text-[12px] px-2 py-0.5 rounded-full bg-[#FFF0D9] text-[#FF9500] font-medium flex-shrink-0">
            {careLog.careTypeDescription}
          </span>
          <span className="text-[14px] text-[#3D3D3D] truncate">
            {careLog.title} · {careLog.content}
          </span>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-[14px] text-[#1F1F1F]">
              공동보호자
            </span>
            <span className="text-[12px] text-[#9E9E9E]">
              멤버 {guardians.length}명
            </span>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1">
            {guardians.map((guardian) => (
              <button
                key={guardian.id}
                onClick={() => setSelectedGuardianId(guardian.id)}
                className="flex flex-col items-center gap-1.5 flex-shrink-0"
              >
                <div
                  className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-colors relative ${
                    selectedGuardianId === guardian.id
                      ? "border-[#9F7248]"
                      : "border-transparent"
                  }`}
                >
                  {guardian.profileImageUrl ? (
                    <img
                      src={guardian.profileImageUrl}
                      alt={guardian.nickname}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#E0E0E0] flex items-center justify-center">
                      <span className="text-[18px] font-bold text-[#9E9E9E]">
                        {guardian.nickname[0]}
                      </span>
                    </div>
                  )}
                  {selectedGuardianId === guardian.id && (
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#9F7248] rounded-full flex items-center justify-center">
                      <Check size={10} className="text-white" />
                    </div>
                  )}
                </div>
                <span className="text-[12px] text-[#6B6B6B]">
                  {guardian.nickname}
                </span>
              </button>
            ))}
          </div>
        </div>

        <Button
          className="w-full h-[52px] rounded-full text-[16px] font-semibold"
          style={
            selectedGuardianId && !sent
              ? {
                  background:
                    "linear-gradient(147deg, #FFD08A 0%, #FFB84C 100%)",
                  color: "white",
                }
              : {}
          }
          disabled={!selectedGuardianId || sent}
          onClick={handleSubmit}
        >
          {sent ? "요청 완료! 🎉" : "요청 보내기"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
