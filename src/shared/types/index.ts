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

export type Invitation = {
  code: string;
  inviterNickname: string;
  inviterProfileImageUrl: string;
  inviterRole: string;
  petName: string;
};
export type InvitationGroup = {
  code: string;
  pet: {
    name: string;
    breed: string;
    age: string;
    gender: "MALE" | "FEMALE";
    profileImageUrl: string;
  };
  guardians: {
    id: number;
    nickname: string;
    profileImageUrl: string;
  }[];
};

export type Memo = {
  id: number;
  petId: number;
  targetDate: string;
  content: string;
  authorNickname: string;
  authorRole: string;
  authorProfileImageUrl: string;
};
