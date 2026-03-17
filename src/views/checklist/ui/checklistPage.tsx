import { CommonLayout } from "@/widgets/CommonLayout";
import { Header } from "@/widgets/Header";
import { getPetList } from "@/entities/pet/api/pet";
import { PetProfileSwiperWrapper } from "@/features/profileSwiper/ui/PetProfileSwiperWrapper";
export const CheckListPage = async () => {
  const petList = await getPetList();
  return (
    <>
      <CommonLayout>
        <Header left={"뒤로가기"} />
        <div className="flex flex-col gap-6 pt-6 flex-1 overflow-y-auto">
          <p className="text-center text-lg font-medium leading-relaxed text-gray-800">
            케어할 아이의 프로필을{"\n"}
            <span className="font-bold">먼저 확인해 주세요</span>
          </p>
          <PetProfileSwiperWrapper pets={petList} />
        </div>
      </CommonLayout>
    </>
  );
};
