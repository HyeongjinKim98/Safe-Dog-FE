import { ReactNode } from "react";

interface IHeaderProps {
  left?: ReactNode;
  title?: string;
  right?: ReactNode;
  bgColor?: string;
}

export const Header = ({ left, title, right, bgColor }: IHeaderProps) => {
  return (
    <header
      className="relative flex w-full p-4 items-center justify-between sticky top-0 h-16 bg-background"
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      <div>{left}</div>
      <div className="absolute left-1/2 -translate-x-1/2 text-[#444444]">
        {title}
      </div>
      <div>{right}</div>
    </header>
  );
};
