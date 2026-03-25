import { Card } from "@/shared/ui/card";
import { BasicCareType } from "../model/type";
import { Info, Check } from "lucide-react";
import { BASIC_CARE_ITEMS } from "../model/constants";
import { useState } from "react";
import { Button } from "@/shared/ui/button";

interface Props {
  selected: BasicCareType[];
  toggle: (key: BasicCareType) => void;
  onConfirm: () => void;
}

export const SelectBasicCare = ({ selected, toggle, onConfirm }: Props) => {
  const isSelected = (key: BasicCareType) => selected.includes(key);
  return (
    <div className="flex flex-col gap-[14px] px-5 py-4 flex-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-[#3D3D3D] text-sm font-medium">
          가이드 보기 <Info width="14" className="text-[#3D3D3D]" />
        </div>
        <span className="text-[#6B6B6B] text-xs">*중복 선택 가능</span>
      </div>

      <div className="grid grid-cols-2 gap-3 overflow-y-auto scrollbar-none pb-32">
        {BASIC_CARE_ITEMS.map((e) => (
          <Card
            key={e.key}
            onClick={() => toggle(e.key)}
            className={`flex flex-col items-center gap-2 p-4 cursor-pointer transition-colors rounded-[8px] ${
              isSelected(e.key)
                ? "border-2 border-primary-500 shadow-[0px_0px_4px_rgba(217,191,163,1)]"
                : "border border-[#E0E0E0]"
            }`}
          >
            <div className="bg-[#F7F7F7] w-8 h-8 rounded-full" />
            <div className="flex items-center gap-1">
              {isSelected(e.key) && <Check width={14} className="text-primary-600" />}
              <p className="text-sm text-[#3D3D3D]">{e.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="sticky bottom-0 flex justify-center pb-4">
        <Button
          onClick={onConfirm}
          disabled={selected.length === 0}
          className="w-[350px] h-[58px] rounded-[30px] bg-primary-600 text-white disabled:bg-[#EEEEEE] disabled:text-[#6B6B6B]"
        >
          {selected.length > 0
            ? `${selected.length}개 선택됨`
            : "항목을 선택해주세요"}
        </Button>
      </div>
    </div>
  );
};
