import { PetNotePage } from "@/views/pet-note/ui/petNotePage";
import { getMyPets } from "@/shared/actions/pet";
import {
  getMemo,
  getPetGuardians,
  getCareLogsByDate,
} from "@/shared/actions/pet";

export default async function page() {
  const pets = await getMyPets();
  const today = new Date().toISOString().split("T")[0];
  const petId = pets[0]?.id;

  const [guardians, careLogs, memo] = await Promise.all([
    getPetGuardians(petId),
    getCareLogsByDate(petId, today),
    getMemo(petId, today),
  ]);

  return (
    <PetNotePage
      pets={pets}
      guardians={guardians}
      careLogs={careLogs}
      memo={memo}
      initialDate={today}
    />
  );
}
