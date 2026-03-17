export type GuardianRole = "OWNER" | "";

export interface Guardian {
  id: number;
  userId: number;
  role: GuardianRole;
}
