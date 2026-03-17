import { CommonLayout } from "@/widgets/CommonLayout";
import { Header } from "@/widgets/Header";
import { Bell } from "lucide-react";
import { PetSelect } from "@/features/pet/ui/PetSelect";
import { getPets } from "@/entities/pet/api/pet";
const Notice = () => <Bell />;
export const PetNotePage = async () => {
  const pets = await getPets();
  return (
    <CommonLayout>
      <Header
        title={"반려노트"}
        left={<PetSelect pets={pets} />}
        right={<Notice />}
      />
    </CommonLayout>
  );
};
