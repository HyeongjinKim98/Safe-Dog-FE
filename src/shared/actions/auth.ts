"use server";

import { serverApi } from "./api";

type LoginResponseType = {
  grantType: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
};
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
