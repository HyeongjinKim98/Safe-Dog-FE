"use server";
import { Guardian } from "@/shared/types";
import { MOCK_GUARDIANS } from "../mock/data";

export const getGuardians = async (petId: number): Promise<Guardian[]> => {
  return MOCK_GUARDIANS;
};
