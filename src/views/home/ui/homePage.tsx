"use client";
import { CommonLayout } from "@/widgets/CommonLayout";
import { Header } from "@/widgets/Header";
import { Bell } from "lucide-react";
import { PetSelect } from "@/features/pet/ui/PetSelect";
import { PetStatus } from "@/features/pet/ui/PetStatus";
import { BottomNavigation } from "@/widgets/BottomNavigation";
import PetCareCard from "@/features/pet/ui/PetCareCard";
import { Pet, User } from "@/shared/types";
import { useState } from "react";
import { Guardian } from "@/shared/types";

const Notice = () => <Bell />;

type Props = {
  myInfo: User;
  pets: Pet[];
  guardians: Guardian[];
};

export const HomePage = ({ myInfo, pets, guardians }: Props) => {
  const [selectedPetId, setSelectedPetId] = useState(pets[0]?.id);
  const today = new Date().toISOString().split("T")[0];

  return (
    <CommonLayout>
      <Header
        left={
          <PetSelect
            pets={pets}
            selectedPetId={selectedPetId}
            onSelect={setSelectedPetId}
          />
        }
        right={<Notice />}
      />
      <div className="flex flex-col gap-5 pt-3 flex-1">
        <PetStatus petName={pets[0]?.name} achievement={50} />
        <PetCareCard guardians={guardians} selectedDate={today} />
      </div>
      <BottomNavigation />
    </CommonLayout>
  );
};
