"use server";
import { Pet, User } from "@/shared/types";
import { MOCK_PETS, MOCK_USER } from "../mock/data";

export const getMyProfile = async (): Promise<User> => {
  return MOCK_USER;
};

export const getMyPetList = async (): Promise<Pet[]> => {
  return MOCK_PETS;
};
