"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

interface PetSelectProps {
  pets: { label: string; value: string }[];
}
export const PetSelect = ({ pets }: PetSelectProps) => (
  <>
    <Select defaultValue={pets[0]?.value}>
      <SelectTrigger className="w-24 border-none shadow-none">
        <SelectValue placeholder="반려동물" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {pets.map((pet) => (
            <SelectItem key={pet.value} value={pet.value}>
              {pet.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </>
);
