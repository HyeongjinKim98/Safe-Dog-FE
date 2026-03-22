"use server";
import { Invitation, InvitationGroup } from "@/shared/types";
import { MOCK_INVITATIONS, MOCK_INVITATION_GROUPS } from "../mock/data";

export const getInvitation = async (
  code: string,
): Promise<Invitation | null> => {
  return MOCK_INVITATIONS.find((i) => i.code === code) ?? null;
};

export const getInvitationGroup = async (
  code: string,
): Promise<InvitationGroup | null> => {
  return MOCK_INVITATION_GROUPS.find((i) => i.code === code) ?? null;
};
