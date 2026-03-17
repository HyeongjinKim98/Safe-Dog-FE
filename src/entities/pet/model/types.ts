export type Gender = "MALE" | "FEMALE";

export type Disease = "DIABETES" | "";

export interface Pet {
  id: number;
  userId: number;
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  gender: Gender;
  profileImageUrl: string;
  diseases: Disease[];
  neutered: boolean;
  createdAt: string;
  updatedAt: string;
}
