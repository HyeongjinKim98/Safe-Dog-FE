"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Pet } from "@/shared/actions/pet";

interface PetSelectProps {
  pets: Pet[];
}
export const PetSelect = ({ pets }: PetSelectProps) => (
  <>
    <Select defaultValue={String(pets[0]?.id)}>
      <SelectTrigger className="w-24 border-none shadow-none">
        <SelectValue placeholder="반려동물" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {pets.map((pet) => (
            <SelectItem key={pet.id} value={String(pet.id)}>
              {pet.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </>
);
