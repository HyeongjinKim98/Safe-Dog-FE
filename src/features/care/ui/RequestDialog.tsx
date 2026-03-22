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

interface RequestDialogProps {
  open: boolean;
  onClose: () => void;
  careLog: CareLog;
  guardians: Guardian[];
}

export const RequestDialog = ({
  open,
  onClose,
  careLog,
  guardians,
}: RequestDialogProps) => {
  const [selectedGuardianId, setSelectedGuardianId] = useState<number | null>(
    null,
  );

  const handleSubmit = () => {
    if (!selectedGuardianId) return;
    console.log("요청 보내기", { careLog, selectedGuardianId });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold">
            요청하기
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-500 text-center">
          선택한 항목을 누구에게 요청할까요?
        </p>

        <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-orange-300 bg-orange-50">
          <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-500 font-medium flex-shrink-0">
            {careLog.careTypeDescription}
          </span>
          <span className="text-sm text-gray-700 truncate">
            · {careLog.content}
          </span>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-sm">공동보호자</span>
            <span className="text-xs text-gray-400">
              멤버 {guardians.length}명
            </span>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1">
            {guardians.map((guardian) => (
              <button
                key={guardian.id}
                onClick={() => setSelectedGuardianId(guardian.id)}
                className="flex flex-col items-center gap-1 flex-shrink-0"
              >
                <div
                  className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-colors ${
                    selectedGuardianId === guardian.id
                      ? "border-orange-400"
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
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>
                <span className="text-xs text-gray-600">
                  {guardian.nickname}
                </span>
              </button>
            ))}
          </div>
        </div>

        <Button
          className="w-full h-12 rounded-full bg-black text-white font-semibold"
          disabled={!selectedGuardianId}
          onClick={handleSubmit}
        >
          요청 보내기
        </Button>
      </DialogContent>
    </Dialog>
  );
};
