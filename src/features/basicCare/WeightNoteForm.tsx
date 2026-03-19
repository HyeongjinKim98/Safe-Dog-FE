"use client";

import { useState } from "react";
import { Switch } from "@/shared/ui/switch";
import { Trash2 } from "lucide-react";

export const WeightNoteForm = () => {
  const [requested, setRequested] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-4 bg-white">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-sm">⚖️ 체중</span>
        <button className="text-gray-400">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-sm">몸무게 입력 요청</span>
          <Switch checked={requested} onCheckedChange={setRequested} />
        </div>
        <p className="text-xs text-muted-foreground">
          주기에 맞게 몸무게 입력 요청하기
        </p>
      </div>
    </div>
  );
};
