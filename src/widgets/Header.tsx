import { ReactNode } from "react";

interface IHeaderProps{
      left? : ReactNode;
      title? : string
      right? : ReactNode;
}
export const Header =({left,title,right}:IHeaderProps)=>{
      return(
            <header className="flex w-full p-4 items-center justify-between sticky top-0 h-16">
                  <div>{left}</div>
                  <div className="text-[#444444]">{title}</div>
                  <div>{right}</div>
            </header>
            
      )
}