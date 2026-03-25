"use client";
import { useState, useEffect } from "react";
import { CommonLayout } from "@/widgets/CommonLayout";
import { Header } from "@/widgets/Header";
import { Bell } from "lucide-react";
import { BottomNavigation } from "@/widgets/BottomNavigation";
import { PetSelect } from "@/features/pet/ui/PetSelect";
import { ManageGuardians } from "@/features/guardian/ui/manageGuardians";
import { PetStatus } from "@/features/pet/ui/PetStatus";
import PetCareCard from "@/features/pet/ui/PetCareCard";
import { Pet, CareLog, Guardian, Memo } from "@/shared/types";
import { getCareLogsByDate, getMemo } from "@/shared/actions/pet";
import { DateSelector } from "@/features/pet/ui/DateSelector";
import { MemoCard } from "@/features/pet/ui/MemoCard";
import { useRouter } from "next/navigation";

type Props = {
  pets: Pet[];
  guardians: Guardian[];
  careLogs: CareLog[];
  memo: Memo | null;
  initialDate: string;
};

const Notice = () => <Bell />;

const NoPetRegistered = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-5 gap-6">
      <p className="text-center text-[16px] font-medium text-[#6B6B6B] leading-relaxed">
        먼저 반려동물 등록을 완료해야{"\n"}체크리스트를 설정 할 수 있어요
      </p>
      <button
        onClick={() => router.push("/pet/register")}
        className="w-[310px] h-[54px] rounded-[30px] bg-primary-500 text-white text-[16px] font-medium"
      >
        반려동물 등록하러 가기
      </button>
    </div>
  );
};

export const PetNotePage = ({
  pets,
  guardians,
  careLogs: initialCareLogs,
  memo: initialMemo,
  initialDate,
}: Props) => {
  const [selectedPetId, setSelectedPetId] = useState(pets[0]?.id);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [careLogs, setCareLogs] = useState(initialCareLogs);
  const [memo, setMemo] = useState(initialMemo);

  useEffect(() => {
    if (!selectedPetId) return;
    Promise.all([
      getCareLogsByDate(selectedPetId, selectedDate),
      getMemo(selectedPetId, selectedDate),
    ]).then(([logs, memo]) => {
      setCareLogs(logs);
      setMemo(memo);
    });
  }, [selectedPetId, selectedDate]);

  return (
    <CommonLayout backgroundColor="bg-white">
      <Header
        title="반려노트"
        left={
          <PetSelect
            pets={pets}
            selectedPetId={selectedPetId}
            onSelect={setSelectedPetId}
          />
        }
        right={<Notice />}
      />
      {pets.length === 0 ? (
        <NoPetRegistered />
      ) : (
        <>
          <ManageGuardians guardians={guardians} />
          <DateSelector
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
          />
          <MemoCard memo={memo} />
          <PetCareCard
            guardians={guardians}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </>
      )}
      <BottomNavigation />
    </CommonLayout>
  );
};
