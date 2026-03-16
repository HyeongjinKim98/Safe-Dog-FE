import { ReactNode } from "react"
interface ICommonLayoutProps {
  children: ReactNode
}
export const CommonLayout = ({ children }: ICommonLayoutProps) => {
  return (
    <div className="flex flex-col w-full h-screen">{children}</div>
  )
}