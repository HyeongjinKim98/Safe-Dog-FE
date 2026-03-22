import { HomePage } from "@/views/home/ui/homePage";
import { getMyPets } from "@/shared/actions/pet";
import { getMyInfo } from "@/shared/actions/pet";
import { getCareLogsByDate } from "@/shared/actions/pet";
import { getGuardians } from "@/shared/actions/guardians";
export default async function page() {
  const [myInfo, pets, guardians] = await Promise.all([
    getMyInfo(),
    getMyPets(),
    getGuardians(1),
  ]);
  const today = new Date().toISOString().split("T")[0];
  const careLogs =
    pets.length > 0 ? await getCareLogsByDate(pets[0].id, today) : [];

  return (
    <HomePage
      myInfo={myInfo}
      pets={pets}
      careLogs={careLogs}
      guardians={guardians}
    />
  );
}
