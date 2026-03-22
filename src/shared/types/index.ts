import { BasicCareType, DiseaseCareType } from "@/views/pet-note/model/type";

export type Pet = {
  id: number;
  userId: number;
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  gender: "MALE" | "FEMALE";
  weight: number;
  registrationNumber: string;
  hasAllergy: boolean;
  allergyDescription: string;
  profileImageUrl: string;
  diseases: string[];
  createdAt: string;
  updatedAt: string;
  birthDateUnknown: boolean;
  neutered: boolean;
  weightUnknown: boolean;
};

export type CareLog = {
  id: number;
  petId: number;
  careTemplateId: number;
  targetDate: string;
  careType: BasicCareType | DiseaseCareType;
  careTypeDescription: string;
  title: string;
  content: string;
  completedByUserId: number;
  completedByNickname: string;
  completedByProfileImageUrl: string;
  completedAt?: string;
  version: number;
  updatedAt: string;
  completed: boolean;
};

export type User = {
  id: number;
  email: string;
  nickname: string;
  name: string;
  birthDate: string;
  providerType: string;
  profileImageUrl: string;
  role: string;
  lastSelectedPetId: number;
  onboardingCompleted: boolean;
};

export type Guardian = {
  id: number;
  userId: number;
  nickname: string;
  profileImageUrl: string;
};
