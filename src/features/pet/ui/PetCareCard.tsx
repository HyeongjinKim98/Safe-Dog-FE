"use client";
import { useState } from "react";
import { Card, CardContent } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { CareLog } from "@/shared/actions/pet";
import { Check } from "lucide-react";
import { getRelativTime } from "@/shared/lib/date";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

const tabs = ["기본 케어", "질병 케어"];
type Tab = (typeof tabs)[number];

const CARE_TYPE_LABELS: Record<string, string> = {
  ALL: "전체",
  MEAL: "식사",
  SNACK: "간식",
  SUPPLEMENT: "영양제",
  WALK: "산책",
  GROOMING: "그루밍",
  MEDICATION: "투약",
};
interface PetCareCardProps {
  careLogs: CareLog[];
}
const CareList = ({ logs }: { logs: CareLog[] }) => {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const availableTypes = [
    "ALL",
    ...Array.from(new Set(logs.map((l) => l.careType))),
  ];

  const currentLogs =
    activeFilter === "ALL"
      ? logs
      : logs.filter((log) => log.careType === activeFilter);

  const completedCount = currentLogs.filter((log) => log.completed).length;
  const totalCount = currentLogs.length;

  const formatTime = (isoString?: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    return `${h}시 ${m}분 완료`;
  };

  return (
    <Card className="flex flex-col rounded-t-none rounded-b-2xl border-none shadow-none">
      <CardContent className="h-full flex flex-col  pb-6 px-5">
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
          {availableTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                activeFilter === type
                  ? "bg-gray-700 text-white border-gray-700"
                  : "bg-white text-gray-500 border-gray-200"
              }`}
            >
              {CARE_TYPE_LABELS[type] ?? type}
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-400 mb-3">
          {completedCount}/{totalCount} 완료
        </div>

        {currentLogs.length === 0 ? (
          <>
            <p className="text-xl text-white whitespace-break-spaces">
              체크리스트를 추가하여{"\n"}
              <span className="font-bold">반려견을 케어해보세요!</span>
            </p>
          </>
        ) : (
          <ul className="flex flex-col divide-y divide-gray-100">
            {currentLogs.map((log) => (
              <li key={log.id} className="flex items-center gap-3 py-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                    log.completed
                      ? "bg-gray-600 border-gray-600"
                      : "border-gray-300"
                  }`}
                >
                  {log.completed && <Check size={12} className="text-white" />}
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                  <span className="flex text-sm font-semibold items-center">
                    {log.title}{" "}
                    <span className="text-xs text-muted-foreground font-light">
                      · {log.content}
                    </span>
                  </span>
                  {log.completed && log.completedAt && (
                    <span className="text-xs text-gray-400 mt-0.5">
                      {getRelativTime(log.completedAt)}
                    </span>
                  )}
                </div>

                {/* 완료 보호자 프로필 표시  */}
                {log.completed ? (
                  log.completedByProfileImageUrl ? (
                    <img
                      src={log.completedByProfileImageUrl}
                      alt={log.completedByNickname}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" />
                  )
                ) : (
                  <button className="flex-shrink-0 px-3 py-1.5 rounded-full bg-amber-400 text-white text-xs font-semibold">
                    요청하기
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        <Button
          variant="outline"
          className="mt-4 w-full h-14 rounded-full border-dashed border-gray-300 text-gray-400 text-base font-semibold bg-transparent"
        >
          + 체크리스트 추가하기
        </Button>
      </CardContent>
    </Card>
  );
};

export default function PetCareCard({ careLogs }: PetCareCardProps) {
  const basicLogs = careLogs.filter((log) => log.careType !== "DISEASE");
  const diseaseLogs = careLogs.filter((log) => log.careType === "DISEASE");

  return (
    <div className="w-full px-4 pt-6 pb-8 bg-white rounded-t-3xl">
      <h2 className="text-xl font-bold mb-4">오늘의 체크리스트</h2>
      <Tabs defaultValue="basic">
        <TabsList className="w-full">
          <TabsTrigger value="basic" className="flex-1">
            기본 케어
          </TabsTrigger>
          <TabsTrigger value="disease" className="flex-1">
            질병 케어
          </TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <CareList logs={basicLogs} />
        </TabsContent>
        <TabsContent value="disease">
          <CareList logs={diseaseLogs} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
