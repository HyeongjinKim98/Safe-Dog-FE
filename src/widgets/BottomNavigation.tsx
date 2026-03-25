"use client";
import { useRouter, usePathname } from "next/navigation";
import { Home, BookOpen, BarChart2, GraduationCap, User } from "lucide-react";

const NAV_ITEMS = [
  { label: "홈", path: "/home", Icon: Home },
  { label: "반려노트", path: "/pet-note", Icon: BookOpen },
  { label: "케어리포트", path: "/carereport", Icon: BarChart2 },
  { label: "시니어상식", path: "/senior", Icon: GraduationCap },
  { label: "마이페이지", path: "/mypage", Icon: User },
];

export const BottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="sticky bottom-4 bg-primary-100 rounded-full z-10 border border-none m-4">
      <div className="flex justify-between items-center px-2 py-2">
        {NAV_ITEMS.map(({ label, path, Icon }) => {
          const isActive =
            pathname === path ||
            (path !== "/home" && pathname.startsWith(path + "/"));
          return (
            <button
              key={path}
              onClick={() => router.push(path)}
              className="flex flex-col items-center gap-1 flex-1 py-1"
            >
              <Icon
                size={22}
                className={isActive ? "text-[#7E5938]" : "text-[#C2C2C2]"}
              />
              <span
                className={`text-[10px] font-medium tracking-[-0.04em] ${
                  isActive ? "text-[#7E5938]" : "text-[#9E9E9E]"
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
