import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function RightRail({ children }: Props) {
  return (
    <aside className="hidden lg:flex flex-col gap-4 ml-4 w-64 shrink-0">
      {children}
    </aside>
  );
}
