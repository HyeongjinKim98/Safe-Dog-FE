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

type Props = {
  pets: Pet[];
  guardians: Guardian[];
  careLogs: CareLog[];
  memo: Memo | null;
  initialDate: string;
};

const Notice = () => <Bell />;

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
    <CommonLayout backgroundColor="bg-[#E0E0E0]">
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
      <ManageGuardians guardians={guardians} />
      <DateSelector selectedDate={selectedDate} onSelect={setSelectedDate} />
      <MemoCard memo={memo} />
      <PetCareCard careLogs={careLogs} guardians={guardians} />
      <BottomNavigation />
    </CommonLayout>
  );
};
