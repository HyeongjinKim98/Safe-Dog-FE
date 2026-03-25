import { InvitationPage } from "@/views/invitation/ui/InvitationPage";
import { getInvitation, getInvitationGroup } from "@/shared/actions/invitation";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

interface Props {
  searchParams: Promise<{ code?: string }>;
}
export default async function page({ searchParams }: Props) {
  const { code } = await searchParams;
  if (!code) redirect("/");

  const invitation = await getInvitation(code);
  if (!invitation) redirect("/");

  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get("accessToken")?.value;
  const group = await getInvitationGroup(code);

  return (
    <InvitationPage
      invitation={invitation}
      isLoggedIn={isLoggedIn}
      group={group}
    />
  );
}
