import { HomePage } from "@/views/home/ui/homePage";
import { getMyPets } from "@/shared/actions/pet";
import { getMyInfo } from "@/shared/actions/pet";
import { getGuardians } from "@/shared/actions/guardians";
export default async function page() {
  const [myInfo, pets, guardians] = await Promise.all([
    getMyInfo(),
    getMyPets(),
    getGuardians(1),
  ]);
  return <HomePage myInfo={myInfo} pets={pets} guardians={guardians} />;
}
