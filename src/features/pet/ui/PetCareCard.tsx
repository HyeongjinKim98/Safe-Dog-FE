"use client";
import { useState, useCallback } from "react";
import { Check, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { RequestDialog } from "@/features/care/ui/RequestDialog";
import { CareLog, Guardian } from "@/shared/types";
import { DiseaseCareType } from "@/views/pet-note/model/type";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Calendar } from "@/shared/ui/calendar";
import { CalendarDays } from "lucide-react";
import {
  DemoCareLog,
  DateLogs,
  getDateLogs,
  addCareLog,
} from "@/shared/demo/demoCareStore";

const CARE_TYPE_LABELS: Record<string, string> = {
  ALL: "전체",
  meal: "식사",
  snack: "간식",
  supplement: "영양제",
  walk: "산책",
  grooming: "그루밍",
  medicine: "투약",
  heart: "심장",
  kidney: "신장",
  cancer: "암",
  eye: "안과",
  cushing: "쿠싱증후군",
  arthritis: "관절염",
  other: "기타",
};

const BASIC_TYPES = [
  "meal",
  "snack",
  "supplement",
  "walk",
  "grooming",
  "medicine",
];
const DISEASE_TYPES: DiseaseCareType[] = [
  "heart",
  "kidney",
  "cancer",
  "eye",
  "cushing",
  "arthritis",
  "other",
];

type LocalCompletion = {
  profileImageUrl: string;
  nickname: string;
  completedAt: string;
};

const AddChecklistSheet = ({
  isDisease,
  onClose,
  onAdd,
}: {
  isDisease: boolean;
  onClose: () => void;
  onAdd: (log: Omit<DemoCareLog, "id" | "completed">) => void;
}) => {
  const typeOptions = isDisease ? [...DISEASE_TYPES] : BASIC_TYPES;
  const [careType, setCareType] = useState(typeOptions[0]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[24px] px-5 pt-4 pb-10 flex flex-col gap-5 shadow-2xl">
        <div className="w-10 h-1 bg-[#E0E0E0] rounded-full mx-auto" />
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-semibold text-[#1F1F1F]">
            체크리스트 추가
          </h3>
          <button onClick={onClose}>
            <X size={22} className="text-[#9E9E9E]" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-medium text-[#6B6B6B]">
            케어 종류
          </label>
          <div className="flex gap-2 flex-wrap">
            {typeOptions.map((t) => (
              <button
                key={t}
                onClick={() => setCareType(t)}
                className={`h-9 px-4 rounded-full text-[13px] font-medium border transition-colors ${
                  careType === t
                    ? "bg-[#1F1F1F] text-white border-[#1F1F1F]"
                    : "bg-white text-[#6B6B6B] border-[#E0E0E0]"
                }`}
              >
                {CARE_TYPE_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-medium text-[#6B6B6B]">제목</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 저녁 식사"
            className="h-[48px] rounded-[12px] border border-[#E0E0E0] px-4 text-[15px] text-[#1F1F1F] placeholder:text-[#C4C4C4] outline-none focus:border-[#9F7248]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-medium text-[#6B6B6B]">
            내용 (선택)
          </label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="예: 건식 100g"
            className="h-[48px] rounded-[12px] border border-[#E0E0E0] px-4 text-[15px] text-[#1F1F1F] placeholder:text-[#C4C4C4] outline-none focus:border-[#9F7248]"
          />
        </div>

        <button
          onClick={() => {
            if (!title.trim()) return;
            onAdd({ careType, title: title.trim(), content: content.trim() });
            onClose();
          }}
          disabled={!title.trim()}
          className="h-[54px] rounded-[30px] bg-primary-500 text-white text-[16px] font-medium disabled:opacity-40 transition-opacity"
        >
          추가하기
        </button>
      </div>
    </>
  );
};

const CareList = ({
  logs,
  guardians,
  isDisease,
  onAdd,
}: {
  logs: DemoCareLog[];
  guardians: Guardian[];
  isDisease: boolean;
  onAdd: (log: Omit<DemoCareLog, "id" | "completed">) => void;
}) => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedLog, setSelectedLog] = useState<DemoCareLog | null>(null);
  const [completions, setCompletions] = useState<Map<number, LocalCompletion>>(
    new Map(),
  );
  const [sheetOpen, setSheetOpen] = useState(false);

  const availableTypes = [
    "ALL",
    ...Array.from(new Set(logs.map((l) => l.careType))),
  ];
  const currentLogs =
    activeFilter === "ALL"
      ? logs
      : logs.filter((l) => l.careType === activeFilter);

  const getRelTime = (iso: string) => {
    // eslint-disable-next-line react-hooks/purity
    const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
    if (m < 1) return "방금 전";
    if (m < 60) return `${m}분 전`;
    return `${Math.floor(m / 60)}시간 전`;
  };

  return (
    <>
      <div className="flex gap-1 overflow-x-auto pb-3 scrollbar-hide px-[10px]">
        {availableTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveFilter(type)}
            className={`flex-shrink-0 h-10 px-4 rounded-full text-[14px] font-medium transition-colors border ${
              activeFilter === type
                ? "bg-white text-[#3D3D3D] border-[#9F948A] border-[1.5px]"
                : "bg-white text-[#6B6B6B] border-[#E0E0E0]"
            }`}
          >
            {CARE_TYPE_LABELS[type] ?? type}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-0.5 px-[10px]">
        {currentLogs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-[16px] text-[#3D3D3D] whitespace-pre-line text-center">
              체크리스트를 추가하여{"\n"}
              <span className="font-bold">반려견을 케어해보세요!</span>
            </p>
          </div>
        )}

        {currentLogs.map((log) => {
          const local = completions.get(log.id);
          const done = log.completed || !!local;
          const doneAt = log.completedAt ?? local?.completedAt;
          const imgUrl =
            log.completedByProfileImageUrl || local?.profileImageUrl || "";
          const nickname = log.completedByNickname || local?.nickname || "";

          return (
            <div
              key={log.id}
              className="flex items-center gap-[14px] bg-[#F7F7F7] rounded-[16px] px-[20px] h-[64px]"
            >
              <button
                onClick={() => {
                  if (done) return;
                  setCompletions(
                    (p) =>
                      new Map([
                        ...p,
                        [
                          log.id,
                          {
                            profileImageUrl: "",
                            nickname: "나",
                            completedAt: new Date().toISOString(),
                          },
                        ],
                      ]),
                  );
                }}
                className={`w-[26px] h-[26px] rounded-sm flex items-center justify-center flex-shrink-0 transition-colors ${
                  done
                    ? "bg-primary-500"
                    : "border-2 border-[#E0E0E0] hover:border-[#9F7248]"
                }`}
              >
                {done && <Check size={14} className="text-white" />}
              </button>

              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[16px] font-medium text-[#3D3D3D] flex items-center gap-1.5">
                  {log.title}
                  {log.content && (
                    <span className="text-[15px] text-[#6B6B6B] font-normal">
                      · {log.content}
                    </span>
                  )}
                </span>
                {done && doneAt && (
                  <span className="text-[14px] text-[#444444] mt-0.5">
                    {nickname ? `${nickname} · ` : ""}
                    {getRelTime(doneAt)}
                  </span>
                )}
              </div>

              {done ? (
                imgUrl ? (
                  <img
                    src={imgUrl}
                    alt={nickname}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#E0E0E0] flex items-center justify-center flex-shrink-0">
                    <span className="text-[12px] font-bold text-[#9E9E9E]">
                      {nickname[0]}
                    </span>
                  </div>
                )
              ) : (
                <button
                  onClick={() => setSelectedLog(log)}
                  className="flex-shrink-0 px-3 h-8 rounded-full text-white text-[12px] font-medium bg-[#FFB84C]"
                >
                  요청하기
                </button>
              )}
            </div>
          );
        })}

        <button
          onClick={() => setSheetOpen(true)}
          className="mt-2 h-12 rounded-full border border-dashed border-[#C4C4C4] text-[#919191] text-[14px] font-medium"
        >
          + 체크리스트 추가하기
        </button>
      </div>

      {selectedLog && (
        <RequestDialog
          open={!!selectedLog}
          onClose={() => setSelectedLog(null)}
          onRequestSent={(guardian) => {
            setCompletions(
              (p) =>
                new Map([
                  ...p,
                  [
                    selectedLog.id,
                    {
                      profileImageUrl: guardian.profileImageUrl,
                      nickname: guardian.nickname,
                      completedAt: new Date().toISOString(),
                    },
                  ],
                ]),
            );
            setSelectedLog(null);
          }}
          careLog={selectedLog as CareLog}
          guardians={guardians}
        />
      )}

      {sheetOpen && (
        <AddChecklistSheet
          isDisease={isDisease}
          onClose={() => setSheetOpen(false)}
          onAdd={(log) => {
            onAdd(log);
            setActiveFilter("ALL");
          }}
        />
      )}
    </>
  );
};

interface PetCareCardProps {
  guardians: Guardian[];
  selectedDate: string;
  onDateSelect?: (date: string) => void;
}

export default function PetCareCard({
  guardians,
  selectedDate,
  onDateSelect,
}: PetCareCardProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  // store에서 읽어온 값을 로컬 state로 미러링
  // — store 자체가 mutable이므로 add 후 강제 리렌더를 위해 version 카운터 사용
  const [version, setVersion] = useState(0);
  const bump = useCallback(() => setVersion((v) => v + 1), []);

  const logs: DateLogs = getDateLogs(selectedDate);

  const handleAdd =
    (kind: "basic" | "disease") =>
    (log: Omit<DemoCareLog, "id" | "completed">) => {
      addCareLog(selectedDate, kind, log);
      bump();
    };

  const handleCalendarSelect = (date: Date | undefined) => {
    if (!date || !onDateSelect) return;
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    onDateSelect(`${yyyy}-${mm}-${dd}`);
    setCalendarOpen(false);
  };

  const calendarValue = selectedDate
    ? new Date(selectedDate + "T00:00:00")
    : undefined;

  return (
    <div className="w-full bg-white rounded-t-[20px] pb-6 flex-1">
      <div className="flex items-center justify-between px-[21px] pt-[18px] pb-[14px]">
        <div className="flex items-center gap-1.5">
          <Image
            src="/images/icon_medical_note.png"
            alt="노트"
            width={28}
            height={28}
            unoptimized
          />
          <h2 className="text-[18px] font-semibold text-[#1F1F1F] tracking-[-0.04em]">
            오늘의 체크리스트
          </h2>
        </div>

        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <button
              className="w-[24px] h-[24px] flex items-center justify-center text-[#3D3D3D] hover:text-[#9F7248] transition-colors"
              aria-label="날짜 선택"
            >
              <CalendarDays size={24} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end" sideOffset={8}>
            <Calendar
              mode="single"
              selected={calendarValue}
              onSelect={handleCalendarSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Tabs defaultValue="basic">
        <div className="mx-5 bg-[#F7F7F7] rounded-[16px_16px_6px_6px] p-1">
          <TabsList className="w-full h-[42px] bg-transparent gap-0 p-0">
            <TabsTrigger
              value="basic"
              className="flex-1 h-full text-[16px] data-[state=active]:bg-white data-[state=active]:text-[#3D3D3D] data-[state=active]:font-bold data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#9E9E9E] data-[state=inactive]:font-medium rounded-[12px_12px_4px_4px] shadow-none"
            >
              기본 케어
            </TabsTrigger>
            <TabsTrigger
              value="disease"
              className="flex-1 h-full text-[16px] data-[state=active]:bg-white data-[state=active]:text-[#3D3D3D] data-[state=active]:font-bold data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#9E9E9E] data-[state=inactive]:font-medium rounded-[12px_12px_4px_4px] shadow-none"
            >
              질병 케어
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="basic" className="mt-1 mx-3">
          <CareList
            key={`basic-${selectedDate}-${version}`}
            logs={logs.basic}
            guardians={guardians}
            isDisease={false}
            onAdd={handleAdd("basic")}
          />
        </TabsContent>
        <TabsContent value="disease" className="mt-1 mx-3">
          <CareList
            key={`disease-${selectedDate}-${version}`}
            logs={logs.disease}
            guardians={guardians}
            isDisease={true}
            onAdd={handleAdd("disease")}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
