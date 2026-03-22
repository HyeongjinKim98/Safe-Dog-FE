import { CommonLayout } from "@/widgets/CommonLayout";
import { Header } from "@/widgets/Header";
import { Bell } from "lucide-react";
import { PetSelect } from "@/features/pet/ui/PetSelect";
import { getPets } from "@/entities/pet/api/pet";
import { getGuardians } from "@/entities/guardian/api/guardian";
import { PetStatus } from "@/features/pet/ui/PetStatus";
import { BottomNavigation } from "@/widgets/BottomNavigation";
import PetCareCard from "@/features/pet/ui/PetCareCard";
const Notice = () => <Bell />;
import { ManageGuardians } from "@/features/guardian/ui/manageGuardians";
export const PetNotePage = async () => {
  const pets = await getPets();
  const guardians = await getGuardians();
  return (
    <CommonLayout backgroundColor="bg-[#E0E0E0]">
      {/* <Header
        title={"반려노트"}
        left={<PetSelect pets={pets} />}
        right={<Notice />}
      /> */}
      <ManageGuardians guardians={guardians} />
      <PetStatus />
      {/* <PetCareCard /> */}
      <BottomNavigation />
    </CommonLayout>
  );
};
