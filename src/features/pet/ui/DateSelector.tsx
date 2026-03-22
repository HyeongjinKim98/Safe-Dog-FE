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
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-colors ${
                isCenter
                  ? "text-gray-900 font-bold"
                  : "text-gray-300 font-normal"
              }`}
            >
              <span className="text-sm">
                {month}.{day}
              </span>
              <span className="text-sm">{dayLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
