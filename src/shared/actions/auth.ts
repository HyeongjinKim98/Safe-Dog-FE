"use server";

import { serverApi } from "./api";

type LoginResponseType = {
  grantType: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
};

type Disease = "HEART_DISEASE" | string; // 다른 질병 값이 있다면 추가

type Gender = "MALE" | "FEMALE";

type Pet = {
  id: number;
  userId: number;
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  gender: Gender;
  weight: number;
  registrationNumber: string;
  hasAllergy: boolean;
  allergyDescription: string;
  profileImageUrl: string;
  diseases: Disease[];
  createdAt: string;
  updatedAt: string;
  birthDateUnknown: boolean;
  neutered: boolean;
  weightUnknown: boolean;
};

type PetListResponse = Pet[];

export const testLogin = async (email: string) => {
  const { accessToken, refreshToken, accessTokenExpiresIn } =
    await serverApi.post<LoginResponseType>(
      `/api/auth/test-login?email=${email}`,
      {},
    );
  await serverApi.setToken(accessToken, refreshToken, accessTokenExpiresIn);
};

export const completeSocialSignup = async (inviteCode?: string) => {
  await serverApi.post("/api/auth/social-signup-complete", {
    terms: [{ termId: 0, agreed: true }],
    inviteCode: inviteCode ?? null,
  });
};

export const testGet = async () => {
  const data = await serverApi.get<Pet[]>(`/api/users/me`);
  console.log(data);
  return data;
};
