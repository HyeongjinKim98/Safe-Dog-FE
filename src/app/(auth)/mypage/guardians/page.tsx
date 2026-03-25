import { GuardiansPage } from "@/views/mypage/ui/GuardiansPage";
import { getGuardians } from "@/shared/actions/guardians";

export default async function page() {
  const guardians = await getGuardians(1);
  return <GuardiansPage guardians={guardians} inviteCode="ZchjTy" />;
}
