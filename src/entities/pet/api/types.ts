import type { Disease, Gender, Pet } from "../model/types";

export type PetListResponse = Pet[];

export interface CreatePetRequest {
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  gender: Gender;
  isNeutered: boolean;
  profileImageUrl: string;
  diseases: Disease[];
}
