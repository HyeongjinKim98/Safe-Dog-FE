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
import { Trash2, X, Image } from "lucide-react";
import { toast } from "sonner";

interface SnackItem {
  name: string;
  count: string;
  image: File | null;
  imagePreview: string | null;
}

const createEmptySnack = (): SnackItem => ({
  name: "",
  count: "1",
  image: null,
  imagePreview: null,
});

export const SnackNoteForm = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [draft, setDraft] = useState<SnackItem>(createEmptySnack());
  const [registered, setRegistered] = useState<SnackItem | null>(null);

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

  const handleComplete = () => {
    if (!draft.name.trim()) {
      toast.error("간식 정보를 입력해주세요.");
      return;
    }
    setRegistered(draft);
    toast.success("추가되었습니다.");
    setIsSheetOpen(false);
    setDraft(createEmptySnack());
  };

  const handleDelete = () => {
    setRegistered(null);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-4 bg-white">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <span className="font-semibold text-sm">🍬 간식</span>
        <button className="text-gray-400">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* 간식 정보 입력 버튼 */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">간식 정보 (선택)</span>
        <button
          onClick={() => setIsSheetOpen(true)}
          className="text-sm text-gray-400 border border-gray-200 rounded-lg px-3 py-2"
        >
          간식 정보 입력
        </button>
      </div>

      {/* 등록된 간식 */}
      {registered && (
        <div className="flex items-center gap-2 py-2 border-t">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
            {registered.imagePreview ? (
              <img
                src={registered.imagePreview}
                alt={registered.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-base">🍬</span>
            )}
          </div>

          <span className="text-sm text-gray-800 flex-1 truncate">
            {registered.name}
          </span>

          <Select
            value={registered.count}
            onValueChange={(val) =>
              setRegistered((prev) => prev && { ...prev, count: val })
            }
          >
            <SelectTrigger className="w-20 h-8 text-sm">
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

          <button onClick={handleDelete} className="text-gray-300 shrink-0">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 바텀시트 */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-xl px-5 pb-8">
          <div className="flex items-center justify-between py-4 mb-2">
            <span className="text-base font-semibold">
              간식 정보를 입력해주세요
            </span>
            <button
              onClick={() => setIsSheetOpen(false)}
              className="text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
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
                  alt="간식 미리보기"
                  className="w-full h-full object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() =>
                    setDraft((prev) => ({
                      ...prev,
                      image: null,
                      imagePreview: null,
                    }))
                  }
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
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
