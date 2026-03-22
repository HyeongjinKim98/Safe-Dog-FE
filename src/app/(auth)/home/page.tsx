import { HomePage } from "@/views/home/ui/homePage";
import { getMyPets } from "@/shared/actions/pet";
import { getMyInfo } from "@/shared/actions/pet";
import { getCareLogsByDate } from "@/shared/actions/pet";
export default async function page() {
  const [myInfo, pets] = await Promise.all([getMyInfo(), getMyPets()]);
  const today = new Date().toISOString().split("T")[0];
  const careLogs =
    pets.length > 0 ? await getCareLogsByDate(pets[0].id, today) : [];

  return <HomePage myInfo={myInfo} pets={pets} careLogs={careLogs} />;
}
