"use client";
import { CommonLayout } from "@/widgets/CommonLayout";
import { Header } from "@/widgets/Header";
import { Bell } from "lucide-react";
import { PetSelect } from "@/features/pet/ui/PetSelect";
import { getPets } from "@/entities/pet/api/pet";
import { getGuardians } from "@/entities/guardian/api/guardian";
import { PetStatus } from "@/features/pet/ui/PetStatus";
import { BottomNavigation } from "@/widgets/BottomNavigation";
import PetCareCard from "@/features/pet/ui/PetCareCard";
import { ManageGuardians } from "@/features/guardian/ui/manageGuardians";
import { Pet, CareLog, User } from "@/shared/types";
import { useEffect, useState } from "react";
import { getCareLogsByDate } from "@/shared/actions/pet";
import { Guardian } from "@/shared/types";
const Notice = () => <Bell />;
type Props = {
  myInfo: User;
  pets: Pet[];
  careLogs: CareLog[];
  guardians: Guardian[];
};

export const HomePage = ({
  myInfo,
  pets,
  careLogs: initialCareLogs,
  guardians,
}: Props) => {
  const [selectedPetId, setSelectedPetId] = useState(pets[0]?.id);
  const [careLogs, setCareLogs] = useState(initialCareLogs);

  useEffect(() => {
    if (!selectedPetId) return;
    const today = new Date().toISOString().split("T")[0];
    getCareLogsByDate(selectedPetId, today).then(setCareLogs);
  }, [selectedPetId]);
  //   const guardians = await getGuardians();
  return (
    <CommonLayout backgroundColor="bg-[#E0E0E0]">
      <Header
        title={"반려노트"}
        left={
          <PetSelect
            pets={pets}
            selectedPetId={selectedPetId}
            onSelect={setSelectedPetId}
          />
        }
        right={<Notice />}
      />
      {/* <ManageGuardians guardians={guardians} /> */}
      <PetStatus />
      <PetCareCard careLogs={careLogs} guardians={guardians} />
      <BottomNavigation />
    </CommonLayout>
  );
};
