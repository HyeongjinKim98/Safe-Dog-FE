"use client";

import { Card } from "@/shared/ui/card";
import { DiseaseCareType } from "../model/type";
import { Info, Check } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { DISEASE_TEMPLATES } from "@/features/diseaseCare/diseaseCareForm";

interface Props {
  selected: DiseaseCareType[];
  toggle: (key: DiseaseCareType) => void;
  onConfirm: () => void;
}

const DISEASE_KEY_MAP: Record<string, DiseaseCareType> = {
  heart: "heart",
  kidney: "kidney",
  cancer: "cancer",
  eye: "eye",
  cushing: "cushing",
  arthritis: "arthritis",
  etc: "other",
};

export const SelectDiseaseCare = ({ selected, toggle, onConfirm }: Props) => {
  const isSelected = (key: DiseaseCareType) => selected.includes(key);

  return (
    <div className="flex flex-col gap-[14px] px-5 py-4 flex-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-[#3D3D3D] text-sm font-medium">
          가이드 보기 <Info width="14" className="text-[#3D3D3D]" />
        </div>
        <span className="text-[#6B6B6B] text-xs">*중복 선택 가능</span>
      </div>

      <div className="grid grid-cols-2 gap-3 overflow-y-auto scrollbar-none pb-32">
        {DISEASE_TEMPLATES.map((t) => {
          const key = DISEASE_KEY_MAP[t.key];
          return (
            <Card
              key={t.key}
              onClick={() => toggle(key)}
              className={`flex flex-col items-center gap-2 p-4 cursor-pointer transition-colors rounded-[8px] ${
                isSelected(key)
                  ? "border-2 border-primary-500 shadow-[0px_0px_4px_rgba(217,191,163,1)]"
                  : "border border-[#E0E0E0]"
              }`}
            >
              <div className="text-2xl">{t.emoji}</div>
              <div className="flex items-center gap-1">
                {isSelected(key) && (
                  <Check width={14} className="text-primary-600" />
                )}
                <p className="text-sm text-[#3D3D3D]">{t.label}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="sticky bottom-0 flex justify-center pb-4">
        <Button
          onClick={onConfirm}
          disabled={selected.length === 0}
          className="w-30 rounded-[30px] bg-primary-500 text-white disabled:bg-[#EEEEEE] disabled:text-[#6B6B6B]"
        >
          {selected.length > 0
            ? `${selected.length}개 선택됨`
            : "항목을 선택해주세요"}
        </Button>
      </div>
    </div>
  );
};
