import { MessageSquareDot } from "lucide-react";
export const PetStatus = () => {
  return (
    <>
      <div className="relative m-4 text-2xl  h-90">
        <p>오늘의 케어가 충분해,</p>
        <p className="font-semibold">토토가 신이 났어요!</p>
        <div className="absolute top-4 right-2 w-10 h-10 bg-[#f0f0f0] border-none rounded-full flex items-center justify-center border">
          <MessageSquareDot className="text-gray-400" />
        </div>
        <div className="absolute bottom-4 right-4">Image</div>
        <div className="absolute bottom-4 right-4">Image</div>
      </div>
    </>
  );
};
