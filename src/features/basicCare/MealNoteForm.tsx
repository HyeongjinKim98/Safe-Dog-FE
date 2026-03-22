"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle } from "@/shared/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Trash2, Plus, X, Image } from "lucide-react";
import { toast } from "sonner";

type MealTime = "아침" | "점심" | "저녁" | "직접입력";
type FeedType = "건사료" | "습식" | "혼합급여";
type FeedUnit = "g" | "컵" | "밥그릇" | "직접입력";

interface FeedItem {
  id: string;
  type: FeedType | null;
  name: string;
  image: File | null;
  imagePreview: string | null;
}

interface FeedAmount {
  amount: string;
  unit: FeedUnit;
  customUnit: string;
}

interface MealRecord {
  id: string;
  time: string;
  feeds: FeedItem[];
  amounts: Record<string, FeedAmount>;
}

const MEAL_TIMES: MealTime[] = ["아침", "점심", "저녁", "직접입력"];
const FEED_TYPES: FeedType[] = ["건사료", "습식", "혼합급여"];
const FEED_UNITS: FeedUnit[] = ["g", "컵", "밥그릇", "직접입력"];

const createEmptyFeed = (): FeedItem => ({
  id: crypto.randomUUID(),
  type: null,
  name: "",
  image: null,
  imagePreview: null,
});

const createEmptyAmount = (): FeedAmount => ({
  amount: "0",
  unit: "g",
  customUnit: "",
});

interface FeedFormProps {
  feed: FeedItem;
  onChange: (updated: FeedItem) => void;
}

const FeedForm = ({ feed, onChange }: FeedFormProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error("10MB의 사진만 등록이 가능합니다. 다시 시도해주세요.");
      return;
    }
    const preview = URL.createObjectURL(file);
    onChange({ ...feed, image: file, imagePreview: preview });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-2">
        {FEED_TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onChange({ ...feed, type: t })}
            className={`py-2 rounded-lg border text-sm ${
              feed.type === t
                ? "border-gray-800 bg-gray-800 text-white"
                : "border-gray-200 text-gray-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex gap-2 items-center">
        <label className="cursor-pointer flex-shrink-0">
          <div
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm ${
              feed.imagePreview
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
          value={feed.name}
          onChange={(e) => onChange({ ...feed, name: e.target.value })}
          placeholder="직접입력"
          className="flex-1"
        />
      </div>

      {feed.imagePreview && (
        <div className="relative w-24 h-24">
          <img
            src={feed.imagePreview}
            alt="사료 미리보기"
            className="w-full h-full object-cover rounded-lg border border-gray-200"
          />
        </div>
      )}
    </div>
  );
};

interface FeedRowProps {
  feed: FeedItem;
  time: string;
  amount: FeedAmount;
  onAmountChange: (updated: FeedAmount) => void;
  onDelete: () => void;
}

const FeedRow = ({
  feed,
  time,
  amount,
  onAmountChange,
  onDelete,
}: FeedRowProps) => {
  return (
    <div className="flex items-center gap-2 py-2 border-b last:border-b-0">
      <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
        {feed.imagePreview ? (
          <img
            src={feed.imagePreview}
            alt={feed.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-base">🐾</span>
        )}
      </div>

      <div className="flex items-center gap-1.5 flex-1 min-w-0">
        <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-1 shrink-0">
          {time}
        </span>
        {feed.type && (
          <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-1 shrink-0">
            {feed.type}
          </span>
        )}
        <span className="text-sm text-gray-800 truncate">{feed.name}</span>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <Input
          type={amount.unit === "직접입력" ? "text" : "number"}
          value={amount.amount}
          onChange={(e) =>
            onAmountChange({ ...amount, amount: e.target.value })
          }
          className="w-14 h-8 text-sm text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          placeholder="0"
        />
        <Select
          value={amount.unit}
          onValueChange={(val) =>
            onAmountChange({ ...amount, unit: val as FeedUnit, amount: "" })
          }
        >
          <SelectTrigger className="w-20 h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FEED_UNITS.map((u) => (
              <SelectItem key={u} value={u}>
                {u}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <button onClick={onDelete} className="text-gray-300 shrink-0">
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

interface Props {
  onDelete: () => void;
  onDataChange: (data: unknown) => void;
}

export const MealNoteForm = ({ onDelete, onDataChange }: Props) => {
  const [selectedTime, setSelectedTime] = useState<MealTime | null>(null);
  const [customTime, setCustomTime] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [feeds, setFeeds] = useState<FeedItem[]>([createEmptyFeed()]);
  const [confirmedFeeds, setConfirmedFeeds] = useState<FeedItem[]>([]);
  const [mealRecords, setMealRecords] = useState<MealRecord[]>([]);

  const onDataChangeRef = useRef(onDataChange);
  useEffect(() => {
    onDataChangeRef.current = onDataChange;
  });
  useEffect(() => {
    onDataChangeRef.current(mealRecords);
  }, [mealRecords]);

  const handleOpenSheet = () => {
    const time = selectedTime === "직접입력" ? customTime : selectedTime;
    if (!time) {
      toast.error("시간대를 입력해주세요.");
      return;
    }
    setFeeds([createEmptyFeed()]);
    setConfirmedFeeds([]);
    setIsSheetOpen(true);
  };

  const updateFeed = (index: number, updated: FeedItem) => {
    setFeeds((prev) => prev.map((f, i) => (i === index ? updated : f)));
  };

  const handleAddFeed = () => {
    const current = feeds[feeds.length - 1];
    if (!current.type) {
      toast.error("사료 종류를 선택해주세요.");
      return;
    }
    if (!current.name.trim()) {
      toast.error("사료 정보를 입력해주세요.");
      return;
    }
    setConfirmedFeeds((prev) => [...prev, current]);
    setFeeds([createEmptyFeed()]);
  };

  const handleComplete = () => {
    const current = feeds[feeds.length - 1];
    const currentIsEmpty = !current.type && !current.name.trim();

    if (!currentIsEmpty) {
      if (!current.type) {
        toast.error("사료 종류를 선택해주세요.");
        return;
      }
      if (!current.name.trim()) {
        toast.error("사료 정보를 입력해주세요.");
        return;
      }
    }

    const allFeeds = currentIsEmpty
      ? confirmedFeeds
      : [...confirmedFeeds, current];

    if (allFeeds.length === 0) {
      toast.error("사료 정보를 입력해주세요.");
      return;
    }

    const time =
      selectedTime === "직접입력" ? customTime : (selectedTime as string);

    const initialAmounts: Record<string, FeedAmount> = {};
    allFeeds.forEach((f) => {
      initialAmounts[f.id] = createEmptyAmount();
    });

    setMealRecords((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        time,
        feeds: allFeeds,
        amounts: initialAmounts,
      },
    ]);
    toast.success("추가되었습니다.");
    setIsSheetOpen(false);
    setFeeds([createEmptyFeed()]);
    setConfirmedFeeds([]);
    setSelectedTime(null);
    setCustomTime("");
  };

  const updateAmount = (
    recordId: string,
    feedId: string,
    updated: FeedAmount,
  ) => {
    setMealRecords((prev) =>
      prev.map((r) =>
        r.id === recordId
          ? { ...r, amounts: { ...r.amounts, [feedId]: updated } }
          : r,
      ),
    );
  };

  const handleDeleteFeed = (recordId: string, feedId: string) => {
    setMealRecords(
      (prev) =>
        prev
          .map((r) => {
            if (r.id !== recordId) return r;
            const newFeeds = r.feeds.filter((f) => f.id !== feedId);
            if (newFeeds.length === 0) return null;
            const newAmounts = { ...r.amounts };
            delete newAmounts[feedId];
            return { ...r, feeds: newFeeds, amounts: newAmounts };
          })
          .filter(Boolean) as MealRecord[],
    );
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-4 bg-white">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-sm">🍽 식사</span>
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
        <span className="text-sm text-gray-600">사료 정보 (선택)</span>
        <button
          onClick={handleOpenSheet}
          className="text-sm text-gray-400 border border-gray-200 rounded-lg px-3 py-2"
        >
          사료 정보 입력
        </button>
      </div>

      {mealRecords.length > 0 && (
        <div className="flex flex-col">
          {mealRecords.map((record) =>
            record.feeds.map((feed) => (
              <FeedRow
                key={feed.id}
                feed={feed}
                time={record.time}
                amount={record.amounts[feed.id]}
                onAmountChange={(updated) =>
                  updateAmount(record.id, feed.id, updated)
                }
                onDelete={() => handleDeleteFeed(record.id, feed.id)}
              />
            )),
          )}
        </div>
      )}

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-xl px-5 pb-8">
          <div className="flex items-center justify-between py-4 mb-2">
            <SheetTitle className="text-base font-semibold">
              사료정보를 입력해주세요
            </SheetTitle>
          </div>

          <div className="flex flex-col gap-4">
            {confirmedFeeds.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {confirmedFeeds.map((f) => (
                  <span
                    key={f.id}
                    className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-600"
                  >
                    {f.type} · {f.name}
                  </span>
                ))}
              </div>
            )}

            {feeds.map((feed, index) => (
              <FeedForm
                key={feed.id}
                feed={feed}
                onChange={(updated) => updateFeed(index, updated)}
              />
            ))}

            <div className="flex justify-end">
              <button
                onClick={handleAddFeed}
                className="flex items-center gap-1 text-sm text-gray-500"
              >
                <Plus className="w-4 h-4" />
                사료추가
              </button>
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
