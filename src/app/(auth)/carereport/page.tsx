import { CareReportPage } from "@/views/mypage/ui/CareReportPage";
import { getCareReport, getMyPetList } from "@/shared/actions/mypage";

export default async function page() {
  const [{ weekly, monthly }, pets] = await Promise.all([
    getCareReport(),
    getMyPetList(),
  ]);
  return (
    <CareReportPage
      petName={pets[0]?.name ?? ""}
      weeklyReport={weekly}
      monthlyReport={monthly}
    />
  );
}
