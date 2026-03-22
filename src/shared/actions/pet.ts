"use server";
import { serverApi } from "./api";
import { MOCK_PETS, MOCK_USER, getMockCareLogs } from "../mock/data";
import { Pet, CareLog, User } from "@/shared/types";

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
