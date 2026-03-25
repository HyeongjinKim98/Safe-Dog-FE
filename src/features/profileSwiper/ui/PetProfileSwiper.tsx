"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/shared/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/shared/ui/carousel";
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
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const onApiSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCurrentIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    onApiSelect(api);
    api.on("select", onApiSelect);
    return () => { api.off("select", onApiSelect); };
  }, [api, onApiSelect]);

  return (
    <div className="flex flex-col gap-4">
      <Carousel setApi={setApi} opts={{ align: "center", loop: false }} className="w-full px-4">
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

      <div className="flex justify-center gap-2">
        {pets.map((_, i) => (
          <div
            key={i}
            className={`rounded-full w-2 h-2 ${
              i === currentIndex ? "bg-[#C2C2C2]" : "bg-[#EEEEEE]"
            }`}
          />
        ))}
      </div>

      <div className="w-full flex flex-col items-center">
        <Button
          className="rounded-full h-[58px] w-[350px] bg-primary-600 text-white text-base font-medium"
          disabled={selectedId === null}
          onClick={() => {
            const pet = pets.find((p) => p.id === selectedId);
            if (pet) onSelect(pet);
          }}
        >
          선택하기
        </Button>
      </div>
    </div>
  );
};
