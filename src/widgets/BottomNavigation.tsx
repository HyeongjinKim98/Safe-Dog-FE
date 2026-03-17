import { ReactNode } from "react";
type NavigationPathType = {
  title: string;
  path: string;
  icon: string;
};
interface IBottomNavigationProps {
  // 임시 optional 처리
  paths?: NavigationPathType[];
}
export const BottomNavigation = () => {
  return (
    <div className="bg-white p-4 pb-12">
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-6 h-20 bg-gray-600 rounded-full">
        <p className="text-white"> Bottom Navigation(developing)</p>
      </div>
    </div>
  );
};
