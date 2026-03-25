import { CommonLayout } from "@/widgets/CommonLayout";
import { Header } from "@/widgets/Header";
import { getPetList } from "@/entities/pet/api/pet";
import { PetProfileSwiperWrapper } from "@/features/profileSwiper/ui/PetProfileSwiperWrapper";
import { ArrowLeft } from "lucide-react";
export const CheckListPage = async () => {
  const petList = await getPetList();
  return (
    <>
      <CommonLayout>
        <Header left={<ArrowLeft className="w-5 h-5 text-[#1F1F1F]" />} />
        <div className="flex flex-col gap-6 pt-6 flex-1 overflow-y-auto">
          <p className="text-center text-[18px] font-medium leading-relaxed text-[#3D3D3D] whitespace-break-spaces">
            케어할 아이의 프로필을{"\n"}먼저 확인해 주세요
          </p>
          <PetProfileSwiperWrapper pets={petList} />
        </div>
      </CommonLayout>
    </>
  );
};
