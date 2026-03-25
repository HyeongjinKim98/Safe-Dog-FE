import { PetListPage } from "@/views/mypage/ui/PetListPage";
import { getMyPetList } from "@/shared/actions/mypage";

export default async function page() {
  const myPets = await getMyPetList();
  return <PetListPage myPets={myPets} sharedPets={[]} />;
}
