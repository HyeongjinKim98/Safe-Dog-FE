"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CommonLayout } from "@/widgets/CommonLayout";
import { Header } from "@/widgets/Header";
import { ArrowLeft, ChevronUp, ChevronDown } from "lucide-react";
import { BottomNavigation } from "@/widgets/BottomNavigation";

export type CareItem = {
  careType: string;
  label: string;
  completed: number;
  total: number;
};

export type CareSection = {
  type: "disease" | "basic";
  items: CareItem[];
};

type Props = {
  petName: string;
  weeklyReport: CareSection[];
  monthlyReport: CareSection[];
};

function getProgressColor(pct: number): string {
  if (pct >= 80) return "linear-gradient(90deg, #6BCB77 0%, #4CAF50 100%)";
  if (pct >= 50)
    return "linear-gradient(90deg, #FFD08A 0%, #D5CF85 15%, #6BCB77 100%)";
  if (pct >= 30) return "linear-gradient(90deg, #FFD08A 0%, #FFB84C 100%)";
  return "#FF7043";
}

const CareSectionBlock = ({
  section,
}: {
  section: CareSection;
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const isDisease = section.type === "disease";

  return (
    <div className="mx-5 border border-[#E0E0E0] rounded-[12px] overflow-hidden">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center justify-between px-4 py-3"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{isDisease ? "🏥" : "💊"}</span>
          <span className="text-[16px] font-bold text-[#1F1F1F]">
            {isDisease ? "질병케어" : "기본케어"}
          </span>
        </div>
        {collapsed ? (
          <ChevronDown size={20} className="text-[#9E9E9E]" />
        ) : (
          <ChevronUp size={20} className="text-[#9E9E9E]" />
        )}
      </button>
      {!collapsed && (
        <div className="flex flex-col gap-4 px-4 pb-4 border-t border-[#EEEEEE]">
          {section.items.map((item) => {
            const pct =
              item.total === 0
                ? 0
                : Math.round((item.completed / item.total) * 100);
            return (
              <div key={item.careType} className="flex flex-col gap-1.5 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-medium text-[#3D3D3D]">
                    {item.label}
                  </span>
                  <span className="text-[13px] text-[#9E9E9E]">
                    {item.completed} / {item.total}회
                  </span>
                </div>
                <div className="h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${pct}%`,
                      background: getProgressColor(pct),
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const CareReportPage = ({
  petName,
  weeklyReport,
  monthlyReport,
}: Props) => {
  const router = useRouter();
  const [tab, setTab] = useState<"weekly" | "monthly">("weekly");
  const report = tab === "weekly" ? weeklyReport : monthlyReport;

  const totalCompleted = report
    .flatMap((s) => s.items)
    .reduce((acc, i) => acc + i.completed, 0);
  const totalTasks = report
    .flatMap((s) => s.items)
    .reduce((acc, i) => acc + i.total, 0);
  const completionPct =
    totalTasks === 0 ? 0 : Math.round((totalCompleted / totalTasks) * 100);

  const getEmoji = () => {
    if (completionPct >= 80) return "😊";
    if (completionPct >= 50) return "🙂";
    return "😟";
  };

  return (
    <CommonLayout backgroundColor="bg-white">
      <Header
        left={
          <button onClick={() => router.back()}>
            <ArrowLeft className="w-6 h-6 text-[#1F1F1F]" />
          </button>
        }
        title="케어리포트"
      />

      <div className="flex flex-col flex-1 overflow-y-auto pb-8">
        {/* Tabs */}
        <div className="mx-5 mt-4 bg-[#F7F7F7] rounded-[16px] p-1 flex">
          {(["weekly", "monthly"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 h-[40px] rounded-[12px] text-[15px] font-medium transition-colors ${
                tab === t ? "bg-[#9F7248] text-white font-bold" : "text-[#9E9E9E]"
              }`}
            >
              {t === "weekly" ? "주간" : "월간"}
            </button>
          ))}
        </div>

        {/* Overview card */}
        <div className="mx-5 mt-5 bg-[#FDF7F2] rounded-[12px] p-5 flex flex-col items-center gap-3">
          <p className="text-[16px] font-bold text-[#1F1F1F]">
            {tab === "weekly"
              ? "3주 체크리스트 완료 현황"
              : "3개월 체크리스트 완료 현황"}
          </p>
          <div className="text-5xl">{getEmoji()}</div>
          <div className="text-center">
            <p className="text-[28px] font-bold text-[#9F7248]">
              {completionPct}% 완료
            </p>
            <p className="text-[13px] text-[#9E9E9E] mt-1">
              완료된 과제 {totalCompleted}개 / 전체 {totalTasks}개
            </p>
          </div>
        </div>

        {/* Care sections */}
        <div className="flex flex-col gap-3 mt-5">
          {report.map((section) => (
            <CareSectionBlock key={section.type} section={section} />
          ))}
        </div>
      </div>
      <BottomNavigation />
    </CommonLayout>
  );
};
