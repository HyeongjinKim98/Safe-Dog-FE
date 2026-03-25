"use server";
import { Pet, User } from "@/shared/types";
import {
  MOCK_PETS,
  MOCK_USER,
  MOCK_CARE_REPORT_WEEKLY,
  MOCK_CARE_REPORT_MONTHLY,
} from "../mock/data";
import { CareSection } from "@/views/mypage/ui/CareReportPage";

export const getMyProfile = async (): Promise<User> => {
  return MOCK_USER;
};

export const getMyPetList = async (): Promise<Pet[]> => {
  return MOCK_PETS;
};

export const getMyPetById = async (id: number): Promise<Pet | null> => {
  return MOCK_PETS.find((p) => p.id === id) ?? null;
};

export const getCareReport = async (): Promise<{
  weekly: CareSection[];
  monthly: CareSection[];
}> => {
  return {
    weekly: MOCK_CARE_REPORT_WEEKLY,
    monthly: MOCK_CARE_REPORT_MONTHLY,
  };
};
