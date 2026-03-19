"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Switch } from "@/shared/ui/switch";
import { Trash2, Plus } from "lucide-react";

export interface DiseaseTemplate {
  key: string;
  label: string;
  emoji: string;
  defaultItems: string[];
}

export const DISEASE_TEMPLATES: DiseaseTemplate[] = [
  {
    key: "heart",
    label: "심장병",
    emoji: "🫀",
    defaultItems: [
      "수면 중 안정 시 호흡수(SRR) 측정 및 기록",
      "점막(혀/잇몸) 색깔 및 기침 양상 관찰",
      "날씨 확인 후 산책",
      "식후 즉시 활동 금지 및 휴식 유도",
    ],
  },
  {
    key: "kidney",
    label: "신장질환",
    emoji: "🫘",
    defaultItems: [
      "피부 탄력(탈수) 테스트",
      "구강 및 잇몸 상태(악취, 궤양) 관찰",
      "물그릇 세척 및 신선한 물 교체",
      "음수 유도(입 가까이 물 대주기)",
    ],
  },
  {
    key: "cancer",
    label: "암",
    emoji: "🔬",
    defaultItems: [
      "환부 소독 및 드레싱 교체",
      "종양 크기 변화 및 새 멍울 촉진",
      "통증 신호 및 컨디션(식욕 등) 모니터링",
      "체온 측정 및 미열 확인",
      "반려동물과 5분 놀이하기",
    ],
  },
  {
    key: "eye",
    label: "안과질환",
    emoji: "👁️",
    defaultItems: [
      "안구 세정 및 눈 주변 분비물 닦기",
      "인공눈물 점안",
      "안구 통증, 충혈, 혼탁도 관찰",
      "점안 후 눈 비비지 않도록 제지",
    ],
  },
  {
    key: "cushing",
    label: "쿠싱",
    emoji: "🧬",
    defaultItems: [
      "복부 팽만(올챙이 배) 상태 확인",
      "피부 발진, 각질 및 피부 얇아짐 관찰",
      "음수량 및 배뇨 횟수 관찰",
      "근육 감소 및 보행 상태 확인",
      "피부 접히는 부위 청결 관리 및 보습제 도포",
    ],
  },
  {
    key: "arthritis",
    label: "관절염",
    emoji: "🦴",
    defaultItems: [
      "기상 직후 보행 및 절뚝임 상태 관찰",
      "아픈 관절 부위 온찜질 및 마사지 수행",
      "수동 관절 운동(PROM) 수행",
      "발바닥 털 정리 및 미끄럼 방지 점검",
    ],
  },
  {
    key: "etc",
    label: "기타질병",
    emoji: "🏥",
    defaultItems: [],
  },
];

interface CheckItem {
  id: string;
  label: string;
  checked: boolean;
  isCustom: boolean;
}

interface Props {
  template: DiseaseTemplate;
  onDelete: () => void;
  onDataChange: (data: unknown) => void;
}

export const DiseaseCareForm = ({ template, onDelete, onDataChange }: Props) => {
  const [items, setItems] = useState<CheckItem[]>(
    template.defaultItems.map((label) => ({
      id: crypto.randomUUID(),
      label,
      checked: false,
      isCustom: false,
    })),
  );
  const [customInput, setCustomInput] = useState("");
  const [memo, setMemo] = useState("");

  const onDataChangeRef = useRef(onDataChange);
  useEffect(() => {
    onDataChangeRef.current = onDataChange;
  });
  useEffect(() => {
    onDataChangeRef.current({ items, memo });
  }, [items, memo]);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddCustom = () => {
    if (!customInput.trim()) return;
    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        label: customInput.trim(),
        checked: false,
        isCustom: true,
      },
    ]);
    setCustomInput("");
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-4 bg-white">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-sm">
          {template.emoji} {template.label}
        </span>
        <button onClick={onDelete} className="text-gray-400">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <span className="text-sm text-gray-700 flex-1">{item.label}</span>
            <Switch
              checked={item.checked}
              onCheckedChange={() => toggleItem(item.id)}
            />
            {item.isCustom && (
              <button
                onClick={() => deleteItem(item.id)}
                className="text-gray-300"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddCustom()}
          placeholder="항목 추가"
          className="flex-1"
        />
        <button
          onClick={handleAddCustom}
          className="text-gray-400 border border-gray-200 rounded-lg px-3"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <Textarea
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="메모를 입력해주세요 (선택)"
        className="resize-none text-sm"
        rows={3}
      />
    </div>
  );
};
