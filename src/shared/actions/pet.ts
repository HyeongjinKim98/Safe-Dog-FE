"use server";
import { serverApi } from "./api";

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
  careType: string;
  careTypeDescription: string;
  title: string;
  content: string;
  completedByUserId: number;
  completedByNickname: string;
  completedByProfileImageUrl: string;
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
export const getMyPets = async (): Promise<Pet[]> => {
  //   const data = serverApi.get("/api/pets");
  //   return data;
  return [
    {
      id: 1,
      userId: 1,
      name: "돌돌이",
      species: "개",
      breed: "진돗개",
      birthDate: "2023-03-01",
      gender: "MALE",
      weight: 7,
      registrationNumber: "2",
      hasAllergy: true,
      allergyDescription: "",
      profileImageUrl: "",
      diseases: ["HEART_DISEASE"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      birthDateUnknown: true,
      neutered: true,
      weightUnknown: false,
    },
  ];
};
export const getMyInfo = async (): Promise<User> => {
  //   return serverApi.get<User>("/api/users/me");
  return {
    id: 1,
    email: "test@gmail.com",
    nickname: "테스터",
    name: "홍길동",
    birthDate: "1990-01-01",
    providerType: "LOCAL",
    profileImageUrl: "",
    role: "USER",
    lastSelectedPetId: 1,
    onboardingCompleted: true,
  };
};
export const registerPet = async () => {
  const data = serverApi.post("/api/pets", {
    name: "돌돌이",
    species: "진돗개",
    breed: "",
    birthDate: "2023-03-01",
    gender: "MALE",
    isNeutered: true,
    weight: 7,
    registrationNumber: "2",
    hasAllergy: true,
    allergyDescription: "",
    profileImageUrl: "",
    diseases: ["HEART_DISEASE"],
    birthDateUnknown: true,
    weightUnknown: true,
  });
  console.log(data);
  return data;
};
export const getCareLogsByDate = async (
  petId: number,
  date: string,
): Promise<CareLog[]> => {
  return [
    {
      id: 1,
      petId,
      careTemplateId: 1,
      targetDate: date,
      careType: "MEAL",
      careTypeDescription: "식사",
      title: "아침 식사",
      content: "사료 100g",
      completedByUserId: 0,
      completedByNickname: "",
      completedByProfileImageUrl: "",
      version: 1,
      updatedAt: new Date().toISOString(),
      completed: false,
    },
    {
      id: 2,
      petId,
      careTemplateId: 2,
      targetDate: date,
      careType: "WALK",
      careTypeDescription: "산책",
      title: "저녁 산책",
      content: "30분",
      completedByUserId: 0,
      completedByNickname: "",
      completedByProfileImageUrl: "",
      version: 1,
      updatedAt: new Date().toISOString(),
      completed: false,
    },
  ];
};
