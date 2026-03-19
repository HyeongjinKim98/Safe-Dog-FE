"use client";

import { useEffect, useRef, useState } from "react";
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
import { Trash2, Image } from "lucide-react";
import { toast } from "sonner";

type MealTime = "아침" | "점심" | "저녁" | "직접입력";

interface SupplementItem {
  name: string;
  count: string;
  image: File | null;
  imagePreview: string | null;
}

interface SupplementRecord {
  time: string;
  item: SupplementItem;
}

const MEAL_TIMES: MealTime[] = ["아침", "점심", "저녁", "직접입력"];

const createEmptySupplement = (): SupplementItem => ({
  name: "",
  count: "1",
  image: null,
  imagePreview: null,
});

interface Props {
  onDelete: () => void;
  onDataChange: (data: unknown) => void;
}

export const SupplementNoteForm = ({ onDelete, onDataChange }: Props) => {
  const [selectedTime, setSelectedTime] = useState<MealTime | null>(null);
  const [customTime, setCustomTime] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [draft, setDraft] = useState<SupplementItem>(createEmptySupplement());
  const [registered, setRegistered] = useState<SupplementRecord | null>(null);

  const onDataChangeRef = useRef(onDataChange);
  useEffect(() => {
    onDataChangeRef.current = onDataChange;
  });
  useEffect(() => {
    onDataChangeRef.current(registered);
  }, [registered]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error("10MB의 사진만 등록이 가능합니다. 다시 시도해주세요.");
      return;
    }
    const preview = URL.createObjectURL(file);
    setDraft((prev) => ({ ...prev, image: file, imagePreview: preview }));
  };

  const handleOpenSheet = () => {
    const time = selectedTime === "직접입력" ? customTime : selectedTime;
    if (!time) {
      toast.error("시간대를 입력해주세요.");
      return;
    }
    setDraft(createEmptySupplement());
    setIsSheetOpen(true);
  };

  const handleComplete = () => {
    if (!draft.name.trim()) {
      toast.error("영양제 정보를 입력해주세요.");
      return;
    }
    const time =
      selectedTime === "직접입력" ? customTime : (selectedTime as string);
    setRegistered({ time, item: draft });
    toast.success("추가되었습니다.");
    setIsSheetOpen(false);
    setDraft(createEmptySupplement());
    setSelectedTime(null);
    setCustomTime("");
  };

  const handleDeleteRegistered = () => {
    setRegistered(null);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-4 bg-white">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-sm">💊 영양제</span>
        <button onClick={onDelete} className="text-gray-400">
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
        <span className="text-sm text-gray-600">영양제 정보 (선택)</span>
        <button
          onClick={handleOpenSheet}
          className="text-sm text-gray-400 border border-gray-200 rounded-lg px-3 py-2"
        >
          영양제 정보 입력
        </button>
      </div>

      {registered && (
        <div className="flex items-center gap-2 py-2 border-t">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
            {registered.item.imagePreview ? (
              <img
                src={registered.item.imagePreview}
                alt={registered.item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-base">💊</span>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-1 shrink-0">
              {registered.time}
            </span>
            <span className="text-sm text-gray-800 truncate">
              {registered.item.name}
            </span>
          </div>

          <Select
            value={registered.item.count}
            onValueChange={(val) =>
              setRegistered((prev) =>
                prev ? { ...prev, item: { ...prev.item, count: val } } : null,
              )
            }
          >
            <SelectTrigger className="w-20 h-8 text-sm shrink-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => String(i + 1)).map((n) => (
                <SelectItem key={n} value={n}>
                  {n}개
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <button
            onClick={handleDeleteRegistered}
            className="text-gray-300 shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-xl px-5 pb-8">
          <div className="flex items-center justify-between py-4 mb-2">
            <span className="text-base font-semibold">
              영양제 정보를 입력해주세요
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <label className="cursor-pointer flex-shrink-0">
                <div
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm ${
                    draft.imagePreview
                      ? "border-gray-800"
                      : "border-gray-200 text-gray-500"
                  }`}
                >
                  <Image className="w-4 h-4" />
                  사진등록
                </div>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.heic"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              <Input
                value={draft.name}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="직접입력"
                className="flex-1"
              />
            </div>

            {draft.imagePreview && (
              <div className="relative w-24 h-24">
                <img
                  src={draft.imagePreview}
                  alt="영양제 미리보기"
                  className="w-full h-full object-cover rounded-lg border border-gray-200"
                />
              </div>
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
