import { Guardian } from "@/shared/types";
import { Users } from "lucide-react";
import { Button } from "@/shared/ui/button";

interface GuardianListProps {
  guardians: Guardian[];
}

export const ManageGuardians = ({ guardians }: GuardianListProps) => {
  return (
    <div className="flex items-center p-4">
      <div className="flex flex-col items-center ">
        <div className="w-10 h-10 bg-[#4c4c4c] rounded-full flex items-center justify-center border border-white">
          <Users className="w-6 h-6 text-white" />
        </div>
        {/* <p className="text-muted-foreground text-xs whitespace-pre-line text-center">
          공동보호자{"\n"}관리
        </p> */}
      </div>

      <div className="flex">
        {guardians.map((guardian) => (
          <div
            key={guardian.id}
            className="flex flex-col items-center -ml-2 first:ml-0"
          >
            <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-300">
              {guardian.profileImageUrl && (
                <img
                  src={guardian.profileImageUrl}
                  alt={guardian.nickname}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="ml-auto">
        <button
          className="rounded-full px-4 py-2 text-sm font-medium text-white"
          style={{
            background: "linear-gradient(147deg, #FFD08A 0%, #FFB84C 100%)",
          }}
        >
          요청하기
        </button>
      </div>
    </div>
  );
};
