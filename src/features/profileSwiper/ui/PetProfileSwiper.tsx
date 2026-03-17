"use client";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";
import { Pet } from "@/entities/pet/api/pet";
import { PetProfileCard } from "./PetProfileCard";
interface IPetProfileSwiperProps {
  pets: Pet[];
  onSelect: (pet: Pet) => void;
}

export const PetProfileSwiper = ({
  pets,
  onSelect,
}: IPetProfileSwiperProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <Carousel opts={{ align: "center", loop: false }} className="w-full px-4">
        <CarouselContent className="ml-0">
          {pets.map((pet) => (
            <CarouselItem
              key={pet.id}
              className="basis-[85%]"
              onClick={() => setSelectedId(pet.id)}
            >
              <PetProfileCard pet={pet} isSelected={selectedId === pet.id} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="w-full flex flex-col items-center">
        <Button
          className="rounded-full h-12 w-96"
          disabled={selectedId === null}
          onClick={() => {
            const pet = pets.find((p) => p.id === selectedId);
            if (pet) onSelect(pet);
          }}
        >
          작성하기
        </Button>
      </div>
    </div>
  );
};
