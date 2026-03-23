import { MyPage } from "@/views/mypage/ui/MyPage";
import { getMyProfile, getMyPetList } from "@/shared/actions/mypage";
export default async function page() {
  const [profile, pets] = await Promise.all([getMyProfile(), getMyPetList()]);
  return <MyPage profile={profile} pets={pets} />;
}
