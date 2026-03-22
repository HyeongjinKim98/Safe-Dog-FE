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
import { Pet, CareLog, User } from "@/shared/actions/pet";
const Notice = () => <Bell />;
type Props = {
  myInfo: User;
  pets: Pet[];
  careLogs: CareLog[];
};

export const HomePage = async ({ myInfo, pets, careLogs }: Props) => {
  console.log(myInfo);
  console.log(pets);
  console.log(careLogs);
  const guardians = await getGuardians();
  return (
    <CommonLayout backgroundColor="bg-[#E0E0E0]">
      <Header
        title={"반려노트"}
        left={<PetSelect pets={pets} />}
        right={<Notice />}
      />
      <ManageGuardians guardians={guardians} />
      <PetStatus />
      <PetCareCard />
      <BottomNavigation />
    </CommonLayout>
  );
};
