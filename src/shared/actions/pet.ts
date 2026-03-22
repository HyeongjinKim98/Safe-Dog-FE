"use server";
import { serverApi } from "./api";
import {
  MOCK_PETS,
  MOCK_USER,
  getMockCareLogs,
  getMockMemo,
  MOCK_GUARDIANS,
} from "../mock/data";
import { Pet, CareLog, User, Memo, Guardian } from "@/shared/types";

const USE_MOCK = true;

export const getMyPets = async (): Promise<Pet[]> => {
  if (USE_MOCK) return MOCK_PETS;
  return serverApi.get<Pet[]>("/api/pets");
};

export const getMyInfo = async (): Promise<User> => {
  if (USE_MOCK) return MOCK_USER;
  return serverApi.get<User>("/api/users/me");
};

export const getCareLogsByDate = async (
  petId: number,
  date: string,
): Promise<CareLog[]> => {
  if (USE_MOCK) return getMockCareLogs(petId, date);
  return serverApi.get<CareLog[]>(`/api/care-logs?petId=${petId}&date=${date}`);
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
  return data;
};

export const getPetNoteById = async (
  id: number,
): Promise<{
  id: number;
  content: string;
}> => {
  return serverApi.get<{
    id: number;
    content: string;
  }>(`/api/pet-notes?petId=${id}`);
};

export const deletePetNoteById = async (
  id: number,
): Promise<{
  id: number;
  content: string;
}> => {
  return serverApi.delete<{
    id: number;
    content: string;
  }>(`/api/pet-notes?petId=${id}`);
};

export const postPetNoteBy = async ({
  petId,
  noteDate,
  content,
}: {
  petId: number;
  noteDate: Date;
  content: string;
}): Promise<{
  id: number;
  petId: number;
  noteDate: Date;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}> => {
  return serverApi.post<{
    id: number;
    petId: number;
    noteDate: Date;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }>(`/api/pet-notes`, {
    petId,
    noteDate,
    content,
  });
};

export const getMemo = async (
  petId: number,
  date: string,
): Promise<Memo | null> => {
  return getMockMemo(petId, date);
};

export const getPetGuardians = async (petId: number): Promise<Guardian[]> => {
  return MOCK_GUARDIANS;
};

export const completeCareLog = async (careLogId: number): Promise<void> => {
  return;
};
