"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Sheet, SheetContent } from "@/shared/ui/sheet";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type MealTime = "아침" | "점심" | "저녁" | "직접입력";

const MEAL_TIMES: MealTime[] = ["아침", "점심", "저녁", "직접입력"];

interface WalkRecord {
  time: string;
  duration: string;
  note: string;
}

export const WalkNoteForm = () => {
  const [selectedTime, setSelectedTime] = useState<MealTime | null>(null);
  const [customTime, setCustomTime] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [duration, setDuration] = useState("");
  const [note, setNote] = useState("");
  const [records, setRecords] = useState<WalkRecord[]>([]);

  const handleOpenSheet = () => {
    const time = selectedTime === "직접입력" ? customTime : selectedTime;
    if (!time) {
      toast.error("시간대를 입력해주세요.");
      return;
    }
    setDuration("");
    setNote("");
    setIsSheetOpen(true);
  };

  const handleComplete = () => {
    const time =
      selectedTime === "직접입력" ? customTime : (selectedTime as string);
    setRecords((prev) => [...prev, { time, duration, note }]);
    toast.success("추가되었습니다.");
    setIsSheetOpen(false);
    setSelectedTime(null);
    setCustomTime("");
    setDuration("");
    setNote("");
  };

  const handleDelete = (index: number) => {
    setRecords((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-4 bg-white">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-sm">🐕 산책</span>
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
        <span className="text-sm text-gray-600">산책량 (선택)</span>
        <button
          onClick={handleOpenSheet}
          className="text-sm text-gray-400 border border-gray-200 rounded-lg px-3 py-2"
        >
          산책량 입력
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
                  {record.duration}분
                </span>
                {record.note && (
                  <span className="text-xs text-gray-400 truncate">
                    {record.note}
                  </span>
                )}
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

      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-600">산책 특이사항 (선택)</span>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="특이사항을 입력해주세요"
          className="resize-none text-sm"
          rows={3}
        />
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-xl px-5 pb-8">
          <div className="py-4 mb-2">
            <span className="text-base font-semibold">
              산책량을 입력해주세요
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="0"
                className="flex-1 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="text-sm text-gray-500 shrink-0">분</span>
            </div>

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
