"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  text: string;
}

export const ActiveLink = ({ path, text }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={`mr-2 px-2 py-1 rounded transition-colors duration-200 ${isActive
          ? "bg-[rgba(245,236,213,0.5)] text-gray-800" // 0.5 = 50% opacidad
          : "text-gray-800 hover:bg-[rgba(245,236,213,0.5)] hover:text-gray-800"
        }`}
    >
      {text}
    </Link>

  );
};
