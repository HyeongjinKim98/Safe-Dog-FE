import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
export default function Completed() {
  const router = useRouter();
  return (
    <div className="flex flex-col m-6 h-screen items-center gap-4">
      <div className=" flex flex-col h-full justify-center">
        <div className="text-2xl font-bold text-center">
          <p>회원가입이</p>
          <p>완료되었습니다!</p>
        </div>
        <div className="text-muted-foreground text-sm text-center">
          <p>축하드립니다! 가입이 완료되었어요.</p>
          <p>이제 건강을 챙기러 떠날까요?</p>
        </div>
      </div>
      <Button
        type="submit"
        className="w-full h-12 mb-4 rounded-2xl text-lg mt-auto"
        onClick={() => router.push("/home")}
      >
        홈으로
      </Button>
    </div>
  );
}
