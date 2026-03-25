import { PetDetailPage } from "@/views/mypage/ui/PetDetailPage";
import { getMyPetById } from "@/shared/actions/mypage";
import { notFound } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pet = await getMyPetById(Number(id));
  if (!pet) return notFound();
  return <PetDetailPage pet={pet} />;
}
