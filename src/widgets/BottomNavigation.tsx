"use client";
import { useRouter, usePathname } from "next/navigation";
import { Home, BookOpen, LogOut, Info } from "lucide-react";

const NAV_ITEMS = [
  { label: "홈", path: "/home", icon: Home },
  { label: "반려노트", path: "/pet-note", icon: BookOpen },
  { label: "마이페이지", path: "/mypage", icon: Info },
];

export const BottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="fixed bottom-6 left-4 right-4 z-50">
      <div className="flex justify-between items-center bg-gray-700 rounded-full px-6 py-3 shadow-lg">
        {NAV_ITEMS.map(({ label, path, icon: Icon }) => {
          const isActive = pathname === path;
          return (
            <button
              key={path}
              onClick={() => router.push(path)}
              className="flex flex-col items-center gap-1 flex-1"
            >
              <Icon
                size={22}
                className={isActive ? "text-white" : "text-gray-400"}
              />
              <span
                className={`text-xs ${
                  isActive ? "text-white font-semibold" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
