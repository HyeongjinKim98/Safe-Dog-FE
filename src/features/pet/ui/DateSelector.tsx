"use client";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

const getAdjacentDates = (dateStr: string) => {
  const base = new Date(dateStr);
  const prev = new Date(base);
  const next = new Date(base);
  prev.setDate(base.getDate() - 1);
  next.setDate(base.getDate() + 1);
  return [
    prev.toISOString().split("T")[0],
    dateStr,
    next.toISOString().split("T")[0],
  ];
};

const formatDisplay = (dateStr: string) => {
  const d = new Date(dateStr);
  return {
    month: d.getMonth() + 1,
    day: d.getDate(),
    dayLabel: DAY_LABELS[d.getDay()],
  };
};

interface DateSelectorProps {
  selectedDate: string;
  onSelect: (date: string) => void;
}

export const DateSelector = ({ selectedDate, onSelect }: DateSelectorProps) => {
  const dates = getAdjacentDates(selectedDate);

  const handlePrev = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    onSelect(d.toISOString().split("T")[0]);
  };

  const handleNext = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    onSelect(d.toISOString().split("T")[0]);
  };

  return (
    <div className="flex items-center bg-white px-4 py-2 gap-2">
      <div className="flex flex-1 justify-around items-center gap-2">
        {dates.map((date, index) => {
          const { month, day, dayLabel } = formatDisplay(date);
          const isCenter = index === 1;

          return (
            <button
              key={date}
              onClick={() => onSelect(date)}
              className="flex items-center gap-[6px]"
            >
              <span className={`text-[18px] font-semibold ${isCenter ? "text-[#1F1F1F]" : index === 0 ? "text-[#9E9E9E]" : "text-[#E0E0E0]"}`}>
                {month}.{day}
              </span>
              <span
                className={`w-[26px] h-[26px] flex items-center justify-center rounded-full text-[15px] font-medium ${
                  isCenter
                    ? "bg-[#1F1F1F] text-white"
                    : index === 0
                    ? "bg-[#313131] text-[#9E9E9E]"
                    : "bg-[#313131] text-[#E0E0E0]"
                }`}
              >
                {dayLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
