import { Memo } from "@/shared/types";

interface MemoCardProps {
  memo: Memo | null;
}

export const MemoCard = ({ memo }: MemoCardProps) => {
  if (!memo) return null;

  return (
    <div className="mx-4 my-2 bg-white rounded-2xl p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
          {memo.authorProfileImageUrl && (
            <img
              src={memo.authorProfileImageUrl}
              alt={memo.authorNickname}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <span className="font-semibold text-sm">{memo.authorNickname}</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-white">
          {memo.authorRole}
        </span>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{memo.content}</p>
    </div>
  );
};
