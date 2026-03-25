"use server";
import { serverApi } from "./api";
import {
  MOCK_PETS,
  MOCK_USER,
  getMockCareLogs,
  getMockMemo,
  MOCK_GUARDIANS,
} from "../mock/data";
import { careStore } from "../mock/careStore";
import { Pet, CareLog, User, Memo, Guardian } from "@/shared/types";

const USE_MOCK = true;

const BASIC_CARE_LABELS: Record<string, string> = {
  meal: "식사", snack: "간식", supplement: "영양제",
  medicine: "투약", pad: "배변패드", water: "음수",
  walk: "산책", weight: "체중",
};
const DISEASE_CARE_LABELS: Record<string, string> = {
  heart: "심장", kidney: "신장", cancer: "암",
  eye: "안과", cushing: "쿠싱증후군", arthritis: "관절염", other: "기타",
};

export const saveCareTemplates = async (
  petId: number,
  basicNotes: string[],
  diseaseNotes: string[],
): Promise<void> => {
  const templates = [
    ...basicNotes.map((type) => ({
      petId,
      careType: type,
      title: BASIC_CARE_LABELS[type] ?? type,
      content: "케어 항목",
      careTypeDescription: BASIC_CARE_LABELS[type] ?? type,
    })),
    ...diseaseNotes.map((type) => ({
      petId,
      careType: type,
      title: `${DISEASE_CARE_LABELS[type] ?? type} 관리`,
      content: "질병 케어 항목",
      careTypeDescription: DISEASE_CARE_LABELS[type] ?? type,
    })),
  ];
  careStore.save(templates);
};

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
  if (USE_MOCK) {
    const staticLogs = getMockCareLogs(petId, date);
    const extra = careStore.getForPet(petId).map((t, i) => ({
      id: 1000 + i,
      petId,
      careTemplateId: 1000 + i,
      targetDate: date,
      careType: t.careType as CareLog["careType"],
      careTypeDescription: t.careTypeDescription,
      title: t.title,
      content: t.content,
      completedByUserId: 0,
      completedByNickname: "",
      completedByProfileImageUrl: "",
      version: 1,
      updatedAt: new Date().toISOString(),
      completed: false,
    }));
    return [...staticLogs, ...extra];
  }
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
