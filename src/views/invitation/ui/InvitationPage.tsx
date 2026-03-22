"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CommonLayout } from "@/widgets/CommonLayout";
import { Button } from "@/shared/ui/button";
import { X, Mars, Venus } from "lucide-react";
import { Invitation, InvitationGroup } from "@/shared/types";

interface Props {
  invitation: Invitation;
  isLoggedIn: boolean;
  group: InvitationGroup | null;
}

const GroupPreview = ({
  group,
  onStart,
}: {
  group: InvitationGroup;
  onStart: () => void;
}) => (
  <CommonLayout>
    <div className="flex items-center justify-between px-4 py-4">
      <h1 className="text-lg font-bold mx-auto">공동보호자 합류</h1>
    </div>

    <div className="flex flex-col items-center gap-6 flex-1 px-6 pt-8">
      <p className="text-2xl font-bold text-center leading-snug">
        초대받은 그룹을{"\n"}확인해보세요!
      </p>

      <div className="w-full bg-gray-50 rounded-2xl p-6 flex flex-col items-center gap-4">
        {/* 펫 프로필 */}
        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
          {group.pet.profileImageUrl && (
            <img
              src={group.pet.profileImageUrl}
              alt={group.pet.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* 펫 정보 */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200">
          {group.pet.gender === "MALE" ? (
            <Mars size={16} className="text-blue-400" />
          ) : (
            <Venus size={16} className="text-pink-400" />
          )}
          <span className="font-semibold">{group.pet.name}</span>
          <span className="text-sm text-gray-400">
            {group.pet.breed} {group.pet.age}
          </span>
        </div>

        {/* 공동보호자 */}
        <div className="w-full">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🐾</span>
            <span className="text-sm text-gray-600">
              {group.pet.name}를 공동케어하고 있어요
            </span>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {group.guardians.map((g) => (
              <div
                key={g.id}
                className="flex flex-col items-center gap-1 flex-shrink-0"
              >
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  {g.profileImageUrl && (
                    <img
                      src={g.profileImageUrl}
                      alt={g.nickname}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <span className="text-xs text-gray-600">{g.nickname}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="p-4 mt-auto">
      <Button
        className="w-full h-14 rounded-full bg-gray-800 text-white text-base font-semibold"
        onClick={onStart}
      >
        시작하기
      </Button>
    </div>
  </CommonLayout>
);

export const InvitationPage = ({ invitation, isLoggedIn, group }: Props) => {
  const router = useRouter();
  const [showGroup, setShowGroup] = useState(false);
  const handleJoin = () => {
    if (isLoggedIn) {
      setShowGroup(true);
    } else {
      router.push(`/signup?inviteCode=${invitation.code}`);
    }
  };

  if (showGroup && group) {
    return <GroupPreview group={group} onStart={() => router.push("/home")} />;
  }

  return (
    <CommonLayout>
      <div className="flex items-center justify-between px-4 py-4">
        <h1 className="text-lg font-bold mx-auto">공동보호자 합류</h1>
        <button onClick={() => router.back()} className="absolute right-4">
          <X size={20} />
        </button>
      </div>

      <div className="flex flex-col items-center gap-6 flex-1 px-6 pt-8">
        <p className="text-2xl font-bold">초대가 도착했어요!</p>
        <div className="text-6xl">💌</div>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            {invitation.inviterProfileImageUrl && (
              <img
                src={invitation.inviterProfileImageUrl}
                alt={invitation.inviterNickname}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <span className="font-semibold">{invitation.inviterNickname}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-white">
            {invitation.inviterRole}
          </span>
        </div>

        <p className="text-gray-500 text-sm">공동보호자로 합류 하시겠습니까?</p>

        <div className="w-full border-b border-gray-200 pb-3 text-center">
          <p className="text-xs text-gray-400 mb-1">초대받은 공동양육코드</p>
          <p className="text-xl font-bold tracking-widest">{invitation.code}</p>
        </div>
      </div>

      <div className="p-4 mt-auto">
        <Button
          className="w-full h-14 rounded-full bg-gray-800 text-white text-base font-semibold"
          onClick={handleJoin}
        >
          공동양육 합류하기
        </Button>
      </div>
    </CommonLayout>
  );
};
