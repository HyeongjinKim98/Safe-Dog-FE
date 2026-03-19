"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/shared/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type MealTime = "아침" | "점심" | "저녁" | "직접입력";
type WaterUnit = "ml" | "컵" | "밥그릇" | "직접입력";

interface WaterRecord {
  time: string;
  amount: string;
  unit: WaterUnit;
  customUnit: string;
}

const MEAL_TIMES: MealTime[] = ["아침", "점심", "저녁", "직접입력"];
const WATER_UNITS: WaterUnit[] = ["ml", "컵", "밥그릇", "직접입력"];

interface Props {
  onDelete: () => void;
}

export const WaterNoteForm = () => {
  const [selectedTime, setSelectedTime] = useState<MealTime | null>(null);
  const [customTime, setCustomTime] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState<WaterUnit>("ml");
  const [customUnit, setCustomUnit] = useState("");
  const [records, setRecords] = useState<WaterRecord[]>([]);

  const handleOpenSheet = () => {
    const time = selectedTime === "직접입력" ? customTime : selectedTime;
    if (!time) {
      toast.error("시간대를 입력해주세요.");
      return;
    }
    setAmount("");
    setUnit("ml");
    setCustomUnit("");
    setIsSheetOpen(true);
  };

  const handleComplete = () => {
    const time =
      selectedTime === "직접입력" ? customTime : (selectedTime as string);
    setRecords((prev) => [...prev, { time, amount, unit, customUnit }]);
    toast.success("추가되었습니다.");
    setIsSheetOpen(false);
    setSelectedTime(null);
    setCustomTime("");
    setAmount("");
    setUnit("ml");
    setCustomUnit("");
  };

  const handleDelete = (index: number) => {
    setRecords((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-4 bg-white">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-sm">💧 급수</span>
        <button className="text-gray-400">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm">시간대</span>
        <div className="grid grid-cols-4 gap-2">
          {MEAL_TIMES.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTime(t)}
              className={`py-2 rounded-lg border text-sm ${
                selectedTime === t
                  ? "border-gray-800 bg-gray-800 text-white"
                  : "border-gray-200 text-gray-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        {selectedTime === "직접입력" && (
          <Input
            placeholder="직접 입력해주세요 (예: 아점, 야식)"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
          />
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">제공량 (선택)</span>
        <button
          onClick={handleOpenSheet}
          className="text-sm text-gray-400 border border-gray-200 rounded-lg px-3 py-2"
        >
          제공량 입력
        </button>
      </div>

      {records.length > 0 && (
        <div className="flex flex-col">
          {records.map((record, index) => (
            <div
              key={index}
              className="flex items-center gap-2 py-2 border-b last:border-b-0"
            >
              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-1 shrink-0">
                  {record.time}
                </span>
                <span className="text-sm text-gray-800">
                  {record.amount}
                  {record.unit === "직접입력" ? record.customUnit : record.unit}
                </span>
              </div>
              <button
                onClick={() => handleDelete(index)}
                className="text-gray-300 shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-xl px-5 pb-8">
          <div className="flex items-center justify-between py-4 mb-2">
            <span className="text-base font-semibold">
              제공량을 입력해주세요
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Input
                type={unit === "직접입력" ? "text" : "number"}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="flex-1 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <Select
                value={unit}
                onValueChange={(val) => {
                  setUnit(val as WaterUnit);
                  setAmount("");
                  setCustomUnit("");
                }}
              >
                <SelectTrigger className="w-24 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {WATER_UNITS.map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {unit === "직접입력" && (
              <Input
                value={customUnit}
                onChange={(e) => setCustomUnit(e.target.value)}
                placeholder="단위를 입력해주세요"
              />
            )}

            <Button
              onClick={handleComplete}
              className="w-full h-14 rounded-full"
            >
              입력완료
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
