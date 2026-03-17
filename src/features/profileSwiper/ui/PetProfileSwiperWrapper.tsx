"use client";
import { useRouter } from "next/navigation";
import { Pet } from "@/entities/pet/api/pet";
import { PetProfileSwiper } from "./PetProfileSwiper";

export const PetProfileSwiperWrapper = ({ pets }: { pets: Pet[] }) => {
  const router = useRouter();

  const handleSelect = (pet: Pet) => {
    router.push(`/pet-note/checklist?petId=${pet.id}`);
  };

  return <PetProfileSwiper pets={pets} onSelect={handleSelect} />;
};
