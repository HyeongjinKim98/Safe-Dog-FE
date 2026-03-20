import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { serverApi } from "@/shared/actions/api";

export default async function Page({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const status = searchParams.status;

  if (status === "PENDING" || status === "ACTIVE") {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (accessToken && refreshToken) {
      await serverApi.setToken(accessToken, refreshToken, 3600);
    }

    if (status === "PENDING") redirect("/signup");
    if (status === "ACTIVE") redirect("/login");
  }

  return <>home</>;
}
