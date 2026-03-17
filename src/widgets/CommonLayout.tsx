import { ReactNode } from "react";
interface ICommonLayoutProps {
  children: ReactNode;
  backgroundColor?: string;
}
export const CommonLayout = ({
  children,
  backgroundColor = "bg-white",
}: ICommonLayoutProps) => {
  return (
    <div className={`flex flex-col w-full h-screen ${backgroundColor}`}>
      {children}
    </div>
  );
};
