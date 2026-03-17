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
    <div className="p-6">
      <div className="sticky top-0 flex my-4">
        <div className="flex ">
          가이드 보기 <Info width="16" />
        </div>
        <div className="text-muted-foreground text-sm flex ml-auto">
          *중복 선택 가능
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 overflow-y-auto scrollbar-none max-h-[calc(100vh-200px)] pb-30">
        {BASIC_CARE_ITEMS.map((e) => (
          <Card
            key={e.key}
            onClick={() => toggle(e.key)}
            className={`flex flex-col items-center cursor-pointer transition-colors box-border border-2 ${
              isSelected(e.key) ? "border-black" : "border-gray-100"
            }`}
          >
            <div className="bg-gray-400 w-8 h-8 rounded-full" />
            <div className="flex items-center gap-1">
              {isSelected(e.key) && <Check width={14} />}
              <p>{e.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="sticky bottom-6 left-0 right-0 flex justify-center px-6">
        <Button
          onClick={onConfirm}
          disabled={selected.length === 0}
          className="w-full h-12 rounded-full"
        >
          {selected.length > 0
            ? `${selected.length}개 선택됨`
            : "항목을 선택해주세요"}
        </Button>
      </div>
    </div>
  );
};
